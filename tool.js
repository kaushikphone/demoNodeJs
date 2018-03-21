var angular = require('./myApp/angular.min.js');
module.exports = {
    FetchEmployList: function () {
        console.log("yy");
        var myApp = angular.module('myApp', []);
        console.log(myApp);
        return "kaushik";

    }
};
