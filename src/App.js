import React, {Component} from 'react';
import './App.css';
import Userpage from './Userpage';
import Homepage from './Homepage';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

class App extends Component {

  render() {
    return (
      <RouterCode/>
    );
  }

}

export default App;

function RouterCode() {
    return (
    <Router>
        <div>

            <hr />
            <Route exact path="/" component={Homepage} />
            <Route path="/user" component={Userpage} />

        </div>
    </Router>
);
}
