pokemonPlannerApp.controller('HistoryCtrl', function ($scope,Pokemon,$firebaseObject) {

	//if (Pokemon.getUser() == firebase.auth().currentUser) {
	//} else {
	//}

	var refUser = firebase.database().ref().child("users/" + Pokemon.getUser().uid);
    $firebaseObject(refUser).$loaded().then(function() {
    	$scope.myUser = $firebaseObject(refUser)

    });


});