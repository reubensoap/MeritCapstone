import React, { Component } from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import About from './AboutComponent';
import Accounts from './AccountsPageComponents';
import Calculator from './CalculatorComponent';
import { Switch, Route, Redirect, withRouter} from 'react-router-dom';
import { getCdOfferings } from '../Utils/APIUtils';
import { OFFERS } from '../Utils/testCDOfferings';
import { connect } from 'react-redux'; 
import { actions } from 'react-redux-form';
import axios from 'axios';


class Main extends Component {

    constructor(props) {
      super(props);
      this.state = {
        cdofferings: []
      }
      this.handleCDOfferings = this.handleCDOfferings.bind(this);
    }

    handleCDOfferings() {
      // method getCdOffering was not working due to CORS
      // tried axios to get information and it works, console
      // shows the CDOffers in array. However the data does not 
      // update outside of the .then
      getCdOfferings()
      .then(response => {
        this.setState({
          cdofferings: response
        });
      });
      
    }

    componentDidMount(){
      this.handleCDOfferings()
      console.log(this.state.cdofferings);
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
          <Calculator offers={this.state.cdofferings}/>
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