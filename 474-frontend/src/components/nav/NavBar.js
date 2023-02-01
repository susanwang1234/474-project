import {Link} from 'react-router-dom';
import { useUserContext } from '../../contexts/UserContext';
import { useAuthContext } from '../../contexts/AuthContext';
import {Auth} from 'aws-amplify'
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';


export default function NavBar() {
    const { user, setUser } = useUserContext();
    const { auth, setAuth } = useAuthContext();
    let history = useHistory();

    const logout = async() => {
       try{
        Auth.signOut();
        setUser(null);
        setAuth(false);
        history.push("/");
       }catch (err) {
           console.log(err);
       }
    };

    const goToLogin = () => {
        history.push("/login");
    }
    const goToHome = () => {
        history.push("/");
    }
    const goToUsers = () => {
        history.push("/users");
    }
    const goToPosts = () => {
        history.push("/posts");
    }

    return(
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Box sx={{ m: "0.2rem" }}>
                            <Button size="small" variant="contained" color="info" onClick={goToHome}>Home</Button>
                        </Box>
                        <Box sx={{ m: "0.2rem" }}>
                            <Button size="small" variant="contained" color="info" onClick={goToUsers}>Users</Button>
                        </Box>
                        <Box sx={{ m: "0.2rem" }}>
                            <Button size="small" variant="contained" color="info" onClick={goToPosts}>Posts</Button>
                        </Box>
                        <Box sx={{ m: "0.2rem" }}>
                            { auth || user ? 
                            <Button size="small" variant="contained" color="error" onClick={logout}>Log out</Button> 
                            : <Button size="small" variant="contained" color="success" onClick={goToLogin}>Log in</Button>}
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}