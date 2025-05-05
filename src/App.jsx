import { useState,useEffect  } from 'react'
import Login from "./LogIn";
import Post from "./Post"
import CreatePost from './CreatePost.jsx';
import './App.css'
import {getPosts} from "./serverUtils/server"
import { Link } from "react-router-dom";
function App() {
  const [logIn, setLogin] = useState({user:null, verify:false});
  const [posts, setPosts] = useState([]);
  const [hover,setHover] = useState(-1)
  
  useEffect( () => {
    if (logIn.verify) {
      async function fetch() {
        let data = await getPosts();
        console.log(data);
        setPosts(data);        
      }
      fetch();

    }
   }, [logIn]);
  
  return (
    <>
      {!logIn.verify ? (
      <div>
        <Login logIn ={logIn}setLogin={setLogin}></Login>
        <Link to ="register">Register a new account!</Link>
      </div>
      ):
      (
        <>
            <h1>You are logged in {logIn.user.firstname}</h1>
            <h2>Click on a post title to read and comment on!</h2>
            <CreatePost hover ={hover} user ={logIn.user} />
            <div className ={hover === -1?"allPosts":"allPostsSingle"}>
              {posts.map((post) => {
                if(hover === -1 || hover === post.id )
                return <Post title ={post.title} content = {post.content} createdAt ={post.createdAt} id = {post.id} published = {post.published} hover ={hover} setHover={setHover} user = {logIn.user} />
                else return
                }
              )}
            </div>
           
        </>
      )}
    </>
  )
}

export default App
