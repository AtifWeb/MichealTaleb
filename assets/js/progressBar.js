const ProgressBarCalling=e=>{
    try{

    
    $.ajax({
        type: "get",
        url: `https://www.4fimo.com/4fimoweb/DemoProgress`,
  
        cache: false,
        processData: false,
        success: function (html) {
            console.log(html)
          document.querySelector(".please-wait-container").innerHTML = html;
        },
      });
  
    
    } catch (error) {
      console.log(error);
  
    }
}


setInterval(() => {
    ProgressBarCalling()
}, 1000);