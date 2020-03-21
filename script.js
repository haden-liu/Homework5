var container = $(".container");
var table = $("<table></table>");
table.addClass("jumbotron");
//appending currentDay 
var momento = document.getElementById("currentDay");
var currentTime = (moment().format('MMMM Do YYYY'));
momento.append(currentTime);

//hourTime will be used to compare with militaryTime for color coding purposes
var hourTime = (moment().format('HH'));
//userTime vs militaryTime; the former is displayed to the user whereas the latter is used to compare local hourTime for color coding
var timeList = [
    {userTime: "9AM", militaryTime: "09"},
    {userTime: "10AM", militaryTime: "10"},
    {userTime: "11AM", militaryTime: "11"},
    {userTime: "12PM", militaryTime: "12"},
    {userTime: "1PM", militaryTime: "13"},
    {userTime: "2PM", militaryTime: "14"},
    {userTime: "3PM", militaryTime: "15"},
    {userTime: "4PM", militaryTime: "16"},
    {userTime: "5PM", militaryTime: "17"},
];

//creating a function to determine local time and dynamically generate HTML for a table
function dynamicTime() {
    for (i=0; i<timeList.length; i++) {
        var tableRow = $("<tr></tr>").attr("id", i);
        //timeBlock --> contains timeList elements
        var timeBlock = $("<td></td>");
        timeBlock.addClass("hour");
        timeBlock.text(timeList[i].userTime);
        //description contains textarea input for planner
        var description = $("<td></td>");
        //utilizing bootstrap to make website device responsive
        description.addClass("col-md-12");
        //adding a unique id for each text area by adding "t-${i}" in front of each textarea (t-0, t-1, t-2...etc)
        var textarea = $("<textarea></textarea>").attr("id", `t-${i}`);
        textarea.addClass("textarea form-control");
        //if else conditions comparing militaryTime from array to local hourTime; present, past, future classes assigned accordingly
        if (timeList[i].militaryTime === hourTime) {
            textarea.addClass("present")
        }
        else if (timeList[i].militaryTime < hourTime) {
            textarea.addClass("past")
        }
        else if (timeList[i].militaryTime > hourTime) {
            textarea.addClass("future")
        };
        //this returns any values saved to local storage for each saved textarea input after refreshing the page
        textarea.val(localStorage.getItem(`t-${i}`));
        description.append(textarea);
        //generate save button
        var saveButton = $("<td></td>");
        var button = document.createElement('button');
        button.innerText = "save";
        button.classList.add("saveBtn");
        saveButton.append(button);

        //set key in local storage with same id in text area to store the value
        button.onclick = () => {
            localStorage.setItem(`t-${i}`, $(`#t-${i}`).val())
            console.log($(`#t-${i}`).val());
        }

        //appending all td elements to each row of the table
        tableRow.append(timeBlock, description, saveButton);
        table.append(tableRow);
    }

    container.append(table);
    
};
//executing dynamic time function
dynamicTime();