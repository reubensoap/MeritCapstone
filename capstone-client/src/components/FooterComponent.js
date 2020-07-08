import React from 'react';
import {Link} from 'react-router-dom';

function RenderUserOptions({obj}){
    if(obj == true){
        return(
            <div className="col-3">
                <h5>Client Options</h5>
                <ul className="list-unstyled">
                    <li><Link to="/dashboard">Dashboard</Link></li>
                </ul>
            </div>
        );
    } else {
        return(
            <div className="col-3">
                <h5>User Options</h5>
                <ul className="list-unstyled">
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                </ul>
            </div>
        );
    } 
}

function Footer(props) {
    
    return(
        <div className="footer pt-5 light-gray">
            <div className="container">
                <div className="row footer-row">             
                    <div className="col-3">
                        <h5>Company</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/home">Home</Link></li>
                            <li><Link to="/accounts">Accounts</Link></li>
                            <li><Link to="/calculator">Calculator</Link></li>
                            <li><Link to="/aboutus">About us</Link></li>
                        </ul>
                    </div>
                    <div className="col-3">
                        <h5>Contact Us</h5>
                        <ul className="list-unstyled">
                            <li><a href="#">support@meritbank.com</a></li>
                            <li>972-000-0000</li>
                        </ul>
                    </div>
                    <RenderUserOptions obj={props.authen}/>
                    <div className="col-3 align-self-center">
                        <div className="text-center social-row">
                            <a className="" href="https://github.com/reubensoap/MeritCapstone" target="_blank"><img src="./images/github-icon.png"></img></a>
                            <a  href="#"><img src="./images/facebook-icon.png"></img></a>
                            <a  href="#"><img src="./images/linkedin-icon.png"></img></a>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">             
                    <div className="col-auto">
                        <p>© Copyright 2020 Merit Bank LLC</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;