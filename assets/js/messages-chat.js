// NOTE PLEASE CHECK || HTMLBOILTERPLATE || THIS FUNCTION IF YOU WANT TO CHECK DYNAMIC HTML FOR VIDEO,IAMGE AND FILES

// NOTE PLEASE CHECK || ControlSubmitFiles || THIS FUNCTION IF YOU WANT TO CHECK DYNAMIC HTML FOR TEXT MAKE SURE SEE IN THE END YOU WILL SEE DYNAMIC HTML

// contain all files like video or image file
let AllFiles = [];

// This is an input element for type text
let MessageInput = document.querySelector(".type-message-input");

// This Event will help us to grab file and message
function MessageChat(e) {
  // Grabing All Files
  File = e.target.files;

  // Storing into AllFiles you can check line #02
  AllFiles = File;

  // This is the container of Files Container means when you select on files you can recheck before click on send you can check you will see background White when you select
  let MessageContainer = document.querySelector(".confirm-messages");
  // This is the container of all files which will show in confirm mode files
  let FilesContainer = document.querySelector(".Files-container");

  // We want to clean content inside files container
  FilesContainer.textContent = "";

  // We need to show white background Screen
  MessageContainer.style.display = "block";

  // This is the for loop Working : this for loop is grabing one file at a time and convert it into readable form why i am doing this because i need to show in front end without any backend so we can pass readble form inside src of image or video
  for (let i = 0; i < File.length; i++) {
    // This thing convert image into string because we want to use in image src
    let reader = new FileReader();

    // Converting image to readble form
    reader.readAsDataURL(File[i]);

    // When convert then this event fire
    reader.addEventListener("load", () => {
      // This helping function is using to show all file like images to confirm you want to send or not so this function will return proper HTML CODE you can check this function
      let HTML = HTMLBOILTERPLATEFORSHOW(
        File[i].name,
        reader.result,
        File[i].type,
        File[i].size
      );

      // Now you can insert in white background for confirm purpost
      FilesContainer.insertAdjacentHTML("beforeend", HTML);
    });
  }
}

const ControlCloseIcon = (e) => {
  // Query Selectors
  let MessageContainer = document.querySelector(".confirm-messages");
  let FileInput = document.querySelector("#messages-files");
  let FilesContainer = document.querySelector(".Files-container");

  // We need to remove when we dont want click on close icon because we want to refrest file input
  FileInput.remove();

  MessageContainer.style.display = "none";
  FilesContainer.textContent = "";

  // I am creating again because we need file input with no file
  let FILEHTML = `<input type="file" name="" id="messages-files" multiple>`;
  let SENDFILEAREA = document.querySelector(".send_msg");

  // I am rendering file input
  SENDFILEAREA.insertAdjacentHTML("beforeend", FILEHTML);

  // I am assign empty value i All Files
  AllFiles = [];
  // Again Add EventListener
  document
    .querySelector("#messages-files")
    .addEventListener("change", MessageChat);
};

// Calculate Total File Size
const CalculateFileSize = (AllFiles) => {
  let FileSizeInBytes = 0;
  for (let i = 0; i < AllFiles.length; i++) {
    FileSizeInBytes = FileSizeInBytes + AllFiles[i].size;
  }
  return FileSizeInBytes;
};

// This Event Is very important because it will control submit
const ControlSubmitFiles = (e) => {
  e.preventDefault();

  // For Calulation file size
  let FilesSize = CalculateFileSize(AllFiles);

  let LocalFiles = AllFiles;

  if (AllFiles.length > 0 && AllFiles.length < 25 && FilesSize <= 1000000000) {
    // Query Selectors
    let MessageContainer = document.querySelector(".confirm-messages");
    let FilesContainer = document.querySelector(".Files-container");
    let Messages = document.querySelector(".messages");

    // When we click on send we dont want to show background White Screen so i made it display noen
    MessageContainer.style.display = "none";

    // We also dont need any content inside files container
    FilesContainer.textContent = "";

    // Same Working As you can see in Message Chat Function but this time to show in chat and it is only for files
    for (let i = 0; i < LocalFiles.length; i++) {
      // This thing convert image into string because we want to use in image src
      let reader = new FileReader();
      reader.readAsDataURL(LocalFiles[i]);

      // When convert then this event fire
      reader.addEventListener("load", () => {
        let HTML = HTMLBOILTERPLATE(
          LocalFiles[i].name,
          reader.result,
          LocalFiles[i].type,
          LocalFiles[i].size
        );

        Messages.insertAdjacentHTML("beforeend", HTML);

        window.scrollTo(
          window.pageYOffset,
          document.querySelector("body").offsetHeight + 100
        );
      });
    }

    // YOU CAN POST FILE HERE
    // YOU CAN USE LOCAL FILE VARIABLE OR ALL FILES VARIABLE

    // BACKEND CALL FOR POST FILES

    // END BACKEND CALL FOR POST FILES

    AllFiles = [];
  }

  // We are checking did user type any text in input field if yes then we want to display
  if (MessageInput.value != "") {
    const Messages = document.querySelector(".messages");

    // This is the boiler plate for show text
    let HTMLTEXT = `  <div class="prel  my-text">
    <p class="font5 fontfamilyub color2">
      ${MessageInput.value}
    </p>
    <div class="bottom-area">
    <a href="#">Cancel</a>
    <p><span>Jun 20</span> | <span>06:53:00</span> </p>
  </div>
  </div>`;

    // Now I am rendering message in the chat
    Messages.insertAdjacentHTML("beforeend", HTMLTEXT);

    window.scrollTo(
      window.pageYOffset,
      document.querySelector("body").offsetHeight + 100
    );

    // After show we want empty input feild
    MessageInput.value = "";
  }

  // let MessagFile = document.querySelector("#messages-files");
  // let HTMLFILE = ` <input type="file" name="" id="messages-files" multiple>`;
  // let Form = document.querySelector(".send_msg > form");
  // MessagFile.remove();
  // console.log(MessagFile);
  // console.log(HTMLFILE);
  // console.log(Form);
  // // MessagFile.remove();
  // // Form.insertAdjacentHTML("beforeend", HTMLFILE);
};

// This is the helping function boiler plate which will used in confirm files
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

// This is the bolier plate for video,file or image
const HTMLBOILTERPLATE = (FileName, RenderResult, FileType, FileSizeParam) => {
  let FileNameWithoutDot = FileName.split(".")[0];
  let FileNameWithoutSpace = FileNameWithoutDot.split(" ")[0];

  let CheckFileType = FileType.split("/");

  if (CheckFileType[0] == "image") {
    return `
    <div class="image-container my-text">
    <img src=${RenderResult} id="pure-image-${FileNameWithoutSpace}" alt="" class="message-image">
    <div class="bottom-area">
    <a href="#">Cancel</a>
    <p><span>Jun 20</span> | <span>06:53:00</span> </p>
  </div>
    </div>
    `;
  } else if (CheckFileType[0] == "video" && CheckFileType[1] == "mp4") {
    return `
 <div class="video-container my-text">
 <video src=${RenderResult} controls id="pure-video-${FileNameWithoutSpace}" alt="" class="message-video">
 <div class="bottom-area">
 <a href="#">Cancel</a>
 <p><span>Jun 20</span> | <span>06:53:00</span> </p>
</div>
 </div>`;
  } else if (CheckFileType[0] != "image" && CheckFileType[0] != "video") {
    return `
    <div class="file-container my-text">

    <img src="./nimg/file-fetch.PNG" id="show-image-${FileNameWithoutSpace}" alt="" class="confirm-image">
    <p>File <b>${FileName}</b></p>
    <div class="bottom-area">
    <a href="#">Cancel</a>
    <p><span>Jun 20</span> | <span>06:53:00</span> </p>
  </div>
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
