// This varialbe contains all images

let File;
let TotalSizeGlobal = 0;
let AllFiles = [];
let FIleSteps = 0;
let FilesLength = [];
let FilesSize = [];
let MaxFileLength = document.querySelector(".file-length").value;
let MaxFileSize = document.querySelector(".file-size").value;
let MaxFileSizeInNumber = parseInt(MaxFileSize);
let MaxFileLengthInNumber = parseInt(MaxFileLength);

// START CHANGE
let { MaxFileSizeInDifferUnit, MaxFileSizeInUnit } =
  MaxFileSizeInUnits(MaxFileSizeInNumber);

// END CHANGE

// Store All Images In the form of string-so that i can be use in image src
let RenderImageResults = [];
let ImageWrappers = document.querySelectorAll(".images > .image >  span");

// This thing handle event to remove things
let HandleClickAbleImageWrapperWorking = (e) => {
  let SpecificNumber = e.target.id.split("-")[1];

  let DemiArrayForLength = [];
  let DemiArrayForSize = [];

  for (const c in FilesLength) {
    if (c != SpecificNumber - 1) {
      DemiArrayForLength.push(FilesLength[c]);
    } else {
      DemiArrayForLength.push({ length: 0 });
    }
  }

  for (const key in FilesSize) {
    if (key != SpecificNumber - 1) {
      DemiArrayForSize.push(FilesSize[key]);
    } else {
      DemiArrayForSize.push(0);
    }
  }

  FilesLength = DemiArrayForLength;
  FilesSize = DemiArrayForSize;

  let TotalFilesLength = CalculateLength(FilesLength);
  let { FileSize, FileSizeUnit } = CountFileSize(
    CalculateTotalSizeInBytes(FilesSize)
  );

  document.querySelector(`.step-${SpecificNumber}`).remove();

  // remove file input because we dont need
  RemoveFileInput(SpecificNumber - 1);

  document.querySelector(
    ".files-information"
  ).innerHTML = ` <span class="files-length">${TotalFilesLength} ${
    TotalFilesLength - 1 <= 1 ? "File" : "Files"
  } - ${FileSize} ${FileSizeUnit}</span>  `;

  if (TotalFilesLength == 0) {
    document.querySelector(".files-information").innerHTML = "";
    document.querySelector(".submit-wrapper").style.display = "none";
    document.querySelector(".stickyhead").style.display = "block";
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
function CalculateLength(fileArray) {
  let length = 0;
  fileArray.forEach((EachObject) => {
    length = length + EachObject.length;
  });

  return length;
}
function Calculate_Single_FileObject_Size_InBytes(file, decision) {
  let TotalSize = 0;
  for (let key = 0; key < file.length; key++) {
    TotalSize = TotalSize + file[key].size;
  }

  // START CHANGE
  if (decision != "No") {
    FilesSize.push(TotalSize);
  }

  return TotalSize;

  // END CHANGE
}
function CalculateTotalSizeInBytes(sizearray) {
  let TotalFilesSize = 0;
  sizearray.forEach((EachItem) => {
    TotalFilesSize = TotalFilesSize + EachItem;
  });
  // START CHANGE
  return TotalFilesSize;
  // END CHANGE
}
function Work(e) {
  // Grab All Picturs

  File = e.target.files;
  AllFiles = [...File, ...AllFiles];

  // CHANGE CONDITION MAKE SURE USE THIS CONDITION INSDE IF AND ELSE FI
  if (
    CalculateLength(FilesLength) + File.length <= MaxFileLengthInNumber &&
    CalculateTotalSizeInBytes(FilesSize) +
      Calculate_Single_FileObject_Size_InBytes(File, "No") <=
      MaxFileSizeInNumber
  ) {
    FilesLength.push(File);

    TotalFilesLength = CalculateLength(FilesLength);

    Calculate_Single_FileObject_Size_InBytes(File);

    let { FileSize, FileSizeUnit } = CountFileSize(
      CalculateTotalSizeInBytes(FilesSize)
    );

    document.querySelector(
      ".files-information"
    ).innerHTML = ` <span class="files-length">${TotalFilesLength} ${
      TotalFilesLength - 1 <= 1 ? "File" : "Files"
    } - ${FileSize} ${FileSizeUnit}</span>  `;

    FIleSteps++;
    CreateFileInput(
      `		<input type='file' id="file-${FIleSteps}" class="file-input" multiple   />`,
      FIleSteps
    );

    document.querySelector(".error").innerHTML = "";
    document.querySelector(".submit-wrapper").style.display = "block";
    document.querySelector(".stickyhead").style.display = "none";
    //   Loop On all Pictues

    let Images = document.querySelector(".images");

    let HTML = HTMLBOILTERPLATEWITHOUTLOOP(FIleSteps);

    Images.insertAdjacentHTML("beforeend", HTML);
    let CurrentStep = document.querySelector(`.step-${FIleSteps}`);

    document.querySelectorAll(".step-top .icon-wrapper").forEach((One) => {
      One.removeEventListener("click", HandleClickAbleImageWrapperWorking);
    });

    for (let i = 0; i < File.length; i++) {
      // This thing convert image into string because we want to use in image src
      let reader = new FileReader();
      reader.readAsDataURL(File[i]);

      // When convert then this event fire
      reader.addEventListener("load", () => {
        let HTML = HTMLBOILTERPLATE(
          File[i].name,
          reader.result,
          File[i].type,
          File[i].size
        );

        CurrentStep.insertAdjacentHTML("beforeend", HTML);

        document.querySelectorAll(".image").forEach((EachBox) => {
          EachBox.addEventListener("click", HandleImagePopUp);
        });
      });
    }

    document.querySelectorAll(".step-top .icon-wrapper").forEach((One) => {
      One.addEventListener("click", HandleClickAbleImageWrapperWorking);
    });

    document.querySelectorAll(".file-input").forEach((EachFIleInput) => {
      EachFIleInput.addEventListener("change", Work);
    });
  }
  // SIMPLE IF END BUT I ADDED ELSE IF

  // CHANGE START
  else if (CalculateLength(FilesLength) + File.length > MaxFileLengthInNumber) {
    let ErrorMessage = HTMLERROR(
      `Use Maximum ${MaxFileLengthInNumber} Files Your Files length are ${
        CalculateLength(FilesLength) + File.length
      }`
    );
    document.querySelector(".error").innerHTML = ErrorMessage;
  } else if (
    CalculateTotalSizeInBytes(FilesSize) +
      Calculate_Single_FileObject_Size_InBytes(File, "No") >
    MaxFileSizeInNumber
  ) {
    let { FileSize, FileSizeUnit } = CountFileSize(
      CalculateTotalSizeInBytes(FilesSize) +
        Calculate_Single_FileObject_Size_InBytes(File, "No")
    );
    let ErrorMessage = HTMLERROR(
      `Use Maximum ${MaxFileSizeInDifferUnit} ${MaxFileSizeInUnit} Your Files Size are ${FileSize} ${FileSizeUnit}`
    );
    document.querySelector(".error").innerHTML = ErrorMessage;
  }

  // CHANGE END
}
const CreateFileInput = (HTMLFILEINPUT, HTMLFILEINPUTID) => {
  document
    .querySelector(".files-information")
    .insertAdjacentHTML("afterend", HTMLFILEINPUT);

  document
    .querySelector(".upload-area")
    .setAttribute("for", `file-${HTMLFILEINPUTID}`);
};

const RemoveFileInput = (HTMLFILEINPUTID) => {
  document.querySelector(`#file-${HTMLFILEINPUTID}`).remove();
};

const HTMLBOILTERPLATEWITHOUTLOOP = (stepNumber) => {
  return `
  <div class="step-${stepNumber}"> <div class="step-top">
      <p>File ${stepNumber}</p>
      <span class="icon-wrapper" id="image-${stepNumber}">
        <i class="fas fa-times"></i>
      </span>
    </div>
    `;
};

const HTMLBOILTERPLATE = (FileName, RenderResult, FileType, FileSizeParam) => {
  let FileNameWithoutDot = FileName.split(".")[0];
  let FileNameWithoutSpace = FileNameWithoutDot.split(" ")[0];
  let FirstRandomNumber = Math.floor(Math.random() * 20);
  let SecondRandomNumber = Math.floor(Math.random() * 30);

  let CheckFileType = FileType.split("/")[0];
  let { FileSize, FileSizeUnit } = CountFileSize(FileSizeParam);

  if (CheckFileType == "image") {
    return `
    <div  class= "image image-${FileNameWithoutSpace}${FirstRandomNumber}${SecondRandomNumber} box-with-image"  id="pure-wrapper-${FileNameWithoutSpace}${FirstRandomNumber}${SecondRandomNumber}">
    
           <div class="left-side">
           <div class="left-side-icon-wrapper">
             <img src="./nimg/pro-plan.PNG" alt="">
           </div>
          <div class="presentation">
            <h2>${FileName}</h2>
            <span class="file-size">${FileSize} ${FileSizeUnit}</span>
          </div>
          <img src=${RenderResult} id="pure-image-${FileNameWithoutSpace}" alt="" class="person-image">
           </div>
        </div>
              
              `;
  }

  return `
  <div  class= "image image-${FileNameWithoutSpace}" >
  
           <div class="left-side">
           <div class="left-side-icon-wrapper">
             <img src="./nimg/pro-plan.PNG" alt="">
           </div>
          <div class="presentation">
            <h2>${FileName}</h2>
            <span class="file-size">${FileSize} ${FileSizeUnit}</span>
          </div>
         
           </div>
        </div>
            
            `;
};
const HandleImagePopUp = (e) => {
  let GetImageSrc = document.querySelector(`#${e.target.id} .person-image`).src;
  let PopUpElement = document.querySelector(".img-pop-up-container");
  PopUpElement.style.display = "block";

  document.querySelector(".img-pop-up-container img").src = GetImageSrc;
};
// This is the helping function return html boilter plate
const HTMLERROR = (ERRORMessage) => {
  return ` <div class="error-container">
  
  <p class="error">${ERRORMessage}</p>
</div>`;
};

function CountFileSize(FileSizeInBytes) {
  let FileSizeInKb = FileSizeInBytes / 1024;
  let FileSizeInMb = FileSizeInKb / 1024;
  let FileSizeInGb = FileSizeInMb / 1024;
  if (FileSizeInKb < 1024) {
    return {
      FileSize: Math.round(FileSizeInKb),
      FileSizeUnit: "kb",
    };
  } else if (FileSizeInMb < 1024) {
    return {
      FileSize: Math.round(FileSizeInMb),
      FileSizeUnit: "Mb",
    };
  } else {
    return {
      FileSize: Math.round(FileSizeInGb),
      FileSizeUnit: "Gb",
    };
  }
}

// CHANGE START
function MaxFileSizeInUnits(MaxFileSizeInNumber) {
  let { FileSize, FileSizeUnit } = CountFileSize(MaxFileSizeInNumber);

  return {
    MaxFileSizeInDifferUnit: FileSize,
    MaxFileSizeInUnit: FileSizeUnit,
  };
}
// CHANGE END

// File When we change the value of image file
document.querySelectorAll(".file-input").forEach((EachFIleInput) => {
  EachFIleInput.addEventListener("change", Work);
});

document.querySelector(".pop-up-close-icon").addEventListener("click", () => {
  document.querySelector(".img-pop-up-container").style.display = "none";
});

document.querySelector("#submit-button").addEventListener("click", (e) => {
  e.preventDefault();

  // NOTE THIS IS MY LOGIC TO SHOW INTERVAL IS WORKING FINE ON DESKTOP AND MOBILE BECAUSE I DONT HAVE BACKEND SO BACKEND DEVELOPER CAN USE HIS/HER LOGIC FOR BACKEND
  HandleSubmit();
});

// HandleSubmit Function

const HandleSubmit = () => {
  let PleaseWaitContainer = document.querySelector(".please-wait-container");
  let progressbar = document.querySelector(".progress-bar");
  let ProgressText = document.querySelector(
    ".please-wait-container > span > b"
  );
  let SharetoDesktopInside = document.querySelectorAll(
    "#share-to-desktop-form > *"
  );
  let header = document.querySelector("#header");
  let stickyhead = document.querySelector(".stickyhead");
  let Width = 0;

  SharetoDesktopInside.forEach((EachElement) => {
    EachElement.style.display = "none";
  });
  header.style.display = "none";
  stickyhead.style.display = "none";
  PleaseWaitContainer.style.display = "block";

  // We need first call immediatly not after a second
  Width = ProgressChanging(progressbar, ProgressText, Width);

  let IntervalOfSubmission = setInterval(() => {
    if (Width <= 100) {
      Width = ProgressChanging(progressbar, ProgressText, Width);
    } else {
      clearInterval(IntervalOfSubmission);
    }
  }, 3000);
};

const ProgressChanging = (progressbar, ProgressText, Width) => {
  progressbar.style.width = `${Width}%`;
  ProgressText.textContent = `${Width}%`;
  Width += 25;
  return Width;
};
