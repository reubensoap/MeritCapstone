import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Media, CardText, CardTitle } from 'reactstrap';
import { getCdOfferings } from '../Utils/APIUtils';
import { OFFERS } from '../Utils/testCDOfferings';
import { Link } from 'react-router-dom';

class Calculator extends Component {

    constructor(props) {
        super(props);
        this.renderInterest = this.renderInterest.bind(this);
        this.renderPlans = this.renderPlans.bind(this);
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

    

    render() {

        return(
            <div className="container-fluid mt-5">
                <div className="container">
                    <div className="container py-5 text-center">
                        <h2 className="secondary-header-text">About Merit Bank</h2>
                    </div>
                </div>
                <div className="container">
                    <div className="row py-5">
                        <div className="col col-md-6 pt-5">
                            <h3>Our CD plans offer a variety of future value options.</h3>
                            <p>We’ll spot you on debit card purchases with no overdraft fees. Eligibility requirements apply.</p>
                        </div>
                        <div className="col col-md-6 smaller-section">
                            <img src="./images/hero-image.png" />
                        </div>
                    </div>
                </div>
                <div className="container py-5 text-center">
                    <p className="secondary-header-text">CD Plans</p>
                    <table className="tableCD">
                        <thead className="tableHeadCD">
                            <tr><td className="tableLabels">CD Plans</td>{this.renderPlans()}</tr>
                        </thead>
                        <tbody>
                            <tr><td className="tableLabels">Interest Rates</td>{this.renderInterest()}</tr>
                            <tr><td className="tableLabels">Terms</td>{this.renderTerms()}</tr>
                        </tbody>
                    </table>
                </div>
                
            </div>
            
        );
    }
}

export default Calculator;