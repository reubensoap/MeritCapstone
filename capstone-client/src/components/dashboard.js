import React, { Component, useState } from 'react';
import { Row, Label, Col, Button, Card ,CardBody, Collapse, CardHeader, Modal, ModalHeader, ModalBody} from 'reactstrap';
import { createSavingsAccount, createCheckingAccount, createCDAccount, createDBAccount, createRegIRA, createRollIRA, createRothIRA
    , deleteChecking, deleteCD, deleteDB, deleteReg, deleteRoll, deleteRoth, deposit, withdraw, transfer, deleteAccount, ACCESS_TOKEN } from '../Utils/APIUtils';
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
            accountToDelete: "",
            accountToDeposit: "",
            transactionType: "",
            transferFrom: "",

            isCheckingOpen: false,
            isSavingsOpen: false,
            isCDOpen: false,
            isCDDeleteOpen: false,
            isdbOpen: false,
            isDBDeleteOpen: false,
            isRegIRAOpen: false,
            isRollIRAOpen: false,
            isRothIRAOpen: false,
            isDeleteAccountOpen: false,
            isTransactionAccountOpen: false,
            isTransactionAccountOpen2: false,
            isTransactionAccountOpen3: false,
            isTransactionAccountOpen4: false,
            isClientViewOpen: false,
            isClientSlideOpen: false,

            defaultShow: true,
            savingsShow: false,
            checkingShow: false,
            cdShowing: false,
            dbShowing: false,
            regIRAShowing: false,
            rollIRAShowing: false,
            rothIRAShowing: false,
        }
        this.authenCheck = this.authenCheck.bind(this);
        this.logoutEntirely = this.logoutEntirely.bind(this);
        this.holderCheck = this.holderCheck.bind(this);
        this.getHolderAgain = this.getHolderAgain.bind(this);

        this.toggleChecking = this.toggleChecking.bind(this);
        this.toggleClientDelete = this.toggleClientDelete.bind(this);
        this.toggleSavings = this.toggleSavings.bind(this);
        this.toggleCDAccount = this.toggleCDAccount.bind(this);
        this.toggleCDDelete = this.toggleCDDelete.bind(this);
        this.toggleDBAccount = this.toggleDBAccount.bind(this);
        this.toggleDBDelete = this.toggleDBDelete.bind(this);
        this.toggleRegIRA = this.toggleRegIRA.bind(this);
        this.toggleRollIRA = this.toggleRollIRA.bind(this);
        this.toggleRothIRA = this.toggleRothIRA.bind(this);
        this.toggleDeleteAccount = this.toggleDeleteAccount.bind(this);
        this.toggleDeleteAccount2 = this.toggleDeleteAccount2.bind(this);
        this.toggleDeleteAccount3 = this.toggleDeleteAccount3.bind(this);
        this.toggleDeleteAccount4 = this.toggleDeleteAccount4.bind(this);
        this.toggleDepositSavings = this.toggleDepositSavings.bind(this);
        this.toggleDepositChecking = this.toggleDepositChecking.bind(this);
        this.toggleDepositReg = this.toggleDepositReg.bind(this);
        this.toggleDepositRoll = this.toggleDepositRoll.bind(this);
        this.toggleDepositRoth = this.toggleDepositRoth.bind(this);
        this.toggleWithdrawSavings = this.toggleWithdrawSavings.bind(this);
        this.toggleWithdrawChecking = this.toggleWithdrawChecking.bind(this);
        this.toggleWithdrawReg = this.toggleWithdrawReg.bind(this);
        this.toggleWithdrawRoll = this.toggleWithdrawRoll.bind(this);
        this.toggleWithdrawRoth = this.toggleWithdrawRoth.bind(this);
        this.toggleDepositDB = this.toggleDepositDB.bind(this);
        this.toggleWithdrawDB = this.toggleWithdrawDB.bind(this);
        this.toggleTransferSavings = this.toggleTransferSavings.bind(this);
        this.toggleTransferChecking = this.toggleTransferChecking.bind(this);
        this.toggleTransferDB = this.toggleTransferDB.bind(this);
        this.toggleTransferReg = this.toggleTransferReg.bind(this);
        this.toggleTransferRoll = this.toggleTransferRoll.bind(this);
        this.toggleTransferRoth = this.toggleTransferRoth.bind(this);
        this.toggleTransaction = this.toggleTransaction.bind(this);
        this.toggleTransaction2 = this.toggleTransaction2.bind(this);
        this.toggleTransaction3 = this.toggleTransaction3.bind(this);
        this.toggleTransaction4 = this.toggleTransaction4.bind(this);

        this.renderHeader = this.renderHeader.bind(this);
        this.renderSavingsTag = this.renderSavingsTag.bind(this);
        this.renderCheckingList = this.renderCheckingList.bind(this);
        this.renderSavingsList = this.renderSavingsList.bind(this);
        this.handleToggle = this.handleToggle.bind(this);

        this.handleDeleteChecking = this.handleDeleteChecking.bind(this);
        this.handleDeleteReg = this.handleDeleteReg.bind(this);
        this.handleDeleteRoll = this.handleDeleteRoll.bind(this);
        this.handleDeleteRoth = this.handleDeleteRoth.bind(this);
        this.handleDeleteCD = this.handleDeleteCD.bind(this);
        this.handleDeleteAccount = this.handleDeleteAccount.bind(this);
        this.handleDeposit = this.handleDeposit.bind(this);
        this.handleWithdraw = this.handleWithdraw.bind(this);
        this.handleTransfer = this.handleTransfer.bind(this);
        this.handleDepositFilter = this.handleDepositFilter.bind(this);
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

    /* Deletion Toggles */

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

    toggleDBDelete() {
        this.setState({
            isDBDeleteOpen: !this.state.isDBDeleteOpen
        });
    }

    toggleDeleteAccount() {
        this.setState({
            isDeleteAccountOpen: !this.state.isDeleteAccountOpen,
            accountToDelete: "checking"
        });
    }

    toggleDeleteAccount2() {
        this.setState({
            isDeleteAccountOpen: !this.state.isDeleteAccountOpen,
            accountToDelete: "reg"
        });
    }

    toggleDeleteAccount3() {
        this.setState({
            isDeleteAccountOpen: !this.state.isDeleteAccountOpen,
            accountToDelete: "roth"
        });
    }

    toggleDeleteAccount4() {
        this.setState({
            isDeleteAccountOpen: !this.state.isDeleteAccountOpen,
            accountToDelete: "roll"
        });
    }

    toggleClientDelete(){
        this.setState({
            isClientViewOpen: !this.state.isClientViewOpen,
            accountToDelete: this.props.holder.id
        });
    }

    /* Transaction Toggles */

    toggleTransaction() {
        this.setState({
            isTransactionAccountOpen: !this.state.isTransactionAccountOpen
        });
    }

    toggleTransaction2() {
        this.setState({
            isTransactionAccountOpen2: !this.state.isTransactionAccountOpen2
        });
    }

    toggleTransaction3() {
        this.setState({
            isTransactionAccountOpen3: !this.state.isTransactionAccountOpen3
        });
    }

    toggleTransaction4() {
        this.setState({
            isTransactionAccountOpen4: !this.state.isTransactionAccountOpen4
        });
    }

    toggleDepositSavings() {
        this.setState({
            isTransactionAccountOpen: !this.state.isTransactionAccountOpen,
            accountToDeposit: "savings",
            transactionType: "deposit"
        });
    }

    toggleDepositChecking() {
        this.setState({
            isTransactionAccountOpen: !this.state.isTransactionAccountOpen,
            accountToDeposit: "checking",
            transactionType: "deposit"
        });
    }

    toggleDepositDB() {
        this.setState({
            isTransactionAccountOpen2: !this.state.isTransactionAccountOpen2,
            accountToDeposit: "db",
            transactionType: "deposit"
        });
    }

    toggleDepositReg() {
        this.setState({
            isTransactionAccountOpen: !this.state.isTransactionAccountOpen,
            accountToDeposit: "reg",
            transactionType: "deposit"
        });
    }

    toggleDepositRoll() {
        this.setState({
            isTransactionAccountOpen: !this.state.isTransactionAccountOpen,
            accountToDeposit: "roll",
            transactionType: "deposit"
        });
    }

    toggleDepositRoth() {
        this.setState({
            isTransactionAccountOpen: !this.state.isTransactionAccountOpen,
            accountToDeposit: "roth",
            transactionType: "deposit"
        });
    }

    toggleWithdrawSavings(){
        this.setState({
            isTransactionAccountOpen: !this.state.isTransactionAccountOpen,
            accountToDeposit: "savings",
            transactionType: "withdraw"
        });
    }

    toggleWithdrawChecking(){
        this.setState({
            isTransactionAccountOpen: !this.state.isTransactionAccountOpen,
            accountToDeposit: "checking",
            transactionType: "withdraw"
        });
    }

    toggleWithdrawDB(){
        this.setState({
            isTransactionAccountOpen2: !this.state.isTransactionAccountOpen2,
            accountToDeposit: "db",
            transactionType: "withdraw"
        });
    }

    toggleWithdrawReg(){
        this.setState({
            isTransactionAccountOpen: !this.state.isTransactionAccountOpen,
            accountToDeposit: "reg",
            transactionType: "withdraw"
        });
    }

    toggleWithdrawRoll(){
        this.setState({
            isTransactionAccountOpen: !this.state.isTransactionAccountOpen,
            accountToDeposit: "roll",
            transactionType: "withdraw"
        });
    }

    toggleWithdrawRoth(){
        this.setState({
            isTransactionAccountOpen: !this.state.isTransactionAccountOpen,
            accountToDeposit: "roth",
            transactionType: "withdraw"
        });
    }

    toggleTransferSavings(){
        this.setState({
            isTransactionAccountOpen3: !this.state.isTransactionAccountOpen3,
            transferFrom: "savings",
            transactionType: "transfer"
        });
    }

    toggleTransferChecking(){
        this.setState({
            isTransactionAccountOpen3: !this.state.isTransactionAccountOpen3,
            transferFrom: "checking",
            transactionType: "transfer"
        });
    }

    toggleTransferReg(){
        this.setState({
            isTransactionAccountOpen3: !this.state.isTransactionAccountOpen3,
            transferFrom: "reg",
            transactionType: "transfer"
        });
    }

    toggleTransferRoll(){
        this.setState({
            isTransactionAccountOpen3: !this.state.isTransactionAccountOpen3,
            transferFrom: "roll",
            transactionType: "transfer"
        });
    }

    toggleTransferRoth(){
        this.setState({
            isTransactionAccountOpen3: !this.state.isTransactionAccountOpen3,
            transferFrom: "roth",
            transactionType: "transfer"
        });
    }

    toggleTransferDB(){
        this.setState({
            isTransactionAccountOpen4: !this.state.isTransactionAccountOpen4,
            transferFrom: "db",
            transactionType: "transfer"
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
        var interestCD = 0;
        var termCD = 0;
        for(var x = 0; x < this.props.offers.length; x++){
            if(Number(values.offer) == x){
                interestCD = this.props.offers[x].interestRate;
                termCD = this.props.offers[x].term;
            }
        }
        var obj = '{"balance":' + values.balance + ',"interestRate":' + interestCD + ',"term":' + termCD + '}';
        console.log(obj);
        var fObj = JSON.parse(obj);
        createCDAccount(fObj)
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
        console.log(value);
        deleteCD(value.accountNumber)
        .then(response => {
            console.log(response);
        })
        .then(cds => {
            this.getHolderAgain();
        })
        .catch(cds => {
            console.log(cds);
        });
    }

    handleDeleteDB(value) {
        deleteDB(value.accountNumber)
        .then(response => {
            console.log(response);
        })
        .then(cds => {
            this.getHolderAgain();
        });
    }

    handleDeleteReg(){
        deleteReg()
        .then(response => {
            console.log(response);
        })
        .then(cds => {
            this.getHolderAgain();
        });
    }

    handleDeleteRoll(){
        deleteRoll()
        .then(response => {
            console.log(response);
        })
        .then(cds => {
            this.getHolderAgain();
        });
    }

    handleDeleteRoth() {
        deleteRoth()
        .then(response => {
            console.log(response);
        })
        .then(cds => {
            this.getHolderAgain();
        });
    }

    handleDeleteAccount(value) {
        if(value == "checking"){
            this.handleDeleteChecking();
        }
        if(value == "reg"){
            this.handleDeleteReg();
        }
        if(value == "roth"){
            this.handleDeleteRoth();
        }
        if(value == "roll"){
            this.handleDeleteRoll();
        }
        console.log(this.state.accountToDelete);
    }

    handleClientDelete(value) {
        console.log("deleted");
        this.props.logout(false);
        deleteAccount(value);
        localStorage.removeItem(ACCESS_TOKEN);
    }

    handleDeposit(values) {
        deposit(values)
        .then(response => {
            this.props.updateHolder(response);
        });
        
    }

    handleWithdraw(values) {
        withdraw(values)
        .then(response => {
            this.props.updateHolder(response);
        });
    }

    handleTransfer(values) {
        transfer(values)
        .then(response => {
            this.props.updateHolder(response);
        });
    }

    handleDepositFilter(values){
        var obj = ""
        var endToggler = false;
        if(this.state.accountToDeposit == "savings"){
            var obj = '{"type":' + '"' + this.state.transactionType + '"' + ',"amount":' + values.amount + ',"to":' + this.props.holder.savings.accountNumber + '}';
        }
        if(this.state.accountToDeposit == "checking"){
            var obj = '{"type":' + '"' + this.state.transactionType + '"' + ',"amount":' + values.amount + ',"to":' + this.props.holder.checking.accountNumber + '}';
        }
        if(this.state.accountToDeposit == "reg"){
            var obj = '{"type":' + '"' + this.state.transactionType + '"' + ',"amount":' + values.amount + ',"to":' + this.props.holder.regularIRA.accountNumber + '}';
        }
        if(this.state.accountToDeposit == "roll"){
            var obj = '{"type":' + '"' + this.state.transactionType + '"' + ',"amount":' + values.amount + ',"to":' + this.props.holder.rolloverIRA.accountNumber + '}';
        }
        if(this.state.accountToDeposit == "roth"){
            var obj = '{"type":' + '"' + this.state.transactionType + '"' + ',"amount":' + values.amount + ',"to":' + this.props.holder.rothIRA.accountNumber + '}';
        }
        if(this.state.accountToDeposit == 'db'){
            var obj = '{"type":' + '"' + this.state.transactionType + '"' + ',"amount":' + values.amount + ',"to":' + values.accountNumber + '}';
            endToggler = true;
        }
        var fObj = JSON.parse(obj);
        if(this.state.transactionType == 'deposit'){
            this.handleDeposit(fObj);
        }
        if(this.state.transactionType == 'withdraw'){
            this.handleWithdraw(fObj);
        }
        if(endToggler == true) {
            this.toggleTransaction2();
        } else {
            this.toggleTransaction();
        }
        
    }

    handleTransferFilter(values){
        var obj = "";
        var endToggler = false;
        console.log(values);
        if(this.state.transferFrom == "savings"){
            var obj = '{"type":' + '"' + this.state.transactionType + '"' + ',"amount":' + values.amount + ',"from":' + this.props.holder.savings.accountNumber + ',"to":' + values.to + '}';
        }
        if(this.state.transferFrom == "checking"){
            var obj = '{"type":' + '"' + this.state.transactionType + '"' + ',"amount":' + values.amount + ',"from":' + this.props.holder.checking.accountNumber + ',"to":' + values.to + '}';
        }
        if(this.state.transferFrom == "reg"){
            var obj = '{"type":' + '"' + this.state.transactionType + '"' + ',"amount":' + values.amount + ',"from":' + this.props.holder.regularIRA.accountNumber + ',"to":' + values.to + '}';
        }
        if(this.state.transferFrom == "roll"){
            var obj = '{"type":' + '"' + this.state.transactionType + '"' + ',"amount":' + values.amount + ',"from":' + this.props.holder.rolloverIRA.accountNumber + ',"to":' + values.to + '}';
        }
        if(this.state.transferFrom == "roth"){
            var obj = '{"type":' + '"' + this.state.transactionType + '"' + ',"amount":' + values.amount + ',"from":' + this.props.holder.rothIRA.accountNumber + ',"to":' + values.to + '}';
        }
        if(this.state.transferFrom == 'db'){
            var obj = '{"type":' + '"' + this.state.transactionType + '"' + ',"amount":' + values.amount + ',"from":' + values.accountNumber + ',"to":' + values.to + '}';
            endToggler = true;
        }
        var fObj = JSON.parse(obj);
        this.handleTransfer(fObj);
        if(endToggler == true) {
            this.toggleTransaction4();
        } else {
            this.toggleTransaction3();
        }
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
            defaultShow: false,
            isClientSlideOpen: false
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
            defaultShow: false,
            isClientSlideOpen: false
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
            defaultShow: false,
            isClientSlideOpen: false
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
            defaultShow: false,
            isClientSlideOpen: false
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
            defaultShow: false,
            isClientSlideOpen: false
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
            defaultShow: false,
            isClientSlideOpen: false
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
            defaultShow: false,
            isClientSlideOpen: false
        });
    }

    handleToggle8(e) {
        e.preventDefault();
        this.setState({
            savingsShow: false,
            checkingShow: false,
            cdShowing: false,
            dbShowing: false,
            regIRAShowing: false,
            rollIRAShowing: false,
            rothIRAShowing: true,
            defaultShow: false,
            isClientSlideOpen: true
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
            return <li><Button className="dash-btn" onClick={this.toggleSavings}>Open Savings Account</Button></li>
        } else {
            return <li><Button className="dash-btn" onClick={(e) => this.handleToggle(e)}>Savings Account</Button></li>
        }
    }

    renderCheckingTag() {
        if(this.props.holder == null){
            return <li><p>Checking Account</p></li>
        } else if(this.props.holder.checking == null){
            return <li><Button className="dash-btn" onClick={this.toggleChecking}>Open Checking Account</Button></li>
        } else {
            return <li><Button className="dash-btn" onClick={(e) => this.handleToggle2(e)}>Checking Account</Button></li>
        }
    }

    renderCDTag() {
        if(this.props.holder == null) {
            return <li><p>CD Account</p></li>
        } else if(this.props.holder.cdAccount == 0){
            return <li><Button className="dash-btn" onClick={this.toggleCDAccount}>Open CD Account</Button></li>
        } else {
            return <li><Button className="dash-btn" onClick={(e) => this.handleToggle3(e)}>CD Accounts</Button></li>
        }
    }

    renderDBTag() {
        if(this.props.holder == null) {
            return <li><p>DB Account</p></li>
        } else if(this.props.holder.dbAccount == 0){
            return <li><Button className="dash-btn" onClick={this.toggleDBAccount}>Open DB Account</Button></li>
        } else {
            return <li><Button className="dash-btn" onClick={(e) => this.handleToggle4(e)}>DB Accounts</Button></li>
        }
    }

    renderRegTag() {
        if(this.props.holder == null) {
            return <li><p>Standard IRA Account</p></li>
        } else if(this.props.holder.regularIRA == null){
            return <li><Button className="dash-btn" onClick={this.toggleRegIRA}>Open Standard IRA Account</Button></li>
        } else {
            return <li><Button className="dash-btn" onClick={(e) => this.handleToggle5(e)}>Standard IRA Account</Button></li>
        }
    }

    renderRollTag() {
        if(this.props.holder == null) {
            return <li><p>Rollover IRA Account</p></li>
        } else if(this.props.holder.rolloverIRA == null){
            return <li><Button className="dash-btn" onClick={this.toggleRollIRA}>Open Rollover IRA Account</Button></li>
        } else {
            return <li><Button className="dash-btn" onClick={(e) => this.handleToggle6(e)}>Rollover IRA Account</Button></li>
        }
    }

    renderRothTag() {
        if(this.props.holder == null) {
            return <li><p>Roth IRA Account</p></li>
        } else if(this.props.holder.rothIRA == null){
            return <li><Button className="dash-btn" onClick={this.toggleRothIRA}>Open Roth IRA Account</Button></li>
        } else {
            return <li><Button className="dash-btn" onClick={(e) => this.handleToggle7(e)}>Roth IRA Account</Button></li>
        }
    }

    renderClient() {
        const {isClientSlideOpen} = this.state;
        if(this.props.holder == null){
            return (
                <div id="savingsContent">   
                </div>
            );
        } else {
            return (
                <div id="savingsContent" className={`panel ${isClientSlideOpen ? 'showing' : ''}`}>
                    <div className="content-header p-2 text-white mb-2">
                        <p className="mr-2 tags">Client View</p>
                        <div className="end-buttons">
                            <Button onClick={this.toggleClientDelete}>Delete</Button>
                        </div>
                    </div>
                    <div className="inner-content">
                        <div className="inner-side">
                            <ul>
                                <li>Account ID: ({this.props.holder.id})</li>
                                <li>First Name: {this.props.holder.firstName}</li>
                                <li>Middle Name: {this.props.holder.middleName}</li>
                                <li>Last Name: {this.props.holder.lastName}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            );
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
                            <div className="end-buttons">
                                <Button onClick={this.toggleDepositSavings}>Deposit</Button>
                                <Button onClick={this.toggleWithdrawSavings}>Withdraw</Button>
                                <Button onClick={this.toggleTransferSavings}>Transfer</Button>
                            </div>
                        </div>
                        <div className="inner-content">
                            <div className="inner-side">
                                <ul>
                                    <li>Account ({this.props.holder.savings.accountNumber})</li>
                                    <li>Balance: ${this.props.holder.savings.balance.toFixed(2)}</li>
                                    <li>Interest Rate: {this.props.holder.savings.interestRate}%</li>
                                    <li>Creation Date: {this.props.holder.savings.accoutStartDate}</li>
                                </ul>
                            </div>
                            <div className="inner-content-2">
                                <ul>
                                    <li>Transactions</li>
                                    {this.renderSavingsTransactions()}
                                </ul>
                            </div>
                        </div>
                    </div>
                );
            }
        }
    }

    renderCheckingTransactions(){
        const trans = this.props.holder.checking.transactions.map((transaction) => {
            return(
            <li>-{transaction.type} (amount: {transaction.amount}, from: {transaction.source}, recipient : {transaction.target}, on: {transaction.date}</li>
            );
        })

        return trans;
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
                            <div className="end-buttons">
                                <Button onClick={this.toggleDepositChecking}>Deposit</Button>
                                <Button onClick={this.toggleWithdrawChecking}>Withdraw</Button>
                                <Button onClick={this.toggleTransferChecking}>Transfer</Button>
                                <Button onClick={this.toggleDeleteAccount}>Delete</Button>
                            </div>
                            
                        </div>
                        <div className="inner-content">
                            <div className="inner-side">
                                <ul>
                                    <li>Account ({this.props.holder.checking.accountNumber})</li>
                                    <li>Balance: ${this.props.holder.checking.balance}</li>
                                    <li>Interest Rate: {this.props.holder.checking.interestRate}%</li>
                                    <li>Creation Date: {this.props.holder.checking.accoutStartDate}</li>
                                </ul>
                            </div>
                            <div className="inner-content-2">
                                <ul>
                                    <li>Transactions</li>
                                    {this.renderCheckingTransactions()}
                                </ul>
                            </div>
                        </div>
                    </div>
                );
            }
        }
    }

    renderRegTransactions(){
        const trans = this.props.holder.regularIRA.transactions.map((transaction) => {
            return(
            <li>-{transaction.type} (amount: {transaction.amount}, from: {transaction.source}, recipient : {transaction.target}, on: {transaction.date}</li>
            );
        })

        return trans;
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
                            <div className="end-buttons">
                                <Button onClick={this.toggleDepositReg}>Deposit</Button>
                                <Button onClick={this.toggleWithdrawReg}>Withdraw</Button>
                                <Button onClick={this.toggleTransferReg}>Transfer</Button>
                                <Button onClick={this.toggleDeleteAccount2}>Delete</Button>
                            </div>
                        </div>
                        <div className="inner-content">
                            <div className="inner-side">
                                <ul>
                                    <li>Account ({this.props.holder.regularIRA.accountNumber})</li>
                                    <li>Balance: ${this.props.holder.regularIRA.balance}</li>
                                    <li>Interest Rate: {this.props.holder.regularIRA.interestRate}%</li>
                                    <li>Creation Date: {this.props.holder.regularIRA.accoutStartDate}</li>
                                </ul>
                            </div>
                            <div className="inner-content-2">
                                <ul>
                                    <li>Transactions</li>
                                    {this.renderRegTransactions()}
                                </ul>
                            </div>
                        </div>
                    </div>
                );
            }
        }
    }

    renderRollTransactions(){
        const trans = this.props.holder.rolloverIRA.transactions.map((transaction) => {
            return(
            <li>-{transaction.type} (amount: {transaction.amount}, from: {transaction.source}, recipient : {transaction.target}, on: {transaction.date}</li>
            );
        })

        return trans;
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
                            <div className="end-buttons">
                                <Button onClick={this.toggleDepositRoll}>Deposit</Button>
                                <Button onClick={this.toggleWithdrawRoll}>Withdraw</Button>
                                <Button onClick={this.toggleTransferRoll}>Transfer</Button>
                                <Button onClick={this.toggleDeleteAccount4}>Delete</Button>
                            </div>
                        </div>
                        <div className="inner-content">
                            <div className="inner-side">
                                <ul>
                                    <li>Account ({this.props.holder.rolloverIRA.accountNumber})</li>
                                    <li>Balance: ${this.props.holder.rolloverIRA.balance}</li>
                                    <li>Interest Rate: {this.props.holder.rolloverIRA.interestRate}%</li>
                                    <li>Creation Date: {this.props.holder.rolloverIRA.accoutStartDate}</li>
                                </ul>
                            </div>
                            <div className="inner-content-2">
                                <ul>
                                    <li>Transactions</li>
                                    {this.renderRollTransactions()}
                                </ul>
                            </div>
                        </div>
                    </div>
                );
            }
        }
    }

    renderRothTransactions(){
        const trans = this.props.holder.rothIRA.transactions.map((transaction) => {
            return(
            <li>-{transaction.type} (amount: {transaction.amount}, from: {transaction.source}, recipient : {transaction.target}, on: {transaction.date}</li>
            );
        })

        return trans;
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
                            <div className="end-buttons">
                                <Button onClick={this.toggleDepositRoth}>Deposit</Button>
                                <Button onClick={this.toggleWithdrawRoth}>Withdraw</Button>
                                <Button onClick={this.toggleTransferRoth}>Transfer</Button>
                                <Button onClick={this.toggleDeleteAccount3}>Delete</Button>
                            </div>
                        </div>
                        <div className="inner-content">
                            <div className="inner-side">
                                <ul>
                                    <li>Account ({this.props.holder.rothIRA.accountNumber})</li>
                                    <li>Balance: ${this.props.holder.rothIRA.balance}</li>
                                    <li>Interest Rate: {this.props.holder.rothIRA.interestRate}%</li>
                                    <li>Creation Date: {this.props.holder.rothIRA.accoutStartDate}</li>
                                </ul>
                            </div>
                            <div className="inner-content-2">
                                <ul>
                                    <li>Transactions</li>
                                    {this.renderRothTransactions()}
                                </ul>
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
                <ul>
                    <li>Account ({cdaccount.accountNumber})</li>
                    <li>Balance: ${cdaccount.balance}</li>
                    <li>Interest Rate: {cdaccount.interestRate}%</li>
                    <li>Term: {cdaccount.term}</li>
                    <li>Creation Date: {cdaccount.accoutStartDate}</li>
                </ul>
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
                            <div className="end-buttons">
                                <Button onClick={this.toggleCDDelete}>Delete</Button>
                            </div>
                        </div>
                        <div className="inner-content">
                            <div className="inner-side">
                                {this.renderCDListItems()}
                                <Button className="dash-btn" onClick={this.toggleCDAccount}>Open CD Account</Button>
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
                <ul>
                    <li>Account ({dbaccount.accountNumber})</li>
                    <li>Company Name: {dbaccount.companyName}</li>
                    <li>Balance: ${dbaccount.balance}</li>
                    <li>Interest Rate: {dbaccount.interestRate}%</li>
                    <li>Creation Date: {dbaccount.accoutStartDate}</li>
                </ul>
            );
        })

        return dbList;
    }

    renderDBTransaction(value){
        if(value.transactions.length > 0){
            const transList = value.transactions.map((trans) =>{
                return (
                    <li>-{trans.type} (amount: {trans.amount}, from: {trans.source}, recipient : {trans.target}, on: {trans.date}</li>
                );
            })
            return transList;
        }
    }

    renderDBTransactions(){
        const dbList = this.props.holder.dbAccount.map((account) => {
            return(
                <ul>
                    <li>Transactions Account ({account.accountNumber})</li>
                    {this.renderDBTransaction(account)}
                </ul>
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
                            <div className="end-buttons">
                                <Button onClick={this.toggleDepositDB}>Deposit</Button>
                                <Button onClick={this.toggleWithdrawDB}>Withdraw</Button>
                                <Button onClick={this.toggleTransferDB}>Transfer</Button>
                                <Button onClick={this.toggleDBDelete}>Delete</Button>
                            </div>
                        </div>
                        <div className="inner-content">
                            <div className="inner-side">
                                {this.renderDBListItems()}
                                <Button className="dash-btn" onClick={this.toggleDBAccount}>Open DB Account</Button>
                            </div>
                            <div className="inner-content-2">
                                {this.renderDBTransactions()}
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
                <option value={cdaccount.accountNumber}>CD Account ({cdaccount.accountNumber})</option>
            );
        })

        return cdList;
    }

    renderCDOfferOptions(){
        if(this.props.offers == null){
            return <option>1</option>
        }
        const cdoffers = Object.entries(this.props.offers).map(([key, value]) => {
            var keyd = Number(key) + 1;
            return(
            <option value={key}>Plan {keyd++} (Interest Rate: {value.interestRate}, Term: {value.term})</option>
            );
        })
        return cdoffers;
    }

    renderDBAccountOptions() {
        if(this.props.holder == null) {
            return <option>1</option>
        }
        const dbList = this.props.holder.dbAccount.map((dbaccount) => {
            return(
                <option value={dbaccount.accountNumber}>DB Account ({dbaccount.accountNumber})</option>
            );
        })

        return dbList;
    }

    renderAllAccounts() {
        if(this.props.holder == null) {
            return <option>1</option>
        }
        var totalsCon = [];
        if(this.props.holder.savings !== null ){
            var ticker1 = true;
            if(this.state.transferFrom == "savings"){
                ticker1 = false;
            }
            totalsCon.push(<option value={this.props.holder.savings.accountNumber} className={`panel ${ticker1 ? 'showing' : ''}`}>Savings Account ({this.props.holder.savings.accountNumber})</option>);
        }
        if(this.props.holder.checking !== null ){
            var ticker2 = true;
            if(this.state.transferFrom == "checking"){
                ticker2 = false;
            }
            totalsCon.push(<option value={this.props.holder.checking.accountNumber} className={`panel ${ticker2 ? 'showing' : ''}`}>Checking Account ({this.props.holder.checking.accountNumber})</option>);
        }
        if(this.props.holder.regularIRA !== null){
            var ticker3 = true;
            if(this.state.transferFrom == "reg"){
                ticker3 = false;
            }
            totalsCon.push(<option value={this.props.holder.regularIRA.accountNumber} className={`panel ${ticker3 ? 'showing' : ''}`}>Standard IRA Account ({this.props.holder.regularIRA.accountNumber})</option>);
        }
        if(this.props.holder.rolloverIRA !== null){
            var ticker4 = true;
            if(this.state.transferFrom == "roll"){
                ticker4 = false;
            }
            totalsCon.push(<option value={this.props.holder.rolloverIRA.accountNumber} className={`panel ${ticker4 ? 'showing' : ''}`}>Rollover IRA Account ({this.props.holder.rolloverIRA.accountNumber})</option>);
        }
        if(this.props.holder.rothIRA !== null){
            var ticker5 = true;
            if(this.state.transferFrom == "roth"){
                ticker5 = false;
            }
            totalsCon.push(<option value={this.props.holder.rothIRA.accountNumber} className={`panel ${ticker5 ? 'showing' : ''}`}>Roth IRA Account ({this.props.holder.rothIRA.accountNumber})</option>);
        }
        if(this.props.holder.dbAccount.length > 0){
            var dbNumbers = this.props.holder.dbAccount.map(x => x.accountNumber);
            for(var x = 0; x < dbNumbers.length; x++){
                totalsCon.push(<option value={dbNumbers[x]}>DB Account ({dbNumbers[x]})</option>);
            }
        }

        return totalsCon;
    }

    /*

    renderDBorABOptions() {
        if(this.props.holder == null) {
            return <option>1</option>
        } else {
            var totalsCon = [];
            if(this.props.holder.cdAccount.length > 0){
                var cdNumbers = this.props.holder.cdAccount.map(x => x.accountNumber);
                for(var x = 0; x < cdNumbers.length; x++){
                    totalsCon.push(<option className={`panel ${cdTransactionShowing ? 'showing' : ''}`}>{cdNumbers[x]}</option>);
                }
            }
            if(this.props.holder.dbAccount.length > 0){
                var dbNumbers = this.props.holder.dbAccount.map(x => x.accountNumber);
                for(var x = 0; x < dbNumbers.length; x++){
                    totalsCon.push(<option className={`panel ${dbTransactionShowing ? 'showing' : ''}`}>{dbNumbers[x]}</option>)
                }
            }
            console.log(cdNumbers);
            console.log(totalsCon);
            return totalsCon;
        }
    }

    */

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
                    <Button onClick={(e) => this.handleToggle8(e)}>Client Details</Button>
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
                        {this.renderClient()}
                    </div>
                </div>


                <Modal isOpen={this.state.isCheckingOpen} toggle={this.toggleChecking}>
                    <ModalHeader>Open Checking Account</ModalHeader>
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
                                <Col>
                                    <Button type="submit" className="dash-btn">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.isSavingsOpen} toggle={this.toggleSavings}>
                    <ModalHeader>Open Savings Account</ModalHeader>
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
                                <Col >
                                    <Button type="submit" className="dash-btn">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.isCDOpen} toggle={this.toggleCDAccount}>
                    <ModalHeader>Open CD Account</ModalHeader>
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
                                <Label htmlFor="offer" md={2}>Plan</Label>
                                <Control.select model=".offer" name="offer" 
                                    className="form-control mx-3" >
                                    <option>Choose Id</option>
                                    {this.renderCDOfferOptions()}
                                </Control.select>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" className="dash-btn">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.isdbOpen} toggle={this.toggleDBAccount}>
                    <ModalHeader>Open DB Account</ModalHeader>
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
                                    placeholder="Company Name" 
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
                                <Col>
                                    <Button type="submit" className="dash-btn">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.isRegIRAOpen} toggle={this.toggleRegIRA}>
                    <ModalHeader>Open Standard IRA Account</ModalHeader>
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
                                <Col>
                                    <Button type="submit" className="dash-btn">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.isRollIRAOpen} toggle={this.toggleRollIRA}>
                    <ModalHeader>Open Rollover IRA Account</ModalHeader>
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
                                <Col>
                                    <Button type="submit" className="dash-btn">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.isRothIRAOpen} toggle={this.toggleRothIRA}>
                    <ModalHeader>Open Roth IRA Account</ModalHeader>
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
                                <Col>
                                    <Button type="submit" className="dash-btn">
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
                            <Label htmlFor="accountNumber" md={2}>Account</Label>
                                <Control.select model=".accountNumber" name="accountNumber" 
                                    className="form-control mx-3" >
                                    <option>Choose Id</option>
                                    {this.renderCDAccountOptions()}
                                </Control.select>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" className="dash-btn">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.isDBDeleteOpen} toggle={this.toggleDBDelete}>
                    <ModalHeader>Delete DB Account</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(value) => this.handleDeleteDB(value)}>
                            <Row className="form-group">
                            <Label htmlFor="accountNumber" md={2}>Account</Label>
                                <Control.select model=".accountNumber" name="accountNumber" 
                                    className="form-control mx-3" >
                                    <option>Choose Id</option>
                                    {this.renderDBAccountOptions()}
                                </Control.select>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" className="dash-btn">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.isDeleteAccountOpen} toggle={this.toggleDeleteAccount}>
                    <ModalHeader className="modal-head">Sure you want to delete?</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleDeleteAccount(this.state.accountToDelete)}>
                            <div className="modal-row">
                                <Button type="submit">
                                    Yes
                                </Button>
                                <Button onClick={this.toggleDeleteAccount}>No</Button>
                            </div>
                        </LocalForm>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.isClientViewOpen} toggle={this.toggleClientDelete}>
                    <ModalHeader className="modal-head">Sure you want to delete?</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleClientDelete(this.state.accountToDelete)}>
                            <div className="modal-row">
                                <p>Once you submit yes, your entire account will be deleted</p>
                            </div>
                            <div className="modal-row">
                                <Button type="submit">
                                    Yes
                                </Button>
                                <Button onClick={this.toggleClientDelete}>No</Button>
                            </div>
                        </LocalForm>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.isTransactionAccountOpen} toggle={this.toggleTransaction}>
                    <ModalHeader>Transaction</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleDepositFilter(values)}>
                            <Row className="form-group">
                               <Label htmlFor="amount" md={2}>Amount</Label>
                                <Control.text model=".amount" type="text" id="amount" name="amount"
                                    placeholder="20" 
                                    className="form-control mx-3" 
                                    validators={{
                                        required
                                    }}
                                        />
                                <Errors 
                                    className="text-danger mx-3"
                                    model=".amount"
                                    show="touched"
                                     messages={{
                                        required: 'Required',
                                    }}
                                />
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" className="dash-btn">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.isTransactionAccountOpen3} toggle={this.toggleTransaction3}>
                    <ModalHeader>Transaction</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleTransferFilter(values)}>
                            <Row className="form-group">
                                <Label htmlFor="to" md={2}>Transfer To:</Label>
                                <Control.select model=".to" name="to" 
                                    className="form-control mx-3" >
                                    <option>Choose Account</option>
                                    {this.renderAllAccounts()}
                                </Control.select>
                            </Row>
                            <Row className="form-group">
                               <Label htmlFor="amount" md={2}>Amount</Label>
                                <Control.text model=".amount" type="text" id="amount" name="amount"
                                    placeholder="20" 
                                    className="form-control mx-3" 
                                    validators={{
                                        required
                                    }}
                                        />
                                <Errors 
                                    className="text-danger mx-3"
                                    model=".amount"
                                    show="touched"
                                     messages={{
                                        required: 'Required',
                                    }}
                                />
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" className="dash-btn">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.isTransactionAccountOpen2} toggle={this.toggleTransaction2}>
                    <ModalHeader>Transaction</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleDepositFilter(values)}>
                            <Row className="form-group">
                                <Label htmlFor="accountNumber" md={2}>Account Number</Label>
                                <Control.select model=".accountNumber" name="accountNumber" 
                                    className="form-control mx-3" >
                                    <option>Choose Id</option>
                                    {this.renderDBAccountOptions()}
                                </Control.select>
                            </Row>
                            <Row className="form-group">
                               <Label htmlFor="amount" md={2}>Amount</Label>
                                <Control.text model=".amount" type="text" id="amount" name="amount"
                                    placeholder="20" 
                                    className="form-control mx-3" 
                                    validators={{
                                        required
                                    }}
                                        />
                                <Errors 
                                    className="text-danger mx-3"
                                    model=".amount"
                                    show="touched"
                                     messages={{
                                        required: 'Required',
                                    }}
                                />
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" className="dash-btn">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.isTransactionAccountOpen4} toggle={this.toggleTransaction4}>
                    <ModalHeader>Transaction</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleTransferFilter(values)}>
                            <Row className="form-group">
                                <Label htmlFor="accountNumber" md={2}>Account Number</Label>
                                <Control.select model=".accountNumber" name="accountNumber" 
                                    className="form-control mx-3" >
                                    <option>Choose Id</option>
                                    {this.renderDBAccountOptions()}
                                </Control.select>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="to" md={2}>Transfer To:</Label>
                                <Control.select model=".to" name="to" 
                                    className="form-control mx-3" >
                                    <option>Choose Account</option>
                                    {this.renderAllAccounts()}
                                </Control.select>
                            </Row>
                            <Row className="form-group">
                               <Label htmlFor="amount" md={2}>Amount</Label>
                                <Control.text model=".amount" type="text" id="amount" name="amount"
                                    placeholder="20" 
                                    className="form-control mx-3" 
                                    validators={{
                                        required
                                    }}
                                        />
                                <Errors 
                                    className="text-danger mx-3"
                                    model=".amount"
                                    show="touched"
                                     messages={{
                                        required: 'Required',
                                    }}
                                />
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" className="dash-btn">
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