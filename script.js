"use strict";

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loaderSpinner = document.getElementById("loader");

let apiQuotes = [];
let counter = 1;

// Loading Spinner shown
function showLoadingSpinner() {
  quoteContainer.hidden = true;
  loaderSpinner.hidden = false;
}

// Loading Spinner removed
function removeLoadingSpinner() {
  quoteContainer.hidden = false;
  loaderSpinner.hidden = true;
}

// Show Spinner during DOM Content is loading
showLoadingSpinner();

window.addEventListener("DOMContentLoaded", (event) => {
  // if DOM Loaded remove Spinner
  removeLoadingSpinner();

  // Introduction
  quoteText.innerText = "Please switch new Quote";

  // get Quotes from API
  async function getQuotesFromApi() {
    showLoadingSpinner();
    const apiUrl =
      "https://jacintodesign.github.io/quotes-api/data/quotes.json";
    try {
      const res = await fetch(apiUrl);
      apiQuotes = await res.json();
      newQuote();
    } catch (error) {
      console.error(error);
      // try again
      if (counter <= 5) {
        counter++;
        getQuotesFromApi();
      }
    }
    removeLoadingSpinner();
  }

  // Create a random Number
  function getRandomNumber() {
    return Math.floor(Math.random() * apiQuotes.length);
  }

  // Get single quote
  function newQuote() {
    showLoadingSpinner();
    const randomNumber = getRandomNumber();
    const quote = apiQuotes[randomNumber];

    // Check author is blank and replace it with 'unknown'
    if (quote.author === "" || quote.author === null) {
      authorText.innerText = "Unknown";
    } else {
      authorText.innerText = quote.author;
    }

    // Check Quote length to determine styling
    if (quote.text.length > 50) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }

    // Set a Quote and Hide loading Spinner
    quoteText.innerText = quote.text;
    removeLoadingSpinner();
  }

  // Tweet Quote
  function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, "_blank");
  }

  twitterBtn.addEventListener("click", () => {
    tweetQuote();
  });

  newQuoteBtn.addEventListener("click", () => {
    getQuotesFromApi();
  });
});
