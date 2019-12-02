import React, { Component } from "react";
import utils from '../../utils/utils'
import { Link } from 'react-router-dom'

const Header = props => {

    const { nextSession } = props;
    const nextSessionDateTime = nextSession ? utils.utcToLocal(nextSession.dateTime) : ""

    const headline = () => {

        if (nextSession){
            return (
            <div>
                <h1>YOUR NEXT SESSION</h1>
                <h2><Link className="text-brighter-blue" to={`/session/${nextSession.id}`}>
                {nextSession.name}</Link></h2>
                <h3 className="text-sm-muted">Total Spots: {nextSession.totalSpots}</h3>
            </div>
            )
        }

        return (<h2 className="text-brighter-blue">No upcoming sessions</h2>)
    }

    

    return (
        <header className="py-3 header-sub border-bottom">
            <div className="container">
                <div className="row flex-nowrap justify-content-between align-items-center">
                    <div className="col-4 pt-1">
                        
                        {headline()}
                        
                    </div>
                    <div className="col-4 d-flex justify-content-end align-items-center">
                        <span className="font-weight-bold">
                        {nextSessionDateTime}
                        </span>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header