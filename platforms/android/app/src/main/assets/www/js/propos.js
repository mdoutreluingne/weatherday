$(function () {
    $("propos").hide();
    var $pagePropos = $('#propos');

    $pagePropos.click(function () {
        $("app").hide("slow");
        $("propos").show("slow");      
    });

    document.addEventListener("backbutton", backButton,false);

    function backButton(e) {
        e.preventDefault();
        $("propos").hide("slow"); 
        $("app").show("slow");
        
    }
});