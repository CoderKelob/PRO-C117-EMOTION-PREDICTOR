let date = new Date();
const displayDate = "Date: "+date.toLocaleDateString();

$(document).ready(function(){
    //  Fetch the current date and update it in the DOM

    console.log('Ready')
    $("#date").html(displayDate);

    //  write an event, when Submit button is clicked
    $('#button').click(function(){

        //  get the text value from the textarea using the 'val()' method
        let text_value = $('text').val()

        //  Convert it to JS object.
        //  Provide a 'key' here and in write the same in app.py file as well to extract data
        let input_text = {'text' : text_value}
        console.log(input_text)

        //  ajax request
        $.ajax({

            //  type of web request
            type : 'POST',
            url: "/predict-emotion",
            data: JSON.stringify(input_text),
            dataType: "json",
            contentType: 'application/json',

            //  if everything is successful, run this function
            success : function(result){
                predictedEmotion = result.data.predicted_emotion;
                const emotionURL = result.data.predicted_emotion_img_url;
                $("#sentiment").html(predictedEmotion);
                $("#sentiment").css("display","block");
                $("emoji").attr("src",emotionURL);
                $("emoji").css("display","block");
                console.log(result);

            },

            //  if any error, run this function
            error : function(result){

                console.log(result)
            }
        })


        //  clearing the textbox after every button push
        $('#text').val("")
    })
        
})