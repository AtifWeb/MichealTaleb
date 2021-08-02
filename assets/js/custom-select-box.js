let SelectHead=document.querySelector(".select-head")
let SelectBodyLabels=document.querySelectorAll(".select-body li label")


SelectBodyLabels.forEach(EachLabel=>{
    EachLabel.addEventListener("click",(e)=>{
        
        let TextContent=e.target.textContent;


        let SelectHeadText=SelectHead.firstElementChild
    
        SelectHeadText.textContent=TextContent
    })
})


SelectHead.addEventListener("click",(e)=>{
    let NextSibling=e.target.nextElementSibling;
    SelectHead.classList.toggle("active")
    NextSibling.classList.toggle("active")
})