const name = document.getElementById("name");
const password = document.getElementById("password");
const addEntry = document.getElementById("addEntry");
const habitBtn = document.getElementById("habitBtn");
const addHabit = document.getElementById("addHabit");
const habitDiv = document.getElementById("habitDiv");
const errorElement = document.getElementById("error");
//const fields = addEntry.querySelectorAll("input, textarea");
const habitField = addHabit.querySelector("input");
const labels = addEntry.querySelectorAll("label");
const table = document.getElementById("table");
const tableHeaders = document.getElementById("tableHeaders");
const tableEntries = document.getElementById("tableEntries");
let entriesArr = [];
const checkedColor = "rgb(106, 165, 106)";
const uncheckedColor = "null";
let entryNum = 0;

//Modal//
let modalJournalEntry = null;
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const modalContainer = document.getElementById("modalContainer");
const modalDate = document.getElementById("modalDate");

//Adding Table Headers

let headersHtml = "";
labels.forEach((label) => {
  console.log(label.htmlFor);
  if (label.htmlFor === "journalEntry") {
    headersHtml += `<th>Journal Entry</th>`;
  } else {
    headersHtml += `<th>${label.outerText}</th>`;
  }
});

tableHeaders.innerHTML += headersHtml;

addEntry.addEventListener("submit", (e) => {
  let messages = [];

  let fields = addEntry.querySelectorAll("input, textarea");

  //   if (name.value === "" || name.value == null) {
  //     messages.push("Name is required");
  //     e.preventDefault();
  //   }
  //   if (password.value.length <= 6) {
  //     messages.push("Password must be over 6 characters");
  //     e.preventDefault();
  //   }
  // if (!messages[0]) {
  //   messages.push(
  //     `Welcome ${name.value}! Your Password is ${password.value}!!!!!!`
  //   );
  e.preventDefault();
  //location.reload(true);

  //Adding entries to table
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
        //field.style.backgroundColor = checkedColor;
        entryHtml += `<td id="entryData" style="background-color:${checkedColor}; color:white">X</td>`;
        //is it unchecked?
      } else {
        entryHtml += `<td id="entryData" style="background-color:${uncheckedColor}"></td>`;
      }

      field.checked = false; //reseting checkbox
      //if Journal text
    } else if (field.type === "textarea") {
      entryHtml += `<td id="entryData"><button id="viewEntryBtn${entryNum}" name="viewEntryBtn${entryNum}">Click to View</button></td>`;

      entryObj[field.id] = field.value;
      field.value = "";
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

  // OPEN MODAL //

  //creating an event listener for each "view entry" button. each event
  // will open the modal and apply text to the modal
  for (let i = 1; i < entryNum + 1; i++) {
    document
      .getElementById(`viewEntryBtn${i}`)
      .addEventListener("click", (e) => {
        modalJournalEntry = document.getElementById("modalJournalEntry");
        modalJournalEntry.innerText = entriesArr[i - 1].journalEntry;
        modalDate.innerText = entriesArr[i - 1].date;
        console.log(entriesArr[i - 1].journalEntry);
        console.log(entriesArr);
        modalContainer.style.opacity = 1;
        modalContainer.style.pointerEvents = "all";
        //modal.innerHTML
      });
  }
  // errorElement.innerText = messages.join(", ");
  //

  //
});

//------ADDING HABIT--------//
let habitNum = 1;
habitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (habitField.value) {
    // Adding to fields
    let habitHtml = ` <div>
 <label for="habit${habitNum}">${habitField.value}</label>
 <input id="habit${habitNum}" name="habit${habitNum}" type="checkbox" />
</div>`;
    habitNum++;
    habitDiv.innerHTML += habitHtml;

    // Adding to table
    let tableHabitHtml = `<th style="width:20px">${habitField.value}</th>`;
    tableHeaders.innerHTML += tableHabitHtml;
    // console.log(document.getElementById("habit1"));
    //console.log(fields);
    habitField.value = "";
  }
});

// MODAL //

closeModalBtn.addEventListener("click", (e) => {
  modalContainer.style.opacity = 0;
  modalContainer.style.pointerEvents = "none";
});
var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
var yyyy = today.getFullYear();

today = mm + "/" + dd + "/" + yyyy;
console.log(today);
