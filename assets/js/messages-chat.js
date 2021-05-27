let AllFiles = [];
function MessageChat(e) {
  File = e.target.files;
  AllFiles = File;

  let MessageContainer = document.querySelector(".confirm-messages");
  let FilesContainer = document.querySelector(".Files-container");
  FilesContainer.textContent = "";
  MessageContainer.style.display = "block";

  for (let i = 0; i < File.length; i++) {
    // This thing convert image into string because we want to use in image src
    let reader = new FileReader();
    reader.readAsDataURL(File[i]);

    // When convert then this event fire
    reader.addEventListener("load", () => {
      // let HTML = HTMLBOILTERPLATE(
      //   File[i].name,
      //   reader.result,
      //   File[i].type,
      //   File[i].size
      // );
      let HTML = HTMLBOILTERPLATEFORSHOW(
        File[i].name,
        reader.result,
        File[i].type,
        File[i].size
      );

      FilesContainer.insertAdjacentHTML("beforeend", HTML);
    });
  }
}
const ControlCloseIcon = (e) => {
  let MessageContainer = document.querySelector(".confirm-messages");
  let FileInput = document.querySelector("#messages-files");
  let FilesContainer = document.querySelector(".Files-container");
  FileInput.remove();
  MessageContainer.style.display = "none";
  FilesContainer.textContent = "";
  let FILEHTML = `<input type="file" name="" id="messages-files" multiple>`;
  let SENDFILEAREA = document.querySelector(".send_msg");
  console.log(SENDFILEAREA);
  SENDFILEAREA.insertAdjacentHTML("beforeend", FILEHTML);
  AllFiles = [];
  // Again Add EventListener
  document
    .querySelector("#messages-files")
    .addEventListener("change", MessageChat);
};
const ControlSubmitFiles = (e) => {
  e.preventDefault();
  console.log(AllFiles.length);
  console.log(AllFiles);
  if (AllFiles.length > 0) {
    let MessageContainer = document.querySelector(".confirm-messages");
    let FilesContainer = document.querySelector(".Files-container");
    let Messages = document.querySelector(".messages");

    MessageContainer.style.display = "none";
    FilesContainer.textContent = "";

    for (let i = 0; i < AllFiles.length; i++) {
      // This thing convert image into string because we want to use in image src
      let reader = new FileReader();
      reader.readAsDataURL(AllFiles[i]);

      // When convert then this event fire
      reader.addEventListener("load", () => {
        let HTML = HTMLBOILTERPLATE(
          AllFiles[i].name,
          reader.result,
          AllFiles[i].type,
          AllFiles[i].size
        );

        Messages.insertAdjacentHTML("beforeend", HTML);

        window.scrollTo(
          window.pageYOffset,
          document.querySelector("body").offsetHeight + 100
        );
      });
    }
  }
};
const HTMLBOILTERPLATEFORSHOW = (
  FileName,
  RenderResult,
  FileType,
  FileSizeParam
) => {
  let FileNameWithoutDot = FileName.split(".")[0];
  let FileNameWithoutSpace = FileNameWithoutDot.split(" ")[0];

  let CheckFileType = FileType.split("/");

  if (CheckFileType[0] == "image") {
    return `
    
    <img src=${RenderResult} id="show-image-${FileNameWithoutSpace}" alt="" class="confirm-image">
    
    `;
  } else if (CheckFileType[0] == "video" && CheckFileType[1] == "mp4") {
    return `
 
 <video src=${RenderResult} controls id="show-video-${FileNameWithoutSpace}" alt="" class="confirm-video">
 `;
  } else if (CheckFileType[0] != "image" && CheckFileType[0] != "video") {
    return `
 <div class="file-container my-text">

    <img src="./nimg/file-fetch.PNG" id="show-image-${FileNameWithoutSpace}" alt="" class="confirm-image">
    <p>File <b>${FileName}</b></p>
 </div>`;
  }

  return ``;
};
const HTMLBOILTERPLATE = (FileName, RenderResult, FileType, FileSizeParam) => {
  let FileNameWithoutDot = FileName.split(".")[0];
  let FileNameWithoutSpace = FileNameWithoutDot.split(" ")[0];

  let CheckFileType = FileType.split("/");

  if (CheckFileType[0] == "image") {
    return `
    <div class="image-container my-text">
    <img src=${RenderResult} id="pure-image-${FileNameWithoutSpace}" alt="" class="message-image">
    </div>
    `;
  } else if (CheckFileType[0] == "video" && CheckFileType[1] == "mp4") {
    return `
 <div class="video-container my-text">
 <video src=${RenderResult} controls id="pure-video-${FileNameWithoutSpace}" alt="" class="message-video">
 </div>`;
  } else if (CheckFileType[0] != "image" && CheckFileType[0] != "video") {
    return `
    <div class="file-container my-text">

    <img src="./nimg/file-fetch.PNG" id="show-image-${FileNameWithoutSpace}" alt="" class="confirm-image">
    <p>File <b>${FileName}</b></p>
 </div>`;
  }

  return ``;
};
document
  .querySelector("#messages-files")
  .addEventListener("change", MessageChat);
document
  .querySelector(".confirm-close-icon")
  .addEventListener("click", ControlCloseIcon);
document
  .querySelector(".submit-input")
  .addEventListener("click", ControlSubmitFiles);
