import React, { Component } from 'react';
import './Userpage.css';
import axios from 'axios';

class Userpage extends Component {



  render() {
    return (
      <div className = "Userpage">
      <header className="Userpage-header">
      Library prop
      </header>

      <body className="Userpage-body">
 <div className="topnav">
  <input type="text"
  	placeholder="Search..."
	/> <br/> <br/>
</div>

<button class="button">Add Book</button>

<br/> <br/> <br/>

<button class="button">Delete Book</button>

<div>
<button className="button1">Book One</button>
</div>

<div>
<button className="button1">Book Two</button>
</div>

<div>
<button className="button1">Book Three</button>
</div>

<div>
<button className="button1">Book Four</button>
</div>

<div>
<button className="button1">Book Five</button>
</div>

<p1>
Literary Matches:
</p1>

</body>
</div>
);
}
}

export default Userpage;
