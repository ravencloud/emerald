(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {
    $scope.lunchCheck = function() {
        if (!angular.isUndefined($scope.lunchInput)) {
            var lunchInput = $scope.lunchInput;
            //empty or all space lunches don't count via regex filter
            var lunches = lunchInput.split(',').filter(function(entry) { return /\S/.test(entry); });

            if (lunches.length > 0 && lunches.length <= 3) {
                $scope.lunchOutputStyle = "color:green; border: 2px solid green;";
                $scope.lunchOutput = "Enjoy!";
            } else if (lunches.length > 3) {
                $scope.lunchOutput = "Too much!";
                $scope.lunchOutputStyle = "color:green; border: 2px solid green;";
            } else {
                $scope.lunchOutput = "Please enter data first";
                $scope.lunchOutputStyle = "color:red; border: 2px solid red;"; 
            }
      } else {
        $scope.lunchOutput = "Please enter data first";
        $scope.lunchOutputStyle = "color:red; border: 2px solid red;";
      }
  }
}

})();