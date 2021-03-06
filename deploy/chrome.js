const fs = require("mz/fs");
const deploy = require("chrome-extension-deploy");

(async () => {
    const filename = "dist/chrome/extension.zip";
    try {
        const zip = await fs.readFile(filename);
        await deploy({
            zip,
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
            id: process.env.GOOGLE_EXTENSION_ID,
        });
        console.log("Deploy: Extension is successfully published.");
    } catch (e) {
        console.error("Error: cannot publish extension.");
        console.log(e);
        process.exit(1);
    }
})();
