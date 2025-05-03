import { ErrorBoundary } from "react-error-boundary";
import {log} from "./serverUtils/server"
function Login({setLogin,logIn }) {

  async function logIn(formData) {
    const verified = await log(formData);
    console.log(verified);
    if(verified.user.author){
      setLogin({user:verified.user, verify:verified.verify});
    }
  }
  return (
    <>
    <ErrorBoundary
      fallback={<p>There was an error while submitting the form</p>}
    >
      <form action ={logIn}>
        <label >Email:</label>
        <input type = "email" id = "email" name ="email"></input>
        <label >Password:</label>
        <input type ="password" id ="paswword" name ="password"></input>
        <button  type = "submit">LogIn</button>
      </form>
    </ErrorBoundary>
    </>
    )
}

export default Login;