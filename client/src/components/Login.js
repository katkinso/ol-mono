import React, { Component } from "react";
import { withRouter, Link } from 'react-router-dom';
import Authenticate from './partials/Authenticate';
import Register from './partials/Register';
import api from '../api/api';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            error: "",
            message: "",
            isRegistering: false,
            firstName: "",
            lastName: ""
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

    handleInputChange(e) {
        const value = e.target.value;
        const key = e.target.id;
        this.setState({ [key]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.state.isRegistering){

            api.register({
                "firstName": this.state.firstName,
                "lastName": this.state.lastName,
                "email": this.state.email,
                "password": this.state.password,
                "passwordConfirmation": this.state.password,
            }, (err, res) => {
                if (!err) {
                    this.props.history.push('/dashboard')
                } else {
                    this.setState({
                        error: "that's not right"
                    })
                }
            })

        }else{

            api.authenticate({
                "email": this.state.email,
                "password": this.state.password,
            }, (err, res) => {
                if (!err) {
                    this.props.history.push('/dashboard')
                } else {
                    this.setState({
                        error: "that's not right"
                    })
                }
            })

        }//else

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
                                    (
                                        <Register
                                            firstName={this.state.firstName}
                                            lastName={this.state.lastName}
                                            password={this.state.password}
                                            email={this.state.email}
                                            handleInputChange={(e) => this.handleInputChange(e)}
                                            handleSubmit={(e) => this.handleSubmit(e)}
                                        />
                                    )
                                    :
                                    (
                                        <Authenticate
                                            email={this.state.email}
                                            password={this.state.password}
                                            handleInputChange={(e) => this.handleInputChange(e)}
                                            handleSubmit={(e) => this.handleSubmit(e)}
                                        />
                                    )
                                }
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
