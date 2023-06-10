(function (elementId) {
  // console.log(elementId);
  const item = document.getElementById(elementId);
  const quotesObj = (function () {
    let quotes = [];
    function getQuote() {
      let randNumber = parseInt(Math.random() * quotes.length);
      return quotes[randNumber];
    }
    function getNumberOfQuotes(number) {
      let returnedQuotes = [];
      for (let index = 0; index < number; index++) {
        returnedQuotes.push(getQuote());
      }
    }
    function addQuote(quote, author) {
      quotes.push({ text: quote, author: author });
    }
    function getLengthOfQuote() {
      return quotes.length;
    }
    async function fetchAllQuotes() {
      if (getFromLocalStorage().length < 50) {
        try {
          let res = await fetch("https://type.fit/api/quotes");
          let data = await res.json();
          quotes = data;
          addToLocalStorage();
          displayQuote();
          // console.log(quotes);
        } catch (error) {
          console.log(error);
          quotes = ["Network Error"];
        }
      } else {
        quotes = getFromLocalStorage();
        displayQuote();
      }
    }

    function getAllQuotes() {
      return quotes;
    }

    function displayQuote() {
      let quote = getQuote();
      item.textContent = quote.text;
      let h3 = document.createElement("h3");
      let textNode = document.createTextNode(quote.author ?? "Anonymous");
      h3.appendChild(textNode);
      h3.classList.add("author");
      item.append(h3);
    }

    fetchAllQuotes();

    function addToLocalStorage() {
      localStorage.setItem("quotes", JSON.stringify(quotes));
    }
    function getFromLocalStorage() {
      return JSON.parse(localStorage.getItem("quotes")) ?? [];
    }

    return {
      fetchAllQuotes: fetchAllQuotes,
      getAllQuotes: getAllQuotes,
      getQuote: getQuote,
      addQuote: addQuote,
      getNumberOfQuotes: getNumberOfQuotes,
      getLengthOfQuote: getLengthOfQuote,
      displayQuote: displayQuote,
    };
  })();

  if (!window.quotesObj) {
    window.quotesApi = quotesObj;
  }
})("quote-container");

const loadQuoteBtn = document.querySelector(".load-quote");
loadQuoteBtn.addEventListener("click", function () {
  quotesApi.displayQuote();
});
