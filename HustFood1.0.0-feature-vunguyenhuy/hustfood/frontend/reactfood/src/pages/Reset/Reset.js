import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ProfileSidebar from '../../components/ProfileSidebar/ProfileSidebar';
import './Reset.css';
import { updateUserPassword } from '../../services/userService';

const Reset = () => {
    const [formData, setFormData] = useState({
        password: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        if (formData.newPassword !== formData.confirmPassword) {
            setError({response:{
                data: { message: 'Mật khẩu mới không khớp. Vui lòng thử lại.' }
            }});
            return;
        }
        try {
            let token = localStorage.getItem('token');
            const { password, newPassword } = formData;
            const response = await updateUserPassword(token, password, newPassword);
            if (response.status === 200) {
                alert('Đặt lại mật khẩu thành công');
                setFormData({
                    password: '',
                    newPassword: '',
                    confirmPassword: ''
                });
            }
        } catch (error) {
            setError(error);
        }
    };

    return (
        <>
            <Header />
            <div className="reset-page">
                <ProfileSidebar />
                <div className="reset-content">
                    <div className="reset-container">
                        <h1>Đặt lại mật khẩu</h1>
                        <form onSubmit={handleSubmit} className="reset-form">
                            <div className="form-group">
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    placeholder='Mật khẩu hiện tại'
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    required
                                    placeholder='Mật khẩu mới'
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    placeholder='Xác nhận mật khẩu mới'
                                />
                            </div>
                            {error && (
                                <div className="error-message">
                                    <p>{error.response.data.message}</p>
                                </div>
                            )}
                            <button type="submit" className="reset-button">
                                Đặt lại mật khẩu
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Reset;
