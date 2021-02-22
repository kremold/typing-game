const quotes = [
  "When you have eliminated the impossible, whatever remains, however improbable, must be the truth.",
  "There is nothing more deceptive than an obvious fact.",
  "I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.",
  "I never make exceptions. An exception disproves the rule.",
  "What one man can invent another can discover.",
  "You see, but you do not observe.",
  "Life is infinitely stranger than anything which the mind of man could invent.",
  "Where there is no imagination, there is no horror.",
  "It is a mistake to confound strangeness with mystery.",
  "Work is the best antidote of sorrow, my dear Watson.",
  "Mediocrity knows nothing higher than itself; but talent instantly recognizes genius.",
  "Nothing clears up a case so much as stating it to another person.",
  "Education never ends, Watson. It is a series of lessons, with the greatest for the last.",
];
// store the list of words and the index of the word the player is currently typing
let words = [];
let wordIndex = 0;
// the starting time
let startTime = Date.now();
// page elements
const quoteElement = document.getElementById("quote");
const messageElement = document.getElementById("message");
const typedValueElement = document.getElementById("typed-value");

function toggleModal() {
  modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal();
  }
}

const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".close-button");

closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

document.getElementById("start").addEventListener("click", () => {
  typedValueElement.disabled = false;
  // get a quote
  const quoteIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[quoteIndex];
  // Put the quote into an array of words
  words = quote.split(" ");
  // reset the word index for tracking
  wordIndex = 0;

  // UI updates
  // Create an array of span elements so we can set a class
  const spanWords = words.map(function (word) {
    return `<span>${word} </span>`;
  });
  // Convert into string and set as innerHTML on quote display
  quoteElement.innerHTML = spanWords.join("");
  // Hightlight the first word
  quoteElement.childNodes[0].className = "hightlight";
  // clear any prior messages
  messageElement.innerText = "";

  // Setup the textbox
  //Clear the textbox
  typedValueElement.value = "";
  // Set Focus
  typedValueElement.focus();
  // set the event handler

  // start the timer
  startTime = new Date().getTime();
  console.log(startTime);
});

typedValueElement.addEventListener("input", () => {
  // get the current word
  const currentWord = words[wordIndex];
  // get the current value
  const typedValue = typedValueElement.value;

  if (typedValue === currentWord && wordIndex === words.length - 1) {
    // end sentence
    // Display success
    const elapsedTime = new Date().getTime() - startTime;
    const message = `Congrats! You finished in ${elapsedTime / 1000} seconds.`;
    messageElement.innerText = message;
    toggleModal();
    typedValueElement.disabled = true;
  } else if (typedValue.endsWith(" ") && typedValue.trim() === currentWord) {
    // end of word
    // clear the typedValueElement for the new word
    typedValueElement.value = "";
    // move to the next word
    wordIndex++;
    //reset the class name for all elements in quote
    for (const wordElement of quoteElement.childNodes) {
      wordElement.className = "";
    }
    // highlight the new word
    quoteElement.childNodes[wordIndex].className = "highlight";
  } else if (currentWord.startsWith(typedValue)) {
    // currently correct
    // highlight the next word
    typedValueElement.className = "";
  } else {
    // error state
    typedValueElement.className = "error";
  }
});
