var app = angular.module("App",[]); //SE CREA UN MÓDULO DE AngularJS

//SE DEFINE EL CONTROLADOR
app.controller("grController",["$scope",function($scope){
    
    $scope.nombre = "";
    $scope.descripcion = "";
    $scope.ciudad = "";
    $scope.origen = "";
    $scope.donaciones = [
        {nombre: "atamel", descipcion: "medicamento para la fiebre, tabletas 200mg"},
        {nombre: "tachipirin", descipcion: "medicamento para la fiebre, jarabe"},
        {nombre: "mentiolate", descipcion: "solución para las heridas"}
    ];
    
    $scope.solicitudes = [
        {nombre: "", descripcion: ""}
    ];
    
    
}]);