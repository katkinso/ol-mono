import React, { Component } from "react";
import { withRouter } from 'react-router-dom'
import api from '../../api/api'
import Header from '../Shared/Header'
import MiniHeader from '../Shared/MiniHeader'
import SubHeader from './SubHeader'
import SessionList from './SessionList'


class Dashboard extends Component {

  constructor(props) {

      super(props);

      this.state = {
          message: "",
          user: {
            id:"",
            email:"",
            firstName: "",
            lastName: "",
            sessions: [],
            nextSession: ""
          },
          sessions: [],
          notification: "Remember, Thursday is a holiday! Don’t forget to submit your answers to the latest survey"
      };     




      api.me((err,res) => {
        if (!err){
            const user = res.data;
            const userSessions = []

            user.sessions.map((session) => {
              return userSessions.push(session.id);
            })

            user.nextSession = user.sessions[0]; //latest date
            user.sessions = userSessions;

            this.setState({user})
        }
      })

      api.sessions('info', (err,res) => {
        if (!err){
            const sessions = res.data;
            this.setState({sessions})
        }
      })

  
      
   
  }

  toggleRegistration(e) {
    e.preventDefault();

    let { user, sessionId } = this.state;

    if (!user.isRegistered){

      api.sessionRegistration(user.id, sessionId, (err,res) => {
        if (err){ console.log(err) }
      })
      user.isRegistered = true; 
    }else{

      api.sessionDeRegistration(user.id, sessionId, (err,res) => {
        if (err){ console.log(err) }
      })  
      user.isRegistered = false; 
    }

    this.setState({ user })

}





 render(){

    const { user, sessions, notification } = this.state;

    return (
        <div className="container-fluid px-0 pb-5">
            <Header user={user} />
            <SubHeader nextSession={user.nextSession} />
            <MiniHeader notification={notification} />
            <SessionList sessions={sessions} userSessions={user.sessions} />
        </div>
      
    );
  }
};

export default withRouter(Dashboard);
