import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import ButlerUI from './components/ButlerUI';
import ArenaUI from './components/ArenaUI';
import AutomationStationUI from './components/AutomationStationUI';
import MarketplaceUI from './components/MarketplaceUI';
import ConvergingPathsUI from './components/ConvergingPathsUI';
import MetarealmsClashUI from './components/MetarealmsClashUI';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // TODO: Implement authentication check and update isAuthenticated state
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={ButlerUI} />
            <Route path="/arena" component={ArenaUI} />
            <Route path="/automation-station" component={AutomationStationUI} />
            <Route path="/marketplace" component={MarketplaceUI} />
            <Route path="/converging-paths" component={ConvergingPathsUI} />
            <Route path="/metarealms-clash" component={MetarealmsClashUI} />
            {/* Routes can be protected or redirected based on isAuthenticated state */}
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;