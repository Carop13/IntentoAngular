angular.module('weatherApp')
.controller('NavBarController', function () {
  var self = this;
  self.openModal = openModal;

  function openModal(){
  	var es = document.getElementById('btn-login').innerHTML;
    if(es === " Sign in "){
      $("#myModal").modal('show');
  	}else{
       $("#myModalLogOut").modal('show');
    }
  };

});