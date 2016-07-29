(() => {
    "use strict";

    const callback = () => {
        $(document).on("dataColumnsLoaded", () => {
            $("div.js-drawer.drawer").on("uiAccountsSelected", (e, { accountKeys }) => {
                e.stopImmediatePropagation();

                accountKeys.slice(0, -1).forEach(key => {
                    $(`.js-account-item[data-account-key='${key}']`).click();
                });

                $(".js-compose-text").focus();
            });
        });
    };

    const script = document.createElement("script");
    script.appendChild(document.createTextNode(`(${callback})();`));
    document.body.appendChild(script);
})();
