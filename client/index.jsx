if (typeof window === 'undefined') {
  global.window = {}
}
import Navigation from './Navigation.jsx';


global.window.Landing = Landing;
global.window.Results = Results;
global.window.Navbar = Navbar;

const container = document.getElementById('navigation');

if (container) {
  ReactDOM.render(<Navigation />, container);
}
