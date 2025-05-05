import { useState,useRef } from "react"
import { Editor } from '@tinymce/tinymce-react';
import {newPost} from './serverUtils/server';
function CreatePost({user}){
  const [editHover, setEditHover] = useState(false);
  const editorRef = useRef(null);


  async function log(formData) {
    console.log(formData);
    console.log(user);
    console.log(editorRef.current.getContent());
    const data ={
      title:formData.get("title"),
      content:editorRef.current.getContent(),
      published:formData.get("published"),
      id : formData.get("id"),
    }

    console.log(data);
    let createdPost = await newPost(data);
  };

  async function permaHover(){
      setEditHover(!editHover);
    }

  return(
    <div className = "editor" >
        <div id = "postCardEditor" className = {editHover === false ? "editCard" : "hoverEditCard"} >
          <h3 id = "editorTitle"  onClick ={permaHover} >Create a new post?</h3>  
          <div className = {editHover === false ? "editCard" : "hoverEditCard"} style = {{visibility: editHover === false ?"hidden":"visible"}}> 
          <form action={log} >
            <label>Title</label>
            <input type = "text" name = "title"></input>
            <input type = "radio" name ="published" value ="true"></input>
            <label>published</label>
            <input type = "radio" name ="published" value ="false"></input>
            <label>unpublished</label>
            <input type = "hidden" name ="email" value = {user.email} ></input>
            <input type = "hidden" name ="id" value = {user.id} ></input>
            <Editor 
              apiKey="6994t85wpqut257bvkn7wh3qzduol2mk48o9dokbj6tnjkcd"
              onInit={(evt, editor) => editorRef.current = editor}
              initialValue="<p>Write your new post here!.</p>"
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
              content_css:["app.css","dark"],
              }}
            />
          <button type = "submit" >Log editor content</button>  
          </form>
        </div>
        </div>
    </div>
  
  )
}

export default CreatePost

//6994t85wpqut257bvkn7wh3qzduol2mk48o9dokbj6tnjkcd