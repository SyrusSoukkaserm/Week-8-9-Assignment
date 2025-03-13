$(document).ready(function(){
    $(".variants").on("click", "img", function(){
        var headphone = $(this).clone(); //clones clicked headphone variant img
        $("#mainHeadphone").fadeOut(600, function() {
            $("#mainHeadphone").empty(); //removes the current displayed headphone image
            headphone.attr("id", "mainHeadphoneImg"); //adds the id to set the size of new image
            headphone.appendTo("#mainHeadphone"); //appends the new image to be displayed
            $("#mainHeadphone").fadeIn(600);
        });
    });
});

$(document).ready(function() {
    $(".variants").on("click", "img", function() {
        var textColor = $(this).css("color"); //gets the set text color of the variant
        var color = $(this).css("background-image"); //gets the background gradient of variant
        $(".container").css({ //changes the background gradient to the variant
            "background-image": color,
            "color": textColor}).fadeIn(1000);
        $("nav a").css("color", textColor); //changes the nav links text color
        $("#footer a").css("color", textColor); //changes the footer link text color
    });
})

$(document).ready(function() {
    $(".variant").hover(function() { //when hovered over the headphone variant img
        $(this).stop(true).animate({
            padding: ["10px", "easeOutElastic"] //increases the img size
        }, 1000);
    }, function() {
            $(this).stop(true).animate({
                padding: ["0", "easeOutElastic"] //returns the img to normal size
            }, 1000) 
        } 
    );
})
