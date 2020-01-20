import React, { Component } from "react";
import Button from '../ui/Button'
import TextInput from '../ui/TextInput'

class Register extends Component {

    constructor(props) {

        super(props);

        this.state = {
            passwordInputType: 'password',
        }
    }

    togglePasswordVisibility() {
        this.setState(prevState => ({
            passwordInputType: prevState.passwordInputType === 'password' ? 'text' : 'password'
        }));
    }

    render() {

        let passwordButtonContent = this.state.passwordInputType === 'password' ? 'SHOW' : 'HIDE'

        return (
            <form onSubmit={e => this.props.handleSubmit(e)}>
                <h2 className="text-white text-center py-3">Sign up</h2>
                <div className="form-group">
                    <TextInput
                        id="email"
                        type="email"
                        placeholder="email"
                        value={this.props.email}
                        onChange={(e) => this.props.handleInputChange(e)}
                    />
                </div>
                <div className="form-group">
                    <TextInput
                        id="firstName"
                        type="text"
                        placeholder="first name"
                        value={this.props.firstName}
                        onChange={(e) => this.props.handleInputChange(e)}
                    />
                </div>
                <div className="form-group">
                    <TextInput
                        id="lastName"
                        type="text"
                        placeholder="last name"
                        value={this.props.lastName}
                        onChange={(e) => this.props.handleInputChange(e)}
                    />
                </div>

                <div className="input-group mb-3">
                    <TextInput
                        id="password"
                        type={this.state.passwordInputType}
                        placeholder="password"
                        value={this.props.password}
                        onChange={(e) => this.props.handleInputChange(e)}
                    />
                    <div className="input-group-append">
                        <button className="btn text-white" type="button"
                            onClick={() => this.togglePasswordVisibility()}>
                            {passwordButtonContent}
                        </button>
                    </div>
                </div>
                <Button type="submit" text="REGISTER" for="register" />
            </form>
        )
    }
};

export default Register

// {(e) => this.handleInputChange(e)}

// <div className="form-group">
// <TextInput
//     id="password"
//     type="password"
//     placeholder="password"
//     value={props.password}
//     onChange={(e) => props.handleInputChange(e)}
// />
// </div>

// <div className="form-group pb-3">
//                 <TextInput
//                     id="passwordConfirmation"
//                     type="password"
//                     placeholder="confirm password"
//                     value={this.props.passwordConfirmation}
//                     onChange={(e) => this.props.handleInputChange(e)}
//                 />
//             </div>