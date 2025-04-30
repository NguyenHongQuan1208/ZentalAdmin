import { db, ref, get, set, update, remove } from "./firebase";

const dataProvider = {
  getList: async (resource, params) => {
    const snapshot = await get(ref(db, resource));
    const dataObj = snapshot.val() || {};

    // Chuyển từ object sang array + thêm id từ key
    const data = Object.entries(dataObj).map(([key, value]) => ({
      id: key,
      ...value,
    }));

    return {
      data,
      total: data.length,
    };
  },

  getOne: async (resource, { id }) => {
    const snapshot = await get(ref(db, `${resource}/${id}`));
    const data = snapshot.val();
    if (!data) {
      throw new Error(`No data found for id ${id}`);
    }
    return {
      data: { id, ...data },
    };
  },

  create: async (resource, { data }) => {
    const id = data.uid || Date.now().toString(); // Sử dụng uid nếu có, nếu không, tạo id mới
    await set(ref(db, `${resource}/${id}`), data);
    return { data: { id, ...data } };
  },

  update: async (resource, { id, data }) => {
    await update(ref(db, `${resource}/${id}`), data);
    return { data: { id, ...data } };
  },

  delete: async (resource, { id }) => {
    await remove(ref(db, `${resource}/${id}`));
    return { data: { id } };
  },
};

export default dataProvider;
