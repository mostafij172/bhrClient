import React from "react";
import { useFormik } from "formik";
import {Grid} from "@material-ui/core";
import axios from "axios";

const serverAppUri = 'http://127.0.0.1:8000/api';

export default function SignupForm(props) {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      nid: "",
      cell_phone_no: "",
      father_name: "",
      mother_name: "",
      institution: "",
      occupation: "",
      blood_group: ""
    },
    validate: values => {
      let errors = {};
      if(!values.name) {
        errors.name = "Required"
      }
      if(!values.email){
        errors.email = "Required";
      } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid Email Address"
      }
      if(!values.password) {
        errors.password = "Required";
      } else if(values.password.length < 6) {
        errors.password = "Password must be greater then six charecter";
      } 
      if(!values.confirmPassword) {
        errors.confirmPassword = "Required";
      } else if(values.confirmPassword !== values.password) {
        errors.confirmPassword = "Password did not matched"
      }
      if(!values.nid) {
        errors.nid = "Required"
      }
      if(!values.cell_phone_no) {
        errors.cell_phone_no = "Required"
      }
      return errors;
    },
    onSubmit: async values => {
      try{
        const result = await axios({
          method: "POST",
          url: `${serverAppUri}/user/sign-up`,
          data: values
        })
        console.log(result)
        localStorage.setItem('authToken', result.data.token);    
       result.data.data.role === "admin" ? props.history.push('/admin-panel') : props.history.push('/')
       } catch(error) {
        console.log(error)
       }
    }
  });
  console.log(formik.errors);
  return (
    // <Grid container spacing={4}>
    //   <Grid item xs={2}></Grid>
    //   <Grid item xs={8}
    // </Grid>

    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="name">Full Name</label>
      <input 
        id="name" 
        name="name" 
        onChange={formik.handleChange} 
        type="text" 
        value={formik.values.name}
      />
      {formik.errors.name ? <div className='error'>{formik.errors.name}</div> : null}
      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      {formik.errors.email ? <div className='error'>{formik.errors.email}</div> : null}
      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      {formik.errors.password ? <div className='error'>{formik.errors.password}</div> : null}
      <label htmlFor="confirmPassword">Confirm Password</label>
      <input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.confirmPassword}
      />
      {formik.errors.confirmPassword ? <div className='error'>{formik.errors.confirmPassword}</div> : null}
      <label htmlFor="nid">NID</label>
      <input
        id="nid"
        name="nid"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.nid}
      />
      {formik.errors.nid ? <div className='error'>{formik.errors.nid}</div> : null}
      <label htmlFor="cell_phone_no">Cell Phone No</label>
      <input
        id="cell_phone_no"
        name="cell_phone_no"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.cell_phone_no}
      />
      {formik.errors.cell_phone_no ? <div className='error'>{formik.errors.cell_phone_no}</div> : null}
      <label htmlFor="father_name">Father's Name</label>
      <input
        id="father_name"
        name="father_name"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.father_name}
      />
      <label htmlFor="mother_name">Mother's Name</label>
      <input
        id="mother_name"
        name="mother_name"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.mother_name}
      />
      <label htmlFor="institution">Institution</label>
      <input
        id="institution"
        name="institution"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.institution}
      />
      <label htmlFor="occupation">Occupation</label>
      <input
        id="occupation"
        name="occupation"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.occupation}
      />
      <label htmlFor="blood_group">Blood Group</label>
      <input
        id="blood_group"
        name="blood_group"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.blood_group}
      />
      <button type="submit">Submit</button>
    </form>
  );
};
