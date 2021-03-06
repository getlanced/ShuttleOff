/*Global Variables */
var slideIndex = 0;

/*Functions to Initialize*/
showSlides();
showDateTime();
function showSlides() {
    
    var i;
    var slides = document.getElementsByClassName("slideshow-item");
    for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    slides[slideIndex-1].style.display = "block";  
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
    //tester
    loadProcNavContent();
}
function closeProcTab(){
    document.getElementById('proc_nav').style.width = "0%";
}
function openFilterTab(){
    var x = window.matchMedia('(max-width: 700px)');
    document.getElementById('proc_nav').style.width = "0";
    if (x.matches)
        document.getElementById('filter_sidebar').style.width = "100%";
    else
        document.getElementById('filter_sidebar').style.width = "40%";
}
function closeFilterTab(){
    document.getElementById('filter_sidebar').style.width = "0";
    document.getElementById('proc_nav').style.width = "100%";
}
//Function to capture active element pressed and load all contents related to it
function checkFocusedPlace (){
    //check element focus
    if(document.activeElement.className == "place")
    {
        var details = document.getElementsByName("place_details");
        //Load Details Pop Up
        details[0].value = document.activeElement.children[1].textContent;

        openDetModal();
        //Load Review Content from active element
        loadReviewContent(document.activeElement);
    };
}
//Create 5 for now
function loadProcNavContent(){

    var parent = document.getElementById("proc_nav_content_wrapper");
    parent.innerHTML= "";

    //Load Content
    for (let i = 0; i< 5; i++ ){
        const newDiv = document.createElement("div");
        newDiv.tabIndex = i;
        newDiv.className = "place";
        newDiv.setAttribute("onclick", "checkFocusedPlace()");

        //Court Image
        const child1 = document.createElement("img");
        child1.src = "../www/images/bc2.jpg";
        
        //Court Name
        const child2 = document.createElement("h3");
        child2.textContent = "El" + parseInt(Math.random()*100) + " Court";
        
        //Stars
        const child3 = document.createElement("div");
        child3.className = "place-star-container";
        const child3_1 = document.createElement("div");
        child3_1.className = "place-star-wrap";

        starDisp(Math.random()*5, child3_1);

        child3.append(child3_1);

        newDiv.append(child1);
        newDiv.append(child2);
        newDiv.append(child3);
        
        parent.append(newDiv);
    }
}
//SortBy courtName and Ratings for now
function reloadProcNavContent(){
    var sortBy = document.getElementsByName("sort_crit");
    var sortBy_selection = "";
    for (let i = 0; i < sortBy.length; i++) {
        if(sortBy[i].checked)
            sortBy_selection = sortBy[i].id;
    }

    //Save to memory
    var places = document.getElementsByClassName("place");
    var places_arr = [].slice.call(places);

    //Clear all contents
    var parent = document.getElementById("proc_nav_content_wrapper")
    parent.innerHTML= "";
    
    switch (sortBy_selection) {
        case "location":
            places_arr.sort(function(a,b){
                return((a.children[1].textContent).localeCompare(b.children[1].textContent))
            }
            )
            break;
        case "city":
            break;
        
        case "province":
            break;
        default:
            break;
    }

    places_arr.forEach(child => {
        parent.append(child);
    });
    closeFilterTab();
}
function openDetModal(){
    var x = document.getElementById("modal-result-pop-up");
    x.style.opacity = "1";
    x.style.visibility = "visible";
}
function closeDetModal(){
    closeReviews();
    var x = document.getElementById("modal-result-pop-up");
    x.style.opacity = "0";
    x.style.visibility = "hidden";

    //Clear active document's review content
    var parent = document.getElementById("review-wrapper");
    parent.innerHTML = "";
}
function openReviews(){
    var x = document.getElementById("review-container");
    if(x.style.width == ""){
        x.style.width = "100%";

        var review = document.getElementsByClassName("btn_review");
        review[0].children[0].className = "fas fa-arrow-left";
        review[0].children[1].textContent = "Back";

        //Load Content
    }
    else
        closeReviews();
}
function closeReviews(){
    var x = document.getElementById("review-container");
    x.style.width = "";

    var review = document.getElementsByClassName("btn_review");
    review[0].children[0].className = "far fa-comment-alt";
    review[0].children[1].textContent = "Reviews";

    //Remove Content
}
function loadReviewContent(x){
    var z = document.getElementsByClassName("review-header-wrap");
    //Court Name from active element x
    z[0].children[0].textContent = "Reviews For " + x.children[1].textContent;
    //Number of Reviews
    z[0].children[1].textContent = 2 + " Reviews";
    //Load Review content

    var parent = document.getElementById("review-wrapper");
    parent.innerHTML = "";
    //Test to create 5
    for(let i = 0; i< 5; i++)
        createReviewContent();
        //Need to pass userID into this function, none for now
        //e.g createReviewContent(userID)
}
//Function to create stars
function starDisp(num, parent){
    for(let i = 0; i<5; i++)
    {
        var star = document.createElement("i");
        //Full star
        if (num > 1){
            star.className = "fas fa-star";
            parent.append(star);
        }
        //half star
        else if(num > 0 && num < 1){
            star.className = "fas fa-star-half-alt";
            parent.append(star);
        }
        //no star
        else{
            star.className = "far fa-star";
            parent.append(star);
        }

        num--;
    }
}
function createReviewContent(){
/*Creation of Review Content Template
    <div class="review-wrapper">
        <div class="review-content">
            <div class="star-container">
                <div class="star-wrap">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                    <i class="far fa-star"></i>
                </div>
            </div>
            <div class="feedback-container">
                <h3>By Name</h3>
                <p>Message</p>
                <h5>01:45 Aug 14, 2020</h5>
            </div>
        </div>
    </div>
    */
   var parent = document.getElementById("review-wrapper");
   //clear contents

   var child = document.createElement("div");
   child.className = "review-content";

   var child_1 = document.createElement("div");
   child_1.className = "star-container";

   var child_1_1 = document.createElement("div");
   child_1_1.className = "star-wrap";

   //Get number of stars through this query 3.5 for now as placeholder
   starDisp(3.5,child_1_1);

   var child_2= document.createElement("div");
   child_2.className = "feedback-container";

   var child_2_1 = document.createElement("h3");
   child_2_1.textContent = " By Name " + 1;

   var child_2_2 = document.createElement("p");
   child_2_2.textContent = "50 million characters here";

   var child_2_3 = document.createElement("h5");
   child_2_3.textContent = "01:45 Aug 14, 2020";

   child_1.append(child_1_1);

   child.append(child_1);

   child_2.append(child_2_1);
   child_2.append(child_2_2);
   child_2.append(child_2_3);

   child.append(child_2);

   parent.append(child);
}
function flipRatingSortIcon(){
    var x = document.getElementsByClassName("sortBox-rating-wrap");
    if(x[0].children[1].className == "fas fa-sort-amount-down")
        x[0].children[1].className = "fas fa-sort-amount-up";
    else
        x[0].children[1].className = "fas fa-sort-amount-down";
}