import React, {Component} from 'react'
import './App.css'
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import UserPage from 'Userpage';
import Homepage from 'Homepage';

class App extends Component {

  render() {
    return (
      <router>
    );
  }

}

export default App;

function Router() {
  return (
    <Router>
        <div>
            <ul>
                <li><Link to="/">Homepage</Link></li>
                <li><Link to="/user">Userpage</Link></li>
                //<li><Link to="/formexample">FormExample</Link></li>
            </ul>
            <hr />
            <Route exact path="/" component={Home} />
            <Route path="/user" component={Userpage} />
          //  <Route path="/formexample" component={FormExample} />
        </div>
    </Router>
);
}
