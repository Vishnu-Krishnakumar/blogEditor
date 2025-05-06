import { parseISO , getDate} from 'date-fns';
import {deleteComment} from "./serverUtils/server"

function Comment({postId,arthur,content,createdAt,user,id}){
  
  arthur = arthur.split("@");
  let created = parseISO(createdAt).toDateString();
  async function deleteFetch(e){
    e.preventDefault();
    const response = await deleteComment(user,postId,id);
    console.log(response);
  }

  return(
    <div className = "commentCard">
      <h3>{arthur[0]}</h3>
      <label>{created}</label>
      <p>{content}</p>
      <div>
        <button onClick={deleteFetch}>Delete</button>
      </div>
    </div>
  )   
}

export default Comment;