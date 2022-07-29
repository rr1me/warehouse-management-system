export const getMonthData = (year, month) => {
    const date = new Date(year, month)
    
    let day = 1;
    
    const daysInMonth = getDaysInMonth(month, year);
    const monthStartsOn = getDayWhenMonthStatsOn(date);
    
    const daysInPrevMonth = getDaysInMonth(month-1, year);
    const daysInNextMonth = getDaysInMonth(month+1, year);
    
    return new Array(6).fill(0).map((value, index) => {
        return new Array(7).fill(0).map((value2, index2) => { // fills matrix with 6 weeks(1st array) with 7 days(2nd array) inside
            if (index === 0 && index2 < monthStartsOn){
                return daysInPrevMonth - (monthStartsOn - 1 - index2);
            }else if (day > daysInMonth){
                return daysInNextMonth - (daysInNextMonth - (day++ - daysInMonth));
            }else{
                return new Date(year, month, day++);
            }
        });
    });
};

const getDaysInMonth = (month, year) => {
    const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === -1) {
        month = 11
    }else if(month === 12){
        month = 1;
    }
    
    return daysInMonths[month] + (isLeapYear(year) && month === 1 ? 1 : 0 );
};

const isLeapYear = year => {
    return !((year % 4) || (!(year % 100) && (year % 400)));
};

const getDayWhenMonthStatsOn = date => {
    const day = date.getDay();
    if (day === 0) return 6; //if sunday with index 0 we returning index 6 like we have european calendar
    
    return day - 1;
}