import React from 'react';


function About(props) {

    return(
        <div className="container-fluid">
            <div className="container">
                <div className="row py-5">
                    <div className="col col-md-6 pt-5">
                    <h3 className="biggest-header-text">We're changing the way people feel about banking.</h3>
                    <p className="gray secondary-header-text">Merit Bank's business was built on the principle of protecting our members and helping them get ahead. That means we don't profit off of you. We profit with you.</p>
                    </div>
                    <div className="col col-md-6 smaller-section">
                        <img src="./images/spot-me.png" />
                    </div>
                </div>
            </div>
            <div className="row py-5 color-primary">
                <div className="container text-center text-light">
                    <h3>Our Mission</h3>
                    <p>We created Merit Bank because we believe everyone deserves financial peace of mind.  We’re building a new kind of bank account that helps members get ahead by making managing money easy. It’s your money. It’s your life.</p>
                </div>
            </div>
            <div className="container py-5 text-center">
                <h3 className="pb-4">Our Team</h3>
                <div className="row gallery pb-5">
                    <img src="./images/reuben-profile.png" />
                    <img src="./images/joshua-profile.png" />
                </div>
                <h3 className="pb-4">Culture</h3>
                <p>We believe that creating a company where people love to work is built on relationships, growth, and impact.
                    We cultivate a culture of low ego and set a high bar for excellence. We believe in flat organizations and open work spaces. We treat one another inside the company the same way we treat our members–by communicating in ways that build trust, operating with transparency, and having one another’s back.
                    We recognize the contributions of individuals and celebrate wins as a team. Every member of the team is an owner of the company and is encouraged to participate on any part of the business. What we all have in common is a mission that starts with heart, and a desire to work together to create something of lasting value and personal impact for our employees and members alike.
                </p>
            </div>
        </div>
        
    );
}

export default About;