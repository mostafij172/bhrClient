import React from "react";
import { useFormik } from "formik";
import axios from "axios";

const serverAppUri = 'http://127.0.0.1:8000/api';

export default function Login() {
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: async values => {
     try{
      // const result = await axios({
      //   method: "POST",
      //   url: `${serverAppUri}/user/login`,
      //   data: values
      // })
      // console.log(result)
      console.log(values)
      const result = await axios.post(`${serverAppUri}/user/login`, {email: values.email, password:values.password}, {
        withCredentials: true,
        headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}
      })
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
      <input
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      <button type="submit">Submit</button>
    </form>
  );
};
