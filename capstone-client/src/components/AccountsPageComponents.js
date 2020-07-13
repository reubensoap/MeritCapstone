import React from 'react';
import {Link} from 'react-router-dom';


function AccountsPage(props) {

    return(
        <div className="container-fluid">
            <div className="container">
                <div className="row py-5">
                    <div className="col col-md-6 pt-5">
                        <h3 className="biggest-header-text">Merit Bank Checking Account and Visa Debit Card</h3>
                        <p className="gray secondary-header-text">Your Merit Bank Account comes with a debit card, no monthly fees or maintenace fees.</p>
                    </div>
                    <div className="col col-md-6 smaller-section">
                        <img src="./images/spot-me.png" />
                    </div>
                <div className="row py-5">
                    <div className="col col-md-6 smaller-section">
                        <img src="./images/paid-early-2.png" />
                    </div>
                    <div className="col col-md-6 pt-3">
                        <h3>All Accounts In One Place</h3>
                        <p>Your accounts grouped together via one dashboard. Display non Merit Bank accounts on the dashboard as well.</p>
                    </div>
                </div>
                </div>
            </div>
            <div className="row py-3 light-gray">
                <div className="container">
                    <div className="row py-5">
                        <div className="col col-md-6 pt-5">
                            <h3>Say Goodbye to hidden fees</h3>
                            <p>No overdraft. No minimum balance. No monthly fees. No foreign transaction fees.</p>
                        </div>
                        <div className="col col-md-6 smaller-section">
                            <img src="./images/no-fees.png" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row py-5">
                    <div className="col col-md-6 smaller-section">
                        <img src="./images/hero-image-2.png" />
                    </div>
                    <div className="col col-md-6 pt-3 account-list">
                        <h3>Every client has potential access to the following</h3>
                        <ul>
                            <li>Savings Account</li>
                            <li>Checking Account</li>
                            <li>Certificate of Deposit Accounts</li>
                            <li>DB Accounts</li>
                            <li>IRA Accounts</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="container py-5 text-center">
                <h3 className="pb-4">Learn more about our other banking features</h3>
                <div className="row px-5 py-3">
                    <div className="col col-md-6">
                        <p>Get fee-free overdraft with Merit Bank. Eligibility requirements apply.</p>
                    </div>
                    <div className="col col-md-6">
                        <p>Grow your savings, automatically.</p>
                    </div>
                </div>
                <div className="row px-5 py-3">
                    <div className="col col-md-6">
                        <p>Direct deposits arrive up to 2 days early.</p>
                    </div>
                    <div className="col col-md-6">
                        <p>Access cash at 38,000+ fee-free ATMs.</p>
                    </div>
                </div>
                <div className="pt-5">
                    <Link className="btn btn-important" to="/register">Create an Account today</Link>
                </div>
            </div>
        </div>
        
    );
}

export default AccountsPage;