import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/DeleteOutline";

const serverAppUri = 'http://127.0.0.1:8000/api';

const useStyle = makeStyles({
  table:{
    minWidth: "650"
  }
})

export default function AdminForum() {
  let classes = useStyle();
  const [forums, setForum] = useState([]);
  
    useEffect(function() {
      loadForum()
    }, []);

    async function loadForum() {
        let result = await axios.get(`${serverAppUri}/forum/get-all-posts`, {
          headers: {'Authorization': 'Bearer ' + localStorage.getItem('authToken')}
        })
        setForum(result.data.data)
    }
    // async function deleteUser(id) {
    //   console.log(id)
    //   await axios.delete(`${serverAppUri}/user/delete-user/${id}`)
    //   loadUsers();
    // }
    // console.log(forums)
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>User Name</TableCell>
            <TableCell align="left">Title</TableCell>
            <TableCell align="left">Role</TableCell>
            <TableCell align="left">Cell Pone No</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {forums.map(item => (
            <TableRow key={item._id}>
              <TableCell component="th" scope="row">{item.user.name}</TableCell>
              <TableCell component="th">{item.title}</TableCell>
              <TableCell align="left">{item.catagory}</TableCell>
              <TableCell align="left">{item.postBody}</TableCell>
              <TableCell align="left"><Button color="secondary" variant="outlined" onClick={async function() {
                        await axios.delete(`${serverAppUri}/forum/delete-post/${item._id}`,{
                          headers: {'Authorization': 'Bearer ' + localStorage.getItem('authToken')}
                        });
                        loadForum();
              }}> <DeleteIcon/> </Button></TableCell>
            </TableRow>
          ))}
        </TableBody>  
      </Table>
    </TableContainer>
  );
}