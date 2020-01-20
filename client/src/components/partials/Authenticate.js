import React from "react";
import Button from '../ui/Button'
import TextInput from '../ui/TextInput'

const Authenticate = props => {

    return (

        
        <form onSubmit={e => props.handleSubmit(e)}>
            <h2 className="text-white text-center py-3">Login</h2>
            <div className="form-group">
                <TextInput
                    id="email"
                    type="email"
                    placeholder="email"
                    value={props.email}
                    onChange={(e) => props.handleInputChange(e)}
                />
            </div>

            <div className="form-group pb-3">
                <TextInput
                    id="password"
                    type="password"
                    placeholder="password"
                    value={props.password}
                    onChange={(e) => props.handleInputChange(e)}
                />
            </div>
            <Button type="submit" text="LOG IN" for="login" />

        </form>
    )
};

export default Authenticate

// {(e) => this.handleInputChange(e)}