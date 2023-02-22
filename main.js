(function() {
var typed = "";
var matches = [];
var currentKeywords = [];
var search = [];
var html = `
<div onmousenter="showMe();" id="b-wrapper">
<div id="b-classes">
    <div class="b-none" onclick="cycleClasses(1);" oncontextmenu="resetClasses(1); return false;">Biology</div>
    <div class="b-none" onclick="cycleClasses(2);" oncontextmenu="resetClasses(2); return false;">Algebra II</div>
    <div class="b-none" onclick="cycleClasses(3);" oncontextmenu="resetClasses(3); return false;">History</div>
    <div class="b-none" onclick="cycleClasses(4);" oncontextmenu="resetClasses(4); return false;">Japanese</div>
    <div class="b-none" onclick="cycleClasses(5);" oncontextmenu="resetClasses(5); return false;">Wellness</div>
    <div class="b-none" onclick="cycleClasses(6);" oncontextmenu="resetClasses(6); return false;">2D Design</div>
    <div class="b-none" onclick="cycleClasses(7);" oncontextmenu="resetClasses(7); return false;">English</div>
</div>
<div id="b-search-wrapper">
    <input id="b-search" autocomplete="off" type="text" placeholder="Search here..." onkeyup="refresh()">
    <ul id="b-results">
    </ul>
</div>
<div id="b-times">
    <div>Class ends in X minutes, at ##:##</div>
    <div>Class starts in  X minutes, at ##:##</div>
</div>
</div>
<style>
@import url('https://fonts.googleapis.com/css2?family=Anek+Latin&display=swap');

#b-wrapper {
    display: flex;
    justify-content: center;
    position: fixed;
    left: 0;
    bottom: -45px;
    opacity: 0;
    height: 50px;
    width: calc(100% - 20px);
    padding: 2px 10px;
    font-size: 18px;
    font-family: 'Anek-Latin', sans-serif;
    border-radius: 20px 20px 0 0;
    color: white;
    background: linear-gradient(90deg, rgb(254, 150, 1) 0%, rgb(118, 27, 151) 90%);
    transition: bottom 0.2s, opacity 0.2s;
}

.show {
    bottom: 0 !important;
    opacity: 1 !important;
    transition: bottom 0.2s, opacity 0.2s;
}

#b-classes {
    flex-basis: 300px;
    flex-grow: 1;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-wrap: wrap;
}

#b-classes div {
    flex-grow: 1;
    max-width: 90px;
    margin: 2px 5px;
    padding: 3px 10px 2px 10px;
    cursor: pointer;
    text-align: center;
    font-size: 15px;
    border-radius: 10px;
}

.b-none {
    background-color: #00000020;
}

.b-homework {
    background-color: #3f991e;
}

.b-study {
    background-color: #1a095e;
}

.b-test {
    background-color: #b02b02;
}

#b-search-wrapper {
    flex-basis: 300px;
}

#b-search {
    padding-top: 5px;
    width: calc(100% - 10px);
    color: white;
    background-color: transparent;
    border: 2px blue;
    border-style: none none solid none;
    font-size: 20px;
    text-align: center;
    margin: auto;
    display: block;
}

#b-search:focus {
    outline: none;
    border-color: white;
}

#b-search::placeholder {
    opacity: 1;
    color: white;
}

#b-results {
    display: none;
    position: fixed;
    top: 30%;
    left: calc(50% - 250px);
    width: 500px;
    margin: auto;
    padding: 10px;
    list-style-type: none;
    border-radius: 5px;
    box-shadow: 5px 5px 18px -2px rgba(27,0,43,0.43);
    color: white;
    background: linear-gradient(45deg, rgba(254, 149, 1, 0.75) 0%, rgba(118, 27, 151, 0.75) 90%);
}

#b-results li {
    text-decoration: none;
    font-size: 18px;
}

#b-times {
    flex-basis: 300px;
    flex-grow: 1;
}

#b-times div {
    margin: 4px 0;
    font-size: 18px;
    text-align: center;
}
</style>
`;
var lastKeyPressed = "";

// Get .json search bar data from Github
async function getData(url) {
    try {
        return await fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            search = data;
            return;
        })
    } catch (error) {
        console.error(`Fetch error: ${error}`);
        return;
    }
}

// Call the get data
getData("https://raw.githubusercontent.com/brendanee/Taskbar/main/result.json");

document.addEventListener("keydown", function(event) {
    if (lastKeyPressed === "KeyW" && event.code === "KeyQ" || lastKeyPressed === "KeyQ" && event.code === "KeyW") {
        if (document.querySelector("#b-wrapper").className === "") {
            showMe();
            document.getElementById("b-search").value = "";
        } else {
            hideMe();
        }
    } else {
        lastKeyPressed = event.code;
    }
});

function showMe() {
    document.querySelector("#b-wrapper").className = "show";
    lastKeyPressed = "";
    document.getElementById("b-search").focus();
}

function hideMe() {
    document.querySelector("#b-wrapper").className = "";
    lastKeyPressed = "";
    document.getElementById("b-search").value = "";
}

function makeArray(input) {
    return input.split(" ");
} 

// Add a result to .b-results (called iteratively)
function addResult(index) {
    let element = document.createElement("li");
    element.style.listStyleType = "none";
    element.style.display = "block";
    element.innerHTML = "<a href=\"https://" + search[index].link + "\" target=\"_blank\" style=\"text-decoration: none;\" onclick=\"removeMe()\">" + search[index].name + "</a>";
    document.getElementById("b-results").appendChild(element);
}

//Event listener on text input, calls refresh() when key is typed
function refresh() {
    //Init
    typed = document.getElementById("b-search").value;

    // If nothing is typed (i.e. user backspaced everything they typed)
    if (typed == "") {
        // Hide pop-up with search results
        document.getElementById("b-results").style.display = "none";
        return;
    }

    // If the last character typed is a number 
    if (!isNaN(typed.slice(typed.length - 1))) {
        let matchIndex = typed.slice(typed.length - 1);
        if (typed.slice(typed.length - 1) == 0 || typed.slice(typed.length - 1) > matches.length) {
            matchIndex = matches.length;
        }
        // Open the corrosponding result link
        window.open("https://" + search[matches[matchIndex - 1]].link, "_blank");
        // Hide pop-up with search results
        document.getElementById("b-results").style.display = "none";
        // Clear the input
        document.getElementById("b-search").value = "";
        return;
    }

    // Iterate for each poosible search object
    matches = [];
    for (let i = 0; i < search.length; i++) {
        // Build each possible search term, both the display name and the keywords
        currentKeywords = makeArray(search[i].keywords);
        currentKeywords.push(search[i].name.toLowerCase());
        // Iterate through each possible keyword for the object thingy
        let j = 0;
        while (j < currentKeywords.length) {
            if (currentKeywords[j].includes(typed)) {
                // If the current keyword includes what is currently typed, add the object number to the results
                matches.push(i);
            }
        j++;
        }
    }

    // Remove duplicates
    let tempMatches = new Set(matches);
    matches = Array.from(tempMatches)
    document.getElementById("b-results").innerHTML = "";
    for (i = 0; i < matches.length; i++) {
        addResult(matches[i]);
    }

    // Show pop-up with results
    document.getElementById("b-results").style.display = "block";
}

function cycleClasses(index) {
    let currentClass = document.querySelector(`#b-classes div:nth-child(${index})`).className;
    if (currentClass === "b-none") {
        document.querySelector(`#b-classes div:nth-child(${index})`).className = "b-homework";
    } else if (currentClass === "b-homework") {
        document.querySelector(`#b-classes div:nth-child(${index})`).className = "b-study";
    } else if (currentClass === "b-study") {
        document.querySelector(`#b-classes div:nth-child(${index})`).className = "b-test";
    } else {
        document.querySelector(`#b-classes div:nth-child(${index})`).className = "b-none";
    }
}

function resetClasses(index) {
    document.querySelector(`#b-classes div:nth-child(${index})`).className = "b-none";
}

document.querySelector("*").innerHTML = html + document.querySelector("*").innerHTML;
})()