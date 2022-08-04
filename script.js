const name = document.getElementById("name");
const date = document.getElementById("date");
const password = document.getElementById("password");
const addEntry = document.getElementById("addEntry");
const habitBtn = document.getElementById("habitBtn");
const addHabit = document.getElementById("addHabit");
const habitDiv = document.getElementById("habitDiv");
const errorElement = document.getElementById("error");
const habitField = addHabit.querySelector("input");
const labels = addEntry.querySelectorAll("label");
const table = document.getElementById("table");
const tableHeaders = document.getElementById("tableHeaders");
const tableEntries = document.getElementById("tableEntries");
let entriesArr = [];
const checkedColor = "rgb(106, 165, 106)";
const uncheckedColor = "null";
let entryNum = 0;
const monthsArr = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

//Modal//
let modalJournalEntry = null;
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const modalContainer = document.getElementById("modalContainer");
const modalDate = document.getElementById("modalDate");

//Adding todays date as default

let today = new Date();
const dd = String(today.getDate()).padStart(2, "0");
const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0
const yyyy = today.getFullYear();

today = yyyy + "-" + mm + "-" + dd;
date.value = today;

//------ADDING TABLE HEADERS-------//

let headersHtml = "";
labels.forEach((label) => {
  if (label.htmlFor === "journalEntry") {
    headersHtml += `<th class=tableHeader id="journalEntryTableHeader">Journal Entry</th>`;
  } else {
    headersHtml += `<th class=tableHeader>${label.outerText}</th>`;
  }
});

tableHeaders.innerHTML += headersHtml;

addEntry.addEventListener("submit", (e) => {
  let messages = [];

  let fields = addEntry.querySelectorAll("input, textarea");

  e.preventDefault();

  //--------Adding entries to table---------//

  let entryHtml = '<tr id="entryRow">';
  let entryObj = {};
  entryNum++;
  fields.forEach((field) => {
    // Adding entry to array of Objects
    // if checkbox
    if (field.type === "checkbox") {
      entryObj[field.id] = field.checked;
      //is it checked?
      if (field.checked) {
        entryHtml += `<td><div id="habitEntryData" class="habitEntryDataTrue" style="background-color:${checkedColor}; color:white">&#9587;</div></td>`;
        //is it unchecked?
      } else {
        entryHtml += `<td><div id="habitEntryData" class="habitEntryDataFalse" style="background-color:${uncheckedColor}"></div></td>`;
      }

      field.checked = false; //reseting checkbox
      //if Journal text
    } else if (field.type === "textarea") {
      entryHtml += `<td id="entryData"><button id="viewEntryBtn${entryNum}" name="viewEntryBtn${entryNum}">Click to View</button></td>`;

      entryObj[field.id] = field.value;
      field.value = "";
    } else if (field.type === "date") {
      let dateStr = `${monthsArr[parseInt(field.value[(5, 6)]) - 1]} ${
        field.value[(8, 9)]
      }`;
      entryObj["date"] = field.value;
      entryObj["dateStr"] = dateStr;
      entryHtml += `<td id="entryData">${dateStr}</td>`;
    } else {
      //if not checkbox
      entryObj[field.id] = field.value;
      entryHtml += `<td id="entryData">${field.value}</td>`;
      field.value = "";
    }
  });
  entriesArr.push(entryObj);
  entryHtml += "</tr>";
  tableEntries.innerHTML = entryHtml + tableEntries.innerHTML;

  //Date is set to blank so resetting to today

  date.value = today;

  // OPEN MODAL //

  //creating an event listener for each "view entry" button. each event
  // will open the modal and apply text to the modal
  for (let i = 1; i < entryNum + 1; i++) {
    document
      .getElementById(`viewEntryBtn${i}`)
      .addEventListener("click", (e) => {
        modalJournalEntry = document.getElementById("modalJournalEntry");
        modalJournalEntry.innerText = entriesArr[i - 1].journalEntry;
        modalDate.innerText = entriesArr[i - 1].dateStr;
        modalContainer.style.opacity = 1;
        modalContainer.style.pointerEvents = "all";
        //modal.innerHTML
      });
  }
});

//-----ADD HABIT MODAL------//

openAddHabitModalBtn = document.getElementById("openAddHabitModalBtn");
openAddHabitModalBtn.addEventListener("click", (e) => {
  addHabitModalContainer.style.opacity = 1;
  addHabitModalContainer.style.pointerEvents = "all";
});

//close add habit model

closeAddHabitModalBtn = document.getElementById("closeAddHabitModalBtn");
closeAddHabitModalBtn.addEventListener("click", (e) => {
  addHabitModalContainer.style.opacity = 0;
  addHabitModalContainer.style.pointerEvents = "none";
});

//------ADDING HABIT--------//
let habitNum = 1;
habitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (habitField.value) {
    // Adding to fields
    let habitHtml = ` <div>
 <input id="habit${habitNum}" name="habit${habitNum}" type="checkbox" />
 <label for="habit${habitNum}">${habitField.value}</label>
 </div>`;
    habitNum++;
    habitDiv.innerHTML += habitHtml;

    // Adding to table
    let tableHabitHtml = `<th class=tableHeader id=habitTableHeader>${habitField.value}</th>`;
    tableHeaders.innerHTML += tableHabitHtml;
    habitField.value = "";
  }
});

// MODAL //

closeModalBtn.addEventListener("click", (e) => {
  modalContainer.style.opacity = 0;
  modalContainer.style.pointerEvents = "none";
});

//Making the modal Fade in/out after 1sec because otherwise the modals appear when right after the page is refreshed
const addHabitModalContainer = document.getElementById(
  "addHabitModalContainer"
);
setTimeout(() => {
  const modalContainers = document.querySelectorAll(".modalContainer");
  modalContainers.forEach((e) => {
    e.style.transition = "opacity 0.3s ease";
  });
}, 2000);
