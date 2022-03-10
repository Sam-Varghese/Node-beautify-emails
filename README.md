![Logo](logo.png)

---

- This is an application I made in order to code beautiful mails using only [HTML](https://www.wikiwand.com/en/HTML) and [CSS](https://www.wikiwand.com/en/CSS).
- This application is also inspired by [React js](https://reactjs.org/) framework, hence you can split the mails too in different components, and reuse them whenever needed.

---

Kindly checkout this video for a detailed explanation of this application: https://drive.google.com/file/d/1ZIJ8dnI1pmhsMXD7k1_HeUV5dr0FnEEI/view?usp=sharing

---

## Setting the project

---

```mermaid
flowchart TB;

fork(Fork the repository) --> clone(Clone the forked repo.)
clone --> setup(Execute <a href = 'https://github.com/Sam-Varghese/Node-beautify-emails/blob/e8bada47d0c82dd9ac7938c1f8f25506ed407f54/Setup.js'>Setup.js</a>)
setup --> firstSetup(Execute first time setup option. 1st option)
firstSetup --> createComp(Now create a new component. 2nd option)
createComp --> checkCompFolder(Go to <a href='https://github.com/Sam-Varghese/Node-beautify-emails/blob/e6cf49ce1d95fa82ec4e216ec5b165c2ba5641eb/Components'>Components folder</a>)
checkCompFolder --> comp("Go to the component folder (Inside ./Components) you generated recently")
comp --> startServer(Start <a href = 'https://github.com/Sam-Varghese/Node-beautify-emails/blob/e2c48cf440e1041c7e37080bc02e1ed2b212db78/Compiler/Compiler.js'>Compiler/Compiler.js</a>)
startServer --> editHtml(Edit <Component>.html file)
editHtml --> editCss(Edit <Component>.css file)
editCss --> checkWebpage(Check <a href = 'http://127.0.0.1:8080/'>http://127.0.0.1:8080/</a>)
checkWebpage --> editHtml
checkWebpage --> output(Output generated in Output.html)
```

---
