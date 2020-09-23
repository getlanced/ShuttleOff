//Onload functions
setProvinces();

function openNav(){
    var x = document.getElementById("mySidenav");
    x.style.width = "260px";
}

function closeNav(){
    var x = document.getElementById("mySidenav");
    x.style.width = "0";
}

function closeEditProfile(){
    var x = document.getElementById("edit-profile");
    x.style.width = "0";
}

function openEditProfile(){
    var x = document.getElementById("edit-profile");
    x.style.width = "100%";

}

function openChangePassPanel(){
    var x = document.getElementById("changepass-panel")
    x.style.width = "100%";
}

function closeChangePassPanel(){
    var x = document.getElementById("changepass-panel")
    x.style.width = "0%";
}

function loadProvinces(){
    //parsed json data here
    var provinces = ["Bulacan", "Cavite","Laguna","NCR","Pampanga","Rizal","Tarlac"]

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

/*
function resetSelection() {
    document.getElementById("province").selectedIndex = 0;
    document.getElementById("city").selectedIndex = 0;
}
*/

function setProvinces(){
    var information = document.getElementsByName("information");
    var new_option = document.createElement("option");
    var provinces = loadProvinces();

    information[4].innerHTML = ""; //Clear Contents
    new_option.value = "";
    new_option.textContent = "None"; 
    information[4].appendChild(new_option);    
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
        information[4].appendChild(new_option);
        delete new_option;
    }
}

function setCities() {
    
    var CitiesByProvince = loadCitiesByProvince();
    var information = document.getElementsByName("information");
    var provinceSel = information[4].value;
    if (provinceSel == 0) {
        information[5].innerHTML = "<option>None</option>"
    }
    else {
        var citiesOptions = "";
        for (cityId in CitiesByProvince[provinceSel]) {
            citiesOptions += "<option>" + CitiesByProvince[provinceSel][cityId] + "</option>";
        }
        information[5].innerHTML = citiesOptions;
    }
}
