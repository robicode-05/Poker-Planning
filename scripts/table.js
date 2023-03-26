const cardsValues = ["0","1", "2", "3", "5", "8", "13", "20", "40", "100", "coffee", "infinite", "question"];
let hasChoiceBeenMade = false;

initializePage();
loadCards();


function initializePage() {
  const userName = localStorage.getItem("userName");
  document.querySelector("#user-name").textContent = userName;
}

/***
 * Creating all cards into the DOM
 */
function loadCards() {
  for (const [index, value] of cardsValues.entries()) {
    const cardContainer = document.createElement("div");
    cardContainer.setAttribute("class", "card");

    const radioInput = document.createElement("input");
    radioInput.setAttribute("type", "radio");
    radioInput.setAttribute("name", "card-select");
    radioInput.setAttribute("id", `card-${index}`);

    const label = document.createElement("label");
    label.setAttribute("for", `card-${index}`);
    label.style.backgroundImage = `url('./cards/${value}.svg')`;
    label.onclick = clickOnCard;

    cardContainer.appendChild(radioInput);
    cardContainer.appendChild(label);

    document.querySelector(".poker-select")?.appendChild(cardContainer);
  }
}


function clickOnCard() {
  if(!hasChoiceBeenMade) {
    document.querySelector(".poker-select").classList.add("selected");
    hasChoiceBeenMade = !hasChoiceBeenMade;
  }
  console.log("CARD CLICK");
}

/** SERVER */
const API_URL = "server/api.php?a=";

const THRESHOLD_IN_FOCUS    = 1;
const THRESHOLD_OUT_FOCUS   = 3;
const THRESHOLD_NOT_VISIBLE = 30;
const DEFAULT_TIMEOUT       = 60;

let threshold = 1;
let counter   = 10;
let tableId   = 0;

const review = document.querySelector("#poker-review");
setApiSource();

function setApiSource() {
  tableId = getURLParamValue("table");
  console.log("tableId", tableId);
  updateTable();
    // update_table(); // supercharge first refresh
    // setInterval(update_table, 1000 /* 1s */);
    // stopCountDown(); // will display timout select

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        updateTable(); // immediatly refresh data when user refocus the window
        threshold = document.hasFocus() ? THRESHOLD_IN_FOCUS : THRESHOLD_OUT_FOCUS;
      }
      else {
        threshold = THRESHOLD_NOT_VISIBLE;
      }
    });
}

/**
 * Fetch from API server.
 * @param {string} url - path to fetch on API server.
 * @returns {Object | undefined} fetched data
 */
async function apiFetch(url) {
  const response = await fetch(`${API_URL}${url}`);
  if (response === undefined || response.status !== 200) {
    console.error(`apiFetch ${url}: response.status= ${response.status}`);
    return;
  }

  console.log("apiFetch", response);

  return await response.json();
}

async function updateTable() {
  console.log("updateTable", `get&t=${tableId}`);
  const tableDataResponse = await apiFetch(`get&t=${tableId}`);
  console.log("tableDataResponse", tableDataResponse);
  if (tableDataResponse === undefined) {
    if (confirm("This table does not seems to exist, would you like to go back?")) {
      history.back();
    }
    return;
  }

  let isPokerStarted = false;
  review.replaceChildren(); // clear previous review children

  for (const data of tableDataResponse.data) {
    console.log("DATA !", data);
  }

        // return api_fetch("get&t="+tableId).then((get) => {
           
        //     let isPokerStarted = false;
        //     review.innerHTML= "";
        //     const newTableStatus = get.status;
        //     get.data.forEach((val) => {
        //         if (val.value) {
        //             const el = document.getElementById("card-"+val.value);
        //             if (el) {
        //                 if (val.owner === userName && "select" === state) {
        //                     select_card(val.value);
        //                     console.log("Session recovered");
        //                 }
        //                 const card = el.cloneNode(true);
        //                 card.id = "card-review-"+val.value;
        //                 card.classList.remove("poker-card-select", "selected");
        //                 if ("reveal" !== state) {
        //                     card.classList.add("poker-card-flip");
        //                 }
        //                 else {
        //                     card.classList.remove("poker-card-flip");
        //                 }
        //                 const newLabel = document.createElement("span");
        //                 newLabel.classList.add("owner");
        //                 newLabel.textContent = val.owner;
        //                 card.appendChild(newLabel);
        //                 review.appendChild(card);
        //                 isPokerStarted = true;
        //             }
        //         }
        //     });

        //     if ("0000-00-00 00:00:00" != get.date) {
        //         if (timerCountdown == null) {
        //             const timetoms = new Date(get.date) - Date.now();
        //             let timetos = Math.floor(timetoms/1000) /* ms to s */;
        //             if (get.timeout) {
        //                 timetos += Number.parseInt(get.timeout, 10);
        //             }
        //             else {
        //                 timetos += DEFAULT_TIMEOUT;
        //             }
        //             startCountDown(timetos);
        //         }
        //     }
        //     else {
        //         stopCountDown();
        //         let timeout = DEFAULT_TIMEOUT;
        //         if (get.timeout) {
        //             timeout = Number.parseInt(get.timeout, 10);
        //         }
        //         document.querySelectorAll(".timeout").forEach((el) => { el.checked = ("timeout-"+timeout == el.id); });
        //     }

        //     switch (get.status) {
        //     case "0": /* Select */
        //         if (isPokerStarted && true == reset.disabled) {
        //             reset.disabled = false;
        //             reveal.disabled = false;
        //         }
        //         if ("select" !== state && "update" !== state) {
        //             /* Table status is to select, but client status is not */
        //             do_reset();
        //         }
        //         break;
        //     case "1": /* Reveal */
        //         if ("reveal" !== state) {
        //             /* Table status is to reveal, but client status is not */
        //             do_reveal();
        //         }
        //         break;
        //     case "2": /* Reset */
        //         if ("select" !== state) {
        //             /* Table status is to reset, but client status is not */
        //             do_reset();
        //         }
        //         break;
        //     default:
        //         break;
        //     }
        // });

  // Set the next update
  setTimeout(() => updateTable(), threshold);
}