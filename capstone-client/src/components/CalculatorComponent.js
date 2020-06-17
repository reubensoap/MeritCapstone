import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Media } from 'reactstrap';
import { Link } from 'react-router-dom';


function Calculator(props) {

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
                
            </div>
            
        </div>
        
    );
}

export default Calculator;