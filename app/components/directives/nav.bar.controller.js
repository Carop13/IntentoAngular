angular.module('weatherApp')
.controller('NavBarController', function () {
  var self = this;
  self.openModal = function(){
  	var es = document.getElementById('btn-login').innerHTML;
    if(es === " Sign in "){
      $("#myModal").modal('show');
  	}else{
  		console.log("llegue al logout");
       $("#myModalLogOut").modal('show');
    }
  };

});