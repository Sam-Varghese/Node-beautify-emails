// Importing necessary modules

// For operating with files
var fs = require("fs");
// For converting all css to inline-css
var inlineCss = require("inline-css");
// For watching over the changes in directories
var chokidar = require("chokidar");
// For stylish colorful texts
var colors = require("colors");

// Variable to keep a count of changes being done
var updateCount = 0;

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
  processEmailTemplate();
});

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

    // Converting all HTML + CSS code to inline css
    inlineCss(htmlCode, options).then((html) => {
      // Pushing processed components code to processedComponents array
      processedComponents.push(html);
      //! Improvement scope
      //* I know that re-writing the Output.html file for each and every component is not the most optimized method. This code will get updated in the future
      // Putting the final processed code of all the components to Output.html
      fs.writeFileSync("Output.html", processedComponents.join(""), (err) => {
        if (err) {
          throw err;
        }
      });
      console.log(colors.green(`Output.html updated`));
    });
  }
}
