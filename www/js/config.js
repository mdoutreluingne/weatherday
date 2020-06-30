    const myAPPID = "36fc5ff10b8e82d7dc74e88c09113750"; //ici on déclare notre APPID pour OpenWeatherMap

    var elements = $('.card-panel, .card, .input-field label, nav, .btn, .text_city, .title_forecast');
    elements.toggleClass(localStorage.darkmode);

    var esaymode = $('.forecast');
    esaymode.toggleClass(localStorage.easymode);

    function darkLight() {
        /*DARK CLASS*/
        if (localStorage.darkmode != 'dark') {
            elements.toggleClass('default', false); //Supprime la classe
            elements.toggleClass('dark', true); //Ajoute la classe
            localStorage.darkmode = "dark";

        } else {
            elements.toggleClass('dark', false); //Supprime la classe
            elements.toggleClass('default', true); //Ajoute la classe
            localStorage.darkmode = "default";
        }
    }

    //Ajouter la propriété 'vérifié' à l'entrée si l'arrière plan == sombre
    if (elements.hasClass('dark')) {
        $('#switchmode').prop("checked", true)
    } else {
        $('#switchmode').prop("checked", false)
    }

    function easyMode() {
        
        if (localStorage.easymode != 'on') {
            $('.forecast').hide();
            $('.easymode_activate').show();
            localStorage.easymode = "on";
            window.location.reload();

        } else {
            $('.easymode_activate').hide();
            $('.forecast').show();
            localStorage.easymode = "off";
            window.location.reload();
        }
    }

    //Ajouter la propriété 'vérifié' à l'entrée
    if (esaymode.hasClass('on')) {
        $('#easymode').prop("checked", true)
        
    } else {
        $('#easymode').prop("checked", false)
    }

    

    

    
