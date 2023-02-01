import * as React from 'react';
import "../../App.css"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Auth} from 'aws-amplify'
import { useHistory } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { useUserContext } from '../../contexts/UserContext';
import { Box } from '@mui/system';


export default function Login() {  
    let history = useHistory();
    const { user, setUser } = useUserContext();
    const { setAuth } = useAuthContext();

    const handleLogin = async () => {
        const userNamebox = document.getElementById("username");
        const passwordBox = document.getElementById("password");
        try{
            const user = await Auth.signIn(userNamebox.value, passwordBox.value)  
            console.log(user);
            setUser(user);
            setAuth(true);
            history.push("/");
        }catch(error){
            alert(error)
            console.log("Login failed:" + error);
        }
        
    };

    const goToSignUp = async () => {
        history.push("/signup");
    }

    return (
        <div>
            <Dialog open={true} onClose={console.log("")}>
                <DialogTitle>Log in</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Please enter your username and password.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="username"
                    label="Username"
                    type="username"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    id="password"
                    label="Password"
                    type="password"
                    fullWidth
                    variant="standard"
                />
                </DialogContent>
                <DialogActions>
                <div className="buttons">
                    <Box sx={{ m: "0.2rem" }}>
                        <Button variant="outlined" onClick={goToSignUp}>Sign up</Button>
                    </Box>
                    <Box sx={{ m: "0.2rem" }}>
                        <Button variant="contained" onClick={handleLogin}>Log in</Button>
                        {/* <Button variant="contained" onClick={handleSignup}>Sign up</Button> */}
                    </Box>
                </div>
                </DialogActions>
            </Dialog>
        </div>
    );
}