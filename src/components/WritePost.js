import React from "react";
import { Formik, useFormik } from "formik";
import axios from "axios";
import jwt_decode from "jwt-decode";

const serverAppUri = 'http://127.0.0.1:8000/api';

export default function WritePost(props){

    const user = jwt_decode(localStorage.getItem('authToken')).id;

    const formik = useFormik({
        initialValues: {
            title: "",
            postBody: "",
            catagory: "",
            user: user
        },
        validate: values => {
            let errors = {};
            if(!values.title) {
                errors.title = "Required"
            } 
            if(!values.postBody) {
                errors.postBody = "Required"
            }
            if(!values.catagory) {
                errors.catagory = "Required"
            }
            return errors;
        },
        onSubmit: async values => {
            try{
                const result = await axios({
                    method: "POST",
                    url: `${serverAppUri}/forum/new-post`,
                    data: values,
                    headers: {'Authorization': 'Bearer ' + localStorage.getItem('authToken')}
                })
                console.log(result)
                result.data.status === "success" ? props.history.push('/') : alert("something went wrong")
            } catch(err){
                console.log(err)
            }
        }
    })
    return(
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="title"> Title </label>
            <input 
                name="title"
                id="name"
                type="text"
                value={formik.values.title}
                onChange={formik.handleChange}
            />
            <label htmlFor="postBody"> Write The Notice </label>
            <input 
                name="postBody"
                id="postBody"
                type="textarea"
                value={formik.values.postBody}
                onChange={formik.handleChange}
            />
             <label htmlFor="catagory"> Select Catagory </label>
            <input 
                name="catagory"
                id="catagory"
                type="text"
                value={formik.values.catagory}
                onChange={formik.handleChange}
            />

            <button type="submit">Post</button>
        </form>
    )
}