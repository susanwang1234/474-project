import * as React from 'react'
import CreatePost from './CreatePost'
import { useState, useEffect } from 'react'
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import NavBar from '../nav/NavBar';


export default function Posts() {
    
    const [postList, setPostList] = useState([]);
    const [lastID, setLastID] = useState();
    const [callback, setCallback] = useState(1);
    useEffect(()=>{
        getPosts();
        setLastID(postList.length);
        console.log(lastID)
    },[callback]);
    
    const getPosts = () => {
        axios.get('https://v1sdueurx1.execute-api.us-east-1.amazonaws.com/initial') 
        .then(res => {
            setPostList(res.data);
            console.log(res.data);
        })
        .catch((error) => {
          console.log(error)
        });
    }

    const rerenderParentCallback = () => {
        getPosts();
        setCallback(callback+1);
        console.log("callback");
    }

    return (
        <div>
            <NavBar/>
            <h1>Posts Page!</h1>
            <CreatePost rerenderParentCallback={rerenderParentCallback} data = {lastID}/>
            <div>
                <h2>Posts</h2>
                {postList.map((item,i) => {
                    return(
                    <Card key={i}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {item?.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <div>
                                    <h2>
                                        {item?.my_type}
                                    </h2>
                                    <h5>
                                        {item?.description}
                                    </h5>
                                    <h3>
                                        ${item?.price}
                                    </h3>
                                    <h4>
                                        Posted by: {item?.email}
                                    </h4>
                                    <img src={item?.img_url} width={"25%"} />
                                </div>
                            </Typography>
                        </CardContent>
                    </Card>
                    )
                })}
            </div>
        </div>
    );

}
