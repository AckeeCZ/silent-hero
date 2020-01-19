import { startOfMonth, addMonths } from "date-fns";

export const periodStart = (delta = 0) => startOfMonth(addMonths(new Date(), delta));

export const generateId = () =>
  Math.random()
    .toString(36)
    .substring(7);

