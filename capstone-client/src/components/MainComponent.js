import React, { Component } from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import About from './AboutComponent';
import Accounts from './AccountsPageComponents';
import Calculator from './CalculatorComponent';
import Register from './RegisterComponent';
import Login from './LoginComponent';
import Dashboard from './dashboard';
import CreateHolder from './CreateHolderComponent';
import { Switch, Route, Redirect, withRouter} from 'react-router-dom';
import { ACCESS_TOKEN } from '../Utils/APIUtils';
import { connect } from 'react-redux';
import { fetchCD, authentication, logout, fetchHolder, addHolder, removeHolder} from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    cdofferings: state.cdofferings,
    isAuthenticated: state.isAuthenticated,
    accountHolder: state.accountHolder
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCD: () => {dispatch(fetchCD())},
  authentication: (values) => {dispatch(authentication(values))},
  logout: (values) => {dispatch(logout(values))},
  fetchHolder: () => {dispatch(fetchHolder())},
  addHolder: (values) => {dispatch(addHolder(values))},
  removeHolder: () => {dispatch(removeHolder())}
});

class Main extends Component {

    constructor(props) {
      super(props);
      
      this.handleLogout = this.handleLogout.bind(this);
    }

    async componentDidMount(){
      this.props.fetchCD();
      if(this.props.isAuthenticated == false){
        localStorage.removeItem(ACCESS_TOKEN);
      }
      if(localStorage.getItem(ACCESS_TOKEN)){
        this.props.fetchHolder();
      }
      console.log(this.props.cdofferings);
      console.log(this.props.isAuthenticated);
    }

    handleLogout(){
      localStorage.removeItem(ACCESS_TOKEN);
      console.log("Removed Token");
    }
  
    render() {
  
      const HomePage = () => {
        return(
          <Home onLogout={this.handleLogout}/>
        );
      }

      const AboutPage = () => {
        return(
          <About />
        );
      }

      const AccountsPage = () => {
        return(
          <Accounts />
        );
      }

      const CalculatorPage = () => {
        return(
          <Calculator offers={this.props.cdofferings}/>
        );
      }

      const RegisterPage = () => {
        return(
          <Register />
        );
      }

      const LoginPage = () => {
        return(
          <Login onLogin={this.props.authentication} onGetHolder={this.props.fetchHolder} authen={this.props.isAuthenticated} holder={this.props.accountHolder}/>
        );
      }

      const DashboardPage = () => {
        return(
          <Dashboard authen={this.props.isAuthenticated} onLogout={this.handleLogout} logout={this.props.logout} holder={this.props.accountHolder} onGetHolder={this.props.fetchHolder} onRemove={this.props.removeHolder} updateHolder={this.props.addHolder}/>
        );
      }

      const CreateHolderPage = () => {
        return(
          <CreateHolder createHolder={this.props.addHolder} onGetHolder={this.props.fetchHolder} holder={this.props.accountHolder} />
        );
      }
  
      return (
        <div>
          <Header authen={this.props.isAuthenticated} onLogout={this.handleLogout} logout={this.props.logout}/>
          <Switch>
            <Route path="/home" component={HomePage} />
            <Route path="/aboutus" component={AboutPage} />
            <Route path="/accounts" component={AccountsPage} />
            <Route path="/calculator" component={CalculatorPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/dashboard" component={DashboardPage}></Route>
            <Route path="/createHolder" component={CreateHolderPage}></Route>
            <Redirect to="/home" />
          </Switch>
          <Footer authen={this.props.isAuthenticated} onLogout={this.handleLogout} logout={this.props.logout}/>
        </div>
      );
    }
  }
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));