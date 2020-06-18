import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Media, CardText, CardTitle } from 'reactstrap';
import { getCdOfferings } from '../Utils/APIUtils';
import { OFFERS } from '../Utils/testCDOfferings';
import { Link } from 'react-router-dom';

class Calculator extends Component {

    constructor(props) {
        super(props);
    }

    

    renderCDO(cdo){
        if(cdo != null){
            return(
                <Card key={cdo.id}>
                    <CardTitle>{cdo.term}</CardTitle>
                    <CardBody>{cdo.interest_rate}</CardBody>
                </Card>
            );
        } else {
            return(
                <p>Not working</p>
            );
        }
        
    }

    render() {

        const menu = this.props.offers.map((cdo) => {
            return (
                <div className="col-12 col-md-5 m-1">
                    {this.renderCDO(cdo) }
                </div>
            );
        });

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
                <div classnam="container">
                    <p>cdofferings</p>
                    {menu}
                </div>
                
            </div>
            
        );
    }
}

export default Calculator;