import { useEffect, useState } from "react";
import {getComments,postComments} from "./serverUtils/server"
import Comment from "./Comment";
import { parseISO , getDate} from 'date-fns';
function Post({title,content,published,createdAt,id,setHover,hover,user}) {
  const [comments,setComments] = useState([])
  const created = parseISO(createdAt).toDateString();
  async function data(){
    const current = await getComments(id)
    setComments(current);
  }

  async function permaHover(){
    if(hover === id) setHover(-1);
    else{ 
      setHover(id);
      await data()
    }
  }
  
  async function submit(e){
    await postComments(e);
    await data();
  }

  useEffect(()=>{
    if(hover !== id){
      setComments([]);
    }
  },[hover])
  
  return (
    <div id = "postCard" className = {hover === id ?'permaCard':'card'}  >
      <div className ="posts"> 
      <h3 onClick ={permaHover} className ="postCardTitle" >{title}</h3>
      {hover === id && <li>Published : {published?"True":"False"}</li>}
      {hover === id && <li>{created}</li>}
      {hover === id && <li>{content}</li> }
      <div className = "commentSection" style = {{visibility:hover === id?"visible":"hidden"}} >
      <label>Comment Section</label>
      <form className = "commentForm" action ={submit} >
          <input type = "hidden" name ="email" value = {user.email} ></input>
          <input type = "hidden" name ="id" value = {user.id} ></input>
          <input type = "hidden" name ="postId" value = {id} ></input>
          <textarea name = "content"></textarea>
          <button className = "commentSubmit" type = "submit"> Submit comment! </button>
        </form>
        </div>
      {comments.map((comment)=>{
        return <Comment arthur = {comment.username} content ={comment.content} createdAt = {comment.createdAt} ></Comment>
      })}
      
        
        
      </div>
    </div>    
  )  
}

export default Post;