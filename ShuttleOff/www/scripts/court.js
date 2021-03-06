/*<===================== Non Dynamic Element Helpers ========================>*/
//Onload
const topMenuBtns = document.getElementsByClassName("rad");
const topMenuPanes = document.getElementsByClassName("pane");
const courtEditMenuBtn = document.getElementsByClassName("radio-btn");
const courtEditMenuPanes = document.getElementsByClassName("crt-edit-p");

//Stores temporary courtData to represent changes made visually
var courtDataTemp;

//Objects
var CourtData = {
    crtId : 0,
    userId : 0,
    courtName : "",
    crtProvince: "",
    crtCity: "",
    crtCap: 0,
    crtAdd: "",
    crtDesc: "",
    crtSched:[]
}

var SchedDetails = {
    schedId: "",
    schedTime: "",
    schedDateEff: ""
}


topMenuBtns[0].checked = true;
courtEditMenuBtn[0].checked = true;
//Top menu panes
for(let i = 0; i< topMenuBtns.length; i++){
    topMenuBtns[i].oninput = function(){
        if(topMenuBtns[0].checked){
            topMenuPanes[0].style.left = 0;
            topMenuPanes[1].style.left = "100%";
        }
        if(topMenuBtns[1].checked){
            topMenuPanes[0].style.left = "-100%";
            topMenuPanes[1].style.left = 0;

            courtDataTemp = JSON.parse(JSON.stringify(CourtData));
        }
    };
}

//Court Edit menu panes
for(let i = 0; i < courtEditMenuBtn.length; i++){
    courtEditMenuBtn[i].oninput = function(){
        if(courtEditMenuBtn[0].checked){
            courtEditMenuPanes[0].style.left = "0";
            courtEditMenuPanes[1].style.left = "100%";
            courtEditMenuPanes[2].style.left = "200%"
        }
        if(courtEditMenuBtn[1].checked){
            courtEditMenuPanes[0].style.left = "-100%";
            courtEditMenuPanes[1].style.left = "0";
            courtEditMenuPanes[2].style.left = "100%;"
        }       
    };
}
/*Province & Cities Drop Down Boxes */
setProvinces();
var information = document.getElementsByName("information");
information[1].onchange = setCities;

function setCities(){
    var information = document.getElementsByName("information");
    var citiesByProvince = loadCitiesByProvince();
    var provinceSel = information[1].value;
    if (provinceSel == 0) {
        information[2].innerHTML = "<option>None</option>"
    }
    else {
        var citiesOptions = "";
        for (cityId in citiesByProvince[provinceSel]) {
            citiesOptions += "<option>" + citiesByProvince[provinceSel][cityId] + "</option>";
        }
        information[2].innerHTML = citiesOptions;
    }
} 

function loadProvinces(){
    //parsed json data here
    var provinces = ["Bulacan", "Cavite","Laguna","NCR","Pampanga","Rizal","Tarlac"];
    return provinces;
}

function loadCitiesByProvince(){
    //parsed json data here
    var CitiesByProvince = {
        Bulacan: ["Malolos", "Meycauayan"],
        Cavite: ["Bacoor", "Cavite", "Imus"],
        Laguna: ["Calamba", "San Pedro", "Santa Rosa"],
        NCR: ["Makati", "Manila", "Quezon", "Valenzuela"],
        Pampanga: ["Angeles", "San Fernando"],
        Rizal: ["Antipolo"],
        Tarlac: ["Tarlac"]
    }

    return CitiesByProvince;
}

function setProvinces(){
    var information = document.getElementsByName("information");
    var new_option = document.createElement("option");
    var provinces = loadProvinces();

    information[1].innerHTML = ""; //Clear Contents
    new_option.value = "";
    new_option.textContent = "None"; 
    information[1].appendChild(new_option);    
    delete new_option; //Destroy
    /*
    <select>
        <option>None<option> <--untouched 
    <select> 
    */
    for (let i = 1; i < provinces.length; i++) {
        new_option = document.createElement("option");
        new_option.value = provinces[i];
        new_option.textContent = provinces[i];
        information[1].appendChild(new_option);
        delete new_option;
    }
}

function openNav(){
    var x = document.getElementById("mySidenav");
    x.style.width = "260px";
}

function closeNav(){
    var x = document.getElementById("mySidenav");
    x.style.width = "0";
}

//Clear Add New Pane Tab
topMenuBtns[1].addEventListener("click",function(){
    resetDetailsPane();
    resetSchedulesPane();
}
)

function resetDetailsPane(){
    var information = document.getElementsByName("information");
    information[0].value = "";
    information[1].value = "NCR";
    setCities();
    information[3].value = "2";
    information[4].value = "";
    information[5].value = "";
}

function resetSchedulesPane(){
    var myCourtSchedulesParent = document.querySelector(".sched-pane");
    myCourtSchedulesParent.innerHTML = "";
    myCourtSchedulesParent.innerHTML = "<h3 style=\"padding-top: 0.5rem;\">No Schedules Added Yet</h3><div onclick = \"showAvailabilityPane()\"id = \"addSched\" class=\"add-circle-container\"><i class=\"fas fa-plus-circle\" id = \"schedAdd\"></i></div>";
    courtEditMenuBtn[0].checked = true;
    courtEditMenuPanes[0].style.left = "0";
    courtEditMenuPanes[1].style.left = "100%";
    courtEditMenuPanes[2].style.left = "200%"
}

//Discard Button
const changeButtons = document.querySelectorAll(".chg-btn");
changeButtons[0].onclick = function(){

    const topMenu = document.querySelector(".btn-container");
    const topMenuIndicator = document.getElementById("indicator");
    if(topMenu.style.top == "1%")
        topMenu.style.top = "8%";
    topMenuPanes[0].style.left = "0";
    topMenuPanes[1].style.left = "100%";

    topMenuBtns[0].checked = true;

    delete courtDataTemp;
};

//Availability Pane Buttons
var avButtons = document.getElementsByClassName("av-btn");
//Cancel
avButtons[0].addEventListener("click",closeAvailabilityPane);

function closeAvailabilityPane(){
    courtEditMenuPanes[0].style.left = "-100%";
    courtEditMenuPanes[1].style.left = "0";
    courtEditMenuPanes[2].style.left = "100%";

    const btnBar = document.querySelector(".change-btn-bar");
    const editHeader = document.querySelector(".crt-edit-header"); 
    const topMenu = document.querySelector(".btn-container");

    if(btnBar.style.bottom == "-15%" && editHeader.style.top == "-10%"){
        btnBar.style.bottom = "0";
        editHeader.style.top = "0";
    }
    if( topMenuBtns[1].checked && topMenu.style.top == "1%")
        topMenu.style.top = "8%";
    
    setAvailabilityInputs();
}

//Apply
avButtons[1].addEventListener("click", showAddedSched)

/* <===================== Dynamic Element Helpers ========================>*/
//Grab all courtData from query(test)
var myCourts = loadMyCourts();

//List All Courts
setMyCourts();

function loadMyCourts(){
    
    //Sample query size of all court data
    //(Change these to test courts added)
    let queryLength = 4;
    //let scheduleQueryLength = 1;

    //Array to store each dictionary object
    var myCourts = [];

    //Loading courtData object to myCourts array
    for (let i = 0; i< queryLength; i++ ){
        //load court data format here, dictionary sample per object
        var courtData = JSON.parse(JSON.stringify(CourtData));

        //Test Values
        courtData.crtId = i;
        courtData.userId = i;
        courtData.courtName = "Hilly's - Public Court No." + i;
        courtData.crtProvince = "NCR";
        courtData.crtCity = "Manila";
        courtData.crtCap = 4;
        courtData.crtAdd = "Lorem Ipsum";
        courtData.crtDesc = "Lorem Ipsum";

        //Schedules per court
        //for(let j = 0; j < scheduleQueryLength; j++){
        for(let j = 0; j < Math.random()*11 + 1; j++){    
            var schedDetails = JSON.parse(JSON.stringify(SchedDetails));
            
            schedDetails.schedId = j;
            schedDetails.schedTime = "2PM -3PM";

            var dateToday = new Date().toISOString().split('T')[0];
            schedDetails.schedDateEff = dateToday;

            //Append to crtSched property
            courtData.crtSched.push(schedDetails);
        }

        myCourts[i] = courtData;
    }

    return myCourts;
}

function setMyCourts(){
    //My Courts Pane
    const myCourtParent = document.querySelector(".crt-lst");
    const myCourtSchedulesParent = document.querySelector(".sched-pane");

    if(myCourts.length != 0)
    {
        //Clear Contents
        myCourtParent.innerHTML = "";
        var status = "OK";
        for(let i = 0; i< myCourts.length ; i++){
            if (myCourts[i].crtCap == 8)
                status = "FULL";
            else
                status = "OK";
            myCourtParent.innerHTML += "<div tabindex =\"" + 
                    i + "\"class=\"crt-lst-cnt\"><div class=\"crt-lst-cnt-wrp\"><span class = \"crt-lst-num\">"+ 
                    i + "</span><div class=\"crt-det\"><h3>" +
                    myCourts[i].courtName +"</h3><h4>Status:<span>&nbsp;"+
                    status + "</span></h4></div><span onclick = \"CourtEdit()\" class = \"edit-btn slide-menu\"><i class=\"fas fa-tools\"></i></span><span class = \"trash-btn slide-menu\"><i class=\"fas fa-trash-alt\"></i></span></div></div>";
        }
    }
}


/*Edit Mode Helpers*/
function setCourtSchedules(courtPos){

    //Loads Schedules Based on focused court element
    var myCourtSchedulesParent = document.querySelector(".sched-pane");
    if(myCourts[courtPos].crtSched.length != 0){
        myCourtSchedulesParent.innerHTML = "";
        
        for(let j = 0; j< myCourts[courtPos].crtSched.length; j++){
            myCourtSchedulesParent.innerHTML += "<div tabIndex = \""+ 
            j +"\" class=\"crt-sched\"><div class=\"crt-sched-wrap\"><span class = \"crt-sched-num\">" + 
            j +"</span><div class=\"crt-sched-det\"><h4>Time:&nbsp;"+
            myCourts[courtPos].crtSched[j].schedTime+"</h4><h5>"+
            myCourts[courtPos].crtSched[j].schedDateEff +"</h5></div><span onclick = \"deleteSchedule()\" class = \"crt-sched-opt crt-sched-del\" ><i class=\"fas fa-trash-alt\"></i></span></div></div>";
        }

        //Add button Container at the end of Court Schedule
        myCourtSchedulesParent.innerHTML += "<div onclick = \"showAvailabilityPane()\"class=\"add-circle-container\">\<i class=\"fas fa-plus-circle\" id = \"schedAdd\"></i>\</div>";
    }
}

function setCourtDetails(courtPos){
    var courtDetails = document.getElementsByName("information");

    courtDetails[0].value = myCourts[courtPos].courtName;
    courtDetails[1].value = myCourts[courtPos].crtProvince;
    //Reload Cities based on province
    setCities();
    courtDetails[2].value = myCourts[courtPos].crtCity;
    courtDetails[3].value = myCourts[courtPos].crtCap;
    courtDetails[4].value = myCourts[courtPos].crtAdd;
    courtDetails[5].value = myCourts[courtPos].crtDesc;
}

function CourtEdit()
{
    const topMenu = document.querySelector(".btn-container");
    topMenu.style.top = "1%";
    topMenuPanes[0].style.left = "-100%";
    topMenuPanes[1].style.left = "0";

    //Each myCourts index corresponds to each element in My Courts List's index in memory
    var courtPos = parseInt(document.activeElement.children[0].children[0].textContent);

    //Create a deep copy of courtData to prevent overwrites to original courtData
    courtDataTemp = JSON.parse(JSON.stringify(myCourts[courtPos]));
    //Load Details
    setCourtDetails(courtPos);
    //Load Schedules 
    setCourtSchedules(courtPos);
}

//Add Court Sched Button
var addSched = document.querySelector("#schedAdd");
addSched.addEventListener("click", showAvailabilityPane);

function showAvailabilityPane(){
    courtEditMenuPanes[0].style.left = "-200%";
    courtEditMenuPanes[1].style.left = "-100%";
    courtEditMenuPanes[2].style.left = "0";

    const btnBar = document.querySelector(".change-btn-bar");
    btnBar.style.bottom = "-15%";
    const editHeader = document.querySelector(".crt-edit-header");
    editHeader.style.top = "-10%";

    const topMenu = document.querySelector(".btn-container");
    topMenu.style.top = "1%";
}

//Delete Schedule Clicked

function deleteSchedule(){
    
    var myCourtSchedulesParent = document.querySelector(".sched-pane");
    var children = document.getElementsByClassName("crt-sched");
    schedPos = parseInt(document.activeElement.children[0].children[0].textContent);

    //In memory Delete
    courtDataTemp.crtSched.splice(schedPos,1);

    //Visually Delete

    //If one left
    if(myCourtSchedulesParent.firstChild.className == "crt-sched" &&
        myCourtSchedulesParent.children[1].className == "add-circle-container")
    {
        myCourtSchedulesParent.innerHTML = "";
        myCourtSchedulesParent.innerHTML = "<h3 style=\"padding-top: 0.5rem;\">No Schedules Added Yet</h3><div onclick = \"showAvailabilityPane()\"id = \"addSched\" class=\"add-circle-container\"><i class=\"fas fa-plus-circle\" id = \"schedAdd\"></i></div>";
    }
    else{
        myCourtSchedulesParent.removeChild(document.activeElement);
        //reset tab index and numbering
        for(let i = 0; i < myCourtSchedulesParent.children.length-1; i++){
            children[i].tabIndex = i;
            children[i].children[0].children[0].textContent = i;
            
        }
    }
}

/*Availability Pane helpers*/
setAvailabilityInputs();
function setAvailabilityInputs(){
    var dateToday = new Date().toISOString().split('T')[0];
    
    const time = [
        "12AM", "1AM", "2AM", "3AM", "4AM", "5AM",
        "6AM", "7AM", "8AM", "9AM", "10AM", "11AM",
        "12PM", "1PM", "2PM", "3PM", "4PM", "5PM",
        "6PM","7PM", "8PM", "9PM", "10PM", "11PM"
        ];

    //Restrict Previous date
    schedInfo = document.getElementsByName("a-info");
    schedInfo[2].min = dateToday;
    schedInfo[2].value = dateToday;

    //Fill Start and End Time Dropdowns
    for(let i = 0; i< 24; i++){ 
        //Start Time
        schedInfo[0].innerHTML += "<option>"+time[i]+"</option>";
        //End Time
        schedInfo[1].innerHTML += "<option>"+time[i]+"</option>";
    }
}

//Show Added Sched (this is not loaded to the database, just a visual representation)
//Apply Clicked
function showAddedSched(){
    var myCourtSchedulesParent = document.querySelector(".sched-pane");

    //Availablity Pane Field Info
    schedInfo = document.getElementsByName("a-info");

    //Schedule Object
    var schedDetails = JSON.parse(JSON.stringify(SchedDetails));

    //Load filled details
    schedDetails.schedId = courtDataTemp.crtSched.length;
    schedDetails.schedTime= schedInfo[0].value + " - " + schedInfo[1].value;
    schedDetails.schedDateEff= schedInfo[2].value;

    //Update myCourtsTemp sched's List
    courtDataTemp.crtSched.push(schedDetails);

    //Remove End Element only
    if (myCourtSchedulesParent.firstChild.tagName != "H3")
        myCourtSchedulesParent.removeChild(myCourtSchedulesParent.lastChild);
    //Clear Pane
    else
        myCourtSchedulesParent.innerHTML = "";

    //Add newly created Sched
    myCourtSchedulesParent.innerHTML += "<div tabIndex = \""+ 
    (courtDataTemp.crtSched.length - 1)+"\" class=\"crt-sched\"><div class=\"crt-sched-wrap\"><span class = \"crt-sched-num\">" + 
    (courtDataTemp.crtSched.length - 1) +"</span><div class=\"crt-sched-det\"><h4>Time:&nbsp;"+
    courtDataTemp.crtSched[(courtDataTemp.crtSched.length - 1)].schedTime+"</h4><h5>"+
    courtDataTemp.crtSched[(courtDataTemp.crtSched.length - 1)].schedDateEff +"</h5></div><span onclick = \"deleteSchedule()\" class = \"crt-sched-opt crt-sched-del\" ><i class=\"fas fa-trash-alt\"></i></span></div></div>";
    
    //Add end element
    myCourtSchedulesParent.innerHTML += "<div onclick = \"showAvailabilityPane()\"class=\"add-circle-container\">\<i class=\"fas fa-plus-circle\" id = \"schedAdd\"></i>\</div>";
    closeAvailabilityPane();

    //reset Availability pane
    setAvailabilityInputs();
}

