let FaqHeads = document.querySelectorAll(".question .head");
let BurgerIcon = document.querySelector(".burger-icon");
let ClosingArea = document.querySelector(".closing_area");
let CloseIcon = document.querySelector(".close-icon");

let Words = [
  "transparent lending",
  "Web developer",
  "App developer",
  "Artificial Intelligence",
];
let span_trad = document.querySelector(".span_trad");
window.addEventListener("load", (e) => {
  let count = 0;
  let TotalCount = Words.length;
  let CurrentWord = 0;
  let reverse = false;
  setInterval(() => {
    if (!reverse) {
      span_trad.innerHTML += `<span>${Words[count][CurrentWord]}</span>`;
      CurrentWord++;
    }

    if (CurrentWord == Words[count].length + 1) {
      reverse = true;
      let TotalSpans = document.querySelectorAll(".span_trad span");
      let TotalSpanLength = TotalSpans.length;

      if (TotalSpanLength > 0) TotalSpans[TotalSpanLength - 1].remove();
      if (TotalSpanLength == 0) {
        CurrentWord = 0;
        count++;
        span_trad.innerHTML = "";
        reverse = false;
      }
    }
    if (count == TotalCount) {
      count = 0;
    }
  }, 100);
  // span_trad
});

const HandleFaqDropDown = (e) => {
  let NextElement = e.target.nextElementSibling;
  let ParentElement = NextElement.parentNode;
  let Icon = ParentElement.querySelector(".head svg");
  NextElement.classList.toggle("active");
  ParentElement.classList.toggle("active");
  if (ParentElement.classList.contains("active")) {
    Icon.classList.add("fa-minus");
  } else {
    Icon.classList.add("fa-plus");
  }
};

ClosingArea.addEventListener("click", (e) => {
  document
    .querySelector("header .header-content nav")
    .classList.remove("active");
  ClosingArea.classList.remove("active");
});

BurgerIcon.addEventListener("click", (e) => {
  document.querySelector("header .header-content nav").classList.add("active");
  document.querySelector(".closing_area").classList.add("active");
});
CloseIcon.addEventListener("click", (e) => {
  document
    .querySelector("header .header-content nav")
    .classList.remove("active");
  ClosingArea.classList.remove("active");
});

FaqHeads.forEach((EachHead) => {
  EachHead.addEventListener("click", HandleFaqDropDown);
});

window.addEventListener("scroll", (e) => {
  let vendorsWrapper = document.querySelector(".venders-wrapper");
  console.log(vendorsWrapper.getBoundingClientRect().bottom);
  if (vendorsWrapper.getBoundingClientRect().bottom < 1000) {
    vendorsWrapper.querySelector(".presentation_vendors_para").textContent =
      "Your vendors can also make lending easier for you - which means the cost-saving, brand-boosting and game-changing ideas you envision on these vendors can now be funded into action.";
  } else {
    vendorsWrapper.querySelector(".presentation_vendors_para").textContent =
      "You trust your software vendors to help guide your operations - ERP system to manage supply chain and expenses, POS system to service customers, marketing platform to boost your reach.";
  }
});
