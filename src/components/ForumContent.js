import React, {useState, useEffect} from "react";
import axios from "./../axios.js";
import{Grid} from "@material-ui/core"
import Forum from "./Forum";

export default function ForumContent() {
    let [forum, setForum] = useState([]);
  useEffect(function() {
    loadForum();
  }, [])

 async function loadForum() {
    let forumPosts = await axios.get("http://127.0.0.1:8000/api/forum/get-all-posts");
    setForum(forumPosts.data.data);
  }
  function renderForum() {
   return forum.map(post => {
      // console.log(post)
      return <Forum key={post["_id"]} post={post}/>
    })
  }

  return(
      <Grid container spacing="2">
          {
            renderForum()
          }  
      </Grid>
  )

}