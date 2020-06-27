    
var elements = $('.card-panel, .card, .input-field label, nav, .btn, .text_city');
    elements.toggleClass(localStorage.toggled);

    function darkLight() {
        /*DARK CLASS*/
        if (localStorage.toggled != 'dark') {
            elements.toggleClass('default', false); //Ajoute la classe
            elements.toggleClass('dark', true); //Ajoute la classe
            localStorage.toggled = "dark";

        } else {
            elements.toggleClass('dark', false); //Supprime la classe
            elements.toggleClass('default', true); //Ajoute la classe
            localStorage.toggled = "default";
        }
    }

    //Ajouter la propriété 'vérifié' à l'entrée si l'arrière plan == sombre
    if (elements.hasClass('dark')) {
        $('#switchmode').prop("checked", true)
    } else {
        $('#switchmode').prop("checked", false)
    }
