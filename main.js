/// Toolbar.js
function bToolbar() {
console.log("I sure hope this works...");
// Init variables
var typed = "";
var matches = [];
var currentKeywords = [];
var search = [];
var lastKeyPressed = "";
// COntruct the toolbar element
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
<link href="https://raw.githack.com/brendanee/Toolbar/main/styles.css" rel="stylesheet">`
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
}