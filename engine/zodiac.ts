/**
 * Zodiac Calculation Engine
 * Pure business logic for zodiac sign determination
 */

import { ZodiacSign } from '@/types'

interface ZodiacRange {
  sign: ZodiacSign
  startMonth: number
  startDay: number
  endMonth: number
  endDay: number
}

const ZODIAC_RANGES: ZodiacRange[] = [
  { sign: 'Aries', startMonth: 3, startDay: 21, endMonth: 4, endDay: 19 },
  { sign: 'Taurus', startMonth: 4, startDay: 20, endMonth: 5, endDay: 20 },
  { sign: 'Gemini', startMonth: 5, startDay: 21, endMonth: 6, endDay: 20 },
  { sign: 'Cancer', startMonth: 6, startDay: 21, endMonth: 7, endDay: 22 },
  { sign: 'Leo', startMonth: 7, startDay: 23, endMonth: 8, endDay: 22 },
  { sign: 'Virgo', startMonth: 8, startDay: 23, endMonth: 9, endDay: 22 },
  { sign: 'Libra', startMonth: 9, startDay: 23, endMonth: 10, endDay: 22 },
  { sign: 'Scorpio', startMonth: 10, startDay: 23, endMonth: 11, endDay: 21 },
  { sign: 'Sagittarius', startMonth: 11, startDay: 22, endMonth: 12, endDay: 21 },
  { sign: 'Capricorn', startMonth: 12, startDay: 22, endMonth: 1, endDay: 19 },
  { sign: 'Aquarius', startMonth: 1, startDay: 20, endMonth: 2, endDay: 18 },
  { sign: 'Pisces', startMonth: 2, startDay: 19, endMonth: 3, endDay: 20 },
]

export function calculateZodiacSign(date: Date): ZodiacSign {
  const month = date.getMonth() + 1
  const day = date.getDate()
  
  for (const range of ZODIAC_RANGES) {
    if (
      (month === range.startMonth && day >= range.startDay) ||
      (month === range.endMonth && day <= range.endDay)
    ) {
      return range.sign
    }
  }
  
  // Fallback to Aries (should never reach here with valid dates)
  return 'Aries'
}

export function parseBirthdate(birthdateString: string): Date {
  return new Date(birthdateString)
}

export function getZodiacFromBirthdate(birthdateString: string): ZodiacSign {
  const date = parseBirthdate(birthdateString)
  return calculateZodiacSign(date)
}
