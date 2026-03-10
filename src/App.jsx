import React, { useEffect, useState,useRef } from "react";
import './App.css'

function App(){

  const [userDetail,setUserDetail]=useState('');
  const [userName,setUserName]=useState('');
  let user=useRef(null);

  useEffect(()=>{
    fetch(`https://api.github.com/users/${userName}`).then(response=>{
      if(!response.ok){
        throw new Error('HTTP Error');
      }
      return response.json();
    }).then(data=>{
      setUserDetail(data);
    }).catch(err=>console.log(err))
  },[userName])

  const handleClick=(e)=>{
    e.preventDefault();
    const userValue=user.current.value;
    user.current.value='';
    setUserName(userValue);
    setUserDetail('')
  }

  return (
    <div className="container">
      <h1 className="heading">Search Github Profile</h1>
      <form className="formCard">
        <input type="text" name="" id="" ref={user} />
        <button onClick={handleClick}>Search</button>
      </form>

      {userDetail&&<div className="userDetailCard">
      <div className="userDetailBody">
        <p className="name">{userDetail.name}</p>
        <em className="username">{userDetail.login}</em>
        <div className="follow">
          <p>Followers:{userDetail.followers}</p>
          <p>Following:{userDetail.following}</p>
        </div>
        <div className="prof">
          <p>💼 {userDetail.company}</p>
          <p>✍️ {userDetail.bio}</p>
        </div>
      </div>
      <div className="userImage">
        <img src={userDetail.avatar_url} alt="image" />
      </div>
      </div>}
    </div>
  )
}


export default App;