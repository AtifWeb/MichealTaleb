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

const UpdateFileValues=(ParentId,TotalFilesLength)=>{

  const GetTotalImages=document.querySelectorAll(".images .image").length
  const GetUpdateSize=GetTotalImages-TotalFilesLength;
  // FilesLength=GetUpdateSize
  FilesSize[ParentId-1]=0

  FilesLength[ParentId-1]=null

  CalculateLength(FilesLength) 


  let { FileSize, FileSizeUnit } = CountFileSize(
    CalculateTotalSizeInBytes(FilesSize)
  );


  if(FileSize<=0){
    document.querySelector(".submit-wrapper").style.display="none"
  }
   


  document.querySelector(
    ".files-information"
  ).innerHTML = ` <span class="files-length"><span class="total_file_length">${GetUpdateSize}</span> ${
    TotalFilesLength - 1 <= 1 ? "File" : "Files"
  } - ${FileSize} ${FileSizeUnit}</span>  `;



 
}

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

  let LocalFilesLength=e.target.parentNode.parentNode.querySelectorAll(".image").length
  let ParentId=e.target.parentNode.parentNode.classList[0].split('-')[1]

  // let TotalFiles=document.querySelectorAll()
  let DemiArrayForLength = [];
  let DemiArrayForSize = [];

  for (const c in FilesLength) {
    if (c !== SpecificNumber - 1) {
      DemiArrayForLength.push(FilesLength[c]);
    } else {
      DemiArrayForLength.push({ length: 0 });
    }
  }

  for (const key in FilesSize) {
    if (key !== SpecificNumber - 1) {
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


  // function
  UpdateFileValues(ParentId,LocalFilesLength)
  e.target.parentNode.parentNode.remove();

  // remove file input because we dont need

  RemoveFileInput(ParentId);

  if (TotalFilesLength === 0) {
    document.querySelector(".files-information").innerHTML = "";
    document.getElementById("submit1").style.display = "none";
    document.getElementById("header").style.display = "block";
    document.getElementById("mainfooterid").style.display = "block";
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
    if(EachObject!=null)
    {
      length = length + EachObject.length;

    }
  });

  return length;
}
function Calculate_Single_FileObject_Size_InBytes(file, decision) {
  let TotalSize = 0;
  for (let key = 0; key < file.length; key++) {
    TotalSize = TotalSize + file[key].size;
  }

  // START CHANGE
  if (decision !== "No") {
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


if(TotalFilesLength>0){
  document.querySelector(".submit-wrapper").style.display="block"
}
 

    document.querySelector(
      ".files-information"
    ).innerHTML = ` <span class="files-length"><span class="total_file_length">${TotalFilesLength}</span> ${
      TotalFilesLength - 1 <= 1 ? "File" : "Files"
    } - ${FileSize} ${FileSizeUnit}</span>  `;

    FIleSteps++;
    /*CreateFileInput(
         `		<input type='file' id="file-${FIleSteps}" class="file-input" multiple   />`,
         FIleSteps
         );*/

    CreateFileInput(
      `		<input type="file" name="file-${FIleSteps}" id="file-${FIleSteps}" class="file-input" multiple   />`,
      FIleSteps
    );

    document.querySelector(".error").innerHTML = "";

    document.getElementById("submit1").style.display = "block";
    document.getElementById("header").style.display = "block";
    
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
      `<div id="htitle" class="fetch-files-container"><div class="card require-time-card"><img src="./nimg/fetch-files-require-more-time.PNG" alt=""><p>Maximum Allowed Is <b>${MaxFileLengthInNumber}</b> Files<br>Uploaded Files Are <b>${
        CalculateLength(FilesLength) + File.length
      }</b></p></div></div>`
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
      `<div id="htitle" class="fetch-files-container"><div class="card require-time-card"><img src="./nimg/fetch-files-require-more-time.PNG" alt=""><p>Files Too Big<br>Send Size: <b>${FileSize} ${FileSizeUnit}</b><br>Maximum Allowed: <b>${MaxFileSizeInDifferUnit} ${MaxFileSizeInUnit}</b><br><a href=sub.jsp  title="Plans" style=\"color: blue;\">Upgrade Plan</a></p></div></div>`
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

  document.querySelector(`#file-${HTMLFILEINPUTID}`);
};

const HTMLBOILTERPLATEWITHOUTLOOP = (stepNumber) => {
  return `
  <div class="step-${stepNumber}"> <div class="step-top">
      <p>Uploaded Set ${stepNumber}</p>
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

  if (CheckFileType === "image") {
    return `
    <div  class= "image image-${FileNameWithoutSpace}${FirstRandomNumber}${SecondRandomNumber} box-with-image"  id="pure-wrapper-${FileNameWithoutSpace}${FirstRandomNumber}${SecondRandomNumber}">
    
           <div class="left-side">
           <div class="left-side-icon-wrapper">
             <i class="fas ${getFileExtension(
               FileName
             )} fa-2x" style="color: white;"></i>
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
             <i class="fas ${getFileExtension(
               FileName
             )} fa-2x" style="color: white;"></i>
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
      FileSizeUnit: "KiB",
    };
  } else if (FileSizeInMb < 1024) {
    return {
      FileSize: Math.round(FileSizeInMb),
      FileSizeUnit: "MiB",
    };
  } else {
    return {
      FileSize: Math.round(FileSizeInGb),
      FileSizeUnit: "GiB",
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

const HandleProgressBarUpdates = (try_number) => {
  try {
    var text = document.getElementById("progbar").innerHTML;
    var result = text.substring(0, 4);
    if (result === "Wait") {
      return;
    }
  } catch (error) {

    return;
  }

  try {
    try_number++;

    $.ajax({
      type: "get",
      url: `https://www.4fimo.com/4fimoweb/DemoProgress`,

      cache: false,
      processData: false,
      success: function (html) {
        document.querySelector(".please-wait-container").innerHTML = html;
      },
    });

    return try_number;
  } catch (error) {
   return error
  }

  /// setTimeout(checkProgress, 3000);
};

function checkProgress() {
  try {
    var text = document.getElementById("progbar").innerHTML;
    var result = text.substring(0, 4);
    if (result === "Wait") {
      return;
    }
  } catch (error) {
    ////setTimeout(checkProgress, 3000);
    return;
  }

  try {
    $.ajax({
      type: "post",
      url: "UploadProgress",
      data: "",
      cache: false,
      processData: false,
      success: function (msg) {
        var result1 = msg.substring(0, 1);
        if (result1 === "0") {
        } else {
          document.getElementById("progbar").innerHTML = msg;
        }
      },
    });
  } catch (error) {
    return;
  }

}


document.getElementById("submit1").addEventListener("click", (e) => {
  e.preventDefault();
 
  document
    .querySelectorAll("#share-to-desktop-form > *")
    .forEach((EachElement) => {
      EachElement.style.display = "none";
    });
  document.querySelector(".please-wait-container").style.display = "block";
  document.getElementById("submit1").style.display = "none";
  document.getElementById("header").style.display = "none";
  
});

// CHANGE START
function getFileExtension(filename) {
  var ext = filename.split(".").pop();
  ext = ext.toLowerCase();
  if (ext === "pdf") {
    return "fas fa-file-pdf";
  }

  if (ext === "doc") {
    return "fas fa-file-word";
  }
  if (ext === "docx") {
    return "fas fa-file-word";
  }
  if (ext === "ppt") {
    return "fas fa-file-powerpoint";
  }
  if (ext === "pptx") {
    return "fas fa-file-powerpoint";
  }
  if (ext === "xls") {
    return "fas fa-file-excel";
  }
  if (ext === "xlsx") {
    return "fas fa-file-excel";
  }
  if (ext === "csv") {
    return "fas fa-file-csv";
  }
  if (ext === "mp4") {
    return "fas fa-file-video";
  }
  if (ext === "mov") {
    return "fas fa-file-video";
  }
  if (ext === "m4v") {
    return "fas fa-file-video";
  }
  if (ext === "mkv") {
    return "fas fa-file-video";
  }
  if (ext === "webm") {
    return "fas fa-file-video";
  }
  if (ext === "mpeg") {
    return "fas fa-file-video";
  }
  if (ext === "avi") {
    return "fas fa-file-video";
  }
  if (ext === "flv") {
    return "fas fa-file-video";
  }
  if (ext === "f4v") {
    return "fas fa-file-video";
  }
  if (ext === "wmv") {
    return "fas fa-file-video";
  }
  if (ext === "rm") {
    return "fas fa-file-video";
  }
  if (ext === "asf") {
    return "fas fa-file-video";
  }
  if (ext === "mts") {
    return "fas fa-file-video";
  }
  if (ext === "ogv") {
    return "fas fa-file-video";
  }

  if (ext === "zip") {
    return "fas fa-file-archive";
  }
  if (ext === "rar") {
    return "fas fa-file-archive";
  }
  if (ext === "png") {
    return "fas fa-file-image";
  }
  if (ext === "jpg") {
    return "fas fa-file-image";
  }
  if (ext === "jpeg") {
    return "fas fa-file-image";
  }
  if (ext === "gif") {
    return "fas fa-file-image";
  }
  if (ext === "ico") {
    return "fas fa-file-image";
  }
  if (ext === "bmp") {
    return "fas fa-file-image";
  }
  if (ext === "webp") {
    return "fas fa-file-image";
  }

  if (ext === "mp3") {
    return "fas fa-music";
  }
  if (ext === "wav") {
    return "fas fa-file-audio";
  }
  if (ext === "wma") {
    return "fas fa-file-audio";
  }
  if (ext === "ogg") {
    return "fas fa-file-audio";
  }
  if (ext === "ra") {
    return "fas fa-file-audio";
  }
  if (ext === "m4a") {
    return "fas fa-file-audio";
  }

  if (ext === "oga") {
    return "fas fa-file-audio";
  }
  if (ext === "flac") {
    return "fas fa-file-audio";
  }
  if (ext === "aiff") {
    return "fas fa-file-audio";
  }
  if (ext === "au") {
    return "fas fa-file-audio";
  }
  if (ext === "aac") {
    return "fas fa-file-audio";
  }
  if (ext === "aif") {
    return "fas fa-file-audio";
  }

  if (ext === "svg") {
    return "fas fa-file-image";
  }
  if (ext === "tif") {
    return "fas fa-file-image";
  }

  return "fas fa-file";
}
