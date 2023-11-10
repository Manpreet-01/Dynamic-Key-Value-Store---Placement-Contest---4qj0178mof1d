import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import KeyValueStore from './KeyValueStore';

function App() {
  return (
    <Router>
      <div id="main">
        <nav>
          <Link to="/">Reset</Link>
        </nav>
        <Switch>
          <Route path="/key-value/:keyValue" component={KeyValueStore} />
          <Route exact path="/" component={KeyValueStore} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
