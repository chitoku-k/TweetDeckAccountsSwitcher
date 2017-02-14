const fs = require("mz/fs");
const glob = require("glob-promise");
const jszip = require("node-zip");
const deploy = require("chrome-extension-deploy");

class ChromeExtensionUploader {
    constructor(filename, options) {
        this.filename = filename;
        this.options = options;
    }

    async create() {
        const zip = new JSZip();
        for (const filename of await glob("*.{js,png,json}")) {
            zip.file(filename, await fs.readFile(filename));
        }

        return fs.writeFile(this.filename, zip.generate({
            base64: false,
            compression: "DEFLATE",
        }), "binary");
    }

    async publish() {
        const zip = await fs.readFile(this.filename);
        await deploy(Object.assign(this.options, {
            to: deploy.TRUSTED_TESTERS,
            zip,
        }));
    }
}

(async () => {
    const filename = "target.zip";
    try {
        const uploader = new ChromeExtensionUploader(filename, {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
            id: process.env.GOOGLE_EXTENSION_ID,
        });
        await uploader.create();
        await uploader.publish();
    } catch (e) {
        console.error("Error: cannot publish extension.");
        console.log(e);
    } finally {
        await fs.unlink(filename);
    }
})();
