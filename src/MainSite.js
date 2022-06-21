import React from 'react';
import { useHistory } from "react-router-dom"
import "../public/assets/css/main.css"

const MainSite = () => {

  const history = useHistory()
  const LoginEvent = () => {
    const session = window.localStorage.getItem('session');
    if(!session) history.push('/login');
    else history.push('/main')
  }

  return (
    <React.Fragment>
        <header id="header" className="navbar navbar-expand-lg navbar-end navbar-absolute-top navbar-light navbar-show-hide"
            data-hs-header-options='{
            "fixMoment": 300,
            "fixEffect": "slide"
          }'>
            <div className="container">
                <nav className="js-mega-menu navbar-nav-wrap">
                    <a className="navbar-brand" href="./index.html" aria-label="LandingPage">
                        <img className="navbar-brand-logo" src="./assets/img/logo.png" alt="Logo" />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-default">
                        <i className="bi-list"></i>
                    </span>
                            <span className="navbar-toggler-toggled">
                        <i className="bi-x"></i>
                    </span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <div className="navbar-absolute-top-scroller">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a id="loginMenu" className="nav-link" aria-current="page" onClick={LoginEvent} role="button" aria-expanded="false">Login</a>
                                </li>
                                <li className="nav-item">
                                    <a id="contactMenu" className="nav-link" aria-current="page" href="./contact.html" role="button" aria-expanded="false">Contact</a>
                                </li>
                                <li className="nav-item">
                                    <a id="pricingMenu" className="nav-link" aria-current="page" href="https://www.ebay.com/itm/234525339636" target="_blank" role="button" aria-expanded="false">Pricing Buy</a>
                                </li>
                                <li className="nav-item">
                                    <a className="btn btn-primary btn-transition" href="https://docs.google.com/document/d/e/2PACX-1vSoMlBHCAwoLdX24TbvOpfv8pUgCRIA0DCWHVBtA_iLO5XCOi9U5EnfQYRS486ha7HyMuIwfvcV-2sz/pub?fbclid=IwAR32Amfg6100hcXaS0Djp_McUrQ6ItvPapFVg7Kk4_eIxNrXWlaIhgKDJqs" target="_blank">&nbsp;API&nbsp;</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
        <main id="content" role="main">
            <div className="gradient-x-overlay-sm-primary position-relative overflow-hidden">
                <div className="container content-space-t-3 content-space-t-lg-5 content-space-b-2">
                    <div className="w-lg-65 text-center mx-lg-auto">
                        <div className="mb-5">
                            <h1 className="display-6 mb-3">
                                MooveTrax <span className="text-primary">4G</span> GPS For Car Rental.<br/>Designed By Car Rental
                            </h1>
                            <p className="lead">
                                MooveTrax provides fast real time tracking of your cars.with the most advanced features for car rental companies and Car Share individuals who are using car shares such as Turo or HyreCar.
                            </p>
                        </div>

                        <div className="d-grid d-sm-flex justify-content-sm-center align-items-sm-center gap-3">
                            <a className="btn btn-primary btn-transition" href="./contact.html">Contact</a>
                            <small>or</small>
                            <a className="btn btn-soft-dark btn-transition" href="https://www.ebay.com/itm/234525339636" target="_blank">Pricing Buy <i className="bi-chevron-right small ms-1"></i></a>
                        </div>
                    </div>
                </div>
                <div className="container content-space-b-2 content-space-b-lg-3">
                    <div className="position-relative w-lg-75 text-center mx-lg-auto">
                        {/* <!-- Browser Device --> */}
                        <figure className="device-browser">
                            <div className="device-browser-frame" data-aos="fade-up">
                                <img className="device-browser-img" src="./assets/img/landing/landing1.jpg" alt="Image" />
                            </div>
                        </figure>
                        {/* <!-- End Browser Device --> */}

                        {/* <!-- SVG Shape --> */}
                        <figure className="position-absolute top-0 end-0 mt-n10 me-n10" style={{width: '12rem'}} data-aos="fade-up" data-aos-delay="100" data-aos-offset="-50">
                            <img className="img-fluid" src="./assets/svg/components/dots-lg.svg" alt="Image Description" />
                        </figure>
                        {/* <!-- End SVG Shape --> */}

                        {/* <!-- SVG Shape --> */}
                        <figure className="position-absolute bottom-0 start-0 mb-n7 ms-n7" style={{width: '10rem'}} data-aos="fade-up">
                            <img className="img-fluid" src="./assets/svg/components/dots.svg" alt="Image Description" />
                        </figure>
                        {/* <!-- End SVG Shape --> */}
                    </div>
                </div>
                
                <figure className="position-absolute top-0 end-0 zi-n1 mt-n10 me-n10" style={{width: '32rem'}}>
                    <svg viewBox="0 0 451 902" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M451 820C247.2 820 82 654.8 82 451C82 247.2 247.2 82 451 82" stroke="white" stroke-width="164" strokeMiterlimit="10"/>
                    </svg>
                </figure>
                <figure className="position-absolute bottom-0 start-0 zi-n1 mb-n10 me-n10" style={{width: '21rem'}}>
                    <svg viewBox="0 0 451 902" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.125" d="M0 82C203.8 82 369 247.2 369 451C369 654.8 203.8 820 0 820" stroke="url(#paint1_linear)" stroke-width="164" strokeMiterlimit="10"/>
                        <defs>
                            <linearGradient id="paint1_linear" x1="323.205" y1="785.242" x2="-97.6164" y2="56.3589" gradientUnits="userSpaceOnUse">
                                <stop offset="0" stopColor="white" stopOpacity="0"/>
                                <stop offset="1" stopColor="#377dff"/>
                            </linearGradient>
                        </defs>
                    </svg>
                </figure>
            </div>


            <div className="container content-space-2 content-space-lg-3">
                <div className="row align-items-md-center">
                    <div className="col-md-7 mb-7 mb-md-0">
                        <div className="w-sm-75 mx-sm-auto" data-aos="fade-up">
                            {/* <!-- Card --> */}
                            <div className="card bg-soft-primary text-center">
                                <div className="card-body">
                                    <div className="w-100 mx-auto">
                                        <img className="img-fluid rounded-top-2" src="./assets/img/landing/landing2.jpg" alt="Image Description" />
                                    </div>
                                </div>
                            </div>
                            {/* <!-- End Card --> */}
                        </div>
                    </div>
                    {/* <!-- End Col --> */}

                    <div className="col-md-5 order-md-2">
                        {/* <!-- Heading --> */}
                        <div className="mb-5">
                            <h2 className="mb-3">As The Owner You get to:</h2>
                        </div>
                        {/* <!-- End Heading --> */}

                        {/* <!-- List Checked --> */}
                        <ul className="list-checked list-checked-soft-bg-primary list-checked-lg">
                            <li className="list-checked-item">Unlock the Car</li>
                            <li className="list-checked-item">Lock the Car</li>
                            <li className="list-checked-item">Honk the Horn to locate the car</li>
                            <li className="list-checked-item">Kill the ignition</li>
                            <li className="list-checked-item">Unkill the ignition</li>
                            <li className="list-checked-item">Set Speed limit (when you get notified)</li>
                            <li className="list-checked-item">Set boundaries (when you get notified)</li>
                            <li className="list-checked-item"><b>Share A Temporary Link to your customer</b></li>
                        </ul>
                        {/* <!-- End List Checked --> */}
                    </div>
                    {/* <!-- End Col --> */}
                </div>
                {/* <!-- End Row --> */}
            </div>


            <div className="bg-light overflow-hidden">
                <div className="container content-space-2 content-space-lg-3">
                    {/* <!-- Heading --> */}
                    <div className="w-md-75 w-lg-50 text-center mx-md-auto mb-5 mb-md-9">
                        <h2 className="mb-3">You Get To Set The Start And The End Time For Each Client.</h2>
                    </div>
                    {/* <!-- End Heading --> */}

                    <div className="position-relative w-lg-75 text-center mx-lg-auto" data-aos="fade-up">
                        <img className="img-fluid rounded-2 shadow-xl" src="./assets/img/landing/landing3.jpg" alt="Image Description" />
                    </div>
                </div>
            </div>


            <div className="bg-white overflow-hidden">
                <div className="container content-space-2 content-space-lg-3">
                    <div className="row align-items-md-center">
                        <div className="col-md-7 order-md-2 mb-7 mb-md-0">
                            <div className="w-sm-75 mx-sm-auto" data-aos="fade-up">
                                {/* <!-- Card --> */}
                                <div className="card bg-soft-success text-center">
                                    <div className="card-body">
                                        <div className="w-100 mx-auto">
                                            <img className="img-fluid rounded-top-2" src="./assets/img/landing/landing4.jpg" alt="Image Description" /> 
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- End Card --> */}
                            </div>
                        </div>
                        {/* <!-- End Col --> */}

                        <div className="col-md-5">
                            {/* <!-- Heading --> */}
                            <div className="mb-5">
                                <h2 className="mb-3">You Can Set Detailed Description Of Every Car</h2>
                            </div>
                            {/* <!-- End Heading -->

                            <!-- List Checked --> */}
                            <ul className="list-checked list-checked-soft-bg-primary list-checked-lg">
                                <li className="list-checked-item">CAR Name</li>
                                <li className="list-checked-item">GPS ID</li>
                                <li className="list-checked-item">VIN</li>
                                <li className="list-checked-item">Odometer</li>
                                <li className="list-checked-item">ICCID</li>
                                <li className="list-checked-item">Make</li>
                                <li className="list-checked-item">Model</li>
                                <li className="list-checked-item">Color</li>
                                <li className="list-checked-item">Category</li>
                            </ul>
                            {/* <!-- End List Checked --> */}
                        </div>
                        {/* <!-- End Col --> */}
                    </div>
                    {/* <!-- End Row --> */}
                </div>
            </div>


            <div className="bg-light overflow-hidden">
                <div className="container content-space-2 content-space-lg-3">
                    {/* <!-- Heading --> */}
                    <div className="w-md-75 w-lg-50 text-center mx-md-auto mb-5 mb-md-9">
                        <h2 className="mb-3">Your Renter Can Easily Locate The car. No App download needed.</h2>
                    </div>
                    {/* <!-- End Heading --> */}

                    <div className="position-relative w-lg-75 text-center mx-lg-auto" data-aos="fade-up">
                        <img className="img-fluid rounded-2 shadow-xl" src="./assets/img/landing/landing5.jpg" alt="Image Description" />
                    </div>
                </div>
            </div>


            <div className="bg-white overflow-hidden">
                <div className="container content-space-2 content-space-lg-3">
                    {/* <!-- Heading --> */}
                    <div className="w-md-75 w-lg-50 text-center mx-md-auto mb-5 mb-md-9">
                        <h2 className="mb-3">Your Renter can Honk the Horn, <br/> Unlock and Lock</h2>
                        <p>Their access time is only during the window you set, not before and not after.</p>
                    </div>
                    {/* <!-- End Heading --> */}

                    <div className="position-relative w-lg-75 text-center mx-lg-auto" data-aos="fade-up">
                        <img className="img-fluid rounded-2 shadow-xl" src="./assets/img/landing/landing6.jpg" alt="Image Description" />            </div>

                    {/* <!-- Footing --> */}
                    <div className="w-md-80 w-lg-75 text-center mx-md-auto mt-5 mt-md-9">
                        <p>
                            Your can replay the driving route and speed of any car. <br/>
                            Your renter can replay only for the car they are renting and only for the duration of their trip.
                        </p>
                    </div>
                    {/* <!-- End Footing --> */}
                </div>
            </div>


            <div className="bg-light overflow-hidden">
                <div className="container content-space-2 content-space-lg-3">
                    {/* <!-- Heading --> */}
                    <div className="w-md-75 w-lg-50 text-center mx-md-auto mb-5 mb-md-9">
                        <h2 className="mb-3">You can see the history of commands you performed</h2>
                    </div>
                    {/* <!-- End Heading --> */}

                    <div className="position-relative w-lg-75 text-center mx-lg-auto" data-aos="fade-up">
                        <img className="img-fluid rounded-2 shadow-xl" src="./assets/img/landing/landing7.jpg" alt="Image Description" />
                    </div>
                </div>

                <div className="container content-space-b-2 content-space-b-lg-3">
                    {/* <!-- Heading --> */}
                    <div className="w-md-80 w-lg-75 text-center mx-md-auto mb-4 mb-md-8">
                        <h3 className="mb-3">You Can See the History of the Car activities such as when the door opens, when the door closes, when the driver exceeded the preset speed.</h3>
                    </div>
                    {/* <!-- End Heading --> */}

                    <div className="position-relative w-lg-75 text-center mx-lg-auto" data-aos="fade-up">
                        <img className="img-fluid rounded-2 shadow-xl" src="./assets/img/landing/landing8.jpg" alt="Image Description" />
                    </div>

                    <div className="w-md-80 w-lg-75 text-center mx-md-auto mt-5 mt-md-9">
                        <p>
                            You can have unlimited number of sub users for no extra charges. <br />
                            You can even have different users in charge of different cars.
                        </p>
                    </div>
                </div>
            </div>


            <div className="bg-white overflow-hidden">
                <div className="container content-space-2 content-space-lg-3">
                    {/* <!-- Heading --> */}
                    <div className="w-md-80 w-lg-75 text-center mx-md-auto mb-5 mb-md-9">
                        <h2 className="mb-3"> Replaying a Driving History</h2>
                        <p>When replaying a driving history you get notified of the GSM signal strength, this way you know if the car is in a bad signal area or if something else is going on.</p>
                    </div>
                    {/* <!-- End Heading --> */}

                    <div className="position-relative w-lg-75 text-center mx-lg-auto" data-aos="fade-up">
                        <img className="img-fluid rounded-2 shadow-xl" src="./assets/img/landing/landing9.jpg" alt="Image Description" />
                    </div>
                </div>
            </div>


            <div className="bg-light overflow-hidden">
                <div className="container content-space-2 content-space-lg-3">
                    {/* <!-- Heading --> */}
                    <div className="w-md-75 w-lg-60 text-center mx-md-auto mb-5 mb-md-9">
                        <h2 className="mb-3">Getting to your car is a breeze with the Navigate Button.</h2>
                        <p>With the click of the navigate button your phone will open up your map software<br/> and give you directions straight to the car.</p>
                    </div>
                    {/* <!-- End Heading --> */}

                    <div className="position-relative w-lg-75 text-center mx-lg-auto" data-aos="fade-up">
                        <img className="img-fluid rounded-2 shadow-xl" src="./assets/img/landing/landing10.jpg" alt="Image Description" />
                    </div>
                </div>
            </div>


            <div className="bg-dark overflow-hidden">
                <div className="container content-space-2 ">
                    <div className="w-md-75 w-lg-60 text-center mx-md-auto mb-5 mb-md-6">
                        <h3 className="text-white mb-3">This device is hard wired and we will help you locate a local installer.</h3>
                    </div>

                    <div className="d-md-flex justify-content-center align-items-md-center text-center">
                        <div className="d-md-flex justify-content-start align-items-md-center text-center">
                            <h4 className="text-white text-indigo my-2">Instructions for installers can be found at:</h4>
                            <a className="my-2 ms-sm-3 btn d-block d-sm-inline-block btn-primary btn-transition" href="https://docs.google.com/document/d/e/2PACX-1vSoMlBHCAwoLdX24TbvOpfv8pUgCRIA0DCWHVBtA_iLO5XCOi9U5EnfQYRS486ha7HyMuIwfvcV-2sz/pub?fbclid=IwAR32Amfg6100hcXaS0Djp_McUrQ6ItvPapFVg7Kk4_eIxNrXWlaIhgKDJqs" target="_blank">&nbsp;Here&nbsp;</a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <a className="js-go-to go-to position-fixed" href="javascript:;" style={{visibility: 'hidden'}}
        data-hs-go-to-options='{
            "offsetTop": 700,
            "position": {
                "init": {
                "right": "2rem"
                },
                "show": {
                "bottom": "2rem"
                },
                "hide": {
                "bottom": "-2rem"
                }
            }
            }'>
            <i className="bi-chevron-up"></i>
        </a>
    </React.Fragment>
  );
};

export default MainSite;
