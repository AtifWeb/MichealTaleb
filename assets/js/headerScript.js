window.addEventListener("load",()=>{
    let header=document.querySelector("header")
let AnchorHref=document.querySelector("header a").getAttribute("href")


header.addEventListener("click",()=>{
    window.location.href = AnchorHref;
})
})