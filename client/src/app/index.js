import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngSanitize  from 'angular-sanitize';

import Common from './common';
import Components from './components';
import AppComponent from './app.component';

angular.module('app', [
  Common,
  Components,
  uiRouter,
  ngSanitize
])
  .config(($locationProvider, $urlRouterProvider) => {
    'ngInject';

    $urlRouterProvider.otherwise('/input');
  })
  .component('app', AppComponent);
