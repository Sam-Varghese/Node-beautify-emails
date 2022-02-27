//$ Importing necessary modules

// For operating with files
var fs = require("fs");
// For converting all css to inline-css
var inlineCss = require("inline-css");

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
    fs.writeFileSync(
      "Output.html",
      processedComponents.join(""),
      (err) => {
        if (err) throw err;
      }
    );
  });
}
