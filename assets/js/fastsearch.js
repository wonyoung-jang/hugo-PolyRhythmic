import * as params from "@params";

let fuse;
const resultsList = document.getElementById("searchResults");
const searchInput = document.getElementById("searchInput");
let resultsAvailable = false;

window.onload = () => {
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);

        if (data) {
          const options = {
            isCaseSensitive: params.fuseOpts?.iscasesensitive ?? false,
            includeScore: params.fuseOpts?.includescore ?? false,
            includeMatches: params.fuseOpts?.includematches ?? false,
            minMatchCharLength: params.fuseOpts?.minmatchcharlength ?? 1,
            shouldSort: params.fuseOpts?.shouldsort ?? true,
            findAllMatches: params.fuseOpts?.findallmatches ?? false,
            keys: params.fuseOpts?.keys ?? ["title", "permalink", "summary", "content"],
            location: params.fuseOpts?.location ?? 0,
            threshold: params.fuseOpts?.threshold ?? 0.6,
            distance: params.fuseOpts?.distance ?? 100,
            ignoreLocation: params.fuseOpts?.ignorelocation ?? false,
          };

          fuse = new Fuse(data, options);
        }
      } else {
        console.error("Failed to load search index:", xhr.responseText);
      }
    }
  };
  xhr.open("GET", "/index.json");
  xhr.send();
};


function reset() {
  resultsAvailable = false;
  resultsList.innerHTML = "";
  searchInput.value = "";
  searchInput.focus();
}

searchInput.onkeyup = function () {
  if (!fuse) return;

  const searchTerm = this.value.trim();
  const searchOptions = params.fuseOpts?.limit
    ? { limit: params.fuseOpts.limit }
    : {};
  const results = fuse.search(searchTerm, searchOptions);

  if (results.length > 0) {
    const resultHTML = results.map(result =>
      `<li class="post-entry">
        <span class="entry-header">${result.item.title}</span>
        <a href="${result.item.permalink}" aria-label="${result.item.title}"></a>
      </li>`
    ).join("");

    resultsList.innerHTML = resultHTML;
    resultsAvailable = true;
  } else {
    resultsAvailable = false;
    resultsList.innerHTML = "";
  }
};

searchInput.addEventListener("search", function () {
  if (!this.value) reset();
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  const activeElement = document.activeElement;
  const inSearchBox = document.getElementById("searchbox")?.contains(activeElement);

  // Handle Escape key
  if (e.key === "Escape" && inSearchBox) {
    reset();
    return;
  }

  // Only handle navigation if results are available and we're in the search box
  if (!resultsAvailable || !inSearchBox) {
    return;
  }

  const key = e.key;
  const allLinks = Array.from(resultsList.querySelectorAll("a"));

  if (allLinks.length === 0) return;

  const currentIndex = allLinks.indexOf(activeElement);

  // Arrow Down - move to next result
  if (key === "ArrowDown") {
    e.preventDefault();

    // Remove previous focus class
    document.querySelectorAll(".focus").forEach(el => {
      el.classList.remove("focus");
    });

    if (activeElement === searchInput) {
      // Move from input to first result
      allLinks[0].focus();
      allLinks[0].parentElement.classList.add("focus");
    } else if (currentIndex >= 0 && currentIndex < allLinks.length - 1) {
      // Move to next result
      allLinks[currentIndex + 1].focus();
      allLinks[currentIndex + 1].parentElement.classList.add("focus");
    }
  }

  // Arrow Up - move to previous result
  else if (key === "ArrowUp") {
    e.preventDefault();

    // Remove previous focus class
    document.querySelectorAll(".focus").forEach(el => {
      el.classList.remove("focus");
    });

    if (currentIndex === 0) {
      // Move from first result back to input
      searchInput.focus();
    } else if (currentIndex > 0) {
      // Move to previous result
      allLinks[currentIndex - 1].focus();
      allLinks[currentIndex - 1].parentElement.classList.add("focus");
    }
  }

  // Enter or ArrowRight - activate link
  else if ((key === "Enter" || key === "ArrowRight") && activeElement.tagName === "A") {
    e.preventDefault();
    activeElement.click();
  }
});
