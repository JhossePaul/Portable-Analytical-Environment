import controller from './csv.controller';
import template from './csv.html';

const CsvExporterComponent = {
  controller,
  template,
  bindings: {
    data: '<',
    filename: '@'
  }
};

export default CsvExporterComponent;
