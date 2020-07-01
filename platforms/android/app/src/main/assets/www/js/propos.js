$(function () {
    $("propos").hide();
    var $pagePropos = $('#propos');

    $pagePropos.click(function () {
        $("app").hide("slow");
        $("propos").show("slow");      
    });

    document.addEventListener("backbutton", backButton,false);

    function backButton() {
        e.preventDefault();
        $("app").show("slow");
        $("propos").hide("slow"); 
    }
});