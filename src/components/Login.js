import React, {useState} from "react";
import { useFormik } from "formik";
import axios from "axios";
import {useHistory} from "react-router";
import jwt_decode from "jwt-decode";

const serverAppUri = 'http://127.0.0.1:8000/api';

export default function Login(props) {
  let history = useHistory();
  let [auth, setAuth] = useState([]);
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validate: values => {
      let errors = {}
      if(!values.email){
        errors.email = "Required";
      } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid Email Address"
      } 
      if(!values.password) {
        errors.password ="Required"
      }
      return errors
    },
    onSubmit: async values => {
     try{
      const result = await axios({
        method: "POST",
        url: `${serverAppUri}/user/login`,
        data: values
      })
      localStorage.setItem('authToken', result.data.token);
      setAuth(result.data.token)
      var decoded = jwt_decode(result.data.token)  
      console.log(decoded);
     result.data.data.role === "admin" ? history.push('/admin-panel-user') : history.push('/')
     } catch(error) {
      console.log(error)
     }
    }
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      {
        formik.errors.email ? <div className='error'>{formik.errors.email}</div> : null
      }
      <input
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      {
        formik.errors.password ? <div className="error">{formik.errors.password}</div> : null
      }
      <button type="submit">Submit</button>
    </form>
  );
};
