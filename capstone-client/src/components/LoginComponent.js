import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Row } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { login , ACCESS_TOKEN} from '../Utils/APIUtils';
import {Redirect} from 'react-router-dom';

const required = (val) => val && val.length;

class Login extends Component {

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
        console.log(loginrequest);
        login(loginrequest)
        .then(response => {
            localStorage.setItem(ACCESS_TOKEN, response.jwt);
            console.log(response.jwt);
            this.props.onLogin(true);
            this.props.onGetHolder();
        })
        .catch( cds => {
            this.setState({
                errorMessage: cds.message
            });
            this.toggleModal();
            console.log(cds);
        });
    }

    componentDidMount() {
        if(this.props.authen == true) {
            this.setState({ redirect: "/home" });
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
                            <h2>Merit Bank</h2>
                            <h3>Login</h3>
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

export default Login;