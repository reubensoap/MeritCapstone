import React, { Component, useState } from 'react';
import { Row, Label, Col, Button, Card ,CardBody, Collapse, CardHeader, Modal, ModalHeader, ModalBody} from 'reactstrap';
import { createSavingsAccount, createCheckingAccount, createCDAccount, createDBAccount, createRegIRA, createRollIRA, createRothIRA
    , deleteChecking, deleteCD } from '../Utils/APIUtils';
import { OFFERS } from '../Utils/testCDOfferings';
import { LocalForm, Control, Errors } from 'react-redux-form';
import { Link, Redirect } from 'react-router-dom';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);



class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: null,

            isCheckingOpen: false,
            isSavingsOpen: false,
            isCDOpen: false,
            isCDDeleteOpen: false,
            isdbOpen: false,
            isRegIRAOpen: false,
            isRollIRAOpen: false,
            isRothIRAOpen: false,

            defaultShow: true,
            savingsShow: false,
            checkingShow: false,
            cdShowing: false,
            dbShowing: false,
            regIRAShowing: false,
            rollIRAShowing: false,
            rothIRAShowing: false
        }
        this.authenCheck = this.authenCheck.bind(this);
        this.logoutEntirely = this.logoutEntirely.bind(this);
        this.holderCheck = this.holderCheck.bind(this);
        this.getHolderAgain = this.getHolderAgain.bind(this);

        this.toggleChecking = this.toggleChecking.bind(this);
        this.toggleSavings = this.toggleSavings.bind(this);
        this.toggleCDAccount = this.toggleCDAccount.bind(this);
        this.toggleCDDelete = this.toggleCDDelete.bind(this);
        this.toggleDBAccount = this.toggleDBAccount.bind(this);
        this.toggleRegIRA = this.toggleRegIRA.bind(this);
        this.toggleRollIRA = this.toggleRollIRA.bind(this);
        this.toggleRothIRA = this.toggleRothIRA.bind(this);

        this.renderHeader = this.renderHeader.bind(this);
        this.renderSavingsTag = this.renderSavingsTag.bind(this);
        this.renderCheckingList = this.renderCheckingList.bind(this);
        this.renderSavingsList = this.renderSavingsList.bind(this);
        this.handleToggle = this.handleToggle.bind(this);

        this.handleDeleteChecking = this.handleDeleteChecking.bind(this);
        this.handleDeleteCD = this.handleDeleteCD.bind(this);
    }

    /* Toggle Modals ***************************** */

    toggleChecking() {
        this.setState({
            isCheckingOpen: !this.state.isCheckingOpen
        });
    }

    toggleSavings() {
        this.setState({
            isSavingsOpen: !this.state.isSavingsOpen
        });
    }

    toggleCDAccount() {
        this.setState({
            isCDOpen: !this.state.isCDOpen
        });
    }

    toggleCDDelete() {
        this.setState({
            isCDDeleteOpen: !this.state.isCDDeleteOpen
        });
    }

    toggleDBAccount() {
        this.setState({
            isdbOpen: !this.state.isdbOpen
        });
    }

    toggleRegIRA(){
        this.setState({
            isRegIRAOpen: !this.state.isRegIRAOpen
        });
    }

    toggleRollIRA() {
        this.setState({
            isRollIRAOpen: !this.state.isRollIRAOpen
        });
    }

    toggleRothIRA() {
        this.setState({
            isRothIRAOpen: !this.state.isRothIRAOpen
        });
    }


    /* Redirect Checks **************************** */

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

    getHolderAgain(){
        this.props.onGetHolder(); 
    }

    /* Form Submissions ******************************** */

    handleAddSavings(values) {
        this.toggleSavings();
        console.log(values);
        createSavingsAccount(values)
        .then(response => {
            console.log(response);
        })
        .then(cds => {this.getHolderAgain()});
    }

    handleAddChecking(values) {
        this.toggleChecking();
        console.log(values);
        createCheckingAccount(values)
        .then(response => {
            console.log(response);
        })
        .then(cds => {this.getHolderAgain()});
    }

    handleAddCD(values) {
        this.toggleCDAccount();
        console.log(values);
        createCDAccount(values)
        .then(response => {
            console.log(response);
        })
        .then(cds => {this.getHolderAgain()});
    }

    handleAddDB(values) {
        this.toggleDBAccount();
        console.log(values);
        createDBAccount(values)
        .then(response => {
            console.log(response);
        })
        .then(cds => {this.getHolderAgain()});
    }

    handleAddRegIRA(values) {
        this.toggleRegIRA();
        console.log(values);
        createRegIRA(values)
        .then(response => {
            console.log(response);
        })
        .then(cds => {this.getHolderAgain()});
    }

    handleAddRollIRA(values) {
        this.toggleRollIRA();
        console.log(values);
        createRollIRA(values)
        .then(response => {
            console.log(response);
        })
        .then(cds => {this.getHolderAgain()});
    }

    handleAddRothIRA(values) {
        this.toggleRothIRA();
        console.log(values);
        createRothIRA(values)
        .then(response => {
            console.log(response);
        })
        .then(cds => {this.getHolderAgain()});
    }

    handleDeleteChecking() {
        deleteChecking()
        .then(response => {
            console.log(response);
        })
        .then(cds => {
            this.getHolderAgain();
        });
    }

    handleDeleteCD(value) {
        deleteCD(value.accountNumber)
        .then(response => {
            console.log(response);
        })
        .then(cds => {
            this.getHolderAgain();
        });
    }

    /* Aside Buttons ************************************ */

    handleToggle(e) {
        e.preventDefault();
        this.setState({
            savingsShow: true,
            checkingShow: false,
            cdShowing: false,
            dbShowing: false,
            regIRAShowing: false,
            rollIRAShowing: false,
            rothIRAShowing: false,
            defaultShow: false
        });
    }

    handleToggle2(e) {
        e.preventDefault();
        this.setState({
            savingsShow: false,
            checkingShow: true,
            cdShowing: false,
            dbShowing: false,
            regIRAShowing: false,
            rollIRAShowing: false,
            rothIRAShowing: false,
            defaultShow: false
        });
    }

    handleToggle3(e) {
        e.preventDefault();
        this.setState({
            savingsShow: false,
            checkingShow: false,
            cdShowing: true,
            dbShowing: false,
            regIRAShowing: false,
            rollIRAShowing: false,
            rothIRAShowing: false,
            defaultShow: false
        });
    }

    handleToggle4(e) {
        e.preventDefault();
        this.setState({
            savingsShow: false,
            checkingShow: false,
            cdShowing: false,
            dbShowing: true,
            regIRAShowing: false,
            rollIRAShowing: false,
            rothIRAShowing: false,
            defaultShow: false
        });
    }

    handleToggle5(e) {
        e.preventDefault();
        this.setState({
            savingsShow: false,
            checkingShow: false,
            cdShowing: false,
            dbShowing: false,
            regIRAShowing: true,
            rollIRAShowing: false,
            rothIRAShowing: false,
            defaultShow: false
        });
    }

    handleToggle6(e) {
        e.preventDefault();
        this.setState({
            savingsShow: false,
            checkingShow: false,
            cdShowing: false,
            dbShowing: false,
            regIRAShowing: false,
            rollIRAShowing: true,
            rothIRAShowing: false,
            defaultShow: false
        });
    }

    handleToggle7(e) {
        e.preventDefault();
        this.setState({
            savingsShow: false,
            checkingShow: false,
            cdShowing: false,
            dbShowing: false,
            regIRAShowing: false,
            rollIRAShowing: false,
            rothIRAShowing: true,
            defaultShow: false
        });
    }


    /* Render Dashboard  ******************************* */

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
            return <li><Button className="dash-btn" onClick={this.toggleSavings}>Add Savings Account</Button></li>
        } else {
            return <li><Button className="dash-btn" onClick={(e) => this.handleToggle(e)}>Savings Account</Button></li>
        }
    }

    renderCheckingTag() {
        if(this.props.holder == null){
            return <li><p>Checking Account</p></li>
        } else if(this.props.holder.checking == null){
            return <li><Button className="dash-btn" onClick={this.toggleChecking}>Add Checking Account</Button></li>
        } else {
            return <li><Button className="dash-btn" onClick={(e) => this.handleToggle2(e)}>Checking Account</Button></li>
        }
    }

    renderCDTag() {
        if(this.props.holder == null) {
            return <li><p>CD Account</p></li>
        } else if(this.props.holder.cdAccount == 0){
            return <li><Button className="dash-btn" onClick={this.toggleCDAccount}>Add CD Account</Button></li>
        } else {
            return <li><Button className="dash-btn" onClick={(e) => this.handleToggle3(e)}>CD Accounts</Button></li>
        }
    }

    renderDBTag() {
        if(this.props.holder == null) {
            return <li><p>DB Account</p></li>
        } else if(this.props.holder.dbAccount == 0){
            return <li><Button className="dash-btn" onClick={this.toggleDBAccount}>Add DB Account</Button></li>
        } else {
            return <li><Button className="dash-btn" onClick={(e) => this.handleToggle4(e)}>DB Accounts</Button></li>
        }
    }

    renderRegTag() {
        if(this.props.holder == null) {
            return <li><p>Standard IRA Account</p></li>
        } else if(this.props.holder.regularIRA == null){
            return <li><Button className="dash-btn" onClick={this.toggleRegIRA}>Add Standard IRA Account</Button></li>
        } else {
            return <li><Button className="dash-btn" onClick={(e) => this.handleToggle5(e)}>Standard IRA Account</Button></li>
        }
    }

    renderRollTag() {
        if(this.props.holder == null) {
            return <li><p>Rollover IRA Account</p></li>
        } else if(this.props.holder.rolloverIRA == null){
            return <li><Button className="dash-btn" onClick={this.toggleRollIRA}>Add Rollover IRA Account</Button></li>
        } else {
            return <li><Button className="dash-btn" onClick={(e) => this.handleToggle6(e)}>Rollover IRA Account</Button></li>
        }
    }

    renderRothTag() {
        if(this.props.holder == null) {
            return <li><p>Roth IRA Account</p></li>
        } else if(this.props.holder.rothIRA == null){
            return <li><Button className="dash-btn" onClick={this.toggleRothIRA}>Add Roth IRA Account</Button></li>
        } else {
            return <li><Button className="dash-btn" onClick={(e) => this.handleToggle7(e)}>Roth IRA Account</Button></li>
        }
    }

    renderSavingsList() {
        const {savingsShow} = this.state;
        if(this.props.holder == null){
            return (
                <div id="savingsContent">   
                </div>
            );
        } else {
            if(this.props.holder.savings == null){
                return (
                    <div id="savingsContent">
                    </div>
                );
            } else {
                return (
                    <div id="savingsContent" className={`panel ${savingsShow ? 'showing' : ''}`}>
                        <div className="content-header p-2 text-white mb-2">
                            <p className="mr-2 tags">Savings Account</p>
                        </div>
                        <div className="inner-content">
                            <div className="inner-side">
                                <ul>
                                    <li>Savings Account {this.props.holder.savings.accountNumber}</li>
                                    <li>Balance: {this.props.holder.savings.balance}</li>
                                    <li>Interest Rate: {this.props.holder.savings.interestRate}</li>
                                </ul>
                            </div>
                            <div className="inner-content">

                            </div>
                        </div>
                    </div>
                );
            }
        }
    }

    renderCheckingList() {
        const {checkingShow} = this.state;
        if(this.props.holder == null){
            return <div></div>
        } else {
            if(this.props.holder.checking == null){
                return <div></div>
            } else {
                return (
                    <div className={`panel ${checkingShow ? 'showing' : ''}`}>
                        <div className="content-header p-2 text-white mb-2">
                            <p className="mr-2 tags">Checking Account</p>
                            <Button onClick={this.handleDeleteChecking}>Delete</Button>
                        </div>
                        <div className="inner-content">
                            <div className="inner-side">
                                <ul>
                                    <li>Checking Account {this.props.holder.checking.accountNumber}</li>
                                    <li>Checking Balance {this.props.holder.checking.balance}</li>
                                    <li>Checking Interest Rate {this.props.holder.checking.interestRate}</li>
                                </ul>
                            </div>
                            <div className="inner-content">

                            </div>
                        </div>
                    </div>
                );
            }
        }
    }

    renderRegList() {
        const {regIRAShowing} = this.state;
        if(this.props.holder == null){
            return <div></div>
        } else {
            if(this.props.holder.regularIRA == null){
                return <div></div>
            } else {
                return (
                    <div className={`panel ${regIRAShowing ? 'showing' : ''}`}>
                        <div className="content-header p-2 text-white mb-2">
                            <p className="mr-2 tags">Standard IRA Account</p>
                        </div>
                        <div className="inner-content">
                            <div className="inner-side">
                                <ul>
                                    <li>IRA Account {this.props.holder.regularIRA.accountNumber}</li>
                                    <li>IRA Balance {this.props.holder.regularIRA.balance}</li>
                                    <li>IRA Interest Rate {this.props.holder.regularIRA.interestRate}</li>
                                </ul>
                            </div>
                            <div className="inner-content">

                            </div>
                        </div>
                    </div>
                );
            }
        }
    }

    renderRollList() {
        const {rollIRAShowing} = this.state;
        if(this.props.holder == null){
            return <div></div>
        } else {
            if(this.props.holder.rolloverIRA == null){
                return <div></div>
            } else {
                return (
                    <div className={`panel ${rollIRAShowing ? 'showing' : ''}`}>
                        <div className="content-header p-2 text-white mb-2">
                            <p className="mr-2 tags">Rollover IRA Account</p>
                        </div>
                        <div className="inner-content">
                            <div className="inner-side">
                                <ul>
                                    <li>Rollover IRA Account {this.props.holder.rolloverIRA.accountNumber}</li>
                                    <li>Rollover IRA Balance {this.props.holder.rolloverIRA.balance}</li>
                                    <li>Rollover IRA Interest Rate {this.props.holder.rolloverIRA.interestRate}</li>
                                </ul>
                            </div>
                            <div className="inner-content">

                            </div>
                        </div>
                    </div>
                );
            }
        }
    }

    renderRothList() {
        const {rothIRAShowing} = this.state;
        if(this.props.holder == null){
            return <div></div>
        } else {
            if(this.props.holder.rothIRA == null){
                return <div></div>
            } else {
                return (
                    <div className={`panel ${rothIRAShowing ? 'showing' : ''}`}>
                        <div className="content-header p-2 text-white mb-2">
                            <p className="mr-2 tags">Roth IRA Account</p>
                        </div>
                        <div className="inner-content">
                            <div className="inner-side">
                                <ul>
                                    <li>Roth IRA Account {this.props.holder.rothIRA.accountNumber}</li>
                                    <li>Roth IRA Balance {this.props.holder.rothIRA.balance}</li>
                                    <li>Roth IRA Interest Rate {this.props.holder.rothIRA.interestRate}</li>
                                </ul>
                            </div>
                            <div className="inner-content">

                            </div>
                        </div>
                    </div>
                );
            }
        }
    }

    renderDefault() {
        const {defaultShow} = this.state;
        if(this.props.holder == null){
            return <div></div>
        } else {
            return (
                <div className={`panel ${defaultShow ? 'showing' : ''}`}>
                    <div className="container default-box">
                        <h3>Click on an account to see details</h3>
                    </div>
                </div>
            );
        }
    }

    renderCDListItems() {
        const cdList = this.props.holder.cdAccount.map((cdaccount) => {
            return(
                <li>
                    <p>account balance {cdaccount.balance}</p>
                </li>
            );
        })

        return cdList;
    }

    renderCDList() {
        const {cdShowing} = this.state;
        if(this.props.holder == null){
            return <div></div>
        } else {
            if(this.props.holder.cdAccount.length == 0){
                return <div></div>
            } else {
                return (
                    <div className={`panel ${cdShowing ? 'showing' : ''}`}>
                        <div className="content-header p-2 text-white mb-2">
                            <p className="mr-2 tags">CD Accounts</p>
                            <Button onClick={this.toggleCDDelete}>Delete</Button>
                        </div>
                        <div className="inner-content">
                            <div className="inner-side">
                                <ul>
                                    {this.renderCDListItems()}
                                </ul>
                                <Button onClick={this.toggleCDAccount}>Add CD Account</Button>
                            </div>
                            <div className="inner-content">

                            </div>
                        </div>
                    </div>
                );
            }
        }
    }

    renderDBListItems() {
        const dbList = this.props.holder.dbAccount.map((dbaccount) => {
            return(
                <li>
                    <p>account balance {dbaccount.balance}</p>
                </li>
            );
        })

        return dbList;
    }

    renderDBList() {
        const {dbShowing} = this.state;
        if(this.props.holder == null){
            return <div></div>
        } else {
            if(this.props.holder.dbAccount.length == 0){
                return <div></div>
            } else {
                return (
                    <div className={`panel ${dbShowing ? 'showing' : ''}`}>
                        <div className="content-header p-2 text-white mb-2">
                            <p className="mr-2 tags">DB Accounts</p>
                        </div>
                        <div className="inner-content">
                            <div className="inner-side">
                                <ul>
                                    {this.renderDBListItems()}
                                </ul>
                                <Button onClick={this.toggleDBAccount}>Add DB Account</Button>
                            </div>
                            <div className="inner-content">

                            </div>
                        </div>
                    </div>
                );
            }
        }
    }

    renderCDAccountOptions() {
        if(this.props.holder == null) {
            return <option>1</option>
        }
        const cdList = this.props.holder.cdAccount.map((cdaccount) => {
            return(
                <option>{cdaccount.accountNumber}</option>
            );
        })

        return cdList;
    }

    /* Final Render **************************************** */

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        return(
            <div className="container-fluid mt-5">
                <div className="container-fluid dashboard-banner">
                    <div className="container py-3">
                        <h2 className="secondary-header-text">Welcome back {this.renderHeader()}!</h2>
                    </div>
                </div>
                <div className="container py-3">
                    <Button>New Transaction</Button>
                </div>
                <div className="container client-dash">
                    <div className="side mr-2 p-4">
                        <ul>
                            {this.renderSavingsTag()}
                            {this.renderCheckingTag()}
                            {this.renderCDTag()}
                            {this.renderDBTag()}
                            {this.renderRegTag()}
                            {this.renderRollTag()}
                            {this.renderRothTag()}
                        </ul>
                    </div>
                    <div className="content p-4">
                        {this.renderSavingsList()}
                        {this.renderCheckingList()}
                        {this.renderCDList()}
                        {this.renderDBList()}
                        {this.renderRegList()}
                        {this.renderRollList()}
                        {this.renderRothList()}
                        {this.renderDefault()}
                    </div>
                </div>


                <Modal isOpen={this.state.isCheckingOpen} toggle={this.toggleChecking}>
                    <ModalHeader>Add Checking</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleAddChecking(values)}>
                            <Row className="form-group">
                               <Label htmlFor="balance" md={2}>Balance</Label>
                                <Control.text model=".balance" type="text" id="balance" name="balance"
                                    placeholder="00.00" 
                                    className="form-control mx-3" 
                                    validators={{
                                        required
                                    }}
                                        />
                                <Errors 
                                    className="text-danger mx-3"
                                    model=".balance"
                                    show="touched"
                                     messages={{
                                        required: 'Required',
                                    }}
                                />
                            </Row>
                            <Row className="form-group">
                               <Label htmlFor="interestRate" md={2}>Interest Rate</Label>
                                <Control.text model=".interestRate" type="text" id="interestRate" name="interestRate"
                                    placeholder="0.01" 
                                    className="form-control mx-3" 
                                    validators={{
                                        required
                                    }}
                                        />
                                <Errors 
                                    className="text-danger mx-3"
                                    model=".interestRate"
                                    show="touched"
                                     messages={{
                                        required: 'Required',
                                    }}
                                />
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10, offset:0}}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.isSavingsOpen} toggle={this.toggleSavings}>
                    <ModalHeader>Add Savings</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleAddSavings(values)}>
                            <Row className="form-group">
                               <Label htmlFor="balance" md={2}>Balance</Label>
                                <Control.text model=".balance" type="text" id="balance" name="balance"
                                    placeholder="00.00" 
                                    className="form-control mx-3" 
                                    validators={{
                                        required
                                    }}
                                        />
                                <Errors 
                                    className="text-danger mx-3"
                                    model=".balance"
                                    show="touched"
                                     messages={{
                                        required: 'Required',
                                    }}
                                />
                            </Row>
                            <Row className="form-group">
                               <Label htmlFor="interestRate" md={2}>Interest Rate</Label>
                                <Control.text model=".interestRate" type="text" id="interestRate" name="interestRate"
                                    placeholder="0.01" 
                                    className="form-control mx-3" 
                                    validators={{
                                        required
                                    }}
                                        />
                                <Errors 
                                    className="text-danger mx-3"
                                    model=".interestRate"
                                    show="touched"
                                     messages={{
                                        required: 'Required',
                                    }}
                                />
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10, offset:0}}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.isCDOpen} toggle={this.toggleCDAccount}>
                    <ModalHeader>Add CD Account</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleAddCD(values)}>
                            <Row className="form-group">
                               <Label htmlFor="balance" md={2}>Balance</Label>
                                <Control.text model=".balance" type="text" id="balance" name="balance"
                                    placeholder="00.00" 
                                    className="form-control mx-3" 
                                    validators={{
                                        required
                                    }}
                                        />
                                <Errors 
                                    className="text-danger mx-3"
                                    model=".balance"
                                    show="touched"
                                     messages={{
                                        required: 'Required',
                                    }}
                                />
                            </Row>
                            <Row className="form-group">
                               <Label htmlFor="interestRate" md={2}>Interest Rate</Label>
                                <Control.text model=".interestRate" type="text" id="interestRate" name="interestRate"
                                    placeholder="0.01" 
                                    className="form-control mx-3" 
                                    validators={{
                                        required
                                    }}
                                        />
                                <Errors 
                                    className="text-danger mx-3"
                                    model=".interestRate"
                                    show="touched"
                                     messages={{
                                        required: 'Required',
                                    }}
                                />
                            </Row>
                            <Row className="form-group">
                               <Label htmlFor="term" md={2}>Term</Label>
                                <Control.text model=".term" type="text" id="term" name="term"
                                    placeholder="4" 
                                    className="form-control mx-3" 
                                    validators={{
                                        required
                                    }}
                                        />
                                <Errors 
                                    className="text-danger mx-3"
                                    model=".term"
                                    show="touched"
                                     messages={{
                                        required: 'Required',
                                    }}
                                />
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10, offset:0}}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.isdbOpen} toggle={this.toggleDBAccount}>
                    <ModalHeader>Add DB Account</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleAddDB(values)}>
                            <Row className="form-group">
                               <Label htmlFor="balance" md={2}>Balance</Label>
                                <Control.text model=".balance" type="text" id="balance" name="balance"
                                    placeholder="00.00" 
                                    className="form-control mx-3" 
                                    validators={{
                                        required
                                    }}
                                        />
                                <Errors 
                                    className="text-danger mx-3"
                                    model=".balance"
                                    show="touched"
                                     messages={{
                                        required: 'Required',
                                    }}
                                />
                            </Row>
                            <Row className="form-group">
                               <Label htmlFor="interestRate" md={2}>Interest Rate</Label>
                                <Control.text model=".interestRate" type="text" id="interestRate" name="interestRate"
                                    placeholder="0.01" 
                                    className="form-control mx-3" 
                                    validators={{
                                        required
                                    }}
                                        />
                                <Errors 
                                    className="text-danger mx-3"
                                    model=".interestRate"
                                    show="touched"
                                     messages={{
                                        required: 'Required',
                                    }}
                                />
                            </Row>
                            <Row className="form-group">
                               <Label htmlFor="companyName" md={2}>Company Name</Label>
                                <Control.text model=".companyName" type="text" id="companyName" name="companyName"
                                    placeholder="0.01" 
                                    className="form-control mx-3" 
                                    validators={{
                                        required
                                    }}
                                        />
                                <Errors 
                                    className="text-danger mx-3"
                                    model=".companyName"
                                    show="touched"
                                     messages={{
                                        required: 'Required',
                                    }}
                                />
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10, offset:0}}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.isRegIRAOpen} toggle={this.toggleRegIRA}>
                    <ModalHeader>Add Standard IRA Account</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleAddRegIRA(values)}>
                            <Row className="form-group">
                               <Label htmlFor="balance" md={2}>Balance</Label>
                                <Control.text model=".balance" type="text" id="balance" name="balance"
                                    placeholder="00.00" 
                                    className="form-control mx-3" 
                                    validators={{
                                        required
                                    }}
                                        />
                                <Errors 
                                    className="text-danger mx-3"
                                    model=".balance"
                                    show="touched"
                                     messages={{
                                        required: 'Required',
                                    }}
                                />
                            </Row>
                            <Row className="form-group">
                               <Label htmlFor="interestRate" md={2}>Interest Rate</Label>
                                <Control.text model=".interestRate" type="text" id="interestRate" name="interestRate"
                                    placeholder="0.01" 
                                    className="form-control mx-3" 
                                    validators={{
                                        required
                                    }}
                                        />
                                <Errors 
                                    className="text-danger mx-3"
                                    model=".interestRate"
                                    show="touched"
                                     messages={{
                                        required: 'Required',
                                    }}
                                />
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10, offset:0}}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.isRollIRAOpen} toggle={this.toggleRollIRA}>
                    <ModalHeader>Add Rollover IRA Account</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleAddRollIRA(values)}>
                            <Row className="form-group">
                               <Label htmlFor="balance" md={2}>Balance</Label>
                                <Control.text model=".balance" type="text" id="balance" name="balance"
                                    placeholder="00.00" 
                                    className="form-control mx-3" 
                                    validators={{
                                        required
                                    }}
                                        />
                                <Errors 
                                    className="text-danger mx-3"
                                    model=".balance"
                                    show="touched"
                                     messages={{
                                        required: 'Required',
                                    }}
                                />
                            </Row>
                            <Row className="form-group">
                               <Label htmlFor="interestRate" md={2}>Interest Rate</Label>
                                <Control.text model=".interestRate" type="text" id="interestRate" name="interestRate"
                                    placeholder="0.01" 
                                    className="form-control mx-3" 
                                    validators={{
                                        required
                                    }}
                                        />
                                <Errors 
                                    className="text-danger mx-3"
                                    model=".interestRate"
                                    show="touched"
                                     messages={{
                                        required: 'Required',
                                    }}
                                />
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10, offset:0}}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.isRothIRAOpen} toggle={this.toggleRothIRA}>
                    <ModalHeader>Add Roth IRA Account</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleAddRothIRA(values)}>
                            <Row className="form-group">
                               <Label htmlFor="balance" md={2}>Balance</Label>
                                <Control.text model=".balance" type="text" id="balance" name="balance"
                                    placeholder="00.00" 
                                    className="form-control mx-3" 
                                    validators={{
                                        required
                                    }}
                                        />
                                <Errors 
                                    className="text-danger mx-3"
                                    model=".balance"
                                    show="touched"
                                     messages={{
                                        required: 'Required',
                                    }}
                                />
                            </Row>
                            <Row className="form-group">
                               <Label htmlFor="interestRate" md={2}>Interest Rate</Label>
                                <Control.text model=".interestRate" type="text" id="interestRate" name="interestRate"
                                    placeholder="0.01" 
                                    className="form-control mx-3" 
                                    validators={{
                                        required
                                    }}
                                        />
                                <Errors 
                                    className="text-danger mx-3"
                                    model=".interestRate"
                                    show="touched"
                                     messages={{
                                        required: 'Required',
                                    }}
                                />
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10, offset:0}}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.isCDDeleteOpen} toggle={this.toggleCDDelete}>
                    <ModalHeader>Delete CD Account</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(value) => this.handleDeleteCD(value)}>
                            <Row className="form-group">
                            <Label htmlFor="accountNumber" md={2}>Rating</Label>
                                <Control.select model=".accountNumber" name="accountNumber" 
                                    className="form-control mx-3" >
                                    {this.renderCDAccountOptions()}
                                </Control.select>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10, offset:0}}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
            
        );
    }
}


export default Dashboard;