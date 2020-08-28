var slideIndex = 0;
var x = window.matchMedia('(max-width: 700px)');

showSlides();
showDateTime();
setDateNow();
function showSlides() {
    var i;
    var slides = document.getElementsByClassName("slideshow-item");
    for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    slides[slideIndex-1].style.display = "flex";  
    setTimeout(showSlides, 6000); // Change image every 2 seconds
}
function openNav() {
document.getElementById("mySidenav").style.width = "260px";
}
function closeNav() {
document.getElementById("mySidenav").style.width = "0";
}
function inc_time_length(){
    var val = parseInt(document.getElementById('time_length').textContent);
    if(val>=24){val = 24;}
    else{val++;}
    document.getElementById('time_length').textContent = val;
}
function dec_time_length(){
    var val = parseInt(document.getElementById('time_length').textContent);
    if(val == 1){val = 1;}
    else{val--;}
    document.getElementById('time_length').textContent = val;
}
function inc_time_start(){
    var val = parseInt(document.getElementById('time').textContent);
    if(val>=12){val = 12;}
    else{val++;}
    document.getElementById('time').textContent = val;
}
function dec_time_start(){
    var val = parseInt(document.getElementById('time').textContent);
    if(val == 1){val = 1;}
    else{val--;}
    document.getElementById('time').textContent = val;
}
function showDateTime(){
    var dt = new Date();

    var monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
                    "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

    var days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    
    var day_now = days[dt.getDay()];
    var time_now = (("0"+dt.getHours()).slice(-2)) + ":" + (("0"+dt.getMinutes()).slice(-2));
    var date_now =monthNames[dt.getMonth()] + " " + (("0"+dt.getDate()).slice(-2));

    document.getElementById("time_now").textContent = time_now;
    document.getElementById("date_now").textContent = date_now;
    document.getElementById("day_now").textContent = day_now; 
    //Set to fire every second
    setTimeout(showDateTime, 1000);

}
function openProcTab(){
    document.getElementById('proc_nav').style.width = "100%";
}
function closeProcTab(){
    document.getElementById('proc_nav').style.width = "0";
}
function openFilterTab(){
    document.getElementById('proc_nav').style.width = "0";
    if (x.matches){
        document.getElementById('filter_sidebar').style.width = "100%";
    }
    else{
        document.getElementById('filter_sidebar').style.width = "40%";
    }
}
function closeFilterTab(){
    document.getElementById('filter_sidebar').style.width = "0";
    document.getElementById('proc_nav').style.width = "100%";
}
function sort_selection_has_focused()
{
    //Filter do something
    var txtField = document.getElementById("search_text").value;
    if(txtField == "")
        alert("Cannot be empty.");
    else{
        //Process input
        closeFilterTab();
    }
}

function setDateNow(){
    var d = new Date().toISOString().split('T')[0];
    var x = document.getElementById("date");
    x.value = d;
    //Disable Previous dates
    x.setAttribute('min',d);
}

function proc_btn_clicked(){
    //get forms
    //open proc nav
}

/*const place = document.querySelectorAll(".place");
for (let i = 0; i<place.length; i++)
{
    place[i].addEventListener("mousedown", function(){
        //dummy element
        var x = document.getElementById("place1");
        //check element focus
        if(document.activeElement.className == "place")
        {
            var y = document.getElementById("loc_name");
            //replace text of y from class's first element text
            y.textContent = "Name: " + document.activeElement.children[1].textContent;
            openDetModal();
        };
})
}*/

//temporary solution of above
function checkFocusedPlace (){
    var x = document.getElementById("place1");
        //check element focus
        if(document.activeElement.className == "place")
        {
            var y = document.getElementById("loc_name");
            //replace text of y from class's first element text
            y.textContent = "Name: " + document.activeElement.children[1].textContent;
            openDetModal();
        };
}

function openDetModal(){
    var x = document.getElementById("modal-result-pop-up");
    x.style.opacity = "1";
    x.style.display = "flex";
}

function closeDetModal(){
    var x = document.getElementById("modal-result-pop-up");
    x.style.opacity = "0";
    x.style.display = "none";
}