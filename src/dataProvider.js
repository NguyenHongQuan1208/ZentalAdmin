import { db, ref, get, set, update, remove } from "./firebase";
import { supabase } from "./supabaseClient";

const dataProvider = {
  getList: async (resource, params) => {
    try {
      if (resource === "chatlist") {
        return handleChatList(params);
      }
      if (resource === "comments") {
        return handleComments(params);
      }

      const snapshot = await get(ref(db, resource));
      let data = convertSnapshotToArray(snapshot);

      if (params.filter) {
        if (params.filter.q) {
          const searchTerm = params.filter.q.toLowerCase();
          const searchableFields = getSearchableFields(resource);

          data = data.filter((item) =>
            searchableFields.clientSide.some((field) =>
              String(item[field] || "")
                .toLowerCase()
                .includes(searchTerm)
            )
          );
        }

        if (resource === "users" || resource === "userInfo") {
          if (params.filter.username) {
            const usernameFilter = params.filter.username.toLowerCase();
            data = data.filter((item) =>
              String(item.username || "")
                .toLowerCase()
                .includes(usernameFilter)
            );
          }

          if (params.filter.email) {
            const emailFilter = params.filter.email.toLowerCase();
            data = data.filter((item) =>
              String(item.email || "")
                .toLowerCase()
                .includes(emailFilter)
            );
          }

          if (params.filter.isActive !== undefined) {
            data = data.filter(
              (item) => item.isActive === params.filter.isActive
            );
          }
        }

        if (resource === "posts") {
          if (params.filter.title) {
            const titleFilter = params.filter.title.toLowerCase();
            data = data.filter((item) =>
              String(item.title || "")
                .toLowerCase()
                .includes(titleFilter)
            );
          }

          if (params.filter.status !== undefined) {
            data = data.filter((item) => item.status === params.filter.status);
          }

          if (params.filter.sectionId) {
            data = data.filter(
              (item) => item.sectionId === params.filter.sectionId
            );
          }

          // Add filter for uid (Created by)
          if (params.filter.uid) {
            const uidFilter = params.filter.uid.toLowerCase();
            data = data.filter((item) =>
              String(item.uid || "")
                .toLowerCase()
                .includes(uidFilter)
            );
          }
        }
      }

      return paginateAndSort(data, params);
    } catch (error) {
      console.error(`Error in getList(${resource}):`, error);
      throw error;
    }
  },

  getOne: async (resource, { id }) => {
    try {
      const snapshot = await get(ref(db, `${resource}/${id}`));
      const data = { id, ...snapshot.val() };
      // Set default value if sectionId is missing or null
      if (data.sectionId === undefined || data.sectionId === null) {
        data.sectionId = ""; // or some default value
      }
      console.log(`getOne(${resource}, ${id}) data:`, data);
      return { data };
    } catch (error) {
      console.error(`Error in getOne(${resource}, ${id}):`, error);
      throw error;
    }
  },


  create: async (resource, { data }) => {
    try {
      const id = data.id || Date.now().toString();

      if (data.photoUrl && data.photoUrl.rawFile) {
        try {
          const filePath = `profile_photos/${id}_${Date.now()}.jpg`;
          const file = data.photoUrl.rawFile;

          const { data: uploadData, error: uploadError } = await supabase.storage
            .from("ZentalApp")
            .upload(filePath, file);

          if (uploadError) {
            console.error("Upload error:", uploadError.message);
            throw new Error("Failed to upload profile picture");
          }

          const { data: publicData, error: publicError } = supabase.storage
            .from("ZentalApp")
            .getPublicUrl(filePath);

          if (publicError) {
            console.error("Public URL error:", publicError.message);
            throw new Error("Failed to get public URL for profile picture");
          }

          data.photoUrl = publicData.publicUrl;
        } catch (error) {
          console.error("Error handling photo upload:", error);
          throw error;
        }
      } else if (data.photoUrl && typeof data.photoUrl === "object") {
        data.photoUrl = data.photoUrl.src || data.photoUrl.url || "";
      }

      await set(ref(db, `${resource}/${id}`), data);
      return { data: { id, ...data } };
    } catch (error) {
      console.error(`Error in create(${resource}):`, error);
      throw error;
    }
  },

  update: async (resource, { id, data }) => {
    try {
      console.log(`Updating ${resource}/${id} with data:`, data);

      // Handle image upload for posts (imageUri) or user profiles (photoUrl)
      const imageField = resource === "posts" ? "imageUri" : "photoUrl";
      if (data[imageField] && data[imageField].rawFile) {
        try {
          const filePath = `${resource === "posts" ? "post_images" : "profile_photos"}/${id}_${Date.now()}.jpg`;
          const file = data[imageField].rawFile;

          const { data: uploadData, error: uploadError } = await supabase.storage
            .from("ZentalApp")
            .upload(filePath, file);

          if (uploadError) {
            console.error("Upload error:", uploadError.message);
            throw new Error("Failed to upload image");
          }

          const { data: publicData, error: publicError } = supabase.storage
            .from("ZentalApp")
            .getPublicUrl(filePath);

          if (publicError) {
            console.error("Public URL error:", publicError.message);
            throw new Error("Failed to get public URL for image");
          }

          data[imageField] = publicData.publicUrl;
        } catch (error) {
          console.error("Error handling image upload:", error);
          throw error;
        }
      } else if (data[imageField] && typeof data[imageField] === "object") {
        data[imageField] = data[imageField].src || data[imageField].url || "";
      }

      // Remove id from data and filter out undefined values
      const { id: _, ...updateData } = data;
      // Create a new object with only defined values
      const cleanedUpdateData = {};
      Object.keys(updateData).forEach((key) => {
        if (updateData[key] !== undefined) {
          cleanedUpdateData[key] = updateData[key];
        }
      });

      await update(ref(db, `${resource}/${id}`), cleanedUpdateData);
      console.log(`Successfully updated ${resource}/${id}`);
      return { data: { id, ...cleanedUpdateData } };
    } catch (error) {
      console.error(`Error updating ${resource}/${id}:`, error);
      throw new Error(`Failed to update ${resource}: ${error.message}`);
    }
  },


  delete: async (resource, { id }) => {
    try {
      await remove(ref(db, `${resource}/${id}`));
      return { data: { id } };
    } catch (error) {
      console.error(`Error deleting ${resource}/${id}:`, error);
      throw error;
    }
  },
};

function getSearchableFields(resource) {
  const fieldsMap = {
    userInfo: {
      clientSide: ["id", "username", "email"],
    },
    users: {
      clientSide: ["id", "username", "email"],
    },
    posts: {
      clientSide: ["id", "title", "content", "sectionId", "uid"], // Added uid for general search
    },
  };
  return fieldsMap[resource] || { clientSide: [] };
}

function convertSnapshotToArray(snapshot) {
  const dataObj = snapshot.val() || {};
  return Object.entries(dataObj).map(([id, value]) => ({ id, ...value }));
}

function paginateAndSort(data, params) {
  if (params.sort) {
    const { field, order } = params.sort;
    data.sort((a, b) => {
      const aVal = a[field] || "";
      const bVal = b[field] || "";
      return order === "ASC"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }

  const { page = 1, perPage = 10 } = params.pagination || {};
  const start = (page - 1) * perPage;
  const end = start + perPage;

  return {
    data: data.slice(start, end),
    total: data.length,
  };
}

async function handleChatList(params) {
  try {
    const { userId } = params.filter;
    if (!userId) throw new Error("Missing userId for chatlist");

    const snapshot = await get(ref(db, `chatlist/${userId}`));
    const chats = convertSnapshotToArray(snapshot);

    const enrichedChats = await Promise.all(
      chats.map(async (chat) => {
        const userSnapshot = await get(ref(db, `userInfo/${chat.id}`));
        return {
          ...chat,
          partnerInfo: userSnapshot.val() || {},
        };
      })
    );

    return paginateAndSort(enrichedChats, params);
  } catch (error) {
    console.error("Error in handleChatList:", error);
    throw error;
  }
}

async function handleComments(params) {
  try {
    const { postId } = params.filter;
    if (!postId) throw new Error("Missing postId for comments");

    const snapshot = await get(ref(db, `comments/${postId}`));
    const comments = convertSnapshotToArray(snapshot);

    const enrichedComments = await Promise.all(
      comments.map(async (comment) => {
        const userSnapshot = await get(ref(db, `userInfo/${comment.userId}`));
        return {
          ...comment,
          userInfo: userSnapshot.val() || {},
        };
      })
    );

    return paginateAndSort(enrichedComments, params);
  } catch (error) {
    console.error("Error in handleComments:", error);
    throw error;
  }
}

export default dataProvider;
