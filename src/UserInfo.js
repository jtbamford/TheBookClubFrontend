import React, { Component } from 'react';
import './Userpage.css';
import axios from 'axios';
import Popup from 'reactjs-popup';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class UserInfo extends Component {

constructor(){
super();
this.state = {
  info: "",
  username: ""
}
}

getUser = (props) => {
  this.setState({username:this.props.username});
  }


addbook=()=> {
var port=8081; // should use a prop here
console.log("works");
// here post to book TableHeaderColumn
axios.post('http://localhost:'+port+'/api/Library/createBook', {
  data: { title: document.getElementById('bookaddtitle').value ,
    author: document.getElementById('bookaddauthor').value}
})
// here post to bookforuser table
axios.post('http://localhost:'+port+'/api/Library/createBookForUser', {
  data: { title: document.getElementById('bookaddtitle').value ,
      author: document.getElementById('bookaddauthor').value,
      review: document.getElementById('bookaddreview').value,
      rating: document.getElementById('bookaddrating').value}
      // need user also }
}).then(Response => axios.get('http://localhost:'+port+'/api/Library/getBookOwnership').then(Response=> {
  this.setState({
    info:Response.data
  })
})
);
}

deletebook=()=> {
var port=8081;
console.log("delete works");
axios.get('http://localhost:'+port+'/api/Library/getBookOwnership', {
  params: {
          title: document.getElementById('bookdeletetitle').value,
          author: document.getElementById('bookdeleteauthor').value}
}).then( Response => {
axios.delete('http://localhost:'+port+'/api/Library/deleteBookForUser', {
  params: {bookownershipID: Response.data.bookownershipId}
})
})
}

render() {
  return (
    <div className = "Userpage">
    <header className="Userpage-header">
    Library: this.state.username
    </header>

// replace this with a return to homepage button and carry out search again there

    <body className="Userpage-body">
<div className="topnav">
<input id="usernameinput" type="text"
  placeholder="Search..."
/> <br/> <br/>
</div>

<Popup trigger={
<button class="button">Add Book</button>
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
placeholder="Rating..."
/> <br/>
<button class="button3" onClick={this.addbook}>Add</button>
</div>
</Popup>

<br/> <br/> <br/>

<Popup trigger={
<button class="button">Delete Book</button>
}>
<div>
<input id="bookdeletetitle" type="text"
placeholder="Title..."
/> <br/>
<input id="bookdeleteauthor" type="text"
placeholder="Author..."
/> <br/>
<button class="button3" onClick={this.deletebook}>Delete</button>
</div>
</Popup>

<div>
<BootstrapTable data={this.state.info}>
<TableHeaderColumn dataField='title' isKey>Title</TableHeaderColumn>
<TableHeaderColumn dataField='author'>Author</TableHeaderColumn>
<TableHeaderColumn dataField='review'>Author</TableHeaderColumn>
<TableHeaderColumn dataField='rating'>Author</TableHeaderColumn>
</BootstrapTable>
</div>

</body>
</div>
);
}
}

export default UserInfo
