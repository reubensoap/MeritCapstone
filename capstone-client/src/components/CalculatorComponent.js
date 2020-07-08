import React, { Component } from 'react';
import { Row, Label, Col, Button } from 'reactstrap';
import { LocalForm, Control } from 'react-redux-form';

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
            totalsCon.push(this.recursiveFutureValue(newRound, term, interest));
        }
        var totalsCon2 = [...totalsCon];
        totalsCon2.sort((a,b) => b - a);
        for(var x = 0; x < totalsCon.length; x++){
            if(totalsCon2[0] == totalsCon[x] && this.state.startValue !== 0){
                totals3.push(<td className="pt-2 green">{totalsCon[x]}</td>);
            } else {
                totals3.push(<td className="pt-2">{totalsCon[x]}</td>);
            }
        }
        return totals3;
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
            <div className="container-fluid">
                <div className="container">
                    <div className="row py-5">
                        <div className="col col-md-6 pt-5">
                            <h3 className="biggest-header-text">Our CD plans offer a variety of future value options.</h3>
                            <p className="gray secondary-header-text">Certificates of deposit can be an effective way to save money while you earn interest safely.</p>
                        </div>
                        <div className="col col-md-6 smaller-section">
                            <img src="./images/hero-image-2.png" />
                        </div>
                    </div>
                </div>
                <div className="container py-5 text-center">
                    <p className="secondary-header-text">CD Plans</p>
                    <p>Use our CD calculator to determine which plan works best for your money. Highlighted <span className="green-text">Green</span> is best value</p>
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