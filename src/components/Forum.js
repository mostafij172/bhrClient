import React from 'react';
import {Link} from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { 
    makeStyles, 
    Card, CardActions, 
    CardContent, Typography, 
    CardHeader, Avatar, 
    IconButton, Button
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/DeleteOutline";

const serverAppUri = 'http://127.0.0.1:8000/api';

const useStyle = makeStyles({
    card: {
        padding: "15px",
        marginBottom: "15px",
        width: "100%"
    }
})

export default function Forum(props) {
    const token = localStorage.getItem("authToken");
    let currentUser;
    if(!token) {
        currentUser = null;
    } else {
        currentUser = jwt_decode(token).id;
    }

    let classes = useStyle()

    const {createdAt, title, postBody, catagory, _id} = props.post
    const {role, name, user_photo, email, blood_group} = props.post.user
    return(
        <Card className={classes.card}>
            <CardHeader
                avatar={<Avatar src={`./public/static/${user_photo}`}></Avatar>}
                action={
                    <div>
                       <IconButton>
                           { currentUser === props.post.user._id ? <Link to={`edit-post/${_id}`}><EditIcon/></Link> : null}
                        </IconButton>
                        <IconButton>
                        { currentUser === props.post.user._id ? <DeleteIcon onClick ={async function() {
                            await axios.delete(`${serverAppUri}/forum/delete-post/${_id}`, {
                                headers: {'Authorization': 'Bearer ' + token}
                            })
                        }}/> : null}
                        </IconButton>
                    </div>
                }
            title={name}
                subheader={email}
            />
            <CardContent>
                <Typography variant="h6" component="h2">
                    {title}
                </Typography>
                <Typography variant="body2" component="p">
                    {postBody}
                </Typography>
            </CardContent>
            <CardActions>
            <Button color="secondary" variant="outlined">{blood_group}</Button>
            <Button color="secondary" variant="outlined">{role}</Button>
            </CardActions>
        </Card>
    )
}