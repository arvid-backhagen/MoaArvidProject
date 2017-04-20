// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
pokemonPlannerApp.factory('Pokemon',function ($resource, $timeout) {

    // Set the configuration for your app
    // TODO: Replace with your project's config object
    var player = 0;

    var config = {
        apiKey: "AIzaSyCopvBmpePv8mlx529uPfA2YZ9DJWve5qA",
        authDomain: "pokedex-baee2.firebaseapp.com",
        databaseURL: "https://pokedex-baee2.firebaseio.com/",
        storageBucket: "pokedex-baee2.appspot.com"
    };
    firebase.initializeApp(config);

    // Get a reference to the database service
    var database = firebase.database();

    this.setPlayer = function(newPlayer){
        player = newPlayer;
    }

    this.getPlayer = function(){
        return player;
    }


    this.search = function() {
        var ref = database.ref("pokemon");
        ref.orderByValue().on("value", function(snapshot) {
            console.log(snapshot.val());
        });
    }

    this.PokemonSearch = $resource('http://pokeapi.co/api/v1/pokemon/:id/',{},{
        get: {
            headers: 
            {
                'Accept': 'application/json'
            }
        }
    });

    this.getDescription = $resource('http://pokeapi.co/:link',{},{
        get: {
            headers: 
            {
                'Accept': 'application/json'
            }
        }
    });

    this.sort = function(list) {
        if (list==null)
            return null;
        return list.sort(Comparator)
    }

    /**
    * Returns a random integer between min (inclusive) and max (inclusive)
    * Using Math.round() will give you a non-uniform distribution!
    */
    this.getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function Comparator(a, b) {
        if (a.pokemon==null || b.pokemon==null)
            return 0;
        if (a.pokemon.national_id < b.pokemon.national_id) return -1;
        if (a.pokemon.national_id > b.pokemon.national_id) return 1;
        return 0;
    }

    // Angular service needs to return an object that has all the
    // methods created in it. You can consider that this is instead
    // of calling var model = new DinnerModel() we did in the previous labs
    // This is because Angular takes care of creating it when needed.
    return this;

});