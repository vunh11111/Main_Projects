// pages/Profile/UserProfile.js
import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./Profile.css";
import userService from "../../services/userService";

export default function UserProfile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await userService.getProfile();
        setUser(res.data);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await userService.updateProfile(user);
      setMessage("Cập nhật thông tin thành công!");
      setIsEditing(false);
    } catch (error) {
      setMessage("Cập nhật thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <>
      <Header />
      <div className="profile_content">
        <div className="profile_container">
          <h2 className="profile_title">Thông tin cá nhân</h2>

          <label className="profile_label">Họ và tên:</label>
          <input
            className="profile_input"
            name="name"
            value={user.name}
            onChange={handleChange}
            disabled={!isEditing}
          />

          <label className="profile_label">Email:</label>
          <input
            className="profile_input"
            name="email"
            value={user.email}
            onChange={handleChange}
            disabled
          />

          <label className="profile_label">Số điện thoại:</label>
          <input
            className="profile_input"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            disabled={!isEditing}
          />

          <label className="profile_label">Địa chỉ:</label>
          <input
            className="profile_input"
            name="address"
            value={user.address}
            onChange={handleChange}
            disabled={!isEditing}
          />

          <button className="profile_button" onClick={isEditing ? handleSave : () => setIsEditing(true)}>
            {isEditing ? "Lưu thay đổi" : "Chỉnh sửa"}
          </button>

          {message && <p style={{ color: "green", marginTop: "10px" }}>{message}</p>}
        </div>
      </div>
      <Footer />
    </>
  );
}
