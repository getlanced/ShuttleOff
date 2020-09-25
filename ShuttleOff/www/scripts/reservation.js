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
