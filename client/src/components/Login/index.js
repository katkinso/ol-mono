import React, { Component } from "react";
import { withRouter, Link } from 'react-router-dom';
import Authenticate from './Authenticate';
import Register from './Register';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
           isRegistering: false,
           error: ""
        };
    }

    componentDidMount(){
        this.setState({isRegistering: this.props.location.pathname === '/register' ? true : false})
    }

    setAuthStatus() {
        this.setState(prevState => ({
            isRegistering: !prevState.isRegistering
        }));
    }

    render() {

        let registerText = this.state.isRegistering ? "Already have an account? Login" : "Don't have an account? Sign up!"
        let registerLink = this.state.isRegistering ? "/" : "/register";

        return (

            <div className="container login mt-5">

                <div className="row">
                    <div className="col-sm"></div>
                    <div className="col-sm-5">

                        { /* CARD START */}
                        <div className="card align-middle shadow-sm bg-white rounded">
                            <div className="card-body p-5">

                                <div className="mx-auto logo">
                                    <img src="/assets/images/logo.png" width="50px" alt="logo" />
                                </div>

                                <p className="text-warning">{this.state.error}</p>

                                {this.state.isRegistering ?
                                    ( <Register {...this.state} /> )
                                    :
                                    ( <Authenticate {...this.state} /> )
                                }
                                <br></br>
                                <Link
                                    className="font-weight-bold text-white py-3"
                                    to={registerLink}
                                    onClick={() => this.setAuthStatus()}
                                    >
                                    {registerText}
                                </Link>
                            </div>
                        </div>
                        { /* CARD END */}

                    </div>
                    <div className="col-sm"></div>
                </div>
            </div>
            /* CONTAINER END */

        );
    }
};

export default withRouter(Login);
