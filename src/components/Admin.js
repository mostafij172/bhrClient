import React, {useState, useEffect} from 'react';
import Link from "react-router-dom";
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
import View from "@material-ui/icons/Visibility"

let axiosConfig = {
  withCredentials: true
}

const serverAppUri = 'http://127.0.0.1:8000/api';

const useStyle = makeStyles({
  table:{
    minWidth: "650"
  }
})

export default function Admin() {
  let classes = useStyle();
  const [users, setUser] = useState([]);
  
    useEffect(function() {
        loadUsers()
    }, []);

    async function loadUsers() {
        let result = await axios.get(`${serverAppUri}/user/view-all-user`)
        setUser(result.data.data.allusers)
    }
    async function deleteUser(id) {
      console.log(id)
      await axios.delete(`${serverAppUri}/user/delete-user/${id}`)
      loadUsers();
    }
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Role</TableCell>
            <TableCell align="left">Cell Pone No</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(item => (
            <TableRow key={item._id}>
              <TableCell component="th" scope="row">{item.name}</TableCell>
              <TableCell align="left">{item.email}</TableCell>
              <TableCell align="left">{item.role}</TableCell>
              <TableCell align="left">{item.cell_phone_no}</TableCell>
              <TableCell align="left"><Button color="primary" variant="outlined"><View/></Button></TableCell>
              <TableCell align="left"><Button color="secondary" variant="outlined" onClick={() => deleteUser(item._id)}> <DeleteIcon/> </Button></TableCell>
            </TableRow>
          ))}
        </TableBody>  
      </Table>
    </TableContainer>
  );
}