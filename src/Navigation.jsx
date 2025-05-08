
function Navigation({setLogIn}){
  function logOut(e){
    e.preventDefault();
    localStorage.removeItem("authToken")
    setLogIn({user:null, verify:false});
  
  }
  return(
    <>
      <nav className="navigation">
        <a href="" onClick={logOut}>Log Out</a>
      </nav>
    </>
  )
}

export default Navigation;