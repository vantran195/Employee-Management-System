import { useState } from "react";
import '../assets/styles/user/home.css';
import Account from "./Account";
import Groups from "./Groups";
import React from 'react';
import { useSelector } from 'react-redux';

const HomePage = () => {
    const { currentUser } = useSelector((state) => state.auth);

    return (
        <div>
            <h1>Home Page</h1>
            <p>Welcome, {currentUser?.username || 'Guest'}!</p>
        </div>
    );
};

const Home = ({ role }) => {

    const DISPLAY_HOME = 1;
    const DISPLAY_DEPARTMENT = 2;
    const DISPLAY_USER = 3;
    const [display, setDisplay] = useState(DISPLAY_HOME);

    return (
        <div className="home">
            <div className='side-bar'>
                <ul className='side-bar-menu'>
                    <li className={(display === DISPLAY_HOME) ? 'menu-item-checked' : 'menu-item'} onClick={() => { setDisplay(DISPLAY_HOME) }}>
                        <button className="item-link">Home</button>
                    </li>
                    {
                        role === "ADMIN" &&
                        <>
                            <li className={(display === DISPLAY_DEPARTMENT) ? 'menu-item-checked' : 'menu-item'} onClick={() => { setDisplay(DISPLAY_DEPARTMENT) }}>
                                <button className="item-link">Group</button>
                            </li>
                            <li className={(display === DISPLAY_USER) ? 'menu-item-checked' : 'menu-item'} onClick={() => { setDisplay(DISPLAY_USER) }}>
                                <button className="item-link">Account</button>
                            </li>
                        </>
                    }
                </ul>
            </div>

            <div className="home-content">
                {display === DISPLAY_HOME && <HomePage />}
                {display === DISPLAY_DEPARTMENT && <Groups />}
                {display === DISPLAY_USER && <Account />}
            </div>
        </div>
    )
}
export default Home;
