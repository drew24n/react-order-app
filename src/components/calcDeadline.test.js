import {calcDeadline} from "./calcDeadline";

describe('check deadlines', () => {
    test.each`
    duration     | startDate                         | expectedResult
    ${0.5}       | ${'19/09/2020, 15:20 Saturday'}   | ${'21/09/2020, 10:30 Monday'}
    ${1.5}       | ${'18/09/2020, 18:30 Friday'}     | ${'21/09/2020, 11:00 Monday'}
    ${1}         | ${'16/09/2020, 07:20 Wednesday'}  | ${'16/09/2020, 11:00 Wednesday'}
    ${1.5}       | ${'16/09/2020, 18:30 Wednesday'}  | ${'17/09/2020, 11:00 Thursday'}
    ${1}         | ${'16/09/2020, 11:30 Wednesday'}  | ${'16/09/2020, 12:30 Wednesday'}
    ${5}         | ${'23/09/2019, 10:00 Monday'}     | ${'23/09/2019, 15:00 Monday'}
    ${7}         | ${'23/09/2019, 18:00 Monday'}     | ${'24/09/2019, 16:00 Tuesday'}
    ${25}        | ${'23/09/2019, 18:00 Monday'}     | ${'26/09/2019, 16:00 Thursday'}
    ${7}         | ${'21/09/2019, 15:00 Saturday'}   | ${'23/09/2019, 17:00 Monday'}
    ${60}        | ${'20/09/2019, 17:00 Friday'}     | ${'01/10/2019, 14:00 Tuesday'}
    ${60}        | ${'21/09/2019, 17:00 Saturday'}   | ${'01/10/2019, 16:00 Tuesday'}
    ${8}         | ${'24/09/2019, 08:00 Tuesday'}    | ${'24/09/2019, 18:00 Tuesday'}
    ${8}         | ${'25/09/2019, 08:00 Wednesday'}  | ${'25/09/2019, 18:00 Wednesday'}
    ${8}         | ${'25/09/2019, 18:00 Wednesday'}  | ${'26/09/2019, 17:00 Thursday'}
    ${8}         | ${'25/09/2019, 19:00 Wednesday'}  | ${'26/09/2019, 18:00 Thursday'}
    ${8}         | ${'25/09/2019, 18:45 Wednesday'}  | ${'26/09/2019, 17:45 Thursday'}
    ${8}         | ${'25/09/2019, 19:10 Wednesday'}  | ${'26/09/2019, 18:00 Thursday'}
    ${8}         | ${'27/09/2019, 17:00 Friday'}     | ${'30/09/2019, 16:00 Monday'}
    ${8}         | ${'27/09/2019, 19:00 Friday'}     | ${'30/09/2019, 18:00 Monday'}
    ${8}         | ${'28/09/2019, 10:00 Saturday'}   | ${'30/09/2019, 18:00 Monday'}
  `('check deadlines', ({duration, startDate, expectedResult}) => {
        expect(calcDeadline(duration * 3600, startDate)).toBe(expectedResult)
    })
})