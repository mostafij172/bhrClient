import React, {useState, useEffect} from "react";
import {useHistory, useParams} from "react-router-dom"
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const serverAppUri = 'http://127.0.0.1:8000/api';

const useStyles = makeStyles({
  root: {
    maxWidth: "50%",
    margin: "0px auto"
  },
});

export default function Profile() {

  const [user, setUser] = useState([]);

  const {id} = useParams();

  useEffect(function() {
    loadUser();
  }, [])

  async function loadUser() {
    try{
      let result = await axios.get(`${serverAppUri}/user/profile/${id}`);
      setUser(result.data.data);
    } catch(error) {
      console.log(error)
    }
  }

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={`Avatar`}
          height="140"
          image="public/static/avatar1.jpg"
          title={`avatar`}
        />
        {console.log(user)}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {user.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
  <p>Email: {user.email}</p>
  <p> Phone: {user.cell_phone_no}</p>
  <br/>
  <p> NID: {user.nid}</p>
  <br/>
  <p> Father's: {user.father_name}</p>
  <br/>
  <p> Mother's: {user.mother_name}</p>
  <br/>
  <p> Occupation: {user.occupation}</p><br/>
  <p> Institution: {user.institution}</p><br/>
  <p> Phone: {user.cell_phone_no}</p><br/>
  {/* <p> Parmanent Adress: {user.parmanent_address.district, user.parmanent_address.subdistrict, user.parmanent_address.post_office, user.parmanent_address.village}</p><br/><ul/> */}
  {/* <p> Present Adress: {user.present_address.district, user.present_address.subdistrict, user.present_address.post_office, user.present_address.village}</p> */}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          {user.blood_group}
        </Button>
        <Button size="small" color="primary">
          {user.role}
        </Button>
      </CardActions>
    </Card>
  );
}



