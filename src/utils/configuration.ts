import { DateTime } from 'luxon'

export const pdxDate = ({ year, month, day }: { year: number; month: number; day: number }) =>
  DateTime.fromObject({ year, month, day, zone: 'America/Los_Angeles' })

// note that specifying the time zone is important otherwise when you try and display the times in a different tz, it all screws up
const startDates: Record<number, { date: DateTime; virtual: boolean }> = {
  2012: { date: pdxDate({ year: 2012, month: 11, day: 8 }), virtual: false },
  2013: { date: pdxDate({ year: 2013, month: 11, day: 7 }), virtual: false },
  2014: { date: pdxDate({ year: 2014, month: 11, day: 6 }), virtual: false },
  2015: { date: pdxDate({ year: 2015, month: 11, day: 12 }), virtual: false },
  2016: { date: pdxDate({ year: 2016, month: 11, day: 3 }), virtual: false },
  2017: { date: pdxDate({ year: 2017, month: 11, day: 2 }), virtual: false },
  2018: { date: pdxDate({ year: 2018, month: 11, day: 1 }), virtual: false },
  2019: { date: pdxDate({ year: 2019, month: 10, day: 31 }), virtual: false },
  2020: { date: pdxDate({ year: 2020, month: 11, day: 5 }), virtual: true },
  2021: { date: pdxDate({ year: 2021, month: 11, day: 4 }), virtual: false },
}

const THIS_YEAR = 2021

const conventionStartDate = startDates[THIS_YEAR].date

const conventionDates = {
  year: conventionStartDate.year,
  startDay: conventionStartDate.day,
  endDay: conventionStartDate.day + 3,
}

export const configuration = {
  startDates,
  contactEmail: 'acnw@wyrdrune.com',
  gameEmail: 'game@wyrdrune.com',
  webEmail: 'guy@wyrdrune.com',
  conventionStartDate,
  conventionEndDate: conventionStartDate.plus({ days: 3 }),
  year: THIS_YEAR,
  startDay: conventionDates.startDay,
  endDay: conventionDates.endDay,
  // normal years
  // registrationDeadline: pdxDate({ year: conventionDates.year, month: 7, day: 7 }),
  // paymentDeadline: pdxDate({ year: conventionDates.year, month: 8, day: 14 }),
  // gameSubmissionDeadline: pdxDate({ year: conventionDates.year, month: 8, day: 14 }),
  registrationDeadline: pdxDate({ year: conventionDates.year, month: 9, day: 28 }),
  paymentDeadline: pdxDate({ year: conventionDates.year, month: 8, day: 14 }),
  gameSubmissionDeadline: pdxDate({ year: conventionDates.year, month: 9, day: 28 }),
  gameGmPreview: pdxDate({ year: conventionDates.year, month: 10, day: 6 }),
  gameBookOpen: pdxDate({ year: conventionDates.year, month: 10, day: 9 }),
  gameChoicesDue: pdxDate({ year: conventionDates.year, month: 10, day: 13 }),
  gmPreview: pdxDate({ year: conventionDates.year, month: 10, day: 15 }),
  schedulesSent: pdxDate({ year: conventionDates.year, month: 10, day: 17 }),
  mondayBeforeCon: conventionStartDate.minus({ days: 3 }), // 11/2
  wednesdayAfterCon: conventionStartDate.plus({ days: 6 }), // 11/11

  fourDayMembership: 185,
  fourDayVoucher: 70,
  threeDayMembership: 135,
  threeDayVoucher: 50,
  deposit: 50,

  virtual: startDates[THIS_YEAR].virtual,
  oregonHotelTax: '1.5%',
  moreThanDoubleOccupancySurcharge: '$15',
}

export type ConfigurationType = typeof configuration
type DateFields<T> = { [K in keyof T]: T[K] extends DateTime ? K : never }[keyof T]
export type ConfigurationDates = Pick<ConfigurationType, DateFields<ConfigurationType>>
