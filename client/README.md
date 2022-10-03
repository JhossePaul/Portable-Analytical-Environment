## Software Stack

### Frontend
We have chosen a stable and fully supported software stack based on:

- [Angular 1.5][angular]
- [Bootstrap 3][bootstrap]
- [Font Awesome 4][font-awesome]
- [D3 3][d3]
- [Loadash 4][lodash]

All the frontend is compiled, minified and bundled with [Webpack 1.13][webpack].
The source code is mostly written in ES2015+ standards and transpiled with
[Babel 6.17][babel]  with the latest proposed functionalities.
The code is checked for the correct style with [ESLint][eslint] and the
codestyle is based on [Airbnb JS CodeStyle][airbnb].

For styles we use standard CSS3 with full responsiveness and device
compatibility. The VM Optimiser App requires full support for
HTML5 and is shimmed with [Babel polyfills][polyfills].

#### Angular extensions
You can find the Angular dependencies listed below:

- [UI Router][ui-router]
- [ngNotify][ng-notify]
- [ngTable][ng-table]
- [ngFileUpload][ng-file-upload]

### Backend
The backend API is build on [Express.js 4][express] and is intended to
only handle requests to the R Backend and return the optimisation
values to the frontend.

[webpack]: https://webpack.github.io/
[d3]: https://d3js.org/
[font-awesome]: http://fontawesome.io/
[bootstrap]: http://getbootstrap.com/
[angular]: https://angularjs.org/
[lodash]: https://lodash.com/
[eslint]: http://eslint.org/
[airbnb]: https://github.com/airbnb/javascript
[babel]: https://babeljs.io/
[polyfills]: https://babeljs.io/docs/usage/polyfill/
[ng-table]: http://ng-table.com/
[ng-notify]: https://github.com/matowens/ng-notify
[ng-file-upload]: https://github.com/danialfarid/ng-file-upload
[ui-router]: https://github.com/angular-ui/ui-router
[express]: http://expressjs.com/es/
[mrs]: https://www.microsoft.com/en-us/cloud-platform/r-server
[requests]: https://github.com/request/request
