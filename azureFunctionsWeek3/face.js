console.log("test")

function loadFile(event) {
    var picture = document.getElementById("output")
    image.source = URL.createObjectURL(event.target.files[0])
    
}

async function handle(event) {
    console.log("submitting...")
    $("#emotions").html("loading...");
    event.preventDefault();
    
    var myForm = document.getElementById("image-form");
    var payload = new FormData(myForm);

    const resp = await fetch("https://bitcampfaceapiweek2.azurewebsites.net/api/findBeard?", {
        method: "POST",
        body: payload,
    });
    
    var data = await resp.json();

    var beard = data.analysis[0].faceAttributes.facialHair;

    var emotion = data.analysis[0].faceAttributes.emotion;

    var valence = emotion.happiness + emotion.surprise - emotion.anger - emotion.contempt - emotion.disgust - emotion.fear - emotion.sadness;

    if (valence < emotion.neutral) {
        valence = 0.5;
        
    } 
    
    if (valence > 1) {
        valence = 1;
        
    }

    if (valence < 0) {
        valence = 0;
    }

    var resultString = `
    
    <h3> Emotions in the image: </h3> <br />
    <p> anger: ${emotion.anger}</p>
    <p> happiness: ${emotion.happiness}</p>
    <h3>Facial Hair in Image</h3>
    <p> Beard: ${beard.beard}</p>
    <p> Mustache: ${beard.mustache}</p>
    <p> Sideburns: ${beard.sideburns}</p>
    `
    $("#facial-hair").html(resultString);
    
}