pokemonPlannerApp.controller('HistoryCtrl', function ($scope,Pokemon,$firebaseObject) {

	if (getUser() == firebase.auth().currentUser) {
		//do something
	}
	else {
		//do something
	}


	//find user in users database
	var refUser = firebase.database().ref().child("users/" + Pokemon.getUser().uid.toString());

	//create object of user
	$scope.myUser = $firebaseObject(refUser);

});