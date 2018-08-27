import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import Landing from './Components/Landing/Landing.jsx';
import Results from './Components/Results/Results.jsx';
import Navbar from './Components/Navbar/Navbar.jsx';

const Navigation = () => (
  <BrowserRouter>
    <div>
      <Route exact path="/" component={Landing} />
      <Route
        path="/search/:searchQuery"
        render={props => (
          <div>
            <Navbar {...props} />
            <Results {...props} />
          </div>
        )}
      />
      <Route
        path="/listing/:listingId"
        render={props => (
          <div>
            <Navbar {...props} />
          </div>
        )}
      />
    </div>
  </BrowserRouter>
);
export default Navigation;