import React, { Component } from 'react';
import { Row, Label, Col, Button } from 'reactstrap';
import { getCdOfferings } from '../Utils/APIUtils';
import { OFFERS } from '../Utils/testCDOfferings';
import { LocalForm, Control } from 'react-redux-form';
import { Link } from 'react-router-dom';

class Calculator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            startValue: 0,
            toggleStartValue: false
        }
        this.renderInterest = this.renderInterest.bind(this);
        this.renderPlans = this.renderPlans.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleStart = this.toggleStart.bind(this);
        this.recursiveFutureValue = this.recursiveFutureValue.bind(this);
    }

    renderPlans(){
        console.log(this.props.offers);
        let plans = [];
        var plansNum = this.props.offers.length;
        for(var x = 0; x < plansNum; x++){
            plans.push(<td className="py-2">Plan {x + 1}</td>);
        }
        return plans;
    }

    renderInterest(){
        let results = [];
        var interest = this.props.offers.map(x => x.interestRate);
        console.log(interest);
        for(var x = 0; x < interest.length; x++){
            results.push(<td className="pt-2">{interest[x]}</td>);
        }
        return results;
    }

    renderTerms(){
        let results2 = [];
        var terms = this.props.offers.map(x => x.term);
        console.log(terms);
        for(var x = 0; x < terms.length; x++){
            results2.push(<td className="pt-2">{terms[x]}</td>);
        }
        return results2;
    }

    renderTotals(){
        let totals3 = [];
        let totalsCon = [];
        var plansNumT = this.props.offers.length;
        var interestT = this.props.offers.map(x => x.interestRate);
        var termsT = this.props.offers.map(x => x.term);
        console.log(this.state.startValue);
        for(var x = 0; x < plansNumT; x++){
            var interest = parseFloat(interestT[x]);
            var term = parseInt(termsT[x]);
            var newRound = parseFloat(this.state.startValue);
            totalsCon.push(<td className="pt-2">{this.recursiveFutureValue(newRound, term, interest)}</td>);
        }
        console.log(totalsCon);
        return totalsCon;
    }

    toggleStart() {
        this.setState({
            toggleStartValue: !this.state.toggleStartValue
        });
    }

    handleSubmit(values) {
        this.toggleStart();
        this.setState({
            startValue: values.future
        });
        this.renderTotals();
        console.log(this.state.startValue);
    }

    recursiveFutureValue(amount, years, interestRate){
        amount = amount * (1 + interestRate);
        if(years != 1) {
            return this.recursiveFutureValue(amount, years - 1, interestRate);
        } else {
            return amount.toFixed(3);
        }
    }



    

    render() {

        return(
            <div className="container-fluid mt-5">
                <div className="container">
                    <div className="container py-5 text-center">
                        <h2 className="secondary-header-text">CD Account Calculator</h2>
                    </div>
                </div>
                <div className="container">
                    <div className="row py-5">
                        <div className="col col-md-6 pt-5">
                            <h3>Our CD plans offer a variety of future value options.</h3>
                            <p>Certificates of deposit can be an effective way to save money while you earn interest safely.
                               Our CD accounts require no minimum amount to open a CD, unlike other banks that can have $500 or $1000 requirements.
                            </p>
                        </div>
                        <div className="col col-md-6 smaller-section">
                            <img src="./images/hero-image.png" />
                        </div>
                    </div>
                </div>
                <div className="container py-5 text-center">
                    <p className="secondary-header-text">CD Plans</p>
                    <p>Use our convienent CD calculator to determine which plans work best for your money.</p>
                    <table className="tableCD">
                        <thead className="tableHeadCD">
                            <tr><td className="tableLabels">Our CD Plans</td>{this.renderPlans()}</tr>
                        </thead>
                        <tbody>
                            <tr><td className="tableLabels">Interest Rates</td>{this.renderInterest()}</tr>
                            <tr><td className="tableLabels">Terms</td>{this.renderTerms()}</tr>
                            <tr><td className="tableLabels">Future Calculations</td>{this.renderTotals()}</tr>
                        </tbody>
                    </table>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className="calc-form">
                            <Label htmlFor="future">CD Initial Amount</Label>
                            <Control.text model=".future" type="text" id="future" name="future"
                                placeholder="0.00"
                                className="cal-form-box" />
                        </Row>
                        <Row className="form-group">
                            <Col>
                                <Button type="submit" color="primary">
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    </LocalForm>
                </div>
                
            </div>
            
        );
    }
}

export default Calculator;