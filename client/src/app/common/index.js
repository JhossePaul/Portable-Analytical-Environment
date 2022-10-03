import angular from 'angular';
import Navbar from './navbar';
import Requests from './requests';

const commonModule = angular.module('app.common', [
  Navbar,
  Requests
]).name;

export default commonModule;
