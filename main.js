/// Toolbar.js
function bToolbar() {
console.log("I sure hope this works...");
// Init most variables
var typed = "";
var matches = [];
var currentKeywords = [];
var search = [];
var lastKeyPressed = "";
// Contruct the toolbar element
var bToolbar = document.createElement("div");
bToolbar.setAttribute("id", "b-wrapper");
bToolbar.innerHTML = `<div id="b-classes">
<div class="b-none" onclick="cycleClasses(1);" oncontextmenu="resetClasses(1); return false;">Biology</div>
<div class="b-none" onclick="cycleClasses(2);" oncontextmenu="resetClasses(2); return false;">Algebra II</div>
<div class="b-none" onclick="cycleClasses(3);" oncontextmenu="resetClasses(3); return false;">History</div>
<div class="b-none" onclick="cycleClasses(4);" oncontextmenu="resetClasses(4); return false;">Japanese</div>
<div class="b-none" onclick="cycleClasses(5);" oncontextmenu="resetClasses(5); return false;">Wellness</div>
<div class="b-none" onclick="cycleClasses(6);" oncontextmenu="resetClasses(6); return false;">2D Design</div>
<div class="b-none" onclick="cycleClasses(7);" oncontextmenu="resetClasses(7); return false;">English</div>
</div>
<div id="b-search-wrapper"> <input id="b-search" autocomplete="off" type="text" placeholder="Search here..."
    onkeyup="refresh()">
<ul id="b-results"> </ul>
</div>
<div id="b-times">
<div>Class ends in X minutes, at ##:##</div>
<div>Class starts in X minutes, at ##:##</div>
</div>
<link href="https://raw.githack.com/brendanee/Toolbar/main/styles.css" rel="stylesheet">`;
function addToolbar() {
    document.body.appendChild(bToolbar);
}
// Add toolbar when content loads
document.addEventListener("DOMContentLoaded", addToolbar, false);
// Get .json search bar data from Github
async function getData(url) {
    // Try to fetch the url
    try {
        return await fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // Set search to receieved data, cannot use return here becuase it has a special purpose
            search = data;
            return;
        })
    } catch (error) {
        // On error, just print the error in the console
        console.error(`Fetch error: ${error}`);
        return;
    }
}
// Call the get data
getData("https://raw.githubusercontent.com/brendanee/Taskbar/main/result.json");
// Listen for any keyup (attached to document). keyup so it doesn't annoy the search bar, which focuses immediately
document.addEventListener("keyup", function(event) {
    // If the key pressed are W and last was Q, or vice versa
    if (lastKeyPressed === "KeyW" && event.code === "KeyQ" || lastKeyPressed === "KeyQ" && event.code === "KeyW") {
        if (document.querySelector("#b-wrapper").className === "") {
            showMe();
            document.getElementById("b-search").value = "";
        } else {
            hideMe();
        }
        lastKeyPressed = "";
    } else {
        // This is in the else so it doesn't trigger twice when QW is pressed
        lastKeyPressed = event.code;
    }
});
// Called on QW press
function showMe() {
    // Show toolbar and focus search bar
    document.querySelector("#b-wrapper").className = "show";
    document.getElementById("b-search").focus();
}
// Also called on QW press
function hideMe() {
    // Hide toolbar and clear search bar
    document.querySelector("#b-wrapper").className = "";
    document.getElementById("b-search").value = "";
}
// Returns an array from a space seperated list. Called at []
function makeArray(input) {
    return input.split(" ");
} 
// Add a result to .b-results, the results unordered list (called iteratively)
function addResult(index) {
    let element = document.createElement("li");
    element.style.listStyleType = "none";
    element.style.display = "block";
    element.innerHTML = "<a href=\"https://" + search[index].link + "\" target=\"_blank\" style=\"text-decoration: none;\" onclick=\"removeMe()\">" + search[index].name + "</a>";
    document.getElementById("b-results").appendChild(element);
}
// Function called when something's typed in the search box. Called each key stroke
function refresh() {
    // Set variable typed to the current text field value
    typed = document.getElementById("b-search").value;
    // If nothing is typed (i.e. user backspaced everything they typed)
    if (typed == "") {
        // Hide pop-up with search results (since there are none)
        document.getElementById("b-results").style.display = "none";
        // End function (no need to check for search term matches as there are none)
        return;
    }
    // If the last character typed is a number (special case to open link)
    // This deals with already typed text
    if (!isNaN(typed.slice(typed.length - 1))) {
        // Set matchIndex to the this number
        let matchIndex = typed.slice(typed.length - 1);
        // No clue || the number is more than the length of the results
        if (typed.slice(typed.length - 1) == 0 || typed.slice(typed.length - 1) > matches.length) {
            // Set the index to the last result
            matchIndex = matches.length;
        }
        // Open the corresponding result link
        window.open("https://" + search[matches[matchIndex - 1]].link, "_blank");
        // Hide pop-up with search results
        document.getElementById("b-results").style.display = "none";
        // Clear the input
        document.getElementById("b-search").value = "";
        // End (search has been completed)
        return;
    }
    // Reset matches array
    matches = [];
    // Iterate for each object in the search array
    for (let i = 0; i < search.length; i++) {
        // Make an array of the search terms for the current (iterated) object using the space seperated array of keywords
        currentKeywords = makeArray(search[i].keywords);
        // Add the name to the list in lower case
        currentKeywords.push(search[i].name.toLowerCase());
        // Check if the current input matches any of these
        let j = 0;
        while (j < currentKeywords.length) {
            if (currentKeywords[j].includes(typed)) {
                // If the current keyword includes what is currently typed, add the object number to the results
                matches.push(i);
            }
        j++;
        }
    }
    // Remove duplicates (happens when reults is maatched twice??)
    let tempMatches = new Set(matches);
    matches = Array.from(tempMatches)
    document.getElementById("b-results").innerHTML = "";
    for (i = 0; i < matches.length; i++) {
        addResult(matches[i]);
    }
    // Show pop-up with results
    document.getElementById("b-results").style.display = "block";
}
// Called on click of the classes button. Simply cycles through the possible classes
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
// Called on right-click of the classes button. Simply resets classes button.
function resetClasses(index) {
    document.querySelector(`#b-classes div:nth-child(${index})`).className = "b-none";
}
}