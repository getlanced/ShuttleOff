//Business Logic Objects
var tempResData;
var ReservationData = {
    resId : 0,
    userId : 0,
    courtId : 0,
    courtName : "",
    time: "",
    address: "",
    isReviewed: false //added this bad body to prevent second reviews, only applies to history
}
var feedback = {
    userId : 0,
    courtId : 0,
    starCount: 0,
    review: ""
}
//Temporary Data Storers (ctrl + f)
var activeRes;
var historyRes;
var feedbackTemp;
var reviews = [];
//Functions onload
setActiveReservations();
setHistoryReservations();

function openNav(){
    var x = document.getElementById("mySidenav");
    x.style.width = "260px";
}

function closeNav(){
    var x = document.getElementById("mySidenav");
    x.style.width = "0";
}

function showActivePane(){
    var p1 = document.getElementById("pane1");
    var p2 = document.getElementById("pane2");
    var indicator = document.getElementById("btn-selection-indicator");

    p1.style.transform = "translate(0,0)";
    p2.style.transform = "translate(100%,0)";
    indicator.style.transform = "translate(0,0)" 
    
}

function showHistoryPane(){
    var p1 = document.getElementById("pane1");
    var p2 = document.getElementById("pane2");
    var indicator = document.getElementById("btn-selection-indicator");

    p1.style.transform = "translate(-100%,0)";
    p2.style.transform = "translate(0,0)";
    indicator.style.transform = "translate(100%,0)" 
}

function loadActiveReservations(){
    
    //Sample query size of all active reservations
    let queryLength = 5;

    //Array to store each dictionary object
    reservations = [];

    //Loading reservationData object to reservation array
    for (let i = 0; i< queryLength; i++ ){

        //load reservation data format here, dictionary sample per object
        var reservationData = JSON.parse(JSON.stringify(ReservationData));
        reservationData.resId = i;
        reservationData.userId = i;
        reservationData.courtId = i;
        reservationData.courtName = "Elly" + i;
        reservationData.time = "10PM - 11PM";
        reservationData.address = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi facilis quidem amet excepturi sint. Dicta, repudiandae! Quaerat a dicta cum iusto libero nam. Placeat, nihil dignissimos laborum temporibus rerum pariatur?"
        reservations[i] = reservationData;
    }
    return reservations;
}

function setActiveReservations(){
    var parent = document.querySelector(".pane1-wrap");
    activeRes = loadActiveReservations();

    if (activeRes.length != 0){
        parent.innerHTML = "";
        for(let i = 0; i < activeRes.length; i++){
            parent.innerHTML += "<div tabindex = " + i + " class=\"pane1-content\"><div class=\"pane1-content-wrap\"><i class=\"fas fa-map-marker-alt\">&nbsp;"
            + activeRes[i].courtName +"</i><i class=\"far fa-clock\">&nbsp;" 
            + activeRes[i].time+ "</i><span><i class=\"far fa-trash-alt\"></i></span></div></div><div class=\"court-address\"><h4>Address</h4><p>"
            + activeRes[i].address+"</p></div>";
        }
    }
}

function deleteActiveReservations(){
    //delete and reload
}

function loadHistory(){
    //Sample query size of all active reservations
    let queryLength = 10;

    //Array to store each dictionary object
    var reservations = [];

    //Loading reservationData object to reservation array
    for (let i = 0; i< queryLength; i++ ){

        //load history reservation data format here, dictionary sample per object
        var reservationData = JSON.parse(JSON.stringify(ReservationData));
        reservationData.resId = i;
        reservationData.userId = i;
        reservationData.courtId = i;
        reservationData.courtName = "Yesterday" + i;
        reservationData.time = "10PM - 11PM";
        reservationData.address = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi facilis quidem amet excepturi sint. Dicta, repudiandae! Quaerat a dicta cum iusto libero nam. Placeat, nihil dignissimos laborum temporibus rerum pariatur?";
        //reservationData.isReviewed = tralse;
        reservations[i] = reservationData;
    }


    /*Test Case for if there are reviews (1:1 match, in reality, its not) 
    (feel free to comment everything out below)*/
    /*for (let i = 0; i< queryLength; i++ ){
        //load history reservation data format here, dictionary sample per object
        var reservationData = JSON.parse(JSON.stringify(ReservationData));
        reservationData.resId = i;
        reservationData.userId = i;
        reservationData.courtId = i;
        reservationData.courtName = "Yesterday" + i;
        reservationData.time = "10PM - 11PM";
        reservationData.address = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi facilis quidem amet excepturi sint. Dicta, repudiandae! Quaerat a dicta cum iusto libero nam. Placeat, nihil dignissimos laborum temporibus rerum pariatur?";
        reservationData.isReviewed = true;
        reservations[i] = reservationData;

        var reviewData = JSON.parse(JSON.stringify(feedback));
        reviewData.userId = i;
        reviewData.courtId = i;
        reviewData.starCount = parseInt((Math.random() * 5) + 1); //produce numbers from 1 - 5
        reviewData.review = "Your mom is gay times " + i;
        reviews[i] = reviewData;
    }
    */
    return reservations;
}

function setHistoryReservations(){
    var parent = document.querySelector(".pane2-wrap");
    historyRes = loadHistory();

    if (historyRes.length != 0){
        parent.innerHTML = "";
        for(let i = 0; i < historyRes.length; i++){
            parent.innerHTML += "<div tabindex = " + i + " class=\"pane2-content\"><div class=\"pane2-content-wrap\"><i class=\"fas fa-map-marker-alt\">&nbsp;"
            + historyRes[i].courtName +"</i><i class=\"far fa-clock\">&nbsp;" 
            + historyRes[i].time+ "</i><span><i onclick = \"openReviewModal()\" class=\"fas fa-comment-alt\"></i></span></div></div><div class=\"court-address\"><h4>Address</h4><p>"
            + historyRes[i].address+"</p></div>";
        }
    }
}

/*Review Modal Helpers*/
function openReviewModal(){

    //Set display from none to flex 
    var rv_modal = document.querySelector(".review-mod");
    rv_modal.style.display = "flex";

    //Get position of clicked element
    var pos = parseInt(document.activeElement.tabIndex);

    //load current content to tempResData
    tempResData = JSON.parse(JSON.stringify(historyRes[pos]));

    /*Setting details for feedbackTemp according to tempResData** 
    (Note this is for uniform reviews array only 1:1)
    NEED TO MERGE THIS
    */

    //Uncomment Below if using reviews[]
    //feedbackTemp = JSON.parse(JSON.stringify(reviews[pos]));
    
    //Uncomment below if using w/o reviews[]
    feedbackTemp = JSON.parse(JSON.stringify(feedback));

    //Assignments below are allowed to deep copied objects, dont try this at home... pls
    feedbackTemp.userId = tempResData.userId; 
    feedbackTemp.courtId = tempResData.courtId;
    
    //console.log(tempResData);
    
    //Set the court name of the Modal
    var modal_courtName = document.querySelector(".rv-mod-bod-wr > h3");
    modal_courtName.textContent = tempResData.courtName;

    //If already reviewed
    if(tempResData[pos].isReviewed = true)
    {
        //Searches below are based on reviews array only**. 

        //Disable submit button
        rv_btns[1].disabled = true;

        //Disable text area and show review made
        document.querySelector(".rv-mod-bod-wr > textarea").disabled = true;
        
        //Set Review Made
        document.querySelector(".rv-mod-bod-wr > textarea").value = feedbackTemp.review;

        //Fill Star container
        var stars = document.querySelectorAll(".star-wrap > i");

        for(let i = 0; i < feedbackTemp.starCount; i++)
            stars[i].className = "fas fa-star";
        
        //IDK how to disable the stars but there is no effect anyway
        //(Disable stars BOOM...)

    }
    if(tempResData[pos].isReviewed == false)
    {
        //Enable Text Area
        document.querySelector(".rv-mod-bod-wr > textarea").disabled = false;
        
        //Enable submit button
        rv_btns[1].disabled = false;

        //Set Enable Star container
        //(still dont know how to... enable stars BOOOOOOM)

    }
}

function closeReviewModal(){
    var rv_modal = document.querySelector(".review-mod");
    rv_modal.style.display = "none";

    //Star Removal
    var stars = document.querySelectorAll(".star-wrap > i");
    for(star of stars){
        star.className = "far fa-star";
        while((star = star.previousSibling) != null)
            star.className = "far fa-star";
    }

    //Test area clear
    document.querySelector(".rv-mod-bod-wr > textarea").value = "";
}

function submitReview(){
    review = document.querySelector(".rv-mod-bod-wr > textarea")

    //feedbacktemp Details
    feedbackTemp.review = review.value;
    feedbackTemp.starCount = (feedbackTemp.starCount + 1)/2;
    
    //Update review here

    /*Don't ask why because I dont know either but it works because 
    it outputs numbers in this order of stars highlighted (1 3 5 7 9). 
    If you dont know how, good. Me neither.*/
    
    //Send this data to history table
    tempResData.isReviewed = true;

    //Update history data here

    //console.log(feedbackTemp.starCount)
    //console.log(feedbackTemp.review)
    closeReviewModal();

    //Memory Clean up
    delete tempResData;
    delete feedbackTemp;
}

/*Review Modal Buttons*/
var rv_btns = document.getElementsByClassName("rv-btn");
//Cancel Button
rv_btns[0].addEventListener("click", closeReviewModal); 
//Submit Button
rv_btns[1].addEventListener("click", submitReview);
//Star Logic onclick
var stars = document.querySelectorAll(".star-wrap > i");
for(star of stars){
    star.addEventListener("click",function(){
        feedbackTemp.starCount = 0;
        //node head
        first_star_child = this;
        //node tail
        star_child = this;

        //highlight preceding stars
        while(star_child.previousSibling != null){
            star_child.className = "fas fa-star";
            star_child = star_child.previousSibling;
            feedbackTemp.starCount++;
        }

        star_child = first_star_child;
        //unhighlight following stars
        while(star_child.nextSibling != null && star_child.nextSibling.className == "fas fa-star"){
            star_child = star_child.nextSibling;
            star_child.className = "far fa-star";
        }
    });
}
