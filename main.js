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
<style>
@import url("https://fonts.googleapis.com/css2?family=Anek+Latin");
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
    font-family: "Anek-Latin", sans-serif;
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
    box-shadow: 5px 5px 18px -2px rgba(27, 0, 43, 0.43);
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
</style>`
function addToolbar() {
    document.body.appendChild(bToolbar);
}
// Add toolbar when content loads
document.addEventListener("DOMContentLoaded", addToolbar, false);
}