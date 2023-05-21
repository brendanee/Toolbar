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
<link href="https://github.com/brendanee/Toolbar/blob/main/styles.css" rel="stylesheet">`
function addToolbar() {
    document.body.appendChild(bToolbar);
}
// Add toolbar when content loads
document.addEventListener("DOMContentLoaded", addToolbar, false);
}