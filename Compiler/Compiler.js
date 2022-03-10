// Importing necessary modules

// For operating with files
var fs = require("fs");
// For converting all css to inline-css
var inlineCss = require("inline-css");
// For watching over the changes in directories
var chokidar = require("chokidar");
// For stylish colorful texts
var colors = require("colors");
// For the live-server
var liveServer = require("live-server");

// Variable to keep a count of changes being done
var updateCount = 0;
// Opening the output file through live-server
var params = {
    port: 8080, // Set the server port. Defaults to 8080.
    host: "0.0.0.0", // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
    root: "", // Set root directory that's being served. Defaults to cwd.
    open: true, // When false, it won't load your browser by default.
    ignore: "scss,my/templates", // comma-separated string for paths to ignore
    file: "Output.html", // When set, serve this file (server root relative) for every 404 (useful for single-page applications)
    wait: 1000, // Waits for all changes, before reloading. Defaults to 0 sec.
    mount: [["/components", "./node_modules"]], // Mount a directory to a route.
    logLevel: 2, // 0 = errors only, 1 = some, 2 = lots
    middleware: [
        function (req, res, next) {
            next();
        },
    ], // Takes an array of Connect-compatible middleware that are injected into the server middleware stack
};
liveServer.start(params);

async function Chowkidar() {
    // Watching over the Components folder
    chokidar.watch("Components").on("all", (event, path) => {
        // To keep the terminal clean
        console.clear();
        updateCount++;
        // Printing the info
        console.log(
            colors.cyan(updateCount, ") "),
            colors.grey(event, path, new Date().toTimeString())
        );
        // Executing the function to process the data
        // Inside the try catch so as to handle any file not found error
        try {
            processEmailTemplate();
        } catch (error) {
            console.log(colors.red(error));
            setTimeout(() => {
                Chowkidar;
            }, 3000);
        }
    });
}

Chowkidar();

// Function to process all the HTML, CSS files of all components, and to compile all of them to a single email suitable inline css code
function processEmailTemplate() {
    // Reading the prototype text file to get the mail prototype
    var data = fs.readFileSync("Prototype.txt", "utf-8");

    let componentsInHtmlList = data.split("\r\n");

    // Array to store the processed code of all the components
    var processedComponents = [];

    // Looping over all the components of prototype
    for (let i = 0; i < componentsInHtmlList.length; i++) {
        // Making path of all components
        let componentPath = `Components/${componentsInHtmlList[i]}/${componentsInHtmlList[i]}`;

        // Generating the raw html + css code by reading all component files
        var htmlCode = `<style>${fs.readFileSync(
            componentPath + ".css",
            "utf-8",
            (err) => {
                if (err) throw err;
            }
        )}</style>${fs.readFileSync(componentPath + ".html", "utf-8", (err) => {
            if (err) throw err;
        })}`;
        var options = {
            url: "/",
        };

        if (
            fs.readFileSync(componentPath + ".css", "utf-8", (err) => {
                if (err) throw err;
            }).length == 0
        ) {
            fs.writeFileSync("Output.html", htmlCode, (err) => {
                if (err) {
                    throw err;
                }
            });
            console.log(
                colors.red(
                    `No css content detected in ${componentsInHtmlList[i]}`
                )
            );
            console.log(colors.green(`Output.html updated`));
        } else {
            inlineCss(htmlCode, options).then((html) => {
                // Pushing processed components code to processedComponents array
                processedComponents.push(html);
                //! Improvement scope
                //* I know that re-writing the Output.html file for each and every component is perhaps not the most optimized method. This code will get updated in the future
                // Putting the final processed code of all the components to Output.html
                fs.writeFileSync(
                    "Output.html",
                    processedComponents.join(""),
                    (err) => {
                        if (err) {
                            throw err;
                        }
                    }
                );
                console.log(colors.green(`Output.html updated`));
            });
        }
        // Converting all HTML + CSS code to inline css
    }
}
