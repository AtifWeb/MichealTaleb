// #IMPORTANT POINTs

// SearchInputWrapper is a wrapper of pure input please if you want to use this feature put this class in the parent of input you can check input variable in line 9

// ResultsWrapper is the wrapper of all result if you want to use this feature add this div below searchinputwrapper make sure not inside

// do this beloew the search input wrapper

// container
{
  /* <div class="search-result-container">
// results-wrapper

<div class="search-result-wrapper box-shadow-3d">
// will come all results

</div>
</div> */
}

// for more info about results warpper

let SearchInputWrapper = document.querySelector(".search-input-wrapper");
let ResultsWrapper = document.querySelector(".search-result-wrapper");
// let ResultsContainer = document.querySelector(".search-result-container");
let Input = document.querySelector(".search-input-wrapper input");

const HTML_SEARCH_TEMPLATE = (name) => {
  return ` <a href="#" class="search-result">
    <img src="./nimg/user svg.svg" alt="">
    <p>${name}</p>
  </a>`;
};

const FetchSearchingdata = (e) => {
  // IF YOU WANNA USE AJAX

  fetch("./assets/js/DemiArray.json")
    .then((response) => response.json())
    .then((data) => {
      let SearchMembers = data.members.filter(
        (EachData) => EachData.name == e.target.value
      );

      if (SearchMembers.length > 0) {
        ResultsWrapper.innerHTML = "";

        ResultsWrapper.style.display = "block";
        SearchInputWrapper.classList.add("active");

        SearchMembers.forEach((EachMember) => {
          ResultsWrapper.insertAdjacentHTML(
            "beforeend",
            HTML_SEARCH_TEMPLATE(EachMember.name)
          );
        });

        // do as same as i did in if e.target.name == "Atif Asim"
      } else {
        // do as same as i did in else part
        ResultsWrapper.innerHTML = "";
        ResultsWrapper.style.display = "none";
      }
    });
};

Input.addEventListener("keyup", FetchSearchingdata);
