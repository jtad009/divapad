
$(document).ready(function(){
    var today = new Date();
    currentMonth = today.getMonth();
    currentYear = today.getFullYear();
    selectYear = currentYear;
    selectMonth = document.querySelector(".periodMonth");
    
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    monthAndYear = $(document).find("h3#monthAndYear");
    // showCalendar(currentMonth, currentYear, "calendar-body");
    showCalendar(currentMonth, currentYear, "calendar-body-1");
    showCalendar(currentMonth, currentYear, "calendar-body-2");
    
    function next() {
        currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
        currentMonth = (currentMonth + 1) % 12;
        showCalendar(currentMonth, currentYear);
    }
    
    function previous() {
        currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
        currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
        showCalendar(currentMonth, currentYear);
    }
    
    function jump() {
        currentYear = parseInt(selectYear.value);
        currentMonth = parseInt(selectMonth.value);
        showCalendar(currentMonth, currentYear);
    }
    
    function showCalendar(month, year,div ) {
       
        let firstDay = (new Date(year, month)).getDay();
    
        tbl = document.getElementById(div); // body of the calendar
        // clearing all previous cells
        tbl.innerHTML = "";
    
        // filing data about month and in the page via DOM.
        monthAndYear.html(months[month] + " " + year);
        selectYear.value = year;
        selectMonth.value = month;
    
        // creating all cells
        let date = 1;
        for (let i = 0; i < 6; i++) {
            // creates a table row
            let row = document.createElement("tr");
    
            //creating individual cells, filing them up with data.
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDay) {
                    cell = document.createElement("td");
                    cellText = document.createTextNode("");
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                }
                else if (date > daysInMonth(month, year)) {
                    break;
                }
    
                else {
                    cell = document.createElement("td");
                    cellText = document.createTextNode(date);
                    if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                        cell.classList.add("bg-info");
                    } // color today's date
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                    date++;
                }
    
    
            }
    
            tbl.appendChild(row); // appending each row into calendar body.
        }
    
    }
    
    
    // check how many days in a month code from https://dzone.com/articles/determining-number-days-month
    function daysInMonth(iMonth, iYear) {
        return 32 - new Date(iYear, iMonth, 32).getDate();
    }
});
