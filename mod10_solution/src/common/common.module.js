(function() {
"use strict";

angular.module('common', [])
.constant('ApiPath', 'https://hidden-hollows-30468.herokuapp.com')
.config(config);

config.$inject = ['$httpProvider'];
function config($httpProvider) {
  $httpProvider.interceptors.push('loadingHttpInterceptor');
}

})();
