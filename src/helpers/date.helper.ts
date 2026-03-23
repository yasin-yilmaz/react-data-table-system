import { format, isValid, parse, parseISO } from "date-fns";

export const printDate = (date?: string | null) => {
  if (!date) return "";

  let parsedDate = parseISO(date);

  if (!isValid(parsedDate)) {
    parsedDate = parse(date, "yyyy-M-d", new Date());
  }

  if (!isValid(parsedDate)) return "";

  return format(parsedDate, "dd-MM-yyyy");
};
