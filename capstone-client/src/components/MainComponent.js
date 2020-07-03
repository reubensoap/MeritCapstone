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
import { Switch, Route, Redirect, withRouter} from 'react-router-dom';
import { getCdOfferings, signup, getCurrentUser, ACCESS_TOKEN } from '../Utils/APIUtils';
import PrivateRoute from '../Utils/PrivateRoute';
import { connect } from 'react-redux';
import { getCDOffers, fetchCD, authenticatation } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    cdofferings: state.cdofferings,
    isAuthenticated: state.isAuthenticated,
    accountHolder: state.accountHolder
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCD: () => {dispatch(fetchCD())},
  authenticatation: (values) => {dispatch(authenticatation(values))}
});

class Main extends Component {

    constructor(props) {
      super(props);
      
      /*this.loadCurrentUser = this.loadCurrentUser.bind(this);*/
      this.handleLogout = this.handleLogout.bind(this);
    }

    /*loadCurrentUser() {
      if(!localStorage.getItem(ACCESS_TOKEN)){
        console.log("Not Logged In");
      } else {
        getCurrentUser()
        .then(response => {
          this.setState({
            user: response,
            isAuthenticated: true
          });
          console.log(this.state.user)
        });
      }
      console.log(this.props.isAuthenticated);
    }*/

    async componentDidMount(){
      /*await this.loadCurrentUser();*/
      this.props.fetchCD();
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
          <Login onLogin={this.props.authenticatation}/>
        );
      }

      const DashboardPage = () => {
        return(
          <Dashboard authen={this.props.isAuthenticated} />
        );
      }
  
      return (
        <div>
          <Header />
          <Switch>
            <Route path="/home" component={HomePage} />
            <Route path="/aboutus" component={AboutPage} />
            <Route path="/accounts" component={AccountsPage} />
            <Route path="/calculator" component={CalculatorPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/dashboard" component={DashboardPage}></Route>
            <Redirect to="/home" />
          </Switch>
          <Footer />
        </div>
      );
    }
  }
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));