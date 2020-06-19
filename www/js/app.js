$(document).ready(function () {

    //Variables de stockage
    var city = localStorage.getItem("city"); //on récupere la variable localStorage ayant pour clé city, puis on la met dans une variable
    const myAPPID = "36fc5ff10b8e82d7dc74e88c09113750"; //ici on déclare notre APPID pour OpenWeatherMap

    //Tableaux des mois et jours
    const monthName = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    const dayName = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

    //Obtient la date du jour
    var maDate = new Date();
    var jour = maDate.getDay(); //Jour
    var njour = maDate.getDate(); //Numéro du jour
    var mois = maDate.getMonth(); //Mois (commence à 0, donc +1)
    var hours = maDate.getHours();
    var minute = maDate.getMinutes();

    var dateToday = dayName[jour] + ' ' + njour + ' ' +monthName[mois] + ' ' + hours + ':' + minute;

    //Fonction qui met la première lettre en majuscule
    String.prototype.ucFirst = function () { return this.substr(0, 1).toUpperCase() + this.substr(1); }
    
    //Donne la météo actuelle
    function getWeatherDay() { // on crée une fonction qui récupere la météo avec les instructions suivantes

        //Variables
        var cardSelector = $("#weatherday"); //on mets notre sélecteur dans une variable
        var cardInfo1 = $("#card_info1"); //on mets notre sélecteur dans une variable
        var cardInfo2 = $("#card_info2"); //on mets notre sélecteur dans une variable
        
        if (city == null) { // on teste si la variable city est nulle
            cardSelector.append("<p>Vous n'avez pas encore renseign&eacute; de ville.</p>"); // on affiche un message dans la card
        } else { // sinon ...
            $("#weatherday *:not(div)").remove(); //Permet de ne pas regénéré le card-panel 

            $.getJSON("http://api.openweathermap.org/data/2.5/weather?q="+ city + "&appid=" + myAPPID + "&lang=fr", function (result) { // on mets le résultat dans une variable result qui vaut le code JSON qu'on voit dans le navigateur
                var cityName = result.name; // le nom de la ville est directement accesible donc pas de souci
                var weatherType = (result.weather[0].description).ucFirst(); // la description du temps est dans le tableau weather (un tableau est défini par des []), on vise le premier (0 = le premier en programmation), puis on prend la valeur de main
                var iconCode = result.weather[0].icon; // Meme chose qu'au dessus sauf qu'on prend la valeur de icon
                var temp = result.main.temp; // cette fois ci on va dans main qui n'est pas un tableau donc pas de '[]', on va de main a temp sans souci
                var tempInCelsius = (temp - 273.15).toFixed(1); // notre temperature est en Kelvin donc on effectue notre soustration pour l'avoir en Celsius, puis le toFixed permet d'arrondir une valeur, le 1 correspond à un chiffre apres la virgule
                var humidity = result.main.humidity; //Notre humidité
                var wind = Math.round(result.wind.speed * 3.6); //La vitesse du vent en km/h
                

                // ici on rempli la card avec nos valeurs, premierement la liste d'information, puis ensuite on affiche l'image avec le code icone
                cardSelector.append("<h4 class='mainweather'>" + cityName + "</h4>");
                cardSelector.append("<span class='dateweather'>" + dateToday + "</span>");
                cardSelector.append("<h4 class='mainweather'>" + tempInCelsius + "°C</h4>");
                cardSelector.append("<h5 class='mainweather'>" + weatherType + "</h5>");
                cardSelector.append("<img src='img/iconweather_128x128/" + iconCode + ".png' class='responsive-img' alt='Weather Icon' width='80px' height='80px'>");
                cardInfo1.html("<p class='infoweather''><img src='img/drop.png' class='responsive-img' alt='Drop'>" + humidity + " %</p>");
                cardInfo2.html("<p class='infoweather''><img src='img/wind.png' class='responsive-img' alt='Wind'>" + wind + " Km/h</p>");

             //Si une ville n'a pas été trouvée
            }).fail(function (jqXHR) {
                if (jqXHR.status == 404) {
                    alert("La ville n'a pas été trouvée.");
                }
            });
        }
    }

    //Donne la météo sur 5 jours avec 3 heures d'intervalle
    function getWeatherWeek() {

        //Variables
        var cardWeatherWeek = $("#weatherweek"); //on mets notre sélecteur dans une variable
        var tabWeather = new Object();
        var moyTempMaxWeather = new Object();
        var moyTempMinWeather = new Object();

        if (city == null) { // on teste si la variable city est nulle
            cardWeatherWeek.append("<p>Vous n'avez pas encore renseign&eacute; de ville.</p>"); // on affiche un message dans la card
        } else { // sinon ...
            //$("#weatherweek *:not(div)").remove(); //Permet de ne pas regénéré le card-panel

            $.getJSON("http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + myAPPID, function (result) { // on mets le résultat dans une variable result qui vaut le code JSON qu'on voit dans le navigateur
                
                //Je récupère les listes de la réponse
                tabWeather = result.list;
                
                //Je parcourt le json et récupère la list de la météo des jours suivant
                for (let index = 0; index < tabWeather.length; index++) {
                    var jourweather = new Date(tabWeather[index].dt * 1000);
                    jourweather = jourweather.getDay();
                    
                    for (let i = 0; i < tabWeather.length; i++) {
                        moyTempMaxWeather = numAverage([tabWeather[i].main.temp_max, tabWeather[i].main.temp_max]);
                    }
                    
                    cardWeatherWeek.slick('slickAdd', '<div><img src=\'img/iconweather_32x32/' + tabWeather[index].weather[0].icon + '.png\' class=\'responsive-img brand-logo img_weather_week\'><h5>' + (tabWeather[index].main.temp_max - 273.15).toFixed(1) + '°C</h5><h5>' + (tabWeather[index].main.temp_min - 273.15).toFixed(1) + '°C</h5><p>' + dayName[jourweather] + '</p></div>');   
                }
                
                /*var cityName = result.name; // le nom de la ville est directement accesible donc pas de souci
                var weatherType = result.weather[0].main; // la description du temps est dans le tableau weather (un tableau est défini par des []), on vise le premier (0 = le premier en programmation), puis on prend la valeur de main
                var iconCode = result.weather[0].icon; // Meme chose qu'au dessus sauf qu'on prend la valeur de icon
                var temp = result.main.temp; // cette fois ci on va dans main qui n'est pas un tableau donc pas de '[]', on va de main a temp sans souci
                var tempInCelsius = (temp - 273.15).toFixed(1); // notre temperature est en Kelvin donc on effectue notre soustration pour l'avoir en Celsius, puis le toFixed permet d'arrondir une valeur, le 1 correspond à un chiffre apres la virgule
                var humidity = result.main.humidity; //Notre humidité
                var wind = Math.round(result.wind.speed * 3.6); //La vitesse du vent en km/h*/

                
                cardWeatherWeek.slick('slickAdd', '<div><h3>2</h3></div>');
                cardWeatherWeek.slick('slickAdd', '<div><h3>3</h3></div>');
                cardWeatherWeek.slick('slickAdd', '<div><h3>4</h3></div>');

                //Si une ville n'a pas été trouvée
            }).fail(function (jqXHR) {
                if (jqXHR.status == 404) {
                    alert("La ville n'a pas été trouvée.");
                }
            });
        }
    }

    function submitForm() { // on crée une fonction qui récupere la valeur du formulaire
        var mycity = $('#city').val(); // on récupere la valeur de notre input avec .val() et on la mets dans une variable
        if (mycity.length >= 3) { // si la variable donc la ville de l'utilisateur est plus grande ou egale que 3 caracteres alors ...
            localStorage.setItem("city", mycity); // on crée une variable localStorage, avec pour clé city et comme valeur la ville de l'utilisateur
            city = mycity; // on donne la ville à la variable city qui est utilisée dans la fonction getWeatherDay
            getWeatherDay(); // on appelle la fonction getWeatherDay pour récuperer la météo de cette ville, ville qui est stockée dans la variable city
        } else { // si le champs fait 2 caracteres ou moins on ...
            alert('Ville invalide'); // affiche une erreur
        }
    }

    $('#getWeather').on('touchstart', function () { // quand on commence à toucher le bouton avec l'id getWeatherDay, alors ...
        submitForm(); // ... on appelle la fonction submitForm qui va traiter ce qu'il y a dans le champ de la ville
    });

    $('form').submit(function (event) { // quand on soumet le formulaire, c'est à dire qu'on appuie sur la touche Entrée, alors ...
        event.preventDefault(); // ici on annule le comportement par défault qui est de recharger la page quand on soumet un formulaire
        submitForm(); // ... on appelle la fonction submitForm qui va traiter ce qu'il y a dans le champ de la ville
    });

    $('.sidenav').sidenav(); //Affiche la slidenav de côté
    getWeatherDay(); // ici on appelle à l'allumage de l'application la fonction getWeatherDay
    //getWeatherWeek();
});