function getPosition() {
    var options = {
        enableHighAccuracy: true,
        maximumAge: 3600000
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
}

// onSuccess Geolocation
//
function onSuccess(position) {
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude +"&appid=" + myAPPID + "&lang=fr", function (result) { // on mets le résultat dans une variable result qui vaut le code JSON qu'on voit dans le navigateur

        localStorage.setItem("city", result.name);
        window.location.reload();
    });

}

// onError Callback receives a PositionError object
//
function onError(error) {
    alert("Votre position n'est pas activée");
}

