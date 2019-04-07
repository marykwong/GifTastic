$(document).ready(function(){

    //my array
    var topics = ["corgi", "golden retriver", "shiba inu", "chow chow", "poodle", "beagle"];

    //array buttons
    function renderButtons() {
        $("#myButtons").empty();
        for (i = 0; i < topics.length; i++) {
            $("#myButtons").append("<button class='btn btn-warning dog' data-topic='" + topics[i] + "'>" + topics[i] + "</button>");
        }
    } 
    
    //display initial buttons
    renderButtons();
  
    //when a dog button is clicked
    $(document).on('click', '.dog', function() {
    //store name of each dog in variable doggo
        var doggo = $(this).attr("data-topic");
        console.log(this)
        //search variable doggo + api key + limit to 10 gifs
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + doggo + "&api_key=7lGan93Wp6WZqVcPSX8uhY5l5DD8m7tH" + "&limit=10";
    
        // AJAX to get api info
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            //store response data from api in variable results
            var results = response.data;
            //empty the gifs div to start
            $('#gifs').empty();
            //loop to show images
            for ( var j=0; j < results.length; j++) {
                //store image in variable imageView
                var imageView = results[j].images.fixed_height.url;
                //store still image in variable still
                var still = results[j].images.fixed_height_still.url; 
                //add attributes to variable gifImage for still/animation. Start off still.
                var gifImage = $('<img>').attr("src", still).attr('data-animate', imageView).attr('data-still', still);
                    gifImage.attr('data-state', 'still');
                    //prepending to the div gifs
                    $('#gifs').prepend(gifImage);
                    //change state when clicked
                    gifImage.on('click', animateGif);
    
                // Pulling ratings for each movie
                var rating = results[j].rating;
                //display rating
                var displayRated= $('<p>').text("Rating: " + rating);
                $('#gifs').prepend(displayRated);
            } 
    
    });
    
    //function to stop and animate gifs
    function animateGif() { 
        var state = $(this).attr('data-state');
        console.log(this)
        //if image is still, animal it
            if (state === 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
        //otherwise make it still
            } else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }
            } 
        });  
    //add dog name buttons and display them
    document.querySelector("#add-dog").addEventListener("click", (event) => {
        event.preventDefault();
        // This line grabs the input from the textbox
        var topic = document.querySelector("#dog-input").value.trim();
        // Adding the dog name from the textbox to our array
        topics.push(topic);
        console.log(topics);
        //call function to apply to new buttons
        renderButtons();
        return false;
    
    });

});


