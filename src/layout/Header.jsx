import { Link } from "react-router-dom";
import LOGO from '../assets/svg/logo.svg'
const Header = () => {
    return (
        <div>
            <header className="navigation-bar">
                <span className="brand"> 
                    <img src={LOGO} /> Music Player
                </span>
            </header>
        </div>);
}

export default Header;