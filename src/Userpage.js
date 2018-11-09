import React, { Component } from 'react';
import './Userpage.css';
import axios from 'axios';
import Popup from 'reactjs-popup';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class Userpage extends Component {

  constructor(){
  super();
  this.state = {
    info: "",
  }
}

addbook=()=> {
  console.log("works");
  axios.post('http://localhost:8081/...', {
    data: { title: document.getElementById('bookaddtitle').value ,
      author: document.getElementById('bookaddauthor').value }
  }).then(Response => axios.get('http://localhost:8081/...').then(Response=> {
    this.setState({
      info:Response.data
    })
  })
);
}

deletebook=()=> {
  console.log("delete works");
  axios.get('http://localhost:8081/...').then( Response => {
  axios.delete('http://localhost:8081/...', {
    params: {bookownershipID: Response.data.bookownershipId}
  })
  })
}

  render() {
    return (
      <div className = "Userpage">
      <header className="Userpage-header">
      Library prop
      </header>

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
</BootstrapTable>
</div>

</body>
</div>
);
}
}

export default Userpage;
