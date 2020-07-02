import React, { Component } from 'react';
import { Row, Label, Col, Button } from 'reactstrap';
import { getCdOfferings } from '../Utils/APIUtils';
import { OFFERS } from '../Utils/testCDOfferings';
import { LocalForm, Control } from 'react-redux-form';
import { Link } from 'react-router-dom';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: null,
            user: null
        }
        
    }

    grabUser(){
        
    }

    componentDidMount(){

    }

    render() {

        return(
            <div className="container-fluid mt-5">
                
            </div>
            
        );
    }
}

export default Dashboard;