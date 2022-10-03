import {csv} from 'd3';

class CsvExporterController {
  download (name) {
    const exportData = this.data
      .map((object) => {
        return _.chain(object)
          .omit('$$hashKey', 'sku', 'lower_bound', 'upper_bound')
          .mapValues((value) => typeof value === 'number' ? value.toFixed(2) : value)
          .value();
      });
    const formatedData = csv.format(exportData);
    const filename = this.exportName(name);
    const blob = new Blob([formatedData], {type: 'text/csv'});

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      this.exporter(blob, filename);
    }
  }

  exportName (name) {
    const filename = name ? name : 'unnamed';
    const extension = '.csv';

    return filename + extension;
  }

  exporter (blob, filename) {
    const event = document.createEvent('MouseEvents');
    const link = document.createElement('a');
    const url = window.URL.createObjectURL(blob);

    link.style = 'display: none';
    link.href = url;
    link.download = filename;
    link.dataset.downloadurl = [
      'text/json',
      link.download,
      link.href
    ].join(':');

    event.initEvent(
      'click', true, false, window,
      0, 0, 0, 0, 0,
      false, false, false, false,
      0, null
    );
    link.dispatchEvent(event);
  }
}

export default CsvExporterController;
