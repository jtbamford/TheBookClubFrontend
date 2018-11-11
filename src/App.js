import React, {Component} from 'react';
import './App.css';
import Homepage from './Homepage';
import UserInfo from './UserInfo';
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
            <Route path="/user/:userID" component={UserInfo}/>

        </div>
    </Router>
);
}
