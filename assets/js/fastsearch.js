import * as params from "@params";

let fuse; // holds our search engine
let resList = document.getElementById("searchResults");
let sInput = document.getElementById("searchInput");
let first,
  last,
  current_elem = null;
let resultsAvailable = false;

// load our search index
window.onload = function () {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        let data = JSON.parse(xhr.responseText);
        if (data) {
          // fuse.js options; check fuse.js website for details
          let options;
          if (params.fuseOpts) {
            options = {
              isCaseSensitive: params.fuseOpts.iscasesensitive ?? false,
              includeScore: params.fuseOpts.includescore ?? false,
              includeMatches: params.fuseOpts.includematches ?? false,
              minMatchCharLength: params.fuseOpts.minmatchcharlength ?? 1,
              shouldSort: params.fuseOpts.shouldsort ?? true,
              findAllMatches: params.fuseOpts.findallmatches ?? false,
              keys: params.fuseOpts.keys ?? ["title", "permalink", "summary", "content"],

              location: params.fuseOpts.location ?? 0,
              threshold: params.fuseOpts.threshold ?? 0.6,
              distance: params.fuseOpts.distance ?? 100,
              ignoreLocation: params.fuseOpts.ignorelocation ?? false,
            };
          }
          fuse = new Fuse(data, options); // build the index from the json file
        }
      } else {
        console.log(xhr.responseText);
      }
    }
  };
  xhr.open("GET", "../index.json");
  xhr.send();
};

// function to focus on search input
function activeToggle(ae) {
  // remove focus from all elements
  document.querySelectorAll(".focus").forEach(function (element) {
    element.classList.remove("focus");
  });
  // focus on element
  if (ae) {
    ae.focus();
    document.activeElement = current_elem = ae;
    ae.parentElement.classList.add("focus");
  } else {
    document.activeElement.parentElement.classList.add("focus");
  }
}

// reset search results
function reset() {
  resultsAvailable = false;
  resList.innerHTML = sInput.value = ""; // clear inputbox and searchResults
  sInput.focus(); // shift focus to input box
}

// execute search as each character is typed
sInput.onkeyup = function (e) {
  // run a search query (for "term") every time a letter is typed
  // in the search box
  if (fuse) {
    let results;
    // if the search input is not empty run the search
    if (params.fuseOpts) {
      results = fuse.search(this.value.trim(), { limit: params.fuseOpts.limit }); // the actual query being run using fuse.js along with options
    } else {
      results = fuse.search(this.value.trim()); // the actual query being run using fuse.js
    }
    // populate searchResults
    if (results.length !== 0) {
      // build our html if result exists
      let resultSet = ""; // our results bucket

      for (let item in results) {
        resultSet +=
          `<li class="post-entry"><span class="entry-header">${results[item].item.title}</span>` +
          `<a href="${results[item].item.permalink}" aria-label="${results[item].item.title}"></a></li>`;
      }

      resList.innerHTML = resultSet;
      resultsAvailable = true;
      first = resList.firstChild;
      last = resList.lastChild;
    } else {
      resultsAvailable = false;
      resList.innerHTML = "";
    }
  }
};

// clicking outside makes the search results disappear
sInput.addEventListener("search", function (e) {
  // clicked on x
  if (!this.value) reset();
});

// keyboard bindings
document.onkeydown = function (e) {
  let key = e.key;
  let ae = document.activeElement;

  let inbox = document.getElementById("searchbox").contains(ae);

  // if the search input is focused and user presses escape
  if (ae === sInput) {
    let elements = document.getElementsByClassName("focus");
    while (elements.length > 0) {
      elements[0].classList.remove("focus");
    }
  } else if (current_elem) ae = current_elem;
  if (key === "Escape") {
    reset();
  } else if (!resultsAvailable || !inbox) {
    return;
  } else if (key === "ArrowDown") {
    // if the currently focused element is not the search input, move focus to next element
    e.preventDefault();
    if (ae == sInput) {
      // if the currently focused element is the search input,
      // focus the <a> of first <li>
      activeToggle(resList.firstChild.lastChild);
    } else if (ae.parentElement != last) {
      // if the currently focused element's parent is last, do nothing
      // otherwise select the next search result
      activeToggle(ae.parentElement.nextSibling.lastChild);
    }
  } else if (key === "ArrowUp") {
    // if the currently focused element is not the search input, move focus to previous element
    e.preventDefault();
    if (ae.parentElement == first) {
      // if the currently focused element is first item, go to input box
      activeToggle(sInput);
    } else if (ae != sInput) {
      // if the currently focused element is input box, do nothing
      // otherwise select the previous search result
      activeToggle(ae.parentElement.previousSibling.lastChild);
    }
  } else if (key === "ArrowRight") {
    // if arrow right is pressed, click on the active link
    ae.click(); // click on active link
  }
};
