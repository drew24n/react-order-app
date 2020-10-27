import moment from 'moment-business-time';

moment.updateLocale('en', {
    workinghours: {
        0: null,
        1: ['10:00:00', '19:00:00'],
        2: ['10:00:00', '19:00:00'],
        3: ['10:00:00', '19:00:00'],
        4: ['10:00:00', '19:00:00'],
        5: ['10:00:00', '19:00:00'],
        6: null
    }
})

export function calcDeadline(orderTime, currentDate) {
    currentDate = moment(currentDate, 'DD/MM/YYYY, HH:mm dddd')
    return moment(currentDate).addWorkingTime(orderTime, 'seconds').format('DD/MM/YYYY, HH:mm dddd')
}