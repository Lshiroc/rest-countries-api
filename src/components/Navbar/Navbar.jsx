import style from './navbar.module.scss';
import moonIcon from './../../assets/icons/moon.svg';

export default function Navbar() {
    return (
        <nav className={`sectionx ${style.navbar}`}>
            <div className={style.logo}>Where in the world?</div>
            <div className={style.darkMode}>
                <div className={style.icon}>
                    <img draggable="false" src={moonIcon} alt="Dark Mode" />
                </div>
                <div className={style.title}>Dark Mode</div>
            </div>
        </nav>
    )
}
