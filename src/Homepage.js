import React, { Component } from 'react';
import './Homepage.css';
import axios from 'axios';
import UserInfo from './UserInfo';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect
} from 'react-router-dom'
import { withRouter } from 'react-router-dom';

// need to use axios to make get/put etc. requests when press button here
// into the axios get requests put the URL defined in my REST for the get

class Homepage extends Component {

  constructor(){
  super();
  this.state = {
    user: "jbnjhgf"
  }
  }

  getUser = () => {
    var port=8081;
    var username;
    username=document.getElementById('usernameinput').value;
  axios.get('http://localhost:'+port+'/TheBookClubJava/api/Library/getUserByUsername/'+username).then(Response => {
    this.setState({
  user: Response.data.userID



   })
  console.log('http://localhost:'+port+'/TheBookClubJava/api/Library/getUserByUsername/'+username);
  console.log(this.state.user);
 })

  return this.state.user;
    }

   submit = () => {
     var username;
     username=document.getElementById('makeuser').value;
     if(username!=null) {
     console.log(username);
     // change url to that of add user method
     axios.post('http://localhost:8081/...', {
       userName: username
     })

   }
  }


  handlekeypress=(e)=> {
    if(e.key==='Enter') {
      console.log(this.getUser());
      this.props.history.push("/user/"+this.getUser());
    }
  }

render() {
  return (
    <div className = "Homepage">
    <header className="Homepage-header">
    <p>
    The Book Group
    </p>
    </header>

    <body className="Homepage-body">
<p>
This is The Book Group. A place where you can record, share and update
your reading history. Our aim is to allow users to share their reading experiences and gain inspiration
for future reads from fellow book lovers. Just enter a name below to view a personal Library or type your
name into the sign up box to start your own!
</p>

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

<input type="button" onClick={this.submit} value="Sign In"/>

</body>
</div>


);
}
}

export default withRouter(Homepage);
