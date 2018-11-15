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
  bookownershipID: ""
}
}

_refreshPage() {
  window.location.reload();
}

  handlekeypress=(e)=> {
    if(e.key==='Enter') {
      this._refreshPage();
      var username;
      username=document.getElementById('usernameinput').value;
      this.props.history.push("/user/"+username);
    }
  }

  showBook(cell,row) {
    return '\''+cell.title+'\''+' by '+cell.author;
  }

getAllBooksForUser=()=> {
  axios.get('http://localhost:8081/TheBookClubJava/api/Library/getUserByUsername/'+this.props.match.params.username).then(Response=> {

  this.setState({userID:Response.data.userID})

  axios.get('http://localhost:8081/TheBookClubJava/api/Library/getAllBookOwnershipsForUser/'+this.state.userID).then(Response=> {
  this.setState({
    info:Response.data
  })
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
axios.get('http://localhost:'+port+'/TheBookClubJava/api/Library/getUserByUsername/'+this.props.match.params.username).then(Response=> {

  this.setState({userID:Response.data.userID})

axios.post('http://localhost:'+port+'/TheBookClubJava/api/Library/createBookForUser', {
   book: {title: document.getElementById('bookaddtitle').value ,
      author: document.getElementById('bookaddauthor').value},
      review: document.getElementById('bookaddreview').value,
      rating: document.getElementById('bookaddrating').value,
      userID: this.state.userID
}).then(Response => axios.get('http://localhost:'+port+'/TheBookClubJava/api/Library/getAllBookOwnershipsForUser/'+this.state.userID).then(Response=> {
  this.setState({
    info:Response.data
  })
}))
}
)
}

buttonFunction=(cell,row) => {
//  this.setState({bookownershipID:row.bookownershipID});
var param;
param=row.bookownershipID;
  //return '<button className="btn" type="submit" value={param} onClick={()=>this.deletebook(param)}>Delete</button>';
  return '<th value={param} onClick={()=>this.handleSort(param)} >{param}</th>''
}


deletebook(param) {
var port=8081;
console.log(param);
axios.delete('http://localhost:'+port+'/TheBookClubJava/api/Library/deleteBookForUser/'+this.state.bookownershipID)
}

componentDidMount() {
  this.getAllBooksForUser();
}

render() {
  return (
    <div className = "Userpage">
    <header className="Userpage-header">
    Library: {this.props.match.params.username}
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
<button className="btn">Delete Book</button>
}>
<div>
<input id="bookdeletetitle" type="text"
placeholder="Title..."
/> <br/>
<input id="bookdeleteauthor" type="text"
placeholder="Author..."
/> <br/>
<button className="btn" onClick={this.deletebook}>Delete</button>
</div>
</Popup>

<div>
<BootstrapTable data={this.state.info}>
<TableHeaderColumn dataField='bookownershipID' isKey={true}>ID</TableHeaderColumn>
<TableHeaderColumn dataField='book' dataFormat={this.showBook}>Book</TableHeaderColumn>
<TableHeaderColumn dataField='review'>Review</TableHeaderColumn>
<TableHeaderColumn dataField='rating'>Rating</TableHeaderColumn>
<TableHeaderColumn dataField='button' dataFormat={this.buttonFunction}></TableHeaderColumn>
</BootstrapTable>
</div>

</body>
</div>
);
}
}

export default UserInfo
