document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    document.addEventListener("offline", onOffline, false);

    function onOffline() {
        M.toast({ html: 'Vous êtes actuellement hors ligne', classes: 'red' });
    }
}