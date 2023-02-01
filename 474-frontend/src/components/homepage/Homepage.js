import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import NavBar from '../nav/NavBar';
import logo from './sfu_swap_alt.png'

export default function Homepage() {
    return (
        <div>
            <NavBar/>
            <img src={logo} width={"25%"}/>
        </div>
    );
}