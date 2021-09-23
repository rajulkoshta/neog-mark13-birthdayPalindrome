function reverseStr(str) {
    var charlist = str.split('');
    var reverseCharList = charlist.reverse();
    var reversedStr = reverseCharList.join('');
    return reversedStr;
}

function isPalindrome(str) {
    var reverse = reverseStr(str);
    return str === reverse;
}

function convertDateToString(date) {
    var dateString = {
        day: '',
        month: '',
        year: ''
    }

    if (date.day < 10) {
        dateString.day = '0' + date.day;
    } else {
        dateString.day = date.day.toString();
    }

    if (date.month < 10) {
        dateString.month = '0' + date.month;
    } else {
        dateString.month = date.month.toString();
    }

    dateString.year = date.year.toString();
    return dateString;
}


function allDateFormats(date) {
    var dateStr = convertDateToString(date);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd]
}

function checkPalindromeForAllDateFormats(date) {
    var listOfAllDateFormats = allDateFormats(date);

    var flag = false;
    for (var i = 0; i < listOfAllDateFormats.length; i++) {
        if (isPalindrome(listOfAllDateFormats[i])) {
            flag = true;
            break;
        }
    }
    return flag;
}

function leapyear(year) {
    if (year % 400 === 0) {
        return true;
    }
    if (year % 100 === 0) {
        return false;
    }
    if (year % 4 === 0) {
        return true;
    }
    return false;
}

function getNextDate(date) { 
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInAMonth = [31, 28, 30, 31, 30, 31, 30, 31, 30, 31, 30, 31];


    // check for feb
    if (month === 2) {
        // check for leap year
        if (leapyear(year)) {
            if (day > 29) {
                day = 1;
                month++;
            }
        }
        // if it is not a leap year
        else {
            if (day > 28) {
                day = 1;
                month++;
            }
        }
    }
    // if it is not a feb
    else {
        if (day > daysInAMonth[month - 1]) {
            day = 1;
            month++;
        }
    }

    // for year
    if (month > 12) {
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year
    }
}

function nextPalindromeDate(date) {
    var ctr = 0;
    var nextDate = getNextDate(date);

    while (1) {
        ctr++;
        var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
        if (isPalindrome) {
            break;
        }
        nextDate = getNextDate(nextDate);
    }

    return [ctr, nextDate];
}


const inputDate = document.querySelector("#date-input");
const checkBtn = document.querySelector(".btn-primary");
const reloadBtn = document.querySelector(".btn-secondary");
const message = document.querySelector("#output-message");


function checkPalindrome(e) {
    var birthdayStr = inputDate.value;
    if (birthdayStr !== '') {
        var listOfDate = birthdayStr.split('-');
        var date = {
            day:Number(listOfDate[2]),
            month:Number(listOfDate[1]),
            year:Number(listOfDate[0])
        };
        var isPalindrome = checkPalindromeForAllDateFormats(date);
        if (isPalindrome) {
            message.innerText = "🥳🥳yay! your birthday is a palindrome!!!! 🎊🎊";
        } else {
            var [ctr, nextDate] = nextPalindromeDate(date);
            var nextDateStr = convertDateToString(nextDate);
            message.innerText = `the next palindrome date is ${nextDateStr.day}-${nextDateStr.month}-${nextDateStr.year} and you just missed by ${ctr} days😒😒`;
        }
    }
    
}

function refresh() {
    window.location.reload("Refresh");
}

checkBtn.addEventListener("click", checkPalindrome);

reloadBtn.addEventListener("click", refresh);

