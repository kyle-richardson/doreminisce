import moment from "moment"

export const getYears = (startingYear) => {
    const years = []
    for (let x=startingYear;x<=moment().year();x++){
      years.push(x)
    }
    return years.reverse()
}

export const getMonths = () => {
    const months = []
    for (let x=1;x<=12;x++){
        if (x / 10 < 1) months.push(`0${x}`)
        else months.push(x)
    }
    return months.reverse()
}

export const getDays = (year, month) => {
    const days = []
    const daysInMonth = moment(`${year}-${month}`, 'YYYY-MM').daysInMonth()
    for (let x=1;x<=daysInMonth;x++){
        if (x / 10 < 1) days.push(`0${x}`)
        else days.push(x)
    }
    return days.reverse()
}