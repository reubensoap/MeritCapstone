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


class Main extends Component {

    constructor(props) {
      super(props);
      this.state = {
        cdofferings: [],
        isAuthenticated: true,
        user: null
      }
      this.handleCDOfferings = this.handleCDOfferings.bind(this);
      this.loadCurrentUser = this.loadCurrentUser.bind(this);
      this.handleLogout = this.handleLogout.bind(this);
    }

    handleCDOfferings() {
      getCdOfferings()
      .then(response => {
        this.setState({
          cdofferings: response
        });
      });
      
    }

    loadCurrentUser() {
      if(!localStorage.getItem(ACCESS_TOKEN)){
        console.log("Not Logged In");
      } else {
        getCurrentUser()
        .then(response => {
          this.setState({
            user: response,
            isAuthenticated: true
          });
        });
      }
      console.log(this.state.isAuthenticated);
    }

    componentDidUpdate(prevProps, prevState){
      if(prevState.isAuthenticated !== this.state.isAuthenticated){
        console.log("not false")
        console.log(this.state.isAuthenticated)
      }
    }

    componentDidMount(){
      this.handleCDOfferings();
      this.loadCurrentUser();
      console.log(this.state.cdofferings);
      console.log(this.state.isAuthenticated);
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
          <Calculator offers={this.state.cdofferings}/>
        );
      }

      const RegisterPage = () => {
        return(
          <Register />
        );
      }

      const LoginPage = () => {
        return(
          <Login onLogin={this.loadCurrentUser}/>
        );
      }

      const DashboardPage = () => {
        return(
          <Dashboard />
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
            <PrivateRoute authenticated={this.state.isAuthenticated} path="/dashboard" component={DashboardPage}></PrivateRoute>
            <Redirect to="/home" />
          </Switch>
          <Footer />
        </div>
      );
    }
  }
  
  export default withRouter((Main));