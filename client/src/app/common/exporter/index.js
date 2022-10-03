import angular from 'angular';
import CsvExporterComponent from './csv';

const exporterModule = angular.module('exporter', [])
  .component('csvExporter', CsvExporterComponent)
  .name;

export default exporterModule;
