// This varialbe contains all images

let File;
let TotalSizeGlobal = 0;
let AllFiles = [];

// Store All Images In the form of string-so that i can be use in image src
let RenderImageResults = [];
let ImageWrappers = document.querySelectorAll(".images > .image >  span");

// This thing handle event to remove things
let HandleClickAbleImageWrapperWorking = (e) => {
  // let NewArr = [];

  let ImageWrapperIds = [];

  ImageWrappers.forEach((One) => {
    ImageWrapperIds.push(One.id);
  });

  let ImageWrapperClass = document.querySelector(`.${e.target.id}`)
    .classList[1];
  //   For loog
  for (let i = 0; i < File.length; i++) {
    // let FileName = File[i].name;
    // let FileNameWithoutDot = FileName.split(".")[0];
    // let ImageWithoutImageTitle = ImageWrapperClass.split("image-")[1];

    // because i dont want to add unneccessary file oject in file
    // if (FileNameWithoutDot != ImageWithoutImageTitle) {
    //   NewArr.push(File[i]);
    // }

    let SpecificFileName = document.querySelector(
      `.${ImageWrapperClass} .presentation h2`
    ).textContent;

    // Because i dont want cancel file
    AllFiles = AllFiles.filter((EachFile) => EachFile.name != SpecificFileName);
  }

  // File = NewArr;

  document.querySelector(`.${e.target.id}`).remove();

  let { FileLogo, FileSize } = TotalFileSize(AllFiles);

  document.querySelector(
    ".files-information"
  ).innerHTML = ` <span class="files-lenth">${AllFiles.length} ${
    AllFiles.length - 1 <= 1 ? "File" : "Files"
  } - ${FileSize} ${FileLogo}</span>  `;

  if (AllFiles.length == 0) {
    document.querySelector(".files-information").innerHTML = "";
    document.querySelector(".submit-wrapper").style.display = "none";
  }
};
const TotalFileSize = (Files) => {
  let TotalSize = 0;

  for (let i = 0; i < Files.length; i++) {
    TotalSize = TotalSize + Files[i].size;
  }

  TotalSizeInUnit = CountFileSize(TotalSize);

  return {
    ...TotalSizeInUnit,
    FileSizeInBytes: TotalSize,
  };
};
function Work(e) {
  // // Grab All Picturs

  File = e.target.files;
  AllFiles = [...File, ...AllFiles];

  console.log({ ...AllFiles });
  // console.log(e.target);
  // console.log(e.target.files);
  // e.target.files = { ...AllFiles };
  // console.log(e.target.files);

  let { FileLogo, FileSize, FileSizeInBytes } = TotalFileSize(AllFiles);

  document.querySelector(
    ".files-information"
  ).innerHTML = ` <span class="files-lenth">${AllFiles.length} ${
    AllFiles.length <= 1 ? "File" : "Files"
  } - ${FileSize} ${FileLogo}</span>  `;

  if (AllFiles.length < 26 && FileSizeInBytes < 2147483648) {
    document.querySelector(".error").innerHTML = "";
    document.querySelector(".submit-wrapper").style.display = "block";
    //   Loop On all Pictues
    for (let i = 0; i < File.length; i++) {
      // This thing convert image into string because we want to use in image src
      let reader = new FileReader();
      reader.readAsDataURL(File[i]);

      // When convert then this event fire
      reader.addEventListener("load", () => {
        // render.result means a string of image file you can check using console.log(render.result)
        RenderImageResults.push(reader.result);
        // AllFiles.push(File[i]);
        // I Removed Event Listeners
        document.querySelectorAll(".images > .image >  span").forEach((One) => {
          One.removeEventListener("click", HandleClickAbleImageWrapperWorking);
        });

        //   This is the html Element i want to add in DOM
        let HTMLElement = HTMLBOILTERPLATE(
          File[i].name,
          reader.result,
          File[i].type,
          File[i].size
        );

        //   Images is the container of all image div
        // you can see html file how things will work
        document
          .querySelector(".images")
          .insertAdjacentHTML("beforeend", HTMLElement);

        // I Added Event Listeners
        document.querySelectorAll(".images > .image >  span").forEach((One) => {
          One.addEventListener("click", HandleClickAbleImageWrapperWorking);
        });
      });

      // let { FileLogo, FileSize, FileSizeInBytes } = TotalFileSize(AllFiles);
    }
  } else {
    let ErrorMessage = HTMLERROR(
      `Use Maximum 25 Files Your Files length are ${File.length}`
    );
    document.querySelector(".error").innerHTML = ErrorMessage;
  }
}

// This is the helping function return html boilter plate
const HTMLERROR = (ERRORMessage) => {
  return ` <div class="error-container">
  
  <p class="error">${ERRORMessage}</p>
</div>`;
};

const CountFileSize = (FileSizeInBytes) => {
  let FileSizeInKb = FileSizeInBytes / 1024;
  let FileSizeInMb = FileSizeInKb / 1024;
  let FileSizeInGb = FileSizeInMb / 1024;
  if (FileSizeInKb < 1024) {
    return {
      FileSize: Math.round(FileSizeInKb),
      FileLogo: "kb",
    };
  } else if (FileSizeInMb < 1024) {
    return {
      FileSize: Math.round(FileSizeInMb),
      FileLogo: "Mb",
    };
  } else {
    return {
      FileSize: Math.round(FileSizeInGb),
      FileLogo: "Gb",
    };
  }
};

const HTMLBOILTERPLATE = (FileName, RenderResult, FileType, FileSizeParam) => {
  let FileNameWithoutDot = FileName.split(".")[0];
  let FileNameWithoutSpace = FileNameWithoutDot.split(" ")[0];

  let CheckFileType = FileType.split("/")[0];
  let { FileSize, FileLogo } = CountFileSize(FileSizeParam);

  if (CheckFileType == "image") {
    return `
    <div  class= "image image-${FileNameWithoutSpace}" >
    <span class="icon-wrapper" id="image-${FileNameWithoutSpace}">
    <i class="fas fa-times"></i>
    </span>
           <div class="left-side">
           <div class="left-side-icon-wrapper">
             <img src="./nimg/pro-plan.PNG" alt="">
           </div>
          <div class="presentation">
            <h2>${FileName}</h2>
            <span class="file-size">${FileSize} ${FileLogo}</span>
          </div>
          <img src=${RenderResult} alt="" class="person-image">
           </div>
        </div>
              
              `;
  }

  return `
  <div  class= "image image-${FileNameWithoutSpace}" >
    <span class="icon-wrapper" id="image-${FileNameWithoutSpace}">
    <i class="fas fa-times"></i>
    </span>
           <div class="left-side">
           <div class="left-side-icon-wrapper">
             <img src="./nimg/pro-plan.PNG" alt="">
           </div>
          <div class="presentation">
            <h2>${FileName}</h2>
            <span class="file-size">${FileSize} ${FileLogo}</span>
          </div>
         
           </div>
        </div>
            
            `;
};

// File When we change the value of image file
document.querySelectorAll(".file-input").forEach((EachFIleInput) => {
  EachFIleInput.addEventListener("change", Work);
});
document.querySelector("#submit-button").addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector("form").style.display = "none";
  document.querySelector("#header").style.display = "none";
  document.querySelector(".stickyhead").style.display = "none";
  document.querySelector(".please-wait-container").style.display = "block";
});
