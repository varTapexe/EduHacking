var versionNum = "1.4"

//window.localStorage.setItem("name", "value");
//const foo = window.localStorage.getItem("name");
//window.localStorage.removeItem("name");
//window.localStorage.clear();
this.data = {};
Object.defineProperty(this, "wpm", {
    get: () => this.data.wpm,
    set: value => {
        this.data.wpm = value;
        window.localStorage.setItem("wpm", value.toString());
    }
});
wpm = window.localStorage.getItem("wpm") ? window.localStorage.getItem("wpm") : 45;

Object.defineProperty(this, "autoLesson", {
    get: () => this.data.autoLesson,
    set: value => {
        this.data.autoLesson = value;
        window.localStorage.setItem("autoLesson", value.toString());
    }
});
autoLesson = window.localStorage.getItem("autoLesson") ? window.localStorage.getItem("autoLesson") : false;

Object.defineProperty(this, "autoType", {
    get: () => this.data.autoType,
    set: value => {
        this.data.autoType = value;
        window.localStorage.setItem("autoType", value.toString());
    }
});
autoType = window.localStorage.getItem("autoType") ? window.localStorage.getItem("autoType") : false;

Object.defineProperty(this, "hackStatus", {
    get: () => this.data.hackStatus,
    set: value => {
        this.data.hackStatus = value;
        window.localStorage.setItem("hackStatus", value.toString());
    }
});
hackStatus = window.localStorage.getItem("hackStatus") ? window.localStorage.getItem("hackStatus") : false;

Object.defineProperty(this, "menuStatus", {
    get: () => this.data.menuStatus,
    set: value => {
        this.data.menuStatus = value;
        window.localStorage.setItem("menuStatus", value.toString());
    }
});
menuStatus = window.localStorage.getItem("menuStatus") ? window.localStorage.getItem("menuStatus") : "closed";

Object.defineProperty(this, "guiTop", {
    get: () => this.data.guiTop,
    set: value => {
        this.data.guiTop = value;
        window.localStorage.setItem("guiTop", value.toString());
    }
});
guiTop = window.localStorage.getItem("guiTop") ? window.localStorage.getItem("guiTop") : "5px";

Object.defineProperty(this, "guiLeft", {
    get: () => this.data.guiLeft,
    set: value => {
        this.data.guiLeft = value;
        window.localStorage.setItem("guiLeft", value.toString());
    }
});
guiLeft = window.localStorage.getItem("guiLeft") ? window.localStorage.getItem("guiLeft") : "10px";


console.log(guiTop);
console.log(guiLeft);

const init = function() {
    const injectElement = document.createElement("div");
    injectElement.className = "eduHacking-element";
    injectElement.id = "edH";
    // injectElement.innerText = "EduHacking v1.1 was successfully injected.";
    injectElement.style.backgroundColor = "#2333ad";
    injectElement.style.border = "1px solid #5f5f5f";
    injectElement.style.boxShadow = "3px 3px 10px blue";
    // injectElement.style.boxShadow = "inset 0 0 5px rgba(0, 0, 0, 0.6)"
    injectElement.style.borderRadius = "5px";
    injectElement.style.borderColor = "BLACK";
    injectElement.style.position = "absolute";
    injectElement.style.cursor = "move";
    injectElement.style.zIndex = "99999";
    injectElement.style.width = "180px";
    injectElement.style.top = guiTop;
    injectElement.style.left = guiLeft;
    // injectElement.style.color = "99999";
    document.body.insertBefore(injectElement, document.body.firstChild);

    const titleText = document.createElement("text"); //this exists!?
    titleText.textContent = `EduHacking v${versionNum}`;
    titleText.style.position = "relative";
    titleText.style.left = "15%";
    titleText.style.right = "20%";
    titleText.id = "tT";
    titleText.style.color = "WHITE";
    titleText.style.margin = "auto";
    titleText.style.fontFamily = "museo-slab,sans-serif";
    injectElement.appendChild(titleText);

    const openGUI = document.createElement("button");
    openGUI.innerText = "OPEN";
    openGUI.id = "openGUIButton";
    openGUI.style.backgroundColor = "rgb(39, 39, 39)";
    openGUI.style.color = "WHITE";
    openGUI.style.flexWrap = "wrap";
    openGUI.style.position = "absolute";
    openGUI.style.left = "160px";
    titleText.appendChild(openGUI);

    const getKeyButton = document.createElement("button");
    getKeyButton.innerText = "GET KEY";
    getKeyButton.id = "getKeyButton";
    getKeyButton.style.backgroundColor = "rgb(39, 39, 39)";
    getKeyButton.style.color = "WHITE";
    getKeyButton.style.flexWrap = "wrap";
    getKeyButton.style.position = "absolute";
    getKeyButton.style.left = "235px";
    getKeyButton.style.height = "30px"
    getKeyButton.style.width = "90px"
    titleText.appendChild(getKeyButton);




    const eduMENU = document.createElement("div");
    eduMENU.hidden = true;
    if (window.localStorage.getItem("menuStatus") == "open") {
        eduMENU.hidden = false;
        openGUI.innerText = "CLOSE";
    }
    eduMENU.className = "eduHacking-element";
    eduMENU.id = "eduMENU";
    // injectElement.innerText = "EduHacking v1.1 was successfully injected.";
    // eduMENU.style.backgroundColor = "#4589D3";
    eduMENU.style.backgroundColor = "rgb(92, 111, 255)"
    eduMENU.style.border = "1px solid #5f5f5f";
    // injectElement.style.boxShadow = "inset 0 0 5px rgba(0, 0, 0, 0.6)"
    eduMENU.style.borderRadius = "5px";
    eduMENU.style.borderColor = "#4589D3";
    eduMENU.style.position = "absolute";
    eduMENU.style.zIndex = "99999";
    eduMENU.style.width = "400px";
    eduMENU.style.height = "300px";
    eduMENU.style.position = "absolute";
    eduMENU.style.marginTop = "10px";
    eduMENU.style.boxShadow = "3px 3px 10px blue";
    eduMENU.style.fontFamily = "museo-slab, sans-serif";
    injectElement.appendChild(eduMENU);

    const WelcomeText = document.createElement("text"); //this exists!?
    WelcomeText.textContent = "Welcome to EduHacking";
    WelcomeText.style.fontSize = "20px"
    WelcomeText.style.position = "absolute";
    WelcomeText.style.color = "WHITE";
    WelcomeText.style.left = "20%"
    WelcomeText.style.bottom = "35px"
    WelcomeText.style.margin = "auto";
    WelcomeText.style.fontFamily = "museo-slab,sans-serif";
    WelcomeText.style.textAlign = "center"
    eduMENU.appendChild(WelcomeText);

    eduMENU.appendChild(document.createElement("br"));

    

    const toggleText = document.createElement("text");
    toggleText.innerText = "One Click Type";
    // toggleText.style.fontSize = "30px"
    toggleText.style.position = "relative";
    toggleText.style.left = "7px";
    toggleText.style.color = "BLACK";
    toggleText.style.margin = "auto";
    toggleText.style.fontFamily = "museo-slab, sans-serif";
    eduMENU.appendChild(toggleText);
    //box
    const toggleBox = document.createElement("input");
    toggleBox.id = "toggleHack";
    toggleBox.type = "checkbox";
    toggleBox.style.color = "BLACK";
    toggleBox.style.margin = "auto";
    toggleBox.style.left = "4px";
    toggleText.appendChild(toggleBox);

    if (hackStatus == "true") {
        toggleBox.checked = true;
    }

    eduMENU.appendChild(document.createElement("br"));

    const autoText2 = document.createElement("text");
    autoText2.innerText = "Auto Type";
    autoText2.style.position = "relative";
    autoText2.style.left = "7px";
    autoText2.style.color = "BLACK";
    autoText2.style.margin = "auto";
    autoText2.style.fontFamily = "museo-slab, sans-serif";
    eduMENU.appendChild(autoText2);
    //box
    const autoTypeBox = document.createElement("input");
    autoTypeBox.type = "checkbox";
    autoTypeBox.style.color = "BLACK";
    autoTypeBox.style.margin = "auto";
    autoTypeBox.style.left = "4px";
    autoText2.appendChild(autoTypeBox);

    if (autoType == "true") {
        autoTypeBox.checked = true;
    }

    eduMENU.appendChild(document.createElement("br"));

    const autoText = document.createElement("text");
    autoText.innerText = "Auto Next Lesson";
    autoText.style.position = "relative";
    autoText.style.left = "7px";
    autoText.style.color = "BLACK";
    autoText.style.margin = "auto";
    autoText.style.fontFamily = "museo-slab, sans-serif";
    eduMENU.appendChild(autoText);
    //box
    const autoLessonBox = document.createElement("input");
    autoLessonBox.type = "checkbox";
    autoLessonBox.style.color = "BLACK";
    autoLessonBox.style.margin = "auto";
    autoLessonBox.style.left = "4px";
    autoText.appendChild(autoLessonBox);

    if (autoLesson == "true") {
        autoLessonBox.checked = true;
    }

    eduMENU.appendChild(document.createElement("br"));

    const wpmText = document.createElement("text");
    wpmText.innerText = "Words Per Minute";
    wpmText.style.position = "relative";
    wpmText.style.left = "7px";
    // wpmText.style.top = "10px"
    wpmText.style.color = "BLACK";
    wpmText.style.margin = "auto";
    wpmText.style.fontFamily = "museo-slab, sans-serif";
    eduMENU.appendChild(wpmText);

    const wpmInput = document.createElement("input");
    wpmInput.placeholder = "Default: 45"
    wpmInput.type = "number";
    wpmInput.min = 1;
    wpmInput.value = wpm;
    wpmInput.style.color = "white";
    wpmInput.style.marginLeft = "5px";
    wpmInput.style.backgroundColor = "#2e5f95";
    wpmInput.oninput = () => wpm = wpmInput.value;
    wpmText.appendChild(wpmInput);

    // setInterval(() => {
    //     window.localStorage.setItem("wpm", wpmInput.value)
    // }, 10);

    eduMENU.appendChild(document.createElement("br"));

    const clearButton = document.createElement("button");
    clearButton.innerText = "Log Out";
    clearButton.id = "openGUIButton";
    clearButton.style.backgroundColor = "#4656d4";
    clearButton.style.color = "WHITE";
    clearButton.style.flexWrap = "wrap";
    clearButton.style.position = "absolute";
    clearButton.style.marginLeft = "150px";
    clearButton.style.bottom = "3px"
    eduMENU.appendChild(clearButton);

    const yesClear = document.createElement("button");
    setTimeout(() => {
        yesClear.hidden = true;
    }, 5);
    yesClear.innerText = "Yes";
    yesClear.id = "openGUIButton";
    yesClear.style.backgroundColor = "#46d471";
    yesClear.style.color = "BLACK";
    yesClear.style.position = "relative";
    yesClear.style.left = "7px";
    clearButton.appendChild(yesClear);

    const noClear = document.createElement("button");
    setTimeout(() => {
        noClear.hidden = true;
    }, 5);    noClear.innerText = "No";
    noClear.id = "openGUIButton";
    noClear.style.backgroundColor = "#d44654";
    noClear.style.color = "BLACK";
    noClear.style.position = "relative";
    noClear.style.left = "7px";
    clearButton.appendChild(noClear);

    openGUI.onclick = () => {
        if (openGUI.innerText == "OPEN") {
            openGUI.innerText = "CLOSE";
            eduMENU.hidden = false;
            menuStatus = "open";
            getKeyButton.style.left = "235px";
        } else if (openGUI.innerText == "CLOSE") {
            openGUI.innerText = "OPEN";
            eduMENU.hidden = true;
            menuStatus = "closed";
            getKeyButton.style.left = "230px";
        }
    }

    getKeyButton.onclick = () => {
        window.open("https://discord.gg/5XB6kNg6y5", "_blank");
    }

    clearButton.onclick = () => {
        yesClear.hidden = false;
        noClear.hidden = false;
        // setTimeout(() => {
        //     // clearButton.innerText = "Are You Sure?";
        // }, 10);
    }

    yesClear.onclick = () => {
        clearButton.innerText = "Logging Out..."
        yesClear.hidden = true;
        noClear.hidden = true;

        localStorage.removeItem("wpm")
        localStorage.removeItem("hackStatus")
        localStorage.removeItem("menuStatus")
        localStorage.removeItem("autoLesson")
        localStorage.removeItem("autoType")
        localStorage.removeItem("loginStatus")

        setTimeout(() => {
            location.reload();
        }, 800);    
        }
    noClear.onclick = () => {
        clearButton.innerText = "Cancled."
       
        yesClear.hidden = true;
        noClear.hidden = true;

        setTimeout(() => {
            location.reload();
        }, 800);    
    }

    toggleBox.oninput = () => {
        if (toggleBox.checked) {
            hackStatus = true;
            setTimeout(() => {
                location.reload();
            }, 500);   
        } else if (!toggleBox.checked) {
            hackStatus = false;
            setTimeout(() => {
                location.reload();
            }, 500);   
        }
    };

    autoLessonBox.oninput = () => {
        if (autoLessonBox.checked) {
            autoLesson = true;
            setTimeout(() => {
                location.reload();
            }, 500);
        } else if (!autoLessonBox.checked){
            autoLesson = false;
            setTimeout(() => {
                location.reload();
            }, 500);
        }
    };

    autoTypeBox.oninput = () => {
        if (autoTypeBox.checked) {
            autoType = true;
            setTimeout(() => {
                location.reload();
            }, 500);       
         } else if (!autoTypeBox.checked) {
            autoType = false;
            setTimeout(() => {
                location.reload();
            }, 500);        }
    };


    //setting up login
    Object.defineProperty(this, "loginStatus", {
        get: () => this.data.wpm,
        set: value => {
            this.data.wpm = value;
            window.localStorage.setItem("loginStatus", value.toString());
        }
    });
    loginStatus = window.localStorage.getItem("loginStatus") ? window.localStorage.getItem("loginStatus") : false;

    var loggedIn = window.localStorage.getItem("loginStatus")

    function unlockMenu() {
        toggleText.hidden = false;
        toggleBox.hidden = false;
        autoText2.hidden = false;
        autoTypeBox.hidden = false;
        autoText.hidden = false;
        autoLessonBox.hidden = false;
        wpmInput.hidden = false;
        wpmText.hidden = false;
        clearButton.hidden = false;
        getKeyButton.hidden = true;
    }

    function lockMenu() {
        toggleText.hidden = true;
        toggleBox.hidden = true;
        autoText2.hidden = true;
        autoTypeBox.hidden = true;
        autoText.hidden = true;
        autoLessonBox.hidden = true;
        wpmInput.hidden = true;
        wpmText.hidden = true;
        clearButton.hidden = true;
    }

    if (loggedIn == "false") {
        lockMenu();

        const loginButton = document.createElement("button");
        loginButton.innerText = "Login";
        loginButton.id = "loginButton";
        loginButton.style.backgroundColor = "#4656d4";
        loginButton.style.color = "WHITE";
        loginButton.style.flexWrap = "wrap";
        loginButton.style.position = "absolute";
        loginButton.style.left = "167px";
        loginButton.style.bottom = "175px"

        eduMENU.appendChild(loginButton);

        const loginEntry = document.createElement("input");
        loginEntry.placeholder = "Enter Key"
        loginEntry.style.position = "absolute"
        loginEntry.style.color = "white";
        loginEntry.style.left = "90px";
        loginEntry.style.bottom = "210px"
        loginEntry.style.backgroundColor = "#2e5f95";
        loginEntry.style.borderColor = "BLACK";

        eduMENU.appendChild(loginEntry);

        WelcomeText.style.top = "25px"

        loginButton.onclick = () => {
            if (loginEntry.value == "password") {
               unlockMenu();
               loginButton.hidden = true;
               loginEntry.hidden = true;
               WelcomeText.style.top = "0px"
               loginStatus = "true"
            } else {
                loginEntry.value = ""
                loginEntry.placeholder = "Incorrect!"
                setTimeout(() => {
                    loginEntry.placeholder = "Enter Key"
                }, 1000)
            }
        }
    } else {
        unlockMenu();
    }


    




}
init();

// Make the DIV element draggable:
dragElement(document.getElementById("edH"));

function dragElement(elem) {
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    if (document.getElementById(elem.id + "header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elem.id + "header").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elem.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        if (e.target.nodeName != "INPUT") {
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elem.style.top = (elem.offsetTop - pos2) + "px";
        elem.style.left = (elem.offsetLeft - pos1) + "px";
        guiTop = elem.style.top;
        guiLeft = elem.style.left;
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}