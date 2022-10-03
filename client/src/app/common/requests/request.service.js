class RequestsService {
  static $inject = ['$http'];

  constructor ($http) {
    this.http = $http;
  }

  rnorm () {
    return this.http({
      url: '/api/rnorm',
      method: 'post'
    });
  }

  tables () {
    return this.http({
      url: '/api/tables',
      method: 'get'
    });
  }
}

export default RequestsService;
