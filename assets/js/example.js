// HI So Problem is after the ajax refresh event is not running 
// I am not using ajax i will use fetch api you can use ajax
// i will use demi api DemiMessages.json file you can use yours


// First we need to grab all messages and add event listeners on all messages
let MessageContainer=document.querySelector(".messages")
let Messages=document.querySelectorAll(".messages  > div");


// Now Apply Event Listener
Messages.forEach(EachMessage=>{
    EachMessage.addEventListener("click",(e)=>{

        // See this is simple demi event handler you will use your about modal popup
        window.alert("Cancel Done")
    })
})

// you will use yours not min
let MessageTemplate=(Message,id)=>{
    return `
    <div class=" prel" id=${id}>
    <p class="font5 fontfamilyub color2  ">
      ${Message}
    </p>
    <div class="bottom-area">
      <a href="#">Cancel</a>
      <p><span>Jun 20</span> | <span>06:53:00</span> </p>
    </div>
  </div>
    `
}



// now problem
setInterval(() => {

        // I am fetching new messages 
    fetch("./assets/js/DemiMessages.json")
    .then(Response=>Response.json())
    .then(Success=>{
    
        // success means new message will insert so lets insert
        Success.messages.forEach(EachMessage=>{
            
            MessageContainer.insertAdjacentHTML("beforeend",MessageTemplate(EachMessage.message),EachMessage.id)
        })


        // After The insertion now again add event listener because we have new message so grab all messages again
    

        Messages=document.querySelectorAll(".messages  > div");


        // add again event listener because we should javascript we have new elements
        Messages.forEach(EachMessage=>{
            EachMessage.addEventListener("click",(e)=>{
        
                // See this is simple demi event handler you will use your about modal popup
                window.alert("Cancel Done")
            })
        })

        
        

    })
    .catch(err=>{
        console.log(err)
    })
}, 5000);