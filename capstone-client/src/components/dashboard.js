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
    }

    authenCheck() {
        if(this.props.authen == false) {
            this.setState({ redirect: "/home" });
        }
    }

    componentDidMount(){
        console.log(this.props.authen);
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        return(
            <div className="container-fluid mt-5">
                <div className="container-fluid dashboard-banner">
                    <div className="container py-3">
                        <h2 className="secondary-header-text">Welcome back ####</h2>
                    </div>
                </div>
                <div className="container py-2">
                    <Button>User Details</Button><Button>New Transaction</Button>
                </div>
                <div className="container">
                <div>
                   
                </div>
                </div>
            </div>
            
        );
    }
}

export default Dashboard;