import React from 'react';
import { 
    makeStyles, 
    Card, CardActions, 
    CardContent, Typography, 
    CardHeader, Avatar, 
    IconButton, Button
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/DeleteOutline";

const useStyle = makeStyles({
    card: {
        padding: "15px",
        marginBottom: "15px",
        width: "100%"
    }
})

export default function Forum(props) {

    let classes = useStyle()

    const {createdAt, title, postBody, catagory} = props.post
    const {role, name, user_photo, email, blood_group} = props.post.user
    console.log(user_photo);
    return(
        <Card className={classes.card}>
            <CardHeader
                avatar={<Avatar src={`./public/static/${user_photo}`}></Avatar>}
                action={
                    <div>
                       <IconButton>
                            <EditIcon/>
                        </IconButton>
                        <IconButton>
                            <DeleteIcon/>
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