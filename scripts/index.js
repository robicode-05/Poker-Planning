/**
 * @author Passific https://github.com/Passific/Poker-Planning
 */

const CURRENT_VERSION = "0.4";


const DEFAULT_TABLE_ID = 2;
let table = localStorage.getItem("table") ?? DEFAULT_TABLE_ID.toString();
setTable(DEFAULT_TABLE_ID);

function setTable(tableNumber) {
  localStorage.setItem("table", tableNumber,localStorage.getItem("table"));

  // check the correct radio input
  // document.querySelectorAll("fieldset input[type='radio']")
  document.querySelectorAll("fieldset input").forEach((i) => {
    if (i.value === table) {
      i.setAttribute("checked", "checked");
    }
  });
}

function saveUserName(name) {
  localStorage.setItem("userName", name.trim());
}

function navigateToTablePageFromKey(event) {
  saveUserName(event.target.value);
  if (event.keyCode == 13) navigateToTablePage();
}

function navigateToTablePage() {
  console.log("navigateToTablePage", localStorage.getItem("userName"));
  if (localStorage.getItem("userName") === "") return;
  console.log("Name:",localStorage.getItem("userName"));
  window.location.href = `table.html?table=${table}`;
}