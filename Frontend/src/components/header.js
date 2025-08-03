import React, { useState, useEffect, useRef } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/header.css';
import PreProfile from './PreProfile';

const Header = () => {
    const { currentUser } = useSelector((state) => state.auth);
    const [menuVisible, setMenuVisible] = useState(false);
    const navigate = useNavigate();
    const fullName = currentUser ? currentUser.fullName : null;

    // Tạo tham chiếu cho menu
    const menuRef = useRef(null);

    const logOut = () => {
        if (window.confirm("Do you want log out")) {
            localStorage.clear();
            navigate("/login");
        }
    };

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    // Xử lý ẩn menu khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuVisible(false); // Ẩn menu
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className='header'>
            <div className='header-logo-feature'>
                <div className='header-logo-slogan'>
                    <img
                        width={'80px'}
                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjcKNH-CGJdHaI2zj41703Cg-mMwXT48skbA&s'
                        className='header-logo'
                        alt='ảnh'
                    />
                </div>
                <div className='header-menu'>
                    <ul className='menu-feature'>
                        <li className='feature'>
                            <span className="feature-link" onClick={toggleMenu}>
                                {fullName ? fullName : "Tài khoản"}
                            </span>
                        </li>
                        
                        {/* truyền thêm menu vào */}
                        <div ref={menuRef}>
                            <PreProfile menuVisible={menuVisible} logOut={logOut} />
                        </div>
                    </ul>
                </div>
            </div>
            <div className='header-contact'></div>
        </div>
    );
};

export default Header;