// Search controller that we use whenever we have a search inputs
// and search results
pokemonPlannerApp.controller('PrintPokemonlistCtrl', function ($scope,Pokemon, $firebaseArray, $firebaseObject) {
  // TODO in Lab 5: you will need to implement a method that searchers for dishes
  // including the case while the search is still running.

  var ref = firebase.database().ref().child("players");
  var refChosenPokemon = firebase.database().ref().child("players/"+Pokemon.getPlayer().toString()+"/chosenPokemon")
  var refTurn = firebase.database().ref().child("settings/turn");

  $scope.otherPlayer = Pokemon.getPlayer() == 1 ? 2:1;
  var refOpponentPokemon = firebase.database().ref().child("players/" + $scope.otherPlayer + "/chosenPokemon");

  $scope.turn = $firebaseObject(refTurn);
  // create a synchronized array
  // click on `index.html` above to see it used in the DOM!
  $scope.myPokemon = $firebaseArray(ref);
  $scope.chosenPokemon = $firebaseObject(refChosenPokemon);

  $scope.myPokemonData = $scope.myPokemon.$loaded(function() {
    $scope.myPokemonData = $scope.myPokemon.$getRecord(Pokemon.getPlayer().toString()); 
  },function(error) {
    console.log(error);
  });

  $scope.setChosenPokemon = function(poke) {
    $scope.chosenPokemon.pokemon = poke;
    $scope.turn.player = $scope.otherPlayer;
    $scope.chosenPokemon.$save();
    $scope.turn.$save();
  }

  $scope.reset = function() {
    console.log("Running reset!");
    alert("You abandoned the game :(");
    $scope.turn.player = true;
    refOpponentPokemon.remove();
    refMyPokemon.remove();
  }
});