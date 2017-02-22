const os = require("os");
const path = require("path");
const spawn = require("child-process-promise").spawn;
const fs = require("mz/fs");
const glob = require("glob-promise");
const JSZip = require("node-zip");

const chrome = {
    linux: "/usr/bin/google-chrome",
    darwin: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    win32: os.homedir() + "\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe",
};

module.exports = class ChromeExtension {
    constructor(target) {
        this.target = target || "*.{js,png,json}";
    }

    async byCrx() {
        if (!chrome[os.platform()]) {
            throw new Error("This operating system is not supported");
        }

        // Remove the files which were already generated
        try {
            await Promise.all([
                fs.unlink("target.crx"),
                fs.unlink("target.pem"),
                fs.mkdir("target"),
            ]);
        } catch (e) {
            // No problem if fails
        }

        // Copy files to the destination directory
        await glob(this.target).then(files =>
            files.map(filename =>
                fs.createReadStream(filename).pipe(fs.createWriteStream(path.join("target", filename)))
            )
        );

        await spawn(chrome[os.platform()], ["--pack-extension=" + path.resolve("target")]);
        await fs.unlink("target.pem");
        if (!await fs.exists("target.crx")) {
            throw new Error("The extension was not created.");
        }
    }

    async byZip(destination) {
        const zip = new JSZip();
        for (const filename of await glob(this.target)) {
            zip.file(filename, await fs.readFile(filename));
        }

        return fs.writeFile(destination, zip.generate({
            base64: false,
            compression: "DEFLATE",
        }), "binary");
    }
};
