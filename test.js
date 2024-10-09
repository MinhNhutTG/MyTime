var Clouds = JSON.parse(localStorage.getItem('Clouds')) || [];

function gettime(time){
    var House = parseInt(time.slice(0,2));
    if (House<12 && House >= 1 ){
        return "bg-mor";
    }
    else if (House >= 12 && House < 17 ){
        return "bg-mon";
    }
    else if (House >= 17 || House < 24 ){
        return "bg-aft";
    }
    return "";
}
function setimg(time){
    var House = parseInt(time.slice(0,2));
    if (House > 0 && House <5){
        return "asset/mor.jpg";
    }
    else if (House >= 5 && House <12){
        return "asset/mor.jpg";
    }
    else if (House > 12 && House <= 17){
        return "asset/noon.jpg";
    }
    else if (House > 17 <= 24){
        return "asset/aft.jpg";
    }
    return "asset/mor.jpg";
}
function add(Day){
    var Title_value = document.querySelector("#input_title").value;
    var Time_value = document.querySelector("#input_time").value;
    var Note_value = document.querySelector("#input_note").value;
    var id = Day+Title_value + Time_value;

    if (Title_value == "" ||  Time_value == ""){
        alert("Bạn cần đặt đầy đủ thông tin !!!");
    }
    else {
        if (!Array.isArray(Clouds)) {
            Clouds = [];  
        }
        
        var dayPeriods = gettime(Time_value);
        
        Clouds.push({Index:Day,Id:id,Title:Title_value, Time:Time_value , Note:Note_value , dayPeriods:dayPeriods});
    
        localStorage.setItem('Clouds',JSON.stringify(Clouds));
        display();
    }
    document.querySelector("#input_title").value = '';
    document.querySelector("#input_time").value = '';
    document.querySelector("#input_note").value = '';
    
}
function display(){
    document.querySelectorAll(".my-form").forEach(form => form.remove());
    Clouds.forEach(function(item){
        var day = document.getElementById(item.Index);
        day.innerHTML +=   `
            <div class="my-form ${item.dayPeriods}" ondblclick="displayInPhone('${item.Id}')">
                <div class="d-flex">
                 <p class="Title">Title:</p>
                 <p class="text-truncate">${item.Title}</p>
                </div>
                <div class="d-flex">
                 <p class="Title">Time:</p>
                 <p class="">${item.Time}</p>
                </div>
                <div class="d-flex">
                 <p class="Title">Content:</p>
                 <p class="text-truncate">${item.Note}</p>
                </div>
            </div>
        `;
    })
    
   
}
function hiddenitem(){
    document.querySelectorAll(".my-form").forEach(form => form.remove());
    Clouds.forEach(function(item){
        var day = document.getElementById(item.Index);
        day.innerHTML = `
            <div class="row bg-success d-flex" style="height: 30px;">
                        <div class="col-9">
                            <p class=" text-center  text-light">${item.Index}</p>
                        </div>
                        <div class="col-3">
                            <div class="AddItem bg-primary text-light rounded-4" onclick="add('${item.Day}')">
                                <i class="fa-solid fa-plus"></i>
                            </div>
                            
                        </div>
            </div> 
        `;
    })
    
}
function displayInPhone(id) {
    var form = document.querySelector(".form");
    var detail = document.querySelector(".Detail_Item");
    var text = document.querySelector("#Text_SMS");
    var btndelete = document.querySelector(".button_delete_item");
    var img = document.getElementById("detail_img");
    
    var Item = Clouds.find(function(item) {
        return item.Id == id;
    });

    if (!Item) {
        console.error("Không tìm thấy mục với ID: " + id);
        return;
    }
    
    if (form.classList.contains("show") && !detail.classList.contains("show")) {
        form.classList.remove("show");
        detail.classList.add("show");
        
        deleteText();
        text.innerHTML+= `
            <p class="text-center h6 m-3" id="detail_title">${Item.Title}</p>
            <p class="text-center h6 m-3" id="detail_time">${Item.Time}</p>
            <p class="text-center h6 m-3" id="detail_note">${Item.Note}</p>
        `
        btndelete.addEventListener("click", function(){
            Clouds = Clouds.filter(function(item){
                return item.Id !== Item.Id;
            })
            localStorage.setItem('Clouds',JSON.stringify(Clouds));
            deleteText();
            display();
        })
        img.setAttribute("src", ""); 
        var src = setimg(Item.Time);
        img.setAttribute("src", src); 

    }
    
    else if (detail.classList.contains("show") && !form.classList.contains("show")) {
        detail.classList.remove("show");
        form.classList.add("show");
        img.setAttribute("src", ""); 
    }
    
}

function deleteall(){
    localStorage.removeItem('Clouds');
    Clouds = [];
    display();
}   
function deleteText(){
    var text = document.querySelector("#Text_SMS");
    text.innerHTML ="";
}
function play(){
    var form = document.querySelector(".form");
    var bgphone = document.querySelector(".bg-phone");
    var table = document.querySelector(".table-date");
    if (!form.classList.contains("show")){
        form.classList.add("show"); 
        bgphone.classList.remove("show");
        display();
    }
    
   
} 
function Home(){
    var form = document.querySelector(".form");
    var datail = document.querySelector(".Detail_Item");
    
    var bgphone = document.querySelector(".bg-phone");
 
    if (form.classList.contains("show")){
        form.classList.remove("show");
        
    }
    if (datail.classList.contains("show")){
        datail.classList.remove("show");  
        
    }
  
    
    hiddenitem();
    bgphone.classList.add("show");
}

// window.onload = function(){
    
//     display();
// }

// var data_title = document.querySelector("#input_title").value;
//     if (!data_title == ""){
//         var block = document.getElementById(Day);
//         block.innerHTML += `
//         <div class="my-form">
//         <div class="d-flex">
//          <p class="Title">Title:</p>
//          <p class="text-truncate">${data_title}</p>
//         </div>
//         <div class="d-flex">
//          <p class="Title">Time:</p>
//          <p class="">22/3/2024</p>
//         </div>
//         <div class="d-flex">
//          <p class="Title">Content:</p>
//          <p class="text-truncate">22/3/2024</p>
//         </div>
//         </div>
//     `; 
//     }
//     else {
//         alert("Bạn cần điền đầy đủ thông tin ở biểu mẫu");
//     }
    