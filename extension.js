(function () {
    "use strict";

    var callback = function () {
        var timer = setInterval(function () {
            var drawer = $("div.js-drawer.drawer");
            if (drawer.length > 0) {
                clearInterval(timer);
                drawer.on("uiAccountsSelected", function (event, obj) {
                    if (obj.accountKeys <= 1) {
                        return;
                    }
                    for (var i = 0; i < obj.accountKeys.length - 1; i++) {
                        $(".js-account-item[data-account-key='" + obj.accountKeys[i] + "']").click();
                    }
                    $(".js-compose-text").focus();
                });
            }
        }, 200);
    };

    var script = document.createElement("script");
    script.appendChild(document.createTextNode("(" + callback.toString() + "());"));
    document.body.appendChild(script);
}());
