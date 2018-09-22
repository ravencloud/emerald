(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {
    $scope.lunchCheck = function() {
        if (!angular.isUndefined($scope.lunchInput)) {
            var lunchInput = $scope.lunchInput;
            //var lunches = lunchInput.split(',').filter(function(el) {return el.length != 0});
            var lunches = lunchInput.split(',').filter(function(entry) { return /\S/.test(entry); });
            //arr = arr.filter(function(entry) { return /\S/.test(entry); })
            //empty items do not count
            //lunches = lunches.filter(Boolean);
            

            if (lunches.length > 0 && lunches.length <= 3) {
                $scope.lunchOutputStyle = "color:green;border: 1px solid green;";
                $scope.lunchOutput = "Enjoy!";
            } else if (lunches.length > 3) {
                $scope.lunchOutput = "Too much!";
            } else {
                $scope.lunchOutput = "Please enter data first";
                $scope.lunchOutputStyle = "color:red;border: 1px solid red;"; 
            }
      } else {
        $scope.lunchOutput = "Please enter data first";
        $scope.lunchOutputStyle = "color:red;border: 1px solid red;";
      }
  }
}

})();