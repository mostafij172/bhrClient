import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom"
import { useFormik } from "formik";
import axios from "axios";
import jwt_decode from "jwt-decode";

const serverAppUri = 'http://127.0.0.1:8000/api';

export default function WritePost(props){
    const {id} = useParams();
    let [post, setPost] = useState([]);
    useEffect(function() {
        loadPost()
    }, [])

    async function loadPost() {
       const result = await axios.get(`${serverAppUri}/forum/get-a-post/${id}`);
       setPost(result.data.data)
    }

    const user = jwt_decode(localStorage.getItem('authToken')).id;
   let title = post.title;
    let postBody = post.postBody;
    let catagory = post.catagory;
//    console.log(catagory)
    const formik = useFormik({
        initialValues: {
            title,
            postBody,
            catagory,
            user
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
                result.data.status === "success" ? props.history.push('/') : alert("something went wrong")
            } catch(err){
                console.log(err)
            }
        }
    })

console.log(formik.values)
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