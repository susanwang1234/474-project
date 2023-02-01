import * as React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAuthContext } from '../../contexts/AuthContext';
import { useUserContext } from '../../contexts/UserContext';

export default function CreatePost(props) {
  const { user, setUser } = useUserContext();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    let valuesStatus = true;
    const fields = [];
    fields.push(document.getElementById("title").value);
    fields.push(document.getElementById("description").value);
    fields.push(document.getElementById("price").value);
    fields.push(document.getElementById("type").value);
    fields.push(document.getElementById("img_url").value);
    fields.map((field) =>{
      if(field === ""){
        valuesStatus = false;
      }
    })
    {if(valuesStatus == false){
        alert("you need to fill in all of the fields");
    }else{
      const pattern = /\d/g;
      if(pattern.test(fields[2])){
        makeAndSend(fields);
        setOpen(false);
      }else{
        alert("Price must be a number")
      }
    }}
  }

  const makeAndSend = (values) =>{
    let obj = {id: uuidv4(), title: values[0], description:values[1], price:values[2], my_type:values[3], img_url:values[4], email:user?.attributes?.email, username:user?.username}
    axios.post(' https://v1sdueurx1.execute-api.us-east-1.amazonaws.com/initial', obj)
    .then((res) => {
      console.log(res);
      props.rerenderParentCallback();
    })
    .catch((err) => {console.log(err)})
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create Post
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a post, please submit details such as a title, description, price, image link and email.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="title"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="description"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="price"
            label="Price"
            type="price"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="type"
            label="Type"
            type="type"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="img_url"
            label="Image URL"
            type="img_url"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}