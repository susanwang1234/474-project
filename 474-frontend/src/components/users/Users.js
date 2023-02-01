import * as React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import NavBar from '../nav/NavBar';
import Amplify, {Auth} from 'aws-amplify'

export default function Users() {
    const [userList, setUserList] = useState([]);
    const [lastID, setLastID] = useState();
    const [callback, setCallback] = useState(1);

    useEffect(()=>{
        getUsers();
        setLastID(userList.length)
    },[]);
    
    const getUsers = () => {
        axios.get('https://sbzagtupu4.execute-api.us-east-1.amazonaws.com/initial') 
        .then(res => {
            setUserList(res.data);
            console.log(res.data);
        })
        .catch((error) => {
          console.error(error)
        });
    }

    return (
        <div>
            <NavBar/>
            <h1>Users Page!</h1>
            <div>
                <h2>Users</h2>
                {userList.map((item, i) => {
                    return <Card key={i}>
                        <CardContent>
                            <div>
                                <h2>{item?.name}</h2>
                                <h4>{item?.username}</h4>
                            </div>
                            <img src={item?.img_url} width={"25%"} />
                        </CardContent>
                    </Card>
                })}
            </div>
        </div>
    );
}