import { useEffect, useState,useRef } from "react";
import {getPosts} from "./serverUtils/server"
import {getComments,postComments,deletePost,updatePost} from "./serverUtils/server"
import { Editor } from '@tinymce/tinymce-react';
import Comment from "./Comment";

import { parseISO , getDate} from 'date-fns';
function Post({title,content,published,createdAt,id,setHover,hover,user,posts,setPosts}) {
  const [comments,setComments] = useState([])
  const [edit,setEdit] = useState([false]);
  const [editHover, setEditHover] = useState(false);
  const editorRef = useRef(null);
  const created = parseISO(createdAt).toDateString();

  async function data(){
    const current = await getComments(id)
    setComments(current);
  }

  async function permaHover(){
    setEditHover(false);
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

  async function remove(e){
    e.preventDefault()
    let response = await deletePost(user,id);
    if(response){
     let data = await getPosts()
     console.log(data);
     setPosts(data);
     setHover(-1);
    }
  }

  async function editPost(e){
    e.preventDefault()
    setEditHover(!editHover);
  }

  async function update(formData){
    const post ={
      title:formData.get("title"),
      content:editorRef.current.getContent(),
      published:formData.get("published"),
      id : id,
    }
    console.log(post);
    const response = await updatePost(user,post);
    if(response){
      let data = await getPosts()
      setPosts(data);
    }
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
      {hover === id &&(
        <div>
        <li>Published : {published?"True":"False"}</li>
        <li>{created}</li>
        <div dangerouslySetInnerHTML={{__html:content}}></div>
        <button onClick={editPost}>Edit</button>
        </div> 
      )}
      {editHover && (
      <div>
        <form action ={update}>
          <label>Title</label>
          <input type = "text" name = "title" required value = {title}></input>
          <input type = "radio" name ="published" value ="true" required></input>
          <label>published</label>
          <input type = "radio" name ="published" value ="false" required></input>
          <label>unpublished</label>
          <input type = "hidden" name ="email" value = {user.email} ></input>
          <input type = "hidden" name ="id" value = {user.id} ></input>
          <Editor 
            apiKey={import.meta.env.VITE_tinyApiKey}
            onInit={(evt, editor) => editorRef.current = editor}
            initialValue= {content}
            init={{
              menubar: false,
              plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
              ],
              toolbar: 'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            content_css:["dark"],
            }}
          />
          <button type ="submit">Update</button>
          <button onClick={remove}>Delete</button>
        </form>
      </div> 
      )}
      <div className = "commentSection" style = {{visibility:hover === id?"visible":"hidden"}} >
      <label>Comment Section</label>
      <form className = "commentForm" action ={submit} >
          <input type = "hidden" name ="email" value = {user.email} ></input>
          <input type = "hidden" name ="id" value = {user.id} ></input>
          <input type = "hidden" name ="postId" value = {id} ></input>
          <textarea name = "content"></textarea>
          <button className = "commentSubmit" type = "submit"> Submit comment! </button>
        </form>
        

          {comments.map((comment)=>{
             return <Comment key ={comment.createdAt} user ={user}arthur = {comment.username} id = {comment.id}content ={comment.content} postId ={id} createdAt = {comment.createdAt} ></Comment>
          })}
          </div>
     
      
        
        
      </div>
    </div>    
  )  
}

export default Post;