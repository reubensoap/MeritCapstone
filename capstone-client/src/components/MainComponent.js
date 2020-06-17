import React, { Component } from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import About from './AboutComponent';
import Accounts from './AccountsPageComponents';
import Calculator from './CalculatorComponent';
import { Switch, Route, Redirect, withRouter} from 'react-router-dom';
import { connect } from 'react-redux'; 
import { actions } from 'react-redux-form';


class Main extends Component {

    constructor(props) {
      super(props);
    }
  
    render() {
  
      const HomePage = () => {
        return(
          <Home />
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
          <Calculator />
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
            <Redirect to="/home" />
          </Switch>
          <Footer />
        </div>
      );
    }
  }
  
  export default withRouter((Main));