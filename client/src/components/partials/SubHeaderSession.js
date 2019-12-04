import React, { Component } from "react";
import { Link } from 'react-router-dom'
import utils from '../../utils/utils'
import Button from '../ui/Button'

const SubHeaderSession = props => {

    const { session, toggleRegistration, user } = props;
    const sessionDateTime = session ? utils.utcToLocal(session.dateTime) : ""

    return (
        <header className="py-3 header-sub-session border-bottom">
            <div className="container">
                <div className="row flex-nowrap justify-content-between align-items-center">
                    <div className="col-8 pt-1">
                        {sessionDateTime}
                        <h1>{session.name}</h1>
                    </div>
                    <div className="col-4 d-flex justify-content-end align-items-center">
                        <span className="font-weight-bold">
                            <Button type="submit" 
                            text={user.isRegistered ? "YOU'RE GOING" : "SIGN ME UP!"} 
                            action={(e) => toggleRegistration(e)} 
                            for="login"></Button>
                        </span>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default SubHeaderSession