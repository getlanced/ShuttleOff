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

function loadProvincesCitiesDict(){
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

    return CitiesByProvince
}

function resetSelection() {
    document.getElementById("province").selectedIndex = 0;
    document.getElementById("city").selectedIndex = 0;
}

function setCities() {
    
    CitiesByProvince = loadProvincesCitiesDict();

    provinceSel = document.getElementById("province").value;
    
    if (provinceSel.length == 0) document.getElementById("city").innerHTML = "<option></option>";
    else {
        var citiesOptions = "";
        for (cityId in CitiesByProvince[provinceSel]) {
            citiesOptions += "<option>" + CitiesByProvince[provinceSel][cityId] + "</option>";
        }
        document.getElementById("city").innerHTML = citiesOptions;
    }
}