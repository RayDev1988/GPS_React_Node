import React, { useEffect } from 'react'
import { useHistory } from "react-router-dom"

export default function ContactSite() {
  
  const history = useHistory()
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "./assets/js/contact.js";
    script.async = true;
    document.body.appendChild(script);
  return () => {
      document.body.removeChild(script);
    }
  }, []);
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;
    document.body.appendChild(script);
  return () => {
      document.body.removeChild(script);
    }
  }, []);

  return (
    <React.Fragment>
        <header id="header" className="navbar navbar-expand-lg navbar-end navbar-absolute-top navbar-light navbar-show-hide"
                data-hs-header-options='{
                    "fixMoment": 300,
                    "fixEffect": "slide"
                }'>

            <div className="container">
                <nav className="js-mega-menu navbar-nav-wrap">
                    {/* <!-- Default Logo --> */}
                    <a className="navbar-brand" onClick={() => history.push('/')} aria-label="LandingPage">
                        <img className="navbar-brand-logo" src="./assets/img/logo.png" alt="Logo" />
                    </a>
                    {/* <!-- End Default Logo -->? */}

                    {/* <!-- Toggler --> */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-default">
                    <i className="bi-list"></i>
                </span>
                        <span className="navbar-toggler-toggled">
                    <i className="bi-x"></i>
                </span>
                    </button>
                    {/* <!-- End Toggler -->

                    <!-- Collapse --> */}
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <div className="navbar-absolute-top-scroller">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a id="loginMenu" className="nav-link" aria-current="page" onClick={() => history.push('/login')} role="button" aria-expanded="false">Login</a>
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
                    {/* <!-- End Collapse --> */}
                </nav>
            </div>
        </header>
        <main id="content" role="main">
            {/* <!-- Contact Form --> */}
            <div className="container content-space-t-3 content-space-t-lg-5 content-space-b-2">
                <div className="row">
                    <div className="col-lg-6 mb-9 mb-lg-0">
                        {/* <!-- Heading --> */}
                        <div className="mb-5">
                            <h1>Get in touch</h1>
                            <p>We bring vending to businesses and facilities in the Orlando, FL area.</p>
                        </div>
                        {/* <!-- End Heading --> */}

                        {/* <!-- Leaflet --> */}
                        <div className="overflow-hidden">
                            <div id="map" className="leaflet mb-5"
                                    data-hs-leaflet-options='{
                            "map": {
                            "scrollWheelZoom": false,
                            "coords": [28.54023214696275, -81.3715127476033]
                            },
                            "marker": [
                            {
                                "coords": [28.54023214696275, -81.3715127476033],
                                "icon": {
                                "iconUrl": "./assets/svg/components/map-pin.svg",
                                "iconSize": [50, 45]
                                },
                                "popup": {
                                "text": "Orlando, FL 32806, United States"
                                }
                            }
                            ]
                            }'></div>
                        </div>
                        {/* <!-- End Leaflet --> */}

                        <div className="row">
                            <div className="col-sm-6">
                                <h5 className="mb-1">Call us:</h5>
                                <p>+1 (023) 456-6789</p>
                            </div>
                            {/* <!-- End Col --> */}

                            <div className="col-sm-6">
                                <h5 className="mb-1">Email us:</h5>
                                <p>contact@moovetrax.com</p>
                            </div>
                            {/* <!-- End Col --> */}

                            <div className="col-sm-6">
                                <h5 className="mb-1">Address:</h5>
                                <p>Orlando, FL 32806, United States</p>
                            </div>
                            {/* <!-- End Col --> */}
                        </div>
                        {/* <!-- End Row --> */}
                    </div>
                    {/* <!-- End Col --> */}

                    <div className="col-lg-6">
                        <div className="ps-lg-5">
                            {/* <!-- Card --> */}
                            <div className="card">
                                <div className="card-header border-bottom text-center">
                                    <h3 className="card-header-title">Contact Us</h3>
                                </div>

                                <div className="card-body">
                                    {/* <!-- Form --> */}
                                    <form>
                                        <div className="row gx-3">
                                            <div className="col-sm-6">
                                                {/* <!-- Form --> */}
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="first_name">First name *</label>
                                                    <input type="text" className="form-control form-control-lg" name="first_name" id="first_name" placeholder="" aria-label="" required />
                                                </div>
                                                {/* <!-- End Form --> */}
                                            </div>
                                            {/* <!-- End Col --> */}

                                            <div className="col-sm-6">
                                                {/* <!-- Form --> */}
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="last_name">Last name *</label>
                                                    <input type="text" className="form-control form-control-lg" name="last_name" id="last_name" placeholder="" aria-label="" required />
                                                </div>
                                                {/* <!-- End Form --> */}
                                            </div>
                                            {/* <!-- End Col --> */}
                                        </div>
                                        {/* <!-- End Row --> */}

                                        <div className="row gx-3">
                                            <div className="col-sm-6">
                                                {/* <!-- Form --> */}
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="email">Email address *</label>
                                                    <input type="email" className="form-control form-control-lg" name="email" id="email" placeholder="email@site.com" aria-label="email@example.com" required />
                                                </div>
                                                {/* <!-- End Form --> */}
                                            </div>
                                            {/* <!-- End Col --> */}

                                            <div className="col-sm-6">
                                                {/* <!-- Form --> */}
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="phone">Phone</label>
                                                    <input type="tel" className="form-control form-control-lg" name="phone" id="phone" placeholder="+x(xxx)xxx-xx-xx" aria-label="+x(xxx)xxx-xx-xx" />
                                                </div>
                                                {/* <!-- End Form --> */}
                                            </div>
                                            {/* <!-- End Col --> */}
                                        </div>
                                        {/* <!-- End Row --> */}

                                        <div className="row gx-3">
                                            <div className="col-sm-12">
                                                {/* <!-- Form --> */}
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="business">Business</label>
                                                    <input type="text" className="form-control form-control-lg" name="business" id="business" placeholder="" aria-label="email@site.com" />
                                                </div>
                                                {/* <!-- End Form --> */}
                                            </div>
                                            {/* <!-- End Col --> */}
                                        </div>
                                        {/* <!-- End Row --> */}

                                        <div className="row gx-3">
                                            <div className="col-sm-6">
                                                {/* <!-- Form --> */}
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="state">State</label>
                                                    <input type="text" className="form-control form-control-lg" name="state" id="state" placeholder="" aria-label="" />
                                                </div>
                                                {/* <!-- End Form --> */}
                                            </div>
                                            {/* <!-- End Col --> */}

                                            <div className="col-sm-6">
                                                {/* <!-- Form --> */}
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="zip_code">Zip Code</label>
                                                    <input type="text" className="form-control form-control-lg" name="zip_code" id="zip_code" placeholder="" aria-label="" />
                                                </div>
                                                {/* <!-- End Form --> */}
                                            </div>
                                            {/* <!-- End Col --> */}
                                        </div>
                                        {/* <!-- End Row --> */}

                                        {/* <!-- Form --> */}
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="questions">Questions / Comments</label>
                                            <textarea className="form-control form-control-lg" name="hireUsFormNameDetails" id="questions" placeholder="" aria-label="" rows="4"></textarea>
                                        </div>

                                        <div className="mb-3">
                                            <div className="g-recaptcha" data-sitekey="6LeMLwcfAAAAAGZ8Vb5m6UjxUl3wTboTmmKqn4IQ" data-callback="recaptchaCallback"></div>
                                        </div>

                                        {/* <!-- End Form --> */}

                                        <div className="d-grid">
                                            <button type="submit" id="btnSubmit" className="btn btn-primary btn-lg" disabled>Submit</button>
                                        </div>

                                        <div className="text-center">
                                            <p className="form-text">Get one of our high quality vending machines in your business along with unmatched high-quality customer services.</p>
                                        </div>

                                    </form>
                                    {/* <!-- End Form --> */}
                                </div>
                            </div>
                            {/* <!-- End Card --> */}
                        </div>
                    </div>
                    {/* <!-- End Col --> */}
                </div>
                {/* <!-- End Row --> */}
            </div>
            {/* <!-- End Contact Form --> */}


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
  )
}
