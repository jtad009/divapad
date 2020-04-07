var calendarObject = {

    today: new Date(),
    cycle: 0,
    predate: 0,
    selectYear: this.currentYear,
    selectMonth: document.querySelector(".periodMonth"),
    selectDay: document.querySelector(".periodDay"),
    preMenses: 1, postMenses: 2, freeDays: 2,
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    fillMonths: () => {
        calendarObject.months.forEach((element, i) => {
            options = document.createElement('option');
            options.text = element;
            options.value = i;
            document.querySelector(".periodMonth").append(options)
        });
    },
    fillDays: () => {
        let days = range(1, 31);

        days.forEach((element, i) => {
            options = document.createElement('option');
            options.text = element;
            options.value = i+1;
            document.querySelector(".periodDay").append(options)
        });
    },
    next: () => { },
    previous: () => { },
    jump: () => { },
    showCalendar: (month, year, div) => {


        div.forEach((divID, index) => {
            // index++;

            let predictedDays;
            if (index === 0) {
                predictedDays = calendarObject.predictDays(index, parseInt(calendarObject.selectMonth.value), calendarObject.selectDay.value);
                // getDates(index, 3, 5);
            } else {

                predictedDays = calendarObject.predictDays(index, calendarObject.predate.format('M') - 1, calendarObject.predate.format('D'));
            }



            let firstDay;

            firstDay = (new Date(year, month + index)).getDay();
            //  firstDay = (new Date(year, month + index)).getDay();
            //      console.log("First 2: ", firstDay)

            //    console.log("Hi thre: ",firstDay)
            tbl = document.getElementById(divID); // body of the calendar

            // clearing all previous cells
            tbl.innerHTML = "";

            // filing data about month and in the page via DOM.
            $("#" + divID).parent().parent().find("#monthAndYear").html(calendarObject.months[month + index] + " " + year);
            // calendarObject.selectMonth.value = month + i;

            // creating all cells
            let date = 1;
            for (let i = 0; i < 6; i++) {
                // creates a table row
                let row = document.createElement("tr");

                //creating individual cells, filing them up with data.
                for (let j = 0; j < 7; j++) {
                    if (i === 0 && j < firstDay) {
                        cell = document.createElement("td");
                        span = document.createElement('span');
                        cellText = document.createTextNode("");
                        cell.appendChild(span);
                        row.appendChild(cell);
                    }
                    else if (date > calendarObject.daysInMonth((month + index), year)) {
                        break;
                    }
                    else {
                        cell = document.createElement("td");
                        span = document.createElement('span');
                        span.innerHTML = date;
                        

                        predictedDays.forEach((type, index) => {
                            switch (index) {
                                case 1:
                                    type.forEach(dates => {
                                        if (dates === date) {
                                            console.log(dates, date);
                                            span.classList.add("pre-menses");
                                            span.classList.add("rounded-circle");
                                        }
                                    });
                                    break;
                                case 2:
                                    type.forEach(dates => {
                                        if (dates === date) {
                                            console.log(dates, date);
                                            span.classList.add("menses-text");
                                            span.classList.add("rounded-circle");
                                        }
                                    });
                                    break;
                                case 3:
                                    type.forEach((dates, r) => {

                                        if (dates === date) {
                                            console.log(dates, date);
                                            if (r <= 1) {
                                                span.classList.add("post-menses");
                                                span.classList.add("rounded-circle");
                                            } else {
                                                // cell.classList.add("bg-white");
                                            }


                                        }
                                    });
                                    break
                                case 4:
                                    type.forEach(dates => {
                                        if (dates === date) {

                                            span.classList.add("ovulation-color");
                                            span.classList.add("rounded-circle");
                                        }
                                    });
                                    break
                                case 5:
                                    // if(type == )
                                    type.forEach(dates => {
                                        if (dates === date) {

                                            span.classList.add("pre-menses");
                                            span.classList.add("rounded-circle");
                                        }
                                    });
                                    break
                                    case 6:
                                        // if(type == )
                                        type.forEach(dates => {
                                            if (dates === date) {
    
                                                span.classList.add("menses-text");
                                                span.classList.add("rounded-circle");
                                            }
                                        });
                                        break
                                default:
                                    break;
                            }

                        });

                        if (date === calendarObject.today.getDate() && year === calendarObject.today.getFullYear() && (month + index) === calendarObject.today.getMonth()) {
                            cell.classList.add("bg-info");
                        } // color today's date
                        cell.appendChild(span);
                        row.appendChild(cell);
                        date++;
                    }


                }

                tbl.appendChild(row); // appending each row into calendar body.
                // tbl = '';
            }
        })


    },
    daysInMonth: (iMonth, iYear) => {
        console.log("Month: "+iMonth, "Year: "+iYear);
        // console.log(new Date(iYear, iMonth, 32).getDate());
        return 32 - new Date(iYear, iMonth, 32).getDate();
    },
    predictDays: (index, startMonth, startDate) => {
            var days = [];
            var startdate = moment({ year: 2020, months: startMonth, date: startDate });
            var perioddate = moment({ year: 2020, months: startMonth, date: startDate });
        if (index === 0) {
            
            calendarObject.predate = startdate.subtract(2, 'days');
            days.push(parseInt(calendarObject.predate.format('M')))
            let guessPeriodDays = range(perioddate.format('D'), (parseInt(perioddate.format('D')) + parseInt(document.querySelector('.noOfDays').innerHTML) - 1));
            let freeDays = calendarObject.predictFreeDays(guessPeriodDays[guessPeriodDays.length - 1], parseInt(document.querySelector('.noOfDays').innerHTML)); //array at last place - duration of periond
            let ovulation = calendarObject.predictOvulation(freeDays[freeDays.length - 1], parseInt(document.querySelector('.noOfDays').innerHTML));
            
          
            days.push([parseInt(calendarObject.predate.format('D')), parseInt(calendarObject.predate.format('D')) + 1]); //first and second days before period begins
            days.push(guessPeriodDays); //period days 
            days.push(freeDays);
            days.push(ovulation);
           
           
           
        }else if(index > 0){
            calendarObject.predate = startdate;
            periodDate = perioddate.add(2, 'days');
            days.push(parseInt(calendarObject.predate.format('M')))
            let guessPeriodDays = range(periodDate.format('D'), (parseInt(periodDate.format('D')) + (parseInt(document.querySelector('.noOfDays').innerHTML) - 1)));
            modifiedPeriodDays = guessPeriodDays.map(element => {
               //ALGORITHM: loop through the period days, if any day is greater than the number of days in that month
               //substract the day from the total days to reset
               //if 32 > num of days in a month 
               //then 32 - number of days
               //else return the number as it's within that month
                if(parseInt(element) > parseInt(calendarObject.daysInMonth(days[0]-1, 2020))){
                   return parseInt(element) - parseInt(calendarObject.daysInMonth(days[0]-1, 2020));
                    
                }else{
                    return element
                }
            });
         
            let freeDays = calendarObject.predictFreeDays(modifiedPeriodDays[modifiedPeriodDays.length - 1], parseInt(document.querySelector('.noOfDays').innerHTML)); //array at last place - duration of periond
            let ovulation = calendarObject.predictOvulation(freeDays[freeDays.length - 1], parseInt(document.querySelector('.noOfDays').innerHTML));
            
          
            days.push([parseInt(calendarObject.predate.format('D')), parseInt(calendarObject.predate.format('D'))+1]);
            days.push(modifiedPeriodDays);
            days.push(freeDays);
            days.push(ovulation);
        

        }

        cycle = startdate.add(28, 'days')
        
        newStartDate = [parseInt(cycle.format('D')), parseInt(cycle.format('D'))+1];
        newPeriodDate = range((newStartDate[newStartDate.length - 1]+1), (newStartDate[newStartDate.length - 1]+ parseInt(document.querySelector('.noOfDays').innerHTML) - 1))
        days.push(newStartDate);
        days.push(newPeriodDate)
        console.log('StartDays: ',days);
        return days;
    },
   
    predictFreeDays: (endDate, duration) => {
        let max = 10;
        let allowedFreeDays = max - duration;
        let rangeData = range(endDate + 1, allowedFreeDays + endDate);
        let ovulation = calendarObject.predictOvulation(rangeData[rangeData.length - 1], duration)

        return [...rangeData];
    },
    predictOvulation: (startDate, duration) => {

        return range(startDate + 1, duration + startDate);
    }
}

const range = (x, y) => Array.from(
    (
        function* () {
            while (x <= y) yield x++;
        }
    )
        ());