import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/styles/profile.css";
import AccountApi from "../api/AccountApi";
import { useSelector } from "react-redux";

const Profile = () => {
    const { currentUser } = useSelector((state) => state.auth); // Use Redux state
    const navigate = useNavigate();
    const [dataUser, setDataUser] = useState({
        id: 0,
        username: "",
        email: "",
        role: "",
        departmentName: "",
        profileImage: "",
        firstName: "",
        lastName: "",
    });

    const [selectedImage, setSelectedImage] = useState(null);

    const getUser = async (id) => {
        try {
            const response = await AccountApi.findAccountById(id);
            if (response.status === 200) {
                setDataUser(response.data);
                console.log(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (currentUser?.id) {
            getUser(currentUser.id);
        }
    }, [currentUser]);

    const handleChange = (e) => {
        setDataUser({ ...dataUser, [e.target.name]: e.target.value });
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            const imageUrl = URL.createObjectURL(file);
            setDataUser({ ...dataUser, profileImage: imageUrl });
        }
    };

    const handleUpdate = async () => {
        const formData = new FormData();
        formData.append("firstName", dataUser.firstName);
        formData.append("lastName", dataUser.lastName);
        formData.append("email", dataUser.email);

        if (selectedImage) {
            formData.append("profileImage", selectedImage);
        }

        try {
            const response = await AccountApi.editProfile(currentUser.username, formData);
            if (response.status === 200) {
                alert("Edit profile successfully!");
                getUser(currentUser.id);
                navigate("/"); // về trang chủ
            }
        } catch (error) {
            console.error("Update error:", error);
            alert("Edit profile failed!");
        }
    };

    const handleCancel = () => {
        setDataUser({ ...dataUser });
        setSelectedImage(null);
        navigate("/");
    };

    if (!currentUser) {
        return <p>Please log in to view your profile.</p>;
    }

    return (
        <div className="profile">
            <div className="profile-box box_1">
                <img
                    src={
                        dataUser?.profileImage ||
                        "https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo="
                    }
                    alt="avatar"
                    className="profile-image"
                />
                <div className="image-list">
                    <label className="button-change-image">
                        Upload Avatar
                        <input type="file" className="input-change-image" onChange={handleImageUpload} hidden />
                    </label>
                </div>
            </div>

            <div className="profile-box box_2">
                <div className="profile-info">
                    <div className="profile-info-item">
                        <label className="profile-info-label">Username:</label>
                        <input type="text" className="profile-info-value" value={dataUser.username} disabled />
                    </div>
                    <div className="profile-info-item">
                        <label className="profile-info-label">First Name:</label>
                        <input
                            type="text"
                            className="profile-info-value"
                            name="firstName"
                            value={dataUser.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="profile-info-item">
                        <label className="profile-info-label">Last Name:</label>
                        <input
                            type="text"
                            className="profile-info-value"
                            name="lastName"
                            value={dataUser.lastName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="profile-info-item">
                        <label className="profile-info-label">Email:</label>
                        <input
                            type="text"
                            className="profile-info-value"
                            name="email"
                            value={dataUser.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="profile-info-item">
                        <label className="profile-info-label">Department Name:</label>
                        <input type="text" className="profile-info-value" value={dataUser.departmentName} disabled />
                    </div>
                </div>
                <div className="profile-button">
                    <button className="profile-button-item" onClick={handleCancel}>
                        Back
                    </button>
                    <button className="profile-button-item" onClick={handleUpdate}>
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
