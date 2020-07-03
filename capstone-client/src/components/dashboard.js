import React, { Component, useState } from 'react';
import { Row, Label, Col, Button, Card ,CardBody, Collapse, CardHeader} from 'reactstrap';
import { getCdOfferings } from '../Utils/APIUtils';
import { OFFERS } from '../Utils/testCDOfferings';
import { LocalForm, Control } from 'react-redux-form';
import { Link, Redirect } from 'react-router-dom';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: null,
        }
        this.authenCheck = this.authenCheck.bind(this);
        this.logoutEntirely = this.logoutEntirely.bind(this);
        this.holderCheck = this.holderCheck.bind(this);

        this.renderHeader = this.renderHeader.bind(this);
        this.renderSavingsTag = this.renderSavingsTag.bind(this);
    }

    authenCheck() {
        if(this.props.authen == false) {
            this.setState({ redirect: "/home" });
        }
    }

    holderCheck() {
        if(this.props.holder == null) {
            this.setState({ redirect: "/createHolder"});
            console.log("need to create accountholder");
        }
    }

    logoutEntirely(){
        this.props.logout(false);
        this.props.onLogout();
    }

    componentDidMount(){
        console.log(this.props.authen);
        this.holderCheck();
        this.authenCheck();
        
    }

    renderHeader() {
        if(this.props.holder == null){
            return 'blank';
        } else {
            return this.props.holder.firstName;
        }
    }

    renderSavingsTag() {
        if(this.props.holder == null){
            return <li><p>Savings Account</p></li>
        } else if(this.props.holder.savings == null){
            return <li><p className="unclickable">Savings Account</p></li>
        } else {
            return <li><a href="#">Savings Account</a></li>
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        return(
            <div className="container-fluid mt-5">
                <div className="container-fluid dashboard-banner">
                    <div className="container py-3">
                        <h2 className="secondary-header-text">Welcome back {this.renderHeader()}!</h2>
                        <Button onClick={this.logoutEntirely}>This</Button>
                    </div>
                </div>
                <div className="container py-3">
                    <Button>User Details</Button><Button>Add Account</Button><Button>New Transaction</Button>
                </div>
                <div className="container client-dash">
                    <div className="side mr-2 p-4">
                        <ul>
                            {this.renderSavingsTag()}
                            <li><p>Checking Accounts</p></li>
                            <li><p>CD Accounts</p></li>
                            <li><p>Roth IRA</p></li>
                        </ul>
                    </div>
                    <div className="content p-4">
                        <div className="content-header p-2 text-white mb-2">
                            <p className="mr-2 tags">Total Accounts: 3</p>
                            <p className="tags">Total Sum: 10,233</p>
                        </div>
                        <div className="inner-content">
                            <div className="inner-side">
                                <ul>
                                    <li><p>Checking 1</p></li>
                                    <li><p>Checking 2</p></li>
                                    <li><p>Checking 3</p></li>
                                    <li><p>Checking 4</p></li>
                                </ul>
                            </div>
                            <div className="inner-content">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        );
    }
}

export default Dashboard;