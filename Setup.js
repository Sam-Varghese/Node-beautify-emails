// Importing necessary modules

// For taking inputs
const input = require("input");
// For executing shell commands
const { execSync } = require("child_process");
// For colorful printing
const colors = require("colors");
// For file handling
const fs = require("fs");
// Figlet for fancy fonts
var figlet = require("figlet");

// async fn to get user inputs
async function askDetails() {
    const task = await input.checkboxes(`Kindly select the task: `, [
        "First time setup",
        "Create component",
        "Delete component",
    ]);
    // Making Components directory for "First time setup" and installing necessary packages
    if (task == "First time setup") {
        // Installing necessary packages
        execSync("npm i");
        console.log(colors.green("Installed packages"));
        // Creating components directory
        if (!fs.existsSync("Components")) {
            fs.mkdirSync("Components");
            console.log(colors.green(`Made Components folder`));
        }
        // Creating Output.html file if it does not exists.
        fs.open(`Output.html`, "r", (error, fd) => {
            if (error) {
                fs.writeFile(`Output.html`, "", (err) => {
                    if (err) throw err;
                    console.log(colors.green(`Created Output.html`));
                });
                // If the file already exists
            } else {
                console.log(colors.yellow(`Output.html already exists 🤔`));
            }
        });
    } else if (task == "Create component") {
        const componentName = await input.text(`Name of the component: `);
        // Creating the componentName directory inside Components
        if (!fs.existsSync(`Components/${componentName}`)) {
            fs.mkdirSync(`Components/${componentName}`);
            console.log(colors.green(`Made ${componentName} folder`));
            // Creating HTML files of that component
            fs.appendFile(
                `Components/${componentName}/${componentName}.html`,
                "",
                (err) => {
                    if (err) throw err;
                    console.log(colors.green(`Created ${componentName}.html`));
                }
            );
            // Creating CSS file of that component
            fs.appendFile(
                `Components/${componentName}/${componentName}.css`,
                "",
                (err) => {
                    if (err) throw err;
                    console.log(colors.green(`Created ${componentName}.css`));
                }
            );
        }
    } else if (task == "Delete component") {
        const componentName = await input.text(`Name of the component: `);
        // Deleting the componentName directory
        fs.rmSync(`Components/${componentName}`, {
            recursive: true,
            force: true,
        });
        // Deleting the component from Prototype.txt if it exists
        let prototypeData = fs.readFileSync("./Prototype.txt", "utf-8");
        // Replacing the component name with ''
        let updatedPrototypeData = prototypeData.replace(componentName, "");
        fs.writeFile(`Prototype.txt`, updatedPrototypeData, (err) => {
            if (err) throw err;
            console.log(
                colors.green(`Removed ${componentName} from Prototype.txt`)
            );
        });
    }
}

askDetails();
