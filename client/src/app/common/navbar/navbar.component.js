import './navbar.css';
import template from './navbar.html';
import controller from './navbar.controller';

const navbarComponent = {
  restrict: 'E',
  bindings: {
    optimisation: '<'
  },
  template,
  controller
};

export default navbarComponent;
