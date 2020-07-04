import React, { Component } from 'react';
import {Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron, 
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Label, Input, Row } from 'reactstrap';
import {NavLink} from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { createAccountHolder } from '../Utils/APIUtils';
import {Redirect} from 'react-router-dom';

const required = (val) => val && val.length;

class CreateHolder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: null
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        console.log(values);
        createAccountHolder(values)
        .then(response => {
            this.props.onGetHolder();
        })
        .catch(console.log("unable to create account"));
    }

    componentDidMount() {
        if(this.props.holder !== null) {
            this.setState({ redirect: "/dashboard" });
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
          }
        return(
                <div className="container-fluid mt-5 py-5">
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <div className="container p-5 update-form text-center">
                            <h2>Finish Creating Your Account</h2>
                            <p>All information is confidential</p>
                            <Row className="form-group">
                                <Control.text model=".firstName" id="firstName" name="firstName"
                                    placeholder="First Name"
                                    className="form-control"
                                    validators = {{
                                        required
                                    }} />
                                <Errors
                                    className="text-danger"
                                    model=".firstName"
                                    show="touched"
                                    messages = {{
                                        required: 'Required '
                                    }}
                                />
                            </Row>
                            <Row className="form-group">
                                <Control.text model=".middleName" id="middleName" name="middleName"
                                    placeholder="Middle Name"
                                    className="form-control"/>
                            </Row>
                            <Row className="form-group">
                                <Control.text model=".lastName" id="lastName" name="lastName"
                                    placeholder="Last Name"
                                    className="form-control"
                                    validators = {{
                                        required
                                    }} />
                                <Errors
                                    className="text-danger"
                                    model=".lastName"
                                    show="touched"
                                    messages = {{
                                        required: 'Required '
                                    }}
                                />
                            </Row>
                            <Row className="form-group">
                                <Control.text model=".ssn" id="ssn" name="ssn"
                                    placeholder="SSN#"
                                    className="form-control"
                                    validators = {{
                                        required
                                    }} />
                                <Errors
                                    className="text-danger"
                                    model=".ssn"
                                    show="touched"
                                    messages = {{
                                        required: 'Required '
                                    }}
                                />
                            </Row>
                            <Row className="form-group">
                                <Button type="submit" color="primary">
                                    Submit
                                </Button>
                            </Row>
                        </div>
                    </LocalForm>
                </div>
        );
    }
}

export default CreateHolder;