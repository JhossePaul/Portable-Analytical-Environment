class InputController {
  static $inject = ['requests'];

  constructor (requests) {
    this.requests = requests;
  }

  submit () {
    this.requests.rnorm().then((result) => {
      this.randomNumbers = result.data;
    });
  }

  updateTables () {
    this.requests.tables().then((tables) => {
      this.tables = tables.data.rows;
    });
  }
}

export default InputController;
