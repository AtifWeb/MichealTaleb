let ParticiPantsCollection = document.querySelectorAll(
  ".participants-collection > .participant label"
);

let PureCheckBoxes = document.querySelectorAll(
  ".participants-collection > .participant > input"
);
let ParticipantsContainer = document.querySelector(
  ".participant-reel-container"
);
let ParticipantsReel = document.querySelector(".participants-reel");
let CaptureParticipants = [];

let CloseWrapper = document.querySelectorAll(".close-wrapper");
let BackArrow = document.querySelector(".backward-arrow");
let ForwardArrow = document.querySelector(".forward-arrow");
let CurrentTranslate = 0;
function Query(element) {
  return document.querySelector(element);
}

const HandleParticipantSelection = (e) => {
  let Element = e.target;
  let TargetId = e.target.id;

  let IdInArray = TargetId.split("-");

  let LastIdInArray = IdInArray[3];
  e.target.classList.toggle("active-label");

  let CustomCheckBox = Query(
    `#participants-collection-participant${LastIdInArray} > label .custom-checkbox`
  );

  let OriginCheckBox = Query(
    `#participants-collection-participant${LastIdInArray} > input`
  );

  if (Element.classList.contains("active-label")) {
    // Grab Image Src
    let TargetImageSource = Query(`#${TargetId} .participant-image img`).src;

    // Grab Participant Name
    let TargetName = Query(`#${TargetId} p`).textContent;

    CustomCheckBox.classList.add("active-checkbox");

    // HELPING FUNCTION USED TO ADD TEMPLATE
    let HTMLELEMENT = HTMLTEMPLATE(
      TargetImageSource,
      TargetName,
      LastIdInArray
    );

    // Adding HTML

    ParticipantsReel.insertAdjacentHTML("beforeend", HTMLELEMENT);

    // Event Listener
    CloseWrapper.forEach((EachCloseWrapper) => {
      EachCloseWrapper.removeEventListener("click", HandleSelectedParticipant);
    });

    CloseWrapper = document.querySelectorAll(".close-wrapper");

    // Event Listener
    CloseWrapper.forEach((EachCloseWrapper) => {
      EachCloseWrapper.addEventListener("click", HandleSelectedParticipant);
    });
  } else {
    // Remove Element
    Query(`#participant-reel-${LastIdInArray}`).remove();

    CustomCheckBox.classList.remove("active-checkbox");
  }

  // new edit
  let ParticipantLength = document.querySelectorAll(".top-participant").length;

  if (ParticipantLength > 0) {
    ParticipantsContainer.style.display = "block";
  } else {
    ParticipantsContainer.style.display = "none";
  }
};

const HandleSelectedParticipant = (e) => {
  // Target Element Grab
  let TargetElementId = e.target.id;
  let Id_In_Array = TargetElementId.split("-");
  let LastId_In_Array = Id_In_Array[4];

  // Specific Label Grab
  let Label = document.querySelector(
    `#participants-collection-label-${LastId_In_Array}`
  );

  Label.classList.remove("active-label");

  let CustomCheckBox = Query(
    `#participants-collection-participant${LastId_In_Array} > label .custom-checkbox`
  );

  let OriginCheckBox = Query(
    `#participants-collection-participant${LastId_In_Array} > input`
  );

  OriginCheckBox.checked = false;

  CustomCheckBox.classList.remove("active-checkbox");
  Query(`#participant-reel-${LastId_In_Array}`).remove();

  let ParticipantLength = document.querySelectorAll(".top-participant").length;

  if (ParticipantLength > 0) {
    ParticipantsContainer.style.display = "block";
  } else {
    ParticipantsContainer.style.display = "none";
  }
};

// HELPING FUNCTION

const HTMLTEMPLATE = (ImageSource, Name, ParticipantId) => {
  return `  <div class="participant top-participant" id="participant-reel-${ParticipantId}">
    <span class="close-wrapper"id="participant-reel-Close-Icon-${ParticipantId}">
       <i class="fas fa-times" id="pure-close-icon"></i>
    </span>
    <div class="participant-image" style="background-image:url(${ImageSource})"></div>
    <p class="participants-reel-participant-name">${Name}</p>
</div>`;
};
const EmptyEventHandler = (e) => {
  // you can write your code
};

const EmptyEventHandlerCheckBox = (e) => {
  // you can write your code
};
// Event Listener
ParticiPantsCollection.forEach((EachParticipant) => {
  EachParticipant.addEventListener("click", HandleParticipantSelection);
});
ParticiPantsCollection.forEach((EachParticipant) => {
  EachParticipant.addEventListener("click", EmptyEventHandler);
});
PureCheckBoxes.forEach((EachParticipant) => {
  EachParticipant.addEventListener("change", EmptyEventHandlerCheckBox);
});
const HandleBackwardSlide = (e) => {
  CurrentTranslate = CurrentTranslate - 90;
  ParticipantsReel.style.transform = `translateX(${CurrentTranslate}px)`;
};
const HandleForwardSlide = (e) => {
  if (CurrentTranslate < 0) {
    CurrentTranslate = CurrentTranslate + 90;
    ParticipantsReel.style.transform = `translateX(${CurrentTranslate}px)`;
  }
};

ForwardArrow.addEventListener("click", HandleBackwardSlide);
BackArrow.addEventListener("click", HandleForwardSlide);
