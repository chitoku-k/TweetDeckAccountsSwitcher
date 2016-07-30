(() => {
    "use strict";

    const callback = () => {
        $(document).on("dataColumnsLoaded", () => {
            $("div.js-drawer.drawer").on("uiAccountsSelected", (e, { accountKeys }) => {
                if (accountKeys.length <= 1) {
                    return;
                }

                accountKeys.shift();
                $(this).triggerHandler("uiAccountsSelected", e, { accountKeys });

                $(".js-compose-text").focus();
            });
        });
    };

    const script = document.createElement("script");
    script.appendChild(document.createTextNode(`(${callback})();`));
    document.body.appendChild(script);
})();
