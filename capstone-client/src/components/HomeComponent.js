import React from 'react';
import {Link} from 'react-router-dom';

function RenderUserOptions({obj}){
    if(obj == true){
        return(<Link className="btn btn-important" to="/dashboard">See Accounts</Link>);
    } else {
        return(<Link className="btn btn-important" to="/register">Get Started</Link>);
    }
}

function Home(props) {

    return(
        <div className="container-fluid">
            <div className="container">
                <div className="row py-5">
                    <div className="col col-md-6 pt-5">
                        <h2 className="biggest-header-text pb-3">Banking made awesome</h2>
                        <p className="gray secondary-header-text">Get paid up to 2 days early with direct deposit and grow your savings.<br/> No hidden fees. No surprises.</p>
                        <p className="tiny-text">Learn how we collect and use your information by visiting our Privacy Policy <br />Banking services provided by The Corporation Bank or Pepper Bank, N.A.; Members FDIC </p>
                        <RenderUserOptions obj={props.authen}/>
                    </div>
                    <div className="col col-md-6">
                        <img src="./images/tangible-hero.png" className="img-fluid"/>
                    </div>
                </div>
            </div>
            <div className="row py-5 light-gray">
                <div className="container breaker">
                    <div className="col">
                        <img src="./images/usatoday.png" />
                    </div>
                    <div className="col">
                        <img src="./images/Forbes.png" />
                    </div>
                    <div className="col">
                        <img src="./images/NYT.png" />
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row py-5">
                    <div className="col col-md-6 pt-5">
                        <h3>Overdraw fee-free with SpotMe</h3>
                        <p>We’ll spot you on debit card purchases with no overdraft fees. Eligibility requirements apply.</p>
                    </div>
                    <div className="col col-md-6 smaller-section">
                        <img src="./images/spot-me.png" />
                    </div>
                </div>
                <div className="row py-5">
                    <div className="col col-md-6 smaller-section">
                        <img src="./images/paid-early-2.png" />
                    </div>
                    <div className="col col-md-6 pt-3">
                        <h3>Add Outside Accounts</h3>
                        <p>Keep track of all your other accounts and credit cards in one place.</p>
                    </div>
                </div>
                <div className="row py-5">
                    <div className="col col-md-6 pt-5">
                        <h3>Say Goodbye to hidden fees</h3>
                        <p>No overdraft. No minimum balance. No monthly fees. No foreign transaction fees.</p>
                    </div>
                    <div className="col col-md-6 smaller-section">
                        <img src="./images/no-fees.png" />
                    </div>
                </div>
                <div className="row py-5">
                    <div className="col col-md-6 smaller-section">
                        <img src="./images/alerts.png" />
                    </div>
                    <div className="col col-md-6 pt-5">
                        <h3>Stay in control with alerts</h3>
                        <p>You’re always in-the-know with daily balance notifications and transaction alerts.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;