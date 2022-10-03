import angular from 'angular';
import uiRouter from 'angular-ui-router';

import inputComponent from './input.component';

const inputModule = angular.module('input', [uiRouter])
  .config(($stateProvider) => {
    'ngInject';

    $stateProvider
      .state({
        name: 'input',
        url: '/input',
        component: 'setup'
      });
  })
  .component('setup', inputComponent)
  .name;

export default inputModule;
