import React from 'react'
import './footer.css'
import { assets } from '../../assets/assets'

const Foooter = () => {
  return (
    <div className='footer' id='footer'>
       <div className="footer-content"> 
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque necessitatibus velit cumque ab eius aliquid? Reiciendis minus ullam voluptate et consequuntur totam non blanditiis fuga sint! Magnam dicta neque quasi.</p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
              <li>Home</li>
              <li>About us</li>
              <li>Delivery</li>
              <li>Privacy policy</li>
            </ul>
        </div>
        <div className="footer-content-left">
             <h2>GET IN TOUCH</h2>
             <ul>
              <li>+1-212-456-7890</li>
              <li>contact@tomato.com</li>
             </ul>
        </div>
       </div>
       <hr />
       <p className="footer-copyright">Copyright 2024 &copy; Tomato.com -All Right Reserved.</p>
    </div>
  )
}

export default Foooter
