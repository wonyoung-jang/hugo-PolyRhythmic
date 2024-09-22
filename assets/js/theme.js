// Local storage
document.addEventListener("DOMContentLoaded", function () {
  const root = document.documentElement;

  // Theme-toggle
  const themeSelector = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("pref-theme");

  if (savedTheme !== null) {
    if (savedTheme === "light") {
      themeSelector.checked = true;
      localStorage.setItem("pref-theme", "light");
    } else if (savedTheme === "dark") {
      themeSelector.checked = false;
      localStorage.setItem("pref-theme", "dark");
    } else {
      themeSelector.checked = false;
      localStorage.setItem("pref-theme", "dark");
    }
  }

  function updateTheme() {
    const theme = themeSelector.checked ? "light" : "dark";
    localStorage.setItem("pref-theme", theme);
  }

  themeSelector.addEventListener("input", updateTheme);

  // Color

  // Key color hue
  const hueSelector = document.getElementById("hue-selector");
  const savedHue = localStorage.getItem("theme-hue");
  
  if (savedHue !== null) {
    hueSelector.value = savedHue;
  } else {
    hueSelector.value = 268;
    localStorage.setItem("theme-hue", 268);
  }

  function updateHue() {
    const hue = hueSelector.value;
    root.style.setProperty("--input-color-hue", hue + "deg");
    localStorage.setItem("theme-hue", hue);
  }

  updateHue();
  
  hueSelector.addEventListener("input", updateHue);
  
  // Key color chroma
  const chromaSelector = document.getElementById("chroma-selector");
  const savedChroma = localStorage.getItem("theme-chroma");

  if (savedChroma !== null) {
    chromaSelector.value = savedChroma;
  } else {
    chromaSelector.value = 44;
    localStorage.setItem("theme-chroma", 44);
  }

  function updateChroma() {
    const chroma = chromaSelector.value;
    root.style.setProperty("--input-color-chroma", chroma + "%");
    localStorage.setItem("theme-chroma", chroma);
  }

  updateChroma();

  chromaSelector.addEventListener("input", updateChroma);

  // Tertiary temperature direction
  const tertiarySelectorCool = document.getElementById("tertiary-selector-cool");
  const tertiarySelectorWarm = document.getElementById("tertiary-selector-warm");
  const savedTemperature = localStorage.getItem("tertiary-temperature");
  
  if (savedTemperature !== null) {
    if (savedTemperature === "cool") {
      tertiarySelectorCool.checked = true;
    } else if (savedTemperature === "warm") {
      tertiarySelectorWarm.checked = true;
    }
  } else {
    tertiarySelectorCool.checked = true;
    localStorage.setItem("tertiary-temperature", "cool");
  }

  function updateTemperature() {
    const temperature = document.querySelector('input[name="temperature"]:checked').value;
    localStorage.setItem("tertiary-temperature", temperature);
  }
  
  updateTemperature();

  tertiarySelectorCool.addEventListener("change", updateTemperature);
  tertiarySelectorWarm.addEventListener("change", updateTemperature);

  // Contrast
  const contrastSelectorRegular = document.getElementById("contrast-selector-regular");
  const contrastSelectorMedium = document.getElementById("contrast-selector-medium");
  const contrastSelectorHigh = document.getElementById("contrast-selector-high");
  const savedContrast = localStorage.getItem("contrast");
  
  if (savedContrast !== null) {
    if (savedContrast === "medium") {
      contrastSelectorMedium.checked = true;
    } else if (savedContrast === "high") {
      contrastSelectorHigh.checked = true;
    } else {
      contrastSelectorRegular.checked = true;
    }
  } else {
    contrastSelectorRegular.checked = true;
    localStorage.setItem("contrast", "regular");
  }

  function updateContrast() {
    const contrast = document.querySelector('input[name="contrast"]:checked').value;
    localStorage.setItem("contrast", contrast);
  }

  updateContrast();

  contrastSelectorRegular.addEventListener("change", updateContrast);
  contrastSelectorMedium.addEventListener("change", updateContrast);
  contrastSelectorHigh.addEventListener("change", updateContrast);

  // Shapes
  const shapeSelector = document.getElementById("shape-selector");
  const savedShape = localStorage.getItem("theme-shape");
  
  if (savedShape !== null) {
    shapeSelector.value = savedShape;
  } else {
    shapeSelector.value = 4;
    localStorage.setItem("theme-shape", 4);
  }

  function updateShape() {
    const shape = shapeSelector.value;
    root.style.setProperty("--input-shape-corner", shape + "px");
    localStorage.setItem("theme-shape", shape);
  }
  updateShape();

  shapeSelector.addEventListener("input", updateShape);

  // Images
  const dimImageSelector = document.getElementById("dim-image-selector");
  const savedDimImages = localStorage.getItem("dim-images");

  if (savedDimImages !== null) {
    dimImageSelector.checked = true;
  } else {
    dimImageSelector.checked = false;
    localStorage.setItem("dim-images", "0.8");
  }

  function updateDimImages() {
    const dimImages = dimImageSelector.checked ? "0.8" : "1";
    localStorage.setItem("dim-images", dimImages);
  }
  updateDimImages();

  dimImageSelector.addEventListener("change", updateDimImages);

  // Typography

  // Content text width
  const widthSelector60 = document.getElementById("width-selector-60");
  const widthSelector120 = document.getElementById("width-selector-120");
  const widthSelectorMax = document.getElementById("width-selector-max");
  const savedWidth = localStorage.getItem("max-char-width");
  const savedMargin = localStorage.getItem("post-content-margin");
  
  if (savedWidth !== null) {
    if (savedWidth === "60") {
      widthSelector60.checked = true;
    } else if (savedWidth === "120") {
      widthSelector120.checked = true;
    } else if (savedWidth === "max") {
      widthSelectorMax.checked = true;
    }
  } else {
    widthSelectorMax.checked = true;
  }

  function updateWidth() {
    const width = document.querySelector('input[name="width"]:checked').value;

    if (width === "60") {
      localStorage.setItem("post-content-margin", "0 auto");
    } else if (width === "120") {
      localStorage.setItem("post-content-margin", "0 auto");
    } else if (width === "max") {
      localStorage.setItem("post-content-margin", "0");
    }

    localStorage.setItem("max-char-width", width);
  }

  updateWidth();

  widthSelector60.addEventListener("change", updateWidth);
  widthSelector120.addEventListener("change", updateWidth);
  widthSelectorMax.addEventListener("change", updateWidth);

  // Font size
  const fontSizeSelector = document.getElementById("font-size-selector");
  const savedFontSize = localStorage.getItem("typography-font-size");
  
  if (savedFontSize !== null) {
    fontSizeSelector.value = savedFontSize;
  } else {
    fontSizeSelector.value = 16;
    localStorage.setItem("typography-font-size", 16);
  }

  // Line height
  const lineHeightSelector = document.getElementById("line-height-selector");
  const savedLineHeight = localStorage.getItem("typography-line-height");

  if (savedLineHeight !== null) {
    lineHeightSelector.value = savedLineHeight;
  } else {
    lineHeightSelector.value = 1.5;
    localStorage.setItem("typography-line-height", 1.5);
  }

  // Brand font
  const typographySelector = document.getElementById("typography-selector");
  const savedBrandFont = localStorage.getItem("typography-brand-font");

  if (savedBrandFont !== null) {
    document.querySelector('input[name="brand-font"][value="' + savedBrandFont + '"]').checked = true;
  } else {
    document.querySelector('input[name="brand-font"][value="Raleway"]').checked = true;
    localStorage.setItem("typography-brand-font", "Raleway");
  }

  // Plain font
  const savedPlainFont = localStorage.getItem("typography-plain-font");

  if (savedPlainFont !== null) {
    document.querySelector('input[name="plain-font"][value="' + savedPlainFont + '"]').checked = true;
  } else {
    document.querySelector('input[name="plain-font"][value="Rubik"]').checked = true;
    localStorage.setItem("typography-plain-font", "Rubik");
  }

  // Code font
  const savedCodeFont = localStorage.getItem("typography-code-font");

  if (savedCodeFont !== null) {
    document.querySelector('input[name="code-font"][value="' + savedCodeFont + '"]').checked = true;
  } else {
    document.querySelector('input[name="code-font"][value="SomeType Mono"]').checked = true;
    localStorage.setItem("typography-code-font", "SomeType Mono");
  }

  function updateTypography() {
    const brandFont = document.querySelector('input[name="brand-font"]:checked').value;
    const plainFont = document.querySelector('input[name="plain-font"]:checked').value;
    const codeFont = document.querySelector('input[name="code-font"]:checked').value;
    const fontSize = fontSizeSelector.value;
    const lineHeight = lineHeightSelector.value;

    root.style.setProperty("--input-font-size", fontSize + "px");
    root.style.setProperty("--input-line-height", lineHeight + "rem");

    localStorage.setItem("typography-brand-font", brandFont);
    localStorage.setItem("typography-plain-font", plainFont);
    localStorage.setItem("typography-code-font", codeFont);
    localStorage.setItem("typography-font-size", fontSize);
    localStorage.setItem("typography-line-height", lineHeight);
  }

  updateTypography();

  fontSizeSelector.addEventListener("input", updateTypography);
  lineHeightSelector.addEventListener("input", updateTypography);
  typographySelector.addEventListener("change", updateTypography);
});

// Slider tooltips
const rangeInputHues = document.getElementById("hue-selector");
const tooltipHues = document.getElementById("hue-tooltip");
const rangeInputChromas = document.getElementById("chroma-selector");
const tooltipChromas = document.getElementById("chroma-tooltip");
const rangeInputShape = document.getElementById("shape-selector");
const tooltipShape = document.getElementById("shape-tooltip");
const rangeInputFontSize = document.getElementById("font-size-selector");
const tooltipFontSize = document.getElementById("font-size-tooltip");
const rangeInputLineHeight = document.getElementById("line-height-selector");
const tooltipLineHeight = document.getElementById("line-height-tooltip");

function updateTooltipHues(value) {
  tooltipHues.textContent = value;
  const thumbPosition = (value - rangeInputHues.min) / (rangeInputHues.max - rangeInputHues.min);
  const tooltipPositionHues = thumbPosition * (rangeInputHues.offsetWidth - 20) + 10;
  tooltipHues.style.left = `${tooltipPositionHues}px`;
  tooltipHues.style.opacity = "1";
}

function updateTooltipChromas(value) {
  tooltipChromas.textContent = value;
  const thumbPosition = (value - rangeInputChromas.min) / (rangeInputChromas.max - rangeInputChromas.min);
  const tooltipPositionChromas = thumbPosition * (rangeInputChromas.offsetWidth - 20) + 10;
  tooltipChromas.style.left = `${tooltipPositionChromas}px`;
  tooltipChromas.style.opacity = "1";
}

function updateTooltipShape(value) {
  tooltipShape.textContent = value;
  const thumbPositionShape = (value - rangeInputShape.min) / (rangeInputShape.max - rangeInputShape.min);
  const tooltipShapePosition = thumbPositionShape * (rangeInputShape.offsetWidth - 20) + 10;
  tooltipShape.style.left = `${tooltipShapePosition}px`;
  tooltipShape.style.opacity = "1";
}

function updateTooltipFontSize(value) {
  tooltipFontSize.textContent = value + "px";
  const thumbPositionFontSize = (value - rangeInputFontSize.min) / (rangeInputFontSize.max - rangeInputFontSize.min);
  const tooltipFontSizePosition = thumbPositionFontSize * (rangeInputFontSize.offsetWidth - 20) + 10;
  tooltipFontSize.style.left = `${tooltipFontSizePosition}px`;
  tooltipFontSize.style.opacity = "1";
}

function updateTooltipLineHeight(value) {
  tooltipLineHeight.textContent = value;
  const thumbPositionLineHeight = (value - rangeInputLineHeight.min) / (rangeInputLineHeight.max - rangeInputLineHeight.min);
  const tooltipLineHeightPosition = thumbPositionLineHeight * (rangeInputLineHeight.offsetWidth - 20) + 10;
  tooltipLineHeight.style.left = `${tooltipLineHeightPosition}px`;
  tooltipLineHeight.style.opacity = "1";
}

rangeInputHues.addEventListener("input", (e) => {
  updateTooltipHues(e.target.value);
});

rangeInputHues.addEventListener("mousedown", () => {
  updateTooltipHues(rangeInputHues.value);
});

rangeInputHues.addEventListener("mouseup", () => {
  tooltipHues.style.opacity = "0";
});

rangeInputHues.addEventListener("mouseleave", () => {
  tooltipHues.style.opacity = "0";
});

rangeInputChromas.addEventListener("input", (e) => {
  updateTooltipChromas(e.target.value);
});

rangeInputChromas.addEventListener("mousedown", () => {
  updateTooltipChromas(rangeInputChromas.value);
});

rangeInputChromas.addEventListener("mouseup", () => {
  tooltipChromas.style.opacity = "0";
});

rangeInputChromas.addEventListener("mouseleave", () => {
  tooltipChromas.style.opacity = "0";
});

rangeInputShape.addEventListener("input", (e) => {
  updateTooltipShape(e.target.value);
});

rangeInputShape.addEventListener("mousedown", () => {
  updateTooltipShape(rangeInputShape.value);
});

rangeInputShape.addEventListener("mouseup", () => {
  tooltipShape.style.opacity = "0";
});

rangeInputShape.addEventListener("mouseleave", () => {
  tooltipShape.style.opacity = "0";
});

rangeInputFontSize.addEventListener("input", (e) => {
  updateTooltipFontSize(e.target.value);
});

rangeInputFontSize.addEventListener("mousedown", () => {
  updateTooltipFontSize(rangeInputFontSize.value);
});

rangeInputFontSize.addEventListener("mouseup", () => {
  tooltipFontSize.style.opacity = "0";
});

rangeInputFontSize.addEventListener("mouseleave", () => {
  tooltipFontSize.style.opacity = "0";
});

rangeInputLineHeight.addEventListener("input", (e) => {
  updateTooltipLineHeight(e.target.value);
});

rangeInputLineHeight.addEventListener("mousedown", () => {
  updateTooltipLineHeight(rangeInputLineHeight.value);
});

rangeInputLineHeight.addEventListener("mouseup", () => {
  tooltipLineHeight.style.opacity = "0";
});

rangeInputLineHeight.addEventListener("mouseleave", () => {
  tooltipLineHeight.style.opacity = "0";
});

// Top link
const mybutton = document.getElementById("top-link");
const scrollWrapper = document.querySelector("html");

function handleScroll() {
  if (scrollWrapper.scrollTop > 1500) {
    mybutton.style.visibility = "visible";
    mybutton.style.opacity = "1";
  } else {
    mybutton.style.visibility = "hidden";
    mybutton.style.opacity = "0";
  }
}

window.addEventListener("scroll", handleScroll);

mybutton.addEventListener("click", function() {
  scrollWrapper.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Code copy button
document.querySelectorAll('pre > code').forEach((codeblock) => {
  const container = codeblock.parentNode.parentNode;
  const copybutton = document.createElement('button');
  
  copybutton.classList.add('copy-code');
  copybutton.innerText = '{{ i18n "code_copy" | default "copy" }}';

  function copyingDone() {
    copybutton.innerText = '{{ i18n "code_copied" | default "copied!" }}';
    setTimeout(() => {
      copybutton.innerText = '{{ i18n "code_copy" | default "copy" }}';
    }, 2000);
  }

  copybutton.addEventListener('click', (cb) => {
    if ('clipboard' in navigator) {
      navigator.clipboard.writeText(codeblock.textContent);
      copyingDone();
      return;
    }
    
    const range = document.createRange();
    const selection = window.getSelection();
    
    range.selectNodeContents(codeblock);
    selection.removeAllRanges();
    selection.addRange(range);

    try {
      document.execCommand('copy');
      copyingDone();
    } catch (e) { 

    };

    selection.removeRange(range);
  });

  if (container.classList.contains("highlight")) {
    container.prepend(copybutton);
  } else if (container.parentNode.firstChild == container) {
    // td containing LineNos
  } else if (codeblock.parentNode.parentNode.parentNode.parentNode.parentNode.nodeName == "TABLE") {
    // table containing LineNos and code
    codeblock.parentNode.parentNode.parentNode.parentNode.parentNode.prepend(copybutton);
  } else {
    // code blocks not having highlight as parent class
    codeblock.parentNode.prepend(copybutton);
  }
});

// Details state functions
// Function to get a page identifier
function getPageIdentifier() {
  return window.location.pathname.replace(/\//g, '_') || 'index';
}

// Function to generate a unique identifier for each details element
function generateDetailsId(details, index) {
  const nearestHeading = details.querySelector('summary')?.textContent || '';
  return `${nearestHeading.trim().toLowerCase().replace(/\s+/g, '_')}_${index}`;
}

// Function to save the state of all details elements on the current page
function saveDetailsState() {
  const pageId = getPageIdentifier();
  const detailsState = {};
  document.querySelectorAll('details').forEach((details, index) => {
    const id = generateDetailsId(details, index);
    detailsState[id] = details.open;
  });
  const allPagesState = JSON.parse(localStorage.getItem('allDetailsState') || '{}');
  allPagesState[pageId] = detailsState;
  localStorage.setItem('allDetailsState', JSON.stringify(allPagesState));
}

// Function to load and apply the saved state for the current page
function loadDetailsState() {
  const pageId = getPageIdentifier();
  const allPagesState = JSON.parse(localStorage.getItem('allDetailsState') || '{}');
  const pageState = allPagesState[pageId] || {};
  document.querySelectorAll('details').forEach((details, index) => {
    const id = generateDetailsId(details, index);
    if (id in pageState) {
      details.open = pageState[id];
    }
  });
}

// Add event listeners to all details elements
function addDetailsListeners() {
  document.querySelectorAll('details').forEach(details => {
    details.addEventListener('toggle', saveDetailsState);
  });
}

// Initialize the system
document.addEventListener('DOMContentLoaded', () => {
  loadDetailsState();
  addDetailsListeners();
});
