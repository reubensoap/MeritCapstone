import React, { Component } from 'react';
import {Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron, 
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Label, Input } from 'reactstrap';
import {NavLink} from 'react-router-dom';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false,
            isModalOpen:false
        }
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.logoutEntirely = this.logoutEntirely.bind(this);
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleLogin(event) {
        this.toggleModal();
        alert("Username: " + this.username.value + " Password: " + this.password.value +
            " Remember: " + this.remember.checked);
        event.preventDefault();
    }

    logoutEntirely(){
        this.props.logout(false);
        this.props.onLogout();
    }

    renderAccessNav() {
        if(this.props.authen == false){
            return(
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink className="nav-link" to="/login">
                            Login
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="nav-link" to="/register">
                            Register
                        </NavLink>
                    </NavItem>
                </Nav>
            );
            
        } else {
            return(
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink className="nav-link" to="/dashboard">
                            Dashboard
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <Button onClick={this.logoutEntirely}>Logout</Button>
                    </NavItem>
                </Nav>
            );
        }
    }

    render() {
        return(
            <React.Fragment>
                <div className="container-fluid fixed-top trans-white">
                    <div className="container">
                        <Navbar light expand="md">
                            <NavbarToggler onClick={this.toggleNav} />
                            <NavbarBrand className="mr-auto" href="/">
                                <h2>Merit Bank</h2>
                            </NavbarBrand>
                            <Collapse isOpen={this.state.isNavOpen} navbar>
                                <Nav navbar>
                                    <NavItem>
                                        <NavLink className="nav-link" to="/home">
                                            Home
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className="nav-link" to="/accounts">
                                            Accounts
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className="nav-link" to="/calculator">
                                            Calculator
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className="nav-link" to="/aboutus">
                                            About us
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                                {this.renderAccessNav()}
                            </Collapse>
                        </Navbar>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Header;