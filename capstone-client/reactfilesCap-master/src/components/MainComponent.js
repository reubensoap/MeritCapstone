import React, { Component } from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import About from './AboutComponent';
import Accounts from './AccountsPageComponents';
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
  
      return (
        <div>
          <Header />
          <Switch>
            <Route path="/home" component={HomePage} />
            <Route path="/aboutus" component={AboutPage} />
            <Route path="/accounts" component={AccountsPage} />
            <Redirect to="/home" />
          </Switch>
          <Footer />
        </div>
      );
    }
  }
  
  export default withRouter((Main));