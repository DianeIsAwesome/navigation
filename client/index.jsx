import React from 'react';
// import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import Landing from './Components/Landing/Landing';
import Results from './Components/Results/Results';
import Navbar from './Components/Navbar/Navbar';

// var window = window || global;
// window.Landing = Landing;
// window.Results = Results;
// window.Navbar = Navbar;

// const container = document.getElementById('navigation');

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
// if (container) {
//   ReactDOM.render(<Navigation />, container);
// }
