let SelectHeading = document.querySelector(".select-heading");
let SelectFieldsWrapper = document.querySelector(".select-field-pure");
let ParticiPantsCollection = document.querySelectorAll(".participant label");

let PureCheckBoxes = document.querySelectorAll(" .participant > input");

function Query(element) {
  return document.querySelector(element);
}

const HandleParticipantSelection = (e) => {
  let Element = e.target;
  let TargetId = e.target.id;
  let IdInArray = TargetId.split("-");

  let LastIdInArray = IdInArray[3];
  Element.classList.toggle("active-label");

  let CustomCheckBox = Query(
    `#participants-collection-participant${LastIdInArray} > label .custom-checkbox`
  );

  CustomCheckBox.classList.toggle("active-checkbox");
};

const HandleSelectlist = (e) => {
  SelectFieldsWrapper.classList.toggle("activeSelectWrapper");
};
SelectHeading.addEventListener("click", HandleSelectlist);
ParticiPantsCollection.forEach((EachParticipant) => {
  EachParticipant.addEventListener("click", HandleParticipantSelection);
});
