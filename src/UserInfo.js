import React, { Component } from 'react';
import './Userpage.css';
import axios from 'axios';
import Popup from 'reactjs-popup';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class UserInfo extends Component {

constructor(props){
super(props);
this.state = {
  info: "",
  userID: "",
  username: ""
}
}

getuser=()=>{
  var port=8081;

  axios.get('http://localhost:'+port+'/TheBookClubJava/api/Library/getUser/'+this.props.match.params.userID).then(Response=> {

    this.setState({username:Response.data.username})
  })

}

  handlekeypress=(e)=> {
    if(e.key==='Enter') {
      var port=8081;
      var username;
      username=document.getElementById('usernameinput').value;

      axios.get('http://localhost:'+port+'/TheBookClubJava/api/Library/getUserByUsername/'+username).then(Response=> {

        this.setState({userID:Response.data.userID})
        this.props.history.push("/user/"+this.state.userID);
        this.getuser();
        window.location.reload();
      })
    }
  }

  showBook(cell,row) {
    return '\''+cell.title+'\''+' by '+cell.author;
  }

getAllBooksForUser=()=> {
  axios.get('http://localhost:8081/TheBookClubJava/api/Library/getAllBookOwnershipsForUser/'+this.props.match.params.userID).then(Response=> {
  this.setState({
    info:Response.data
  })
})
}


addbook=()=> {
var port=8081; // should use a prop here
console.log("works");
// here post to book TableHeaderColumn
axios.post('http://localhost:'+port+'/TheBookClubJava/api/Library/createBook', {
  title: document.getElementById('bookaddtitle').value ,
    author: document.getElementById('bookaddauthor').value
})
// here post to bookforuser table
//axios.get('http://localhost:'+port+'/TheBookClubJava/api/Library/getUserByUsername/'+this.props.match.params.username).then(Response=> {

//  this.setState({userID:Response.data.userID})

axios.post('http://localhost:'+port+'/TheBookClubJava/api/Library/createBookForUser', {
   book: {title: document.getElementById('bookaddtitle').value ,
      author: document.getElementById('bookaddauthor').value},
      review: document.getElementById('bookaddreview').value,
      rating: document.getElementById('bookaddrating').value,
      userID: this.props.match.params.userID
}).then(Response => axios.get('http://localhost:'+port+'/TheBookClubJava/api/Library/getAllBookOwnershipsForUser/'+this.props.match.params.userID).then(Response=> {
  this.setState({
    info:Response.data
  })
})
//)}
)
}

updateUser=()=> {
  var port=8081;

  //axios.get('http://localhost:'+port+'/TheBookClubJava/api/Library/getUserByUsername/'+this.props.match.params.username).then(Response=> {

  //  this.setState({userID:Response.data.userID})

  axios.put('http://localhost:'+port+'/TheBookClubJava/api/Library/updateUser/'+this.props.match.params.userID, {
    username: document.getElementById('usernameupdate').value,
    userID:this.props.match.params.userID
  }).then(window.location.reload())
//})
}


buttonFunction=(cell,row)=> {
//  this.setState({bookownershipID:row.bookownershipID});
var param;
param=row.bookownershipID;
console.log(param);
//this.deletebook();
  return <button className="btn" onClick={()=>this.deletebook(param)}>Delete</button>;
}


deletebook=(param)=> {
var port=8081;
//console.log("hello");
axios.delete('http://localhost:'+port+'/TheBookClubJava/api/Library/deleteBookForUser/'+param).then(Response=> {
  window.location.reload()
})
}

componentDidMount() {
  this.getAllBooksForUser();
}

render() {
  return (
    <div className = "Userpage">
    <header className="Userpage-header">
    {this.getuser()}
    {this.state.username}'s Library
    </header>

    <body className="Userpage-body">
<div className="topnav">
<input id="usernameinput" type="text" onKeyPress={this.handlekeypress}
  placeholder="Search..."
/> <br/> <br/>
</div>

<Popup trigger={
<button className="btn">Add Book</button>
}>
<div>
<input id="bookaddtitle" type="text"
placeholder="Title..."
/> <br/>
<input id="bookaddauthor" type="text"
placeholder="Author..."
/> <br/>
<input id="bookaddreview" type="text"
placeholder="Review..."
/> <br/>
<input id="bookaddrating" type="text"
placeholder="Rating (1-5)..."
/> <br/>
<button className="btn" onClick={this.addbook}>Add</button>
</div>
</Popup>

<br/> <br/> <br/>

<Popup trigger={
<button className="btn">Update Username</button>
}>
<div>
<input id="usernameupdate" type="text"
placeholder="Username..."
/> <br/>
<button className="btn" onClick={this.updateUser}>Update</button>
</div>
</Popup>


<div>
<BootstrapTable data={this.state.info}>
<TableHeaderColumn dataField='bookownershipID' tdStyle={ { whiteSpace: 'normal', width:'5%'} }  isKey={true}>ID</TableHeaderColumn>
<TableHeaderColumn dataField='book' tdStyle={ { whiteSpace: 'normal', width:'40%' } }  dataFormat={this.showBook}>Book</TableHeaderColumn>
<TableHeaderColumn dataField='review' tdStyle={ { whiteSpace: 'normal', width:'60%' } } >Review</TableHeaderColumn>
<TableHeaderColumn dataField='rating' tdStyle={ { whiteSpace: 'normal', width:'10%' } } >Rating</TableHeaderColumn>
<TableHeaderColumn dataField='button' tdStyle={ { whiteSpace: 'normal' , width:'20%' } }  dataFormat={this.buttonFunction}></TableHeaderColumn>
</BootstrapTable>
</div>

</body>
</div>
);
}
}

export default UserInfo
