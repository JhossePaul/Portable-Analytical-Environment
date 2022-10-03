import angular from 'angular';
import RequestsService from './request.service';

const requestsModule = angular.module('requests', [])
  .service('requests', RequestsService)
  .name;

export default requestsModule;
