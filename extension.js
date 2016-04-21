(() => {
    "use strict";

    const callback = () => {
        const timer = setInterval(() => {
            const drawer = $("div.js-drawer.drawer");
            if (drawer.length) {
                clearInterval(timer);
                drawer.on("uiAccountsSelected", (event, obj) => {
                    if (obj.accountKeys <= 1) {
                        return;
                    }
                    for (let i = 0; i < obj.accountKeys.length - 1; i++) {
                        $(`.js-account-item[data-account-key='${obj.accountKeys[i]}']`).click();
                    }
                    $(".js-compose-text").focus();
                });
            }
        }, 200);
    };

    const script = document.createElement("script");
    script.appendChild(document.createTextNode(`(${callback.toString()})();`));
    document.body.appendChild(script);
})();
