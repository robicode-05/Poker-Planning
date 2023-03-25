const cardsValues = ["0","1", "2", "3", "5", "8", "13", "20", "40", "100", "coffee", "infinite", "question"];

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

    cardContainer.appendChild(radioInput);
    cardContainer.appendChild(label);

    document.querySelector(".poker-select")?.appendChild(cardContainer);
  }
}

loadCards();
