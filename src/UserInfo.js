import React, { Component } from 'react';
import './Userpage.css';
import axios from 'axios';
import Popup from 'reactjs-popup';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import ReactDOM from 'react-dom';



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
  //      ReactDOM.render(table,document.getElementById('table'));
  // try changing state within rendering so automatically updates component when pass state as prop
        //this.getuser();
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

  axios.put('http://localhost:'+port+'/TheBookClubJava/api/Library/updateUser/'+this.props.match.params.userID, {
    username: document.getElementById('usernameupdate').value,
    userID:this.props.match.params.userID
  })

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

goBack=()=> {
  this.props.history.push("/");
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

<button className="btn float-right" onClick={this.goBack}>Back</button>



<Popup  trigger={
<button className="btn">Add Book</button>
}>
<input id="bookaddtitle" type="text" style={{width:'100%'}}
placeholder="Title..."
/> <br/>
<input id="bookaddauthor" type="text" style={{width:'100%'}}
placeholder="Author..."
/> <br/>
<input id="bookaddreview" type="text" style={{width:'100%'}}
placeholder="Review..."
/> <br/>
<input id="bookaddrating" type="text" style={{width:'100%'}}
placeholder="Rating (1-5)..."
/> <br/>
<button className="btn" onClick={this.addbook}>Add</button>
</Popup>

<br/> <br/>

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

<br/> <br/>


<div id="table">
<BootstrapTable data={this.state.info} className="table table-striped">
<TableHeaderColumn dataField='bookownershipID' width={'5%'} tdStyle={ { whiteSpace: 'normal', width:'5%' } } isKey={true}>ID</TableHeaderColumn>
<TableHeaderColumn dataField='book' width={'25%'} tdStyle={ { whiteSpace: 'normal', width:'25%'} } dataFormat={this.showBook}>Book</TableHeaderColumn>
<TableHeaderColumn dataField='review' width={'40%'} tdStyle={ { whiteSpace: 'normal', width:'40%'} }>Review</TableHeaderColumn>
<TableHeaderColumn dataField='rating' width={'15%'} tdStyle={ { whiteSpace: 'normal', width:'15%'} }>Rating</TableHeaderColumn>
<TableHeaderColumn dataField='button' width={'15%'} tdStyle={ { whiteSpace: 'normal', width:'15%'} } dataFormat={this.buttonFunction}></TableHeaderColumn>
</BootstrapTable>
</div>




</body>
</div>

);
}
}

export default UserInfo
