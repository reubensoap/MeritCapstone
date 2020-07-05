import React, { Component } from 'react';
import {Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron, 
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Label, Input, Row } from 'reactstrap';
import {NavLink} from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import {signup} from '../Utils/APIUtils';
import {Redirect} from 'react-router-dom';

const required = (val) => val && val.length;
const minLength = (len) => (val) => (val) && (val.length >= len);
const passConfirm = (valu) => (val) => (val) && (val === valu);

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: null,
            errorMessage: "",
            isModalOpen: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        console.log(values);
        const loginrequest = Object.assign({}, values);
        signup(loginrequest)
        .then(response => {
            this.setState({ redirect: "/login" });
            console.log(response);
            alert("Logins Below: \n\nUserName: " + values.userName + " Password: " + values.password + "\n\nPlease keep logins safe")
        })
        .catch(cds => {
            this.setState({
                errorMessage: cds.message
            });
            this.toggleModal();
            console.log(cds.message);
        });
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
                            <h3>Hello there!</h3>
                            <p>You're on your way to better banking.</p>
                            <Row className="form-group">
                                <Control.text model=".userName" id="userName" name="userName"
                                    placeholder="User Name"
                                    className="form-control"
                                    validators = {{
                                        required, minLength: minLength(6)
                                    }} />
                                <Errors
                                    className="text-danger"
                                    model=".userName"
                                    show="touched"
                                    messages = {{
                                        required: 'Required ',
                                        minLength: 'Must be 6 characters or more'
                                    }}
                                />
                            </Row>
                            <Row className="form-group">
                                <Control type="password" model=".password" id="password" name="password"
                                    placeholder="Password"
                                    className="form-control"
                                    validators = {{
                                        required, minLength: minLength(8)
                                    }} />
                                <Errors
                                    className="text-danger"
                                    model=".password"
                                    show="touched"
                                    messages = {{
                                        required: 'Required ',
                                        minLength: 'Must be 8 characters or more'
                                    }}
                                />
                            </Row>
                            <Row className="form-group">
                                <Button className="dash-btn" type="submit" color="primary">
                                    Submit
                                </Button>
                            </Row>
                        </div>
                    </LocalForm>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader className="modal-head">Something went wrong</ModalHeader>
                        <ModalBody>
                            <LocalForm>
                                <div className="modal-row">
                                    <p>{this.state.errorMessage}</p>
                                </div>
                                <div className="modal-row">
                                    <Button onClick={this.toggleModal}>Try again</Button>
                                </div>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </div>
        );
    }
}

export default Register;