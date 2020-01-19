import React, { Component } from "react";
import { withRouter } from 'react-router-dom'
import api from '../api/api'
import Header from './partials/Header'
import SubHeaderSession from './partials/SubHeaderSession'

class SessionDetail extends Component {

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
          nextSession: "",
          isRegistered: false,
        },
        session: [],
        sessionId: this.props.match.params.id
     };     
      
    //  const sessionId = this.props.match.params.id
      api.session(this.state.sessionId, (err,res) => {
        if (!err){
            const session = res.data;
            this.setState({session})
        }
      })

      api.me((err,res) => {
        if (!err){
            let user = res.data;
            this.setState({user})

            let foundSession = user.sessions.find(session => session.id === this.state.sessionId)
            if (foundSession.id) {user.isRegistered = true};
            
            this.setState({user}) 
            ///XXX some kind of issue with order/async - state not set properly. Have to call 2x

          }
      })

   }//


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

    const { session, user } = this.state;

    return (

      <div className="container-fluid px-0 pb-5">
        <Header user={user}/>
        <SubHeaderSession user={user} session={session} toggleRegistration={e => this.toggleRegistration(e)} />
          <div className="container pt-5">
              <p>{session.description}</p>
          </div>
      </div>
    );
  }
};

export default withRouter(SessionDetail);
