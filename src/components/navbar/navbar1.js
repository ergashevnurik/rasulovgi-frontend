import { useRef } from "react";
import{FaBars, FaTimes} from "react-icons/fa";

function Navbar1() {

    const navRef = useRef();

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    }


    return (
        <header>
            <img src="http://localhost:8081/static/media/logo.1a0f3c66e67773e1decf.svg"></img>
            <nav ref={navRef}>
                <a href="">Home</a>
                <a href="">My works</a>
                <a href="">Blog</a>
                <a href="">About me</a>
            <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                <FaTimes/>
            </button>
            </nav>
            <button className="nav-btn" onClick={showNavbar}>
                <FaBars/>
            </button>
        </header>
    );
}
export default Navbar1;