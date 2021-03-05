(function () {
'use strict';

angular.module('MsgApp', [])
.controller('MsgController', MsgController);

MsgController.$inject = ['$scope'];
function MsgController($scope) {
  $scope.lunch_menu = "";
  $scope.result = "";
  //var resultvalue= resultado($scope.lunch_menu);
  $scope.showresult = function () {
    var number=numberCharacters ($scope.lunch_menu);
    if (number==0)
    {$scope.result = "Please enter data first";}
    else if (number<=3)
    {$scope.result = "Enjoy!";}
    else{$scope.result = "Too much!";}
  }
  $scope.msg = function () {
    return msg($scope.lunch_menu) 
  }
  
}
function numberCharacters (string) {
  var caracteres =string.split(",");
  var cantidad_caracteres =0;
  var msg="";
  if(string!="")
  {
    
    for (var i = 0; i < caracteres.length; i++) {
      if(caracteres[i]!="")
      {
        cantidad_caracteres += 1;
      }
    }


  }

  return cantidad_caracteres;
}
function msg(lunch_menu) {
  var caracteres =lunch_menu.split(",");
  var cantidad_caracteres =0;
  var cantidad_caracteres_vacios =0;
  var msg="";
  if(lunch_menu!="")
  {
    
    for (var i = 0; i < caracteres.length; i++) {
      if(caracteres[i]=="")
      {
        cantidad_caracteres_vacios += 1;
      }
    }
  }
  if(cantidad_caracteres_vacios>0)
  {
    msg=cantidad_caracteres_vacios+' empty string';
  }
  return msg;
}

})();
