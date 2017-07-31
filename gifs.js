// Initial array of sports
$(document).ready(function(){
    var topics = ['Cleveland Browns','badminton', 'soccer', 'hockey', 'tennis'];

    // ========================================================

  //  create topics array buttons
    function buttonSports(){
        $('#buttonsView').empty();
        
        for ( var i=0; i < topics.length; i++) {
            //create all buttons
            var a = $('<button>');
            a.addClass('sports');
            a.attr('data-name', topics[i]);
            a.text(topics[i]);
            $('#buttonsView').append(a);
        }
    }    
    buttonSports();


//on button click
  $(document).on('click', '.sports', function() {

    var sports = $(this).html(); 
    console.log(sports);
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + sports + "&api_key=bf770616265c49f1b420ae303caf9b6c&limit=10";
        console.log(queryURL);
        $.ajax({url: queryURL, method: 'GET'})
        .done(function(response) {
            // grabs the data
            var results = response.data;
            console.log(results);
            //empties the div before adding more gifs
            $('#sportsView').empty();
                //loops through the data
                for ( var j=0; j < results.length; j++) {
                    var imageDiv = $('<div>');
                    var imageView = results[j].images.fixed_height.url;
                    var still = results[j].images.fixed_height_still.url;
                    console.log(imageView);  
                    var sportsImage = $('<img>').attr("src", still).attr('data-animate', imageView).attr('data-still', still);
                    sportsImage.attr('data-state', 'still');
                    $('#sportsView').prepend(sportsImage);
                    sportsImage.on('click', playGif);
                    
                    // pulling the rating
                        var rating = results[j].rating;
                        console.log(rating);
                        var displayRated= $('<p>').text("Rating: " + rating);
                        $('#sportsView').prepend(displayRated);
            
                } //for loop
        }); // done response

        function playGif() { 
                    var state = $(this).attr('data-state');
                    console.log(state);
                 if ( state == 'still'){
                     $(this).attr('src', $(this).data('animate'));
                      $(this).attr('data-state', 'animate');
                 } else{
                     $(this).attr('src', $(this).data('still'));
                     $(this).attr('data-state', 'still');
                    }

                } //on click sports
                
    }) // document on click

       


//adding new button
$(document).on('click', '#addSports', function(){
    if ($('#sports-input').val().trim() == ''){
      alert('Input can not be left blank');
   }
   else {
    var sports = $('#sports-input').val().trim();
    topics.push(sports);
    $('#sports-input').val('');
    buttonSports();
    return false;

    }

});



}); 