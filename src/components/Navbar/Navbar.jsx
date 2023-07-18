import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import style from './navbar.module.scss';
import moonIcon from './../../assets/icons/moon.svg';
import moonFilledIcon from './../../assets/icons/moon-filled.svg';
import { changeTheme } from '../../Store/statesReducer';

export default function Navbar() {
    const theme = useSelector(state => state.statesReducer.theme);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(changeTheme({stateName: "theme", value: localStorage.getItem("theme") || "light"}))
    }, [])

    const setTheme = () => {
        let thm = localStorage.getItem("theme") || "light";
        if(thm == "light") {
            localStorage.setItem("theme", "dark");
            dispatch(changeTheme({stateName: "theme", value: "dark"}));
        } else if(thm == "dark") {
            localStorage.setItem("theme", "light");
            dispatch(changeTheme({stateName: "theme", value: "light"}));
        }
    }

    return (
        <nav className={`sectionx ${style.navbar} ${theme == "dark" && style.dark}`}>
            <NavLink to="/" className={style.logo}>Where in the world?</NavLink>
            <div className={style.darkMode} onClick={() => setTheme()}>
                <div className={style.icon}>
                    {
                        theme == "dark" ? (
                            <img draggable="false" src={moonFilledIcon} alt="Dark Mode" />
                        ) : theme == "light" ? (
                            <img draggable="false" src={moonIcon} alt="Dark Mode" />
                        ) : (
                            <img draggable="false" src={moonIcon} alt="Dark Mode" />
                        )
                    }
                </div>
                <div className={style.title}>Dark Mode</div>
            </div>
        </nav>
    )
}
