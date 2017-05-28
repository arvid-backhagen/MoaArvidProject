// Search controller that we use whenever we have a search inputs
// and search results
pokemonPlannerApp.controller('SearchCtrl', function ($scope,Pokemon, $firebaseArray) {

  var ref = firebase.database().ref().child("pokemon"); 
  // create a synchronized array
  // click on `index.html` above to see it used in the DOM!
  $scope.pokedex = $firebaseArray(ref);

  $scope.player = Pokemon.getPlayer();

  $scope.addPokedex = function() {
    for (var i = 1; i <= 151 ; i++) {
      Pokemon.PokemonSearch.get({id:i},function(poke){
        $scope.pokedex.$add({pokemon:poke});
      //ref.remove()
    },function(poke){
      $scope.status = "There was an error";
    });
    }
  }

  $scope.loading = "Loading...";

  
  $scope.loadingDone = function() {
    $scope.loading = ""
  }

  $scope.sortPokedex = function() {
    return Pokemon.sort($scope.pokedex);;
  }
});