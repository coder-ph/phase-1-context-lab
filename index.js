/* Your Code Here */
function createEmployeeRecord(employeeArray) {
    return {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}
function createEmployeeRecords(employeeArrays) {
    return employeeArrays.map(employeeArray => createEmployeeRecord(employeeArray));
}

function createTimeInEvent(datestamp) {
    // console.log(datestamp)
    const [date, hour] = datestamp.split(' '); 

    const timeInEvent = {
        type: "TimeIn",
        hour: parseInt(hour, 10), 
        date: date
    } 

    // console.log(timeInEvent)
    this.timeInEvents.push(timeInEvent);  
    
    return this;
}

function createTimeOutEvent (dateStamp) {
    const [date, hour] = dateStamp.split(' ')

    const timeOutEvent = {
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    }
    this.timeOutEvents.push(timeOutEvent)
    return this
}

function hoursWorkedOnDate(date) {
    const timeInEvent = this.timeInEvents.find(event=> event.date === date)
    const timeOutEvent = this.timeOutEvents.find(event => event.date ===date)

    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour)/100

    return hoursWorked

}

function wagesEarnedOnDate (date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date)

    const payOwned = hoursWorked*this.payPerHour
    return payOwned
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);

}
function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((totalPayroll, employee) => {
        return totalPayroll + allWagesFor.call(employee);
    }, 0);
}
