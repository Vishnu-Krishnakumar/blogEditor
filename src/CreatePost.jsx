import { useState,useRef } from "react"
import { Editor } from '@tinymce/tinymce-react';
import {newPost, getPosts} from './serverUtils/server';
import { useFormStatus } from "react-dom";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
}


function CreatePost({user,setPosts}){
  const [editHover, setEditHover] = useState(false);
  const editorRef = useRef(null);
  

  async function log(formData) {
    const data ={
      title:formData.get("title"),
      content:editorRef.current.getContent(),
      published:formData.get("published"),
      id : formData.get("id"),
    }

    console.log(data);
    let createdPost = await newPost(data);
    console.log(createdPost);
    if(createdPost){
      let data = await getPosts()
      setPosts(data);
    }
  };

  async function permaHover(){
      setEditHover(!editHover);
    }

  return(
    <div className = "editor" >
        <div id = "postCardEditor" className = {editHover === false ? "editCard" : "hoverEditCard"} >
          {!editHover && <h3 id = "editorTitle"  onClick ={permaHover} >Create a new post?</h3>  }
          { editHover && <h3 id = "editorTitle"  onClick ={permaHover} >Submit a new post!</h3>  }
          <div className = {editHover === false ? "editCard" : "hoverEditCard"} style = {{visibility: editHover === false ?"hidden":"visible"}}> 
          <form action={log} >
            <label>Title</label>
            <input type = "text" name = "title" required></input>
            <input type = "radio" name ="published" value ="true" required></input>
            <label>published</label>
            <input type = "radio" name ="published" value ="false" required></input>
            <label>unpublished</label>
            <input type = "hidden" name ="email" value = {user.email} ></input>
            <input type = "hidden" name ="id" value = {user.id} ></input>
            <Editor 
              apiKey={import.meta.env.VITE_tinyApiKey}
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
              content_css:["dark"],
              }}
            />
          <Submit/> 
          </form>
        </div>
        </div>
    </div>
  
  )
}

export default CreatePost
