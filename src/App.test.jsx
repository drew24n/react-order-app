import 'datejs';
import {calcDeadline} from "./App";

//orderTime - время, сколько будет выполняться заказ (в секундах)
//date - текущаяя дата и время

test('Выходной день (суббота): 19.09.2020, 15:20:00', () => {
    let orderTime = 1500
    let date = Date.today().set({year: 2020, month: 8, day: 19, hour: 15, minute: 20, second: 0})
    expect(calcDeadline(orderTime, date)).toBe('21.09.2020, 11:00:00')
})

test('Рабочий день начался (пятница) 18.09.2020, но время на выполнение заказа не достаточно, (18:30:00)', () => {
    let orderTime = 5400
    let date = Date.today().set({year: 2020, month: 8, day: 18, hour: 18, minute: 30, second: 0})
    expect(calcDeadline(orderTime, date)).toBe('21.09.2020, 11:30:00')
})

test('Рабочий день ещё не начался (среда): 16.09.2020, 07:20:00', () => {
    let orderTime = 2000
    let date = Date.today().set({year: 2020, month: 8, day: 16, hour: 7, minute: 20, second: 0})
    expect(calcDeadline(orderTime, date)).toBe('16.09.2020, 11:00:00')
})

test('Рабочий день начался (среда) 16.09.2020, но время на выполнение заказа не достаточно, (18:30:00)', () => {
    let orderTime = 5400
    let date = Date.today().set({year: 2020, month: 8, day: 16, hour: 18, minute: 30, second: 0})
    expect(calcDeadline(orderTime, date)).toBe('17.09.2020, 11:30:00')
})

test('Рабочий день начался (среда): 16.09.2020, 11:30:00', () => {
    let orderTime = 3600
    let date = Date.today().set({year: 2020, month: 8, day: 16, hour: 11, minute: 30, second: 0})
    expect(calcDeadline(orderTime, date)).toBe(5400) //в секундах
})