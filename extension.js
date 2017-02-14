(() => {
    const callback = () => {
        function drawer() {
            $("div.js-drawer.drawer").on("uiAccountsSelected", (e, { accountKeys }) => {
                if (accountKeys.length <= 1) {
                    return;
                }

                accountKeys.shift();
                $(this).triggerHandler("uiAccountsSelected", e, { accountKeys });

                $(".js-compose-text").focus();
            });
        }

        function observe() {
            const modal = $("#actions-modal");
            const observer = new MutationObserver(() => {
                const selector = modal.find("ul.js-account-selector");
                const selected = selector.find(".acc-selected")
                                         .map((i, e) => e.dataset.id)
                                         .get();

                let switching = false;
                selector.on("td-accounts-change", (e, { selectedAccounts }) => {
                    if (switching) {
                        return;
                    }

                    const [ current ] = selectedAccounts.filter(x => !selected.includes(x.account));
                    selected.length = 0;

                    if (!current) {
                        return;
                    }

                    selector.find(".acc-selected").each((i, e) => {
                        if (e.dataset.id === current.account) {
                            return;
                        }

                        switching = true;
                        e.click();
                        switching = false;
                    });

                    selected.push(current.account);
                });
            });

            observer.observe(modal.get(0), {
                attributes: true,
                attributeFilter: ["style"],
            });
        }

        $(document).on("dataColumnsLoaded", () => {
            drawer();
            observe();
        });
    };

    const script = document.createElement("script");
    script.appendChild(document.createTextNode(`(${callback})();`));
    document.body.appendChild(script);
})();
