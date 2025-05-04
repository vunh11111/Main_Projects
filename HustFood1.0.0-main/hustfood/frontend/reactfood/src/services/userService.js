// src/services/userService.js

const userService = {
    // Lấy thông tin người dùng (mock)
    getProfile: async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            data: {
              name: "Nguyễn Văn A",
              email: "nguyenvana@gmail.com",
              phone: "0123456789",
              address: "123 Đường ABC, Hà Nội",
            },
          });
        }, 500); // delay 0.5s để giả lập API
      });
    },
  
    // Cập nhật thông tin người dùng (mock)
    updateProfile: async (user) => {
      return new Promise((resolve) => {
        console.log("Mock cập nhật thông tin:", user);
        setTimeout(() => {
          resolve({ success: true, message: "Cập nhật thành công" });
        }, 500);
      });
    },
  
    // Đăng xuất (mock)
    logout: async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true });
        }, 300);
      });
    },
  
    // Đổi mật khẩu (mock)
    changePassword: async (currentPassword, newPassword) => {
      return new Promise((resolve, reject) => {
        if (currentPassword === "123456") {
          resolve({ success: true });
        } else {
          reject(new Error("Mật khẩu hiện tại không đúng"));
        }
      });
    },
  };
  
  export default userService;
  