// variable to store and loop through the time slots 
var theDay = [
    {
        id: "0",
        hour: "09",
        time: "09",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "1",
        hour: "10",
        time: "10",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "2",
        hour: "11",
        time: "11",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "3",
        hour: "12",
        time: "12",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "4",
        hour: "01",
        time: "13",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "5",
        hour: "02",
        time: "14",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "6",
        hour: "03",
        time: "15",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "7",
        hour: "04",
        time: "16",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "8",
        hour: "05",
        time: "17",
        meridiem: "pm",
        reminder: ""
    },
    
]

// grab the data for the header date
function dHeaderDate() {
    var currentDate = moment().format('dddd, MMMM Do');
    $("#toDay").text(currentDate);
}

// saves data to localStorage
function saveCalData() {
    localStorage.setItem("theDay", JSON.stringify(theDay));
}

// sets any data in localStorage to the view
function displayCalData() {
    theDay.forEach(function (_Hour) {
        $(`#${_Hour.id}`).val(_Hour.reminder);
    })
}

// sets any existing localStorage data to the view if it exists
function initialize() {
    var stored_Data = JSON.parse(localStorage.getItem("theDay"));

    if (stored_Data) {
        theDay = stored_Data;
    }

    saveCalData();
    displayCalData();
}

// loads header date
dHeaderDate();

// creates the visuals for the planner body
theDay.forEach(function(dHour) {
    // creates timeblocks rows
    var RowHour = $("<form>").attr({
        "class": "row"
    });
    $(".container").append(RowHour);

    // creates time fields
    var hourField = $("<div>")
        .text(`${dHour.hour}${dHour.meridiem}`)
        .attr({
            "class": "col-md-2 hour"
    });

    // creates planner data
    var hourPlan = $("<div>")
        .attr({
            "class": "col-md-9 description p-0"
        });
    var planData = $("<textarea>");
    hourPlan.append(planData);
    planData.attr("id", dHour.id);
    if (dHour.time < moment().format("HH")) {
        planData.attr ({
            "class": "past", 
        })
    } else if (dHour.time === moment().format("HH")) {
        planData.attr({
            "class": "present"
        })
    } else if (dHour.time > moment().format("HH")) {
        planData.attr({
            "class": "future"
        })
    }

    // creates save button
    var saveButton = $("<i class='far fa-save fa-lg'></i>")
    var savePlan = $("<button>")
        .attr({
            "class": "col-md-1 saveBtn"
    });
    savePlan.append(saveButton);
    RowHour.append(hourField, hourPlan, savePlan);
})

// loads any existing localstorage data after creating all components 
initialize();


// saves data to be used in localStorage
$(".saveBtn").on("click", function(event) {
    event.preventDefault();
    var saveIndex = $(this).siblings(".description").children(".future").attr("id");
    theDay[saveIndex].reminder = $(this).siblings(".description").children(".future").val();
    console.log(saveIndex);
    saveCalData();
    displayCalData();
})