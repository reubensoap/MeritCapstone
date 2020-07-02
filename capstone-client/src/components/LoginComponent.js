import React, { Component } from 'react';
import {Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron, 
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Label, Input, Row } from 'reactstrap';
import {NavLink} from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { login , ACCESS_TOKEN} from '../Utils/APIUtils';
import {Redirect} from 'react-router-dom';

const required = (val) => val && val.length;

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            token: [],
            redirect: null
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        console.log(values);
        const loginrequest = Object.assign({}, values);
        console.log(loginrequest);
        login(loginrequest)
        .then(response => {
            localStorage.setItem(ACCESS_TOKEN, response.jwt);
            this.setState({
                token: response.jwt,
                redirect: "/dashboard"
            });
            this.props.onLogin();
            console.log(this.state.token);
        });
        alert("Current State is: " + JSON.stringify(values));
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return(
                <div className="container-fluid mt-5 py-5">
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <div className="container p-5 update-form text-center">
                            <h2>Merit Bank</h2>
                            <h3>Welcome Back</h3>
                            <p>Banking made easy</p>
                            <Row className="form-group">
                                <Control.text model=".username" id="username" name="username"
                                    placeholder="User Name"
                                    className="form-control"
                                    validators = {{
                                        required
                                    }} />
                                <Errors
                                    className="text-danger"
                                    model=".username"
                                    show="touched"
                                    messages = {{
                                        required: 'Required '
                                    }}
                                />
                            </Row>
                            <Row className="form-group">
                                <Control type="password" model=".password" id="password" name="password"
                                    placeholder="Password"
                                    className="form-control"
                                    validators = {{
                                        required
                                    }} />
                                <Errors
                                    className="text-danger"
                                    model=".password"
                                    show="touched"
                                    messages = {{
                                        required: 'Required ',
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

export default Login;