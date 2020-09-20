import 'datejs';
import {calcDeadline} from "./App";

describe('check deadlines', () => {
    test.each`
    orderTime  | startTime                         | expectedResult
    ${0.5}     | ${'Saturday, 19/09/2020, 15:20'}  | ${'Monday, 21/09/2020, 10:30'}
    ${1.5}     | ${'Friday, 18/09/2020, 18:30'}    | ${'Monday, 21/09/2020, 11:30'}
    ${1}       | ${'Wednesday, 16/09/2020, 07:20'} | ${'Wednesday, 16/09/2020, 11:00'}
    ${1.5}     | ${'Wednesday, 16/09/2020, 18:30'} | ${'Thursday, 17/09/2020, 11:30'}
    ${1}       | ${'Wednesday, 16/09/2020, 11:30'} | ${'Wednesday, 16/09/2020, 12:30'}
    ${5}       | ${'Monday, 23/09/2019, 10:00'}    | ${'Monday, 23/09/2019, 15:00'}
    ${7}       | ${'Monday, 23/09/2019, 18:00'}    | ${'Tuesday, 24/09/2019, 16:00'}
    ${25}      | ${'Monday, 23/09/2019, 18:00'}    | ${'Thursday, 26/09/2019, 16:00'}
    ${7}       | ${'Saturday, 21/09/2019, 15:00'}  | ${'Monday, 23/09/2019, 17:00'}
    ${60}      | ${'Friday, 20/09/2019, 17:00'}    | ${'Tuesday, 01/10/2019, 14:00'}
    ${60}      | ${'Saturday, 21/09/2019, 17:00'}  | ${'Tuesday, 01/10/2019, 16:00'}
    ${8}       | ${'Tuesday, 24/09/2019, 08:00'}   | ${'Tuesday, 24/09/2019, 18:00'}
    ${8}       | ${'Wednesday, 25/09/2019, 08:00'} | ${'Wednesday, 25/09/2019, 18:00'}
    ${8}       | ${'Wednesday, 25/09/2019, 18:00'} | ${'Thursday, 26/09/2019, 17:00'}
    ${8}       | ${'Wednesday, 25/09/2019, 19:00'} | ${'Thursday, 26/09/2019, 18:00'}
    ${8}       | ${'Wednesday, 25/09/2019, 18:45'} | ${'Thursday, 26/09/2019, 17:45'}
    ${8}       | ${'Wednesday, 25/09/2019, 19:10'} | ${'Thursday, 26/09/2019, 18:00'}
    ${8}       | ${'Friday, 27/09/2019, 17:00'}    | ${'Monday, 30/09/2019, 16:00'}
    ${8}       | ${'Friday, 27/09/2019, 19:00'}    | ${'Monday, 30/09/2019, 18:00'}
    ${8}       | ${'Saturday, 28/09/2019, 10:00'}  | ${'Monday, 30/09/2019, 18:00'}
  `('check deadlines', ({orderTime, startTime, expectedResult}) => {
        expect(calcDeadline(orderTime * 3600, startTime)).toBe(expectedResult)
    })
})