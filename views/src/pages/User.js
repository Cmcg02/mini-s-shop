import Header from "../components/Header";
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { signout } from "../state/user";
import Sign from "../components/Sign";

const UserPage = (props) => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()


  if(user.name === "guest"){

    return (<>
      <h1>Sign in</h1>
      <Header/>
      <Sign/>
    </>)

  }else{

    return (<>
      <h1>{user.name}</h1>
      <Header/>
      <button onClick={()=>dispatch(signout())}>Sign Out</button>
    </>)

  }
}
export default UserPage