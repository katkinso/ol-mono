import React, { Component } from "react";
import { withRouter } from 'react-router-dom'
import api from '../../api/api'
import Header from '../Shared/Header'
import SubHeader from './SubHeader'


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
          isRegistered: false,
        },
        session: {},
        sessionId: this.props.match.params.id
     };     

      
      api.session(this.state.sessionId, (err,res) => {
        if (!err){
            const session = res.data;
            this.setState({session})
        }
      })

      api.me((err,res) => {
        if (!err){
            const user = res.data;
            let foundSession = user.sessions.find(session => session.id === parseInt(this.state.sessionId))

            if (foundSession){
              user.isRegistered = true;
            }
            this.setState({user})
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

    const { session, user } = this.state;

    return (

      <div className="container-fluid px-0 pb-5">
        <Header user={user}/>
        <SubHeader user={user} session={session} toggleRegistration={e => this.toggleRegistration(e)} />
          <div className="container pt-5">
              <p>{session.description}</p>
          </div>
      </div>
    );
  }
};

export default withRouter(SessionDetail);
