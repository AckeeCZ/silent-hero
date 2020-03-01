import { startOfMonth, addMonths, startOfDay, addDays, startOfYear, addYears, startOfQuarter, addQuarters, startOfWeek, addWeeks } from "date-fns";
import { period } from "../config/config";

export type Period = 'day' | 'week' | 'month' | 'quarter' | 'year';

const [startOfP, addP] = (() => {
  switch (period) {
    case "day":
      return [startOfDay, addDays] as const;
    case "week":
      return [startOfWeek as (date: number | Date) => Date, addWeeks] as const;
    case "month":
      return [startOfMonth, addMonths] as const;
    case "quarter":
      return [startOfQuarter, addQuarters] as const;
    case "year":
      return [startOfYear, addYears] as const;
  }
})()

export const periodStart = (delta = 0) => startOfP(addP(new Date(), delta));

export const generateId = () =>
  Math.random()
    .toString(36)
    .substring(7);

