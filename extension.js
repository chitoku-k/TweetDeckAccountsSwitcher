(() => {
    const callback = () => {
        /**
         * Hooks "New Tweet" drawer and choose the last selected account.
         */
        function drawer() {
            // Dispatched when any account is clicked
            $("div.js-drawer.drawer").on("uiAccountsSelected", (e, { accountKeys }) => {
                // Cancel when the number of accounts <= 1
                if (accountKeys.length <= 1) {
                    return;
                }

                // Removes an account from the queue with yielding callbacks
                setTimeout(() => {
                    $(e.target).triggerHandler(e.type, { accountKeys: accountKeys.slice(-1) });
                }, 0);

                // Focuses on the textbox
                $(".js-compose-text").focus();
            });
        }

        /**
         * Observes "Retweet from" modal appear and choose the last selected account.
         */
        function observe() {
            // The MutationObserver monitors the style attribute of the retweet modal
            // since its all descendent elements are removed when it is closed.
            const modal = $("#actions-modal");
            const observer = new MutationObserver(() => {
                const selector = modal.find("ul.js-account-selector");
                let selected = selector.find(".acc-selected").data("id");

                selector.on("td-accounts-change", (e, { selectedAccounts }) => {
                    // Cancel when the number of accounts <= 1
                    if (selectedAccounts.length <= 1) {
                        // Assign the last selected account or undefined
                        const [ current ] = selectedAccounts;
                        selected = current ? current.account : null;
                        return;
                    }

                    // Gets the last selected account
                    const [ current ] = selectedAccounts.filter(x => selected !== x.account);

                    // Click all the selected accounts except the last selected one
                    selector.find(".acc-selected").each((i, e) => e.dataset.id === current.account || e.click());
                });
            });

            observer.observe(modal.get(0), {
                attributes: true,
                attributeFilter: ["style"],
            });
        }

        $(document).on("dataColumnsLoaded", () => {
            // Some environments reach here many times
            if ($(document).data("TweetDeckAccountsSwitcher")) {
                return;
            }

            $(document).data("TweetDeckAccountsSwitcher", true);
            drawer();
            observe();
        });
    };

    const script = document.createElement("script");
    script.appendChild(document.createTextNode(`(${callback})();`));
    document.body.appendChild(script);
})();
