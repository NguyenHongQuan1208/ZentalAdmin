import { db, ref, get, set, update, remove } from "./firebase";

const dataProvider = {
  getList: async (resource, params) => {
    try {
      // Handle special resources
      if (resource === "chatlist") {
        return handleChatList(params);
      }
      if (resource === "comments") {
        return handleComments(params);
      }

      // Fetch all data for the resource
      const snapshot = await get(ref(db, resource));
      let data = convertSnapshotToArray(snapshot);

      // Apply client-side filtering based on filter parameters
      if (params.filter) {
        // Handle general search filter (q)
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

        // Handle specific filters for users/userInfo
        if (resource === "users" || resource === "userInfo") {
          // Filter by username if provided
          if (params.filter.username) {
            const usernameFilter = params.filter.username.toLowerCase();
            data = data.filter((item) =>
              String(item.username || "")
                .toLowerCase()
                .includes(usernameFilter)
            );
          }

          // Filter by email if provided
          if (params.filter.email) {
            const emailFilter = params.filter.email.toLowerCase();
            data = data.filter((item) =>
              String(item.email || "")
                .toLowerCase()
                .includes(emailFilter)
            );
          }

          // Filter by isActive if provided
          if (params.filter.isActive !== undefined) {
            data = data.filter(
              (item) => item.isActive === params.filter.isActive
            );
          }
        }

        // Handle specific filters for posts
        if (resource === "posts") {
          // Filter by title if provided
          if (params.filter.title) {
            const titleFilter = params.filter.title.toLowerCase();
            data = data.filter((item) =>
              String(item.title || "")
                .toLowerCase()
                .includes(titleFilter)
            );
          }

          // Filter by status if provided
          if (params.filter.status !== undefined) {
            // status is a number (1 for Done, 0 for Todo)
            data = data.filter((item) => item.status === params.filter.status);
          }

          // Filter by sectionId if provided
          if (params.filter.sectionId) {
            data = data.filter(
              (item) => item.sectionId === params.filter.sectionId
            );
          }
        }
      }

      // Apply sorting and pagination
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
      // Remove 'id' from the data payload to prevent Firebase update issues
      const { id: _, ...updateData } = data;
      await update(ref(db, `${resource}/${id}`), updateData);
      console.log(`Successfully updated ${resource}/${id}`);
      return { data: { id, ...updateData } };
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

// Helper functions
function getSearchableFields(resource) {
  const fieldsMap = {
    userInfo: {
      clientSide: ["id", "username", "email"],
    },
    users: {
      clientSide: ["id", "username", "email"],
    },
    posts: {
      clientSide: ["id", "title", "content", "sectionId"],
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

// Define the missing functions to resolve no-undef errors
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
