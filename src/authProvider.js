const authProvider = {
  login: ({ username, password }) => {
    // Xử lý đăng nhập ở đây
    // Thông thường bạn sẽ gọi API để xác thực
    if (username === "admin" && password === "admin") {
      localStorage.setItem("username", username);
      return Promise.resolve();
    }
    return Promise.reject(new Error("Tên đăng nhập hoặc mật khẩu không đúng"));
  },
  logout: () => {
    localStorage.removeItem("username");
    return Promise.resolve();
  },
  checkAuth: () => {
    return localStorage.getItem("username")
      ? Promise.resolve()
      : Promise.reject();
  },
  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("username");
      return Promise.reject();
    }
    return Promise.resolve();
  },
  getIdentity: () => {
    const username = localStorage.getItem("username");
    return Promise.resolve({
      id: username,
      fullName: username,
    });
  },
  getPermissions: () => Promise.resolve(""),
};

export default authProvider;
