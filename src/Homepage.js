import React, { Component } from 'react';
import './Homepage.css';
import axios from 'axios';
import UserInfo from './UserInfo';
import Popup from 'reactjs-popup';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect
} from 'react-router-dom'
import { withRouter } from 'react-router-dom';



class Homepage extends Component {

  constructor(){
  super();
  this.state = {
    user: "",
    userID: "",
    message: ""
  }
  }


  submit = () => {
     var username;
     var port=8081;

     username=document.getElementById('makeuser').value;
     if(username!=null) {
    // console.log(username);
     // change url to that of add user method
    axios.post('http://localhost:'+port+'/TheBookClubJava/api/Library/createUser', {
       username: username
     }).then(Response =>{
       this.setState({message:Response.data.message})
       if(this.state.message==="user has been successfully added") {
       axios.get('http://localhost:'+port+'/TheBookClubJava/api/Library/getUserByUsername/'+username).then(Response=> {

         this.setState({userID:Response.data.userID})
         this.props.history.push("/user/"+this.state.userID);
       }
       )
     }
      //  this.setState({message:Response.data});
     }
     )
   }
  }


  handlekeypress=(e)=> {
    if(e.key==='Enter') {
      var username;
      username=document.getElementById('usernameinput').value;
      var port=8081;

      axios.get('http://localhost:'+port+'/TheBookClubJava/api/Library/getUserByUsername/'+username).then(Response=> {

        this.setState({userID:Response.data.userID})
        this.props.history.push("/user/"+this.state.userID);
      })

    }
  }

render() {
  return (
    <div className = "Homepage">
    <header className="Homepage-header">
    The Book Group
    </header>

   <body className="Homepage-body">
   <br/> <br/>
<p>
This is The Book Group. A place where you can record, share and update
your reading history. Our aim is to allow users to share their reading experiences and gain inspiration
for future reads from fellow book lovers. Just enter a name below to view a personal Library or type your
name into the sign up box to start your own!


<br/> <br/>

	Search:
  <br/>

  <input id="usernameinput" type="text" onKeyPress={this.handlekeypress}
  	placeholder="Search.."
        alt="Search for library user"
        /> <br/> <br/>

	Or <br/> <br/>

	Sign Up: <br/>




  <input id="makeuser" type="text"
	placeholder="Enter name..."
	alt="Enter name to sign up"
  /> <br/> <br/>
  <button className="btn" onClick={this.submit}>Sign In</button>


</p>
</body>
</div>

);
}
}

export default withRouter(Homepage);
