function loadImage(src)
{
    var imagePromise = $.Deferred();
    var image = new Image();

    image.onload = function() 
    {
        imagePromise.resolve(image);
    };

    image.onerror = function ()
    {
        console.log("Image failed to load, replaced with the corresponding gradient.");
        var gradient = new Image(); //resolves the issue with a question mark image
        gradient.src = 'question-mark-fh239k9aqe5ayqfowratid.webp';
        imagePromise.resolve(gradient); //allows the .done() function to handle the error
                                        //this allows the image to still have the gradient background
    }

    image.src = src;
    
    return imagePromise.promise();
}


function loadVariantImages(src, idList)
{
    var promises = []; //creates a list to store all the image promises
    src.forEach(function(src) 
    {
        var imagePromise = loadImage(src); //runs the function loadImage to get the image promise
        promises.push(imagePromise); //stores the image promise into the promises list
    });

    $.when.apply($, promises)
        .done(function() 
        {
            console.log("All images loaded.");
            for (var i = 0; i < arguments.length; i++) //loop to step through the promises list
            {
                $(".variants").append(arguments[i]); //adds the image to the desired div, which has the class "variants"
                $(arguments[i]).addClass("variant"); //adds the class "variant" for the hover effect
                $(arguments[i]).attr("id", idList[i]); //adds the corresponding id for the variant images, which is for the gradient background
                console.log(arguments[i]);

                $(".variant").hover(function() //when hovered over the headphone variant img
                {
                    $(this).stop(true).animate(
                    {
                        padding: ["10px", "easeOutElastic"] //increases the img size
                    }, 1000);
                }, function() 
                    {
                        $(this).stop(true).animate(
                        {
                            padding: ["0", "easeOutElastic"] //returns the img to normal size
                        }, 1000) 
                    } 
                );
            }
        })
        .fail(function(errorMessage)
        {
            console.error(errorMessage);
        });

}


$(document).ready(function() 
{
    var imageSources = [ //list of all the variant headphone images
        "https://assets.bosecreative.com/transform/e78bbadf-cbee-443c-aeda-17b81dc71ec8/SF_PDP_GALLERY_BLACK-1?quality=90&io=width:816,height:667,transform:fit&io=width:816,height:667,transform:fit",
        "https://assets.bosecreative.com/transform/13204ad8-30eb-4305-aa84-f6c74e3f2228/QCUH_SF_PDP_Gallery_WhiteSmoke_x2_1?quality=90&io=width:816,height:667,transform:fit&io=width:816,height:667,transform:fit",
        "https://assets.bosecreative.com/transform/1f0656f9-6d98-4082-b253-ba3655338262/SF_QCUH_lunarblue_gallery_1_816x612_x2?quality=100&io=width:816,height:667,transform:fit&io=width:816,height:667,transform:fit",
        "https://assets.bosecreative.com/transform/44c36c41-140a-4249-a10a-ef39141e962e/QCUHLE25_Diamond_Exclusive_SF_ECOMM_GALLERY_01_noBadge?quality=90&io=width:816,height:667,transform:fit&io=width:816,height:667,transform:fit",
        "https://assets.bosecreative.com/transform/0030bb24-fa1a-4b4f-acd2-966244b3181b/QCUHLE24_PDP_GALLERY_SF_Sandstone_01_2400x1800?quality=90&io=width:816,height:667,transform:fit&io=width:816,height:667,transform:fit",
        "https://assets.bosecreative.com/transform/775c3e9a-fcd1-489f-a2f7-a57ac66464e1/SF_QCUH_deepplum_gallery_1_816x612_x2?quality=90&io=width:816,height:667,transform:fit&io=width:816,height:667,transform:fit"
    ];

    var idList = [ //list of all corresponding id for the variant images
        "black",
        "whiteSmoke",
        "blue",
        "diamond",
        "sandstone",
        "deepPlum"
    ]

    loadVariantImages(imageSources, idList); //runs the function to load in the variants, taking the source and id

    //Displays the Variant Image when clicked
    $(".variants").on("click", "img", function()
    {
        var headphone = $(this).clone(); //clones clicked headphone variant img
        $("#mainHeadphone").fadeOut(600, function() 
        {
            $("#mainHeadphone").empty(); //removes the current displayed headphone image
            headphone.attr("id", "mainHeadphoneImg"); //adds the id to set the size of new image
            headphone.appendTo("#mainHeadphone"); //appends the new image to be displayed
            $("#mainHeadphone").fadeIn(600);
        });
    });


    //Sets the theme of the page to match Variant Image when clicked
    $(".variants").on("click", "img", function() 
    {
        var textColor = $(this).css("color"); //gets the set text color of the variant
        var color = $(this).css("background-image"); //gets the background gradient of variant
        $(".container").css({ //changes the background gradient to the variant
            "background-image": color,
            "color": textColor}).fadeIn(1000);
        $("nav a").css("color", textColor); //changes the nav links text color
        $("#footer a").css("color", textColor); //changes the footer link text color
    });
});