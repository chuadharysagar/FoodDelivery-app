import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';


const LoginPopup = ({ setShowLogin }) => {
   const { url, token, setToken } = useContext(StoreContext);

   const [currState, setCurrState] = useState("login");
   const [data, setData] = useState({
      name: "",
      email: "",
      password: "",
   })

   const onChangehandler = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setData(data => ({ ...data, [name]: value }));
   }

   const onLogin = async (event) => {
      event.preventDefault();
      try {
         let newUrl = url + "/api/user";
         newUrl += currState === "login" ? "/login" : "/register";
   
         const response = await axios.post(newUrl, data, {
            headers: { "Content-Type": "application/json" }
         });
   
         if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setShowLogin(false);  // Hide popup after successful login
         } else {
            alert(response.data.message);
         }
      } catch (error) {
         console.error("Login/Register Error:", error.response?.data || error.message);
         alert(error.response?.data?.message || "Something went wrong!");
      }
   };
   


   return (
      <div className='login-popup'>
         <form onSubmit={onLogin} className="login-popup-container">
            <div className="login-popup-title">
               <h2>{currState}</h2>
               <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
               {currState === 'sign up' ? <input name='name' onChange={onChangehandler} value={data.name} type="text" placeholder='your name' required /> : <></>}
               <input name='email' onChange={onChangehandler} value={data.email} type="email" placeholder='your email' required />
               <input name='password' onChange={onChangehandler} value={data.password} type="password" placeholder='password' required />
            </div>
            <button type ='submit'>{currState === 'sign up' ? "Create account" : "Login"}</button>
            <div className="login-popup-condition">
               <input type="checkbox" required />
               <p>By continuing, i agree to the terms of use & privacy policy</p>
            </div>
            {currState == 'login' ? <p>Create a new account? <span onClick={() => setCurrState('sign up')}>Click here</span></p> :
               <p>Already have an aacount ? <span onClick={() => setCurrState('login')}>Login here</span></p>}
         </form>
      </div>
   )
}

export default LoginPopup;
