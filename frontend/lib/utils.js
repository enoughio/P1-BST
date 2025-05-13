import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


// Example usage:
// const dmsString = '40°42\'46.08"N, 74°00\'21.6"W';
// const decimalCoords = convertDMStoDD(dmsString);
// console.log(decimalCoords); // Expected output: [40.7128, -74.006]
import { format, addDays, subDays, isSameDay } from "date-fns"


// Helper functions to categorize events
export const getHighlightedEvents = (events) => {
  return events.filter((event) => event.highlighted)
}

export const categorizeEvents = (events) => {
  const today = new Date()

  const past = events.filter((event) => {
    return event.date < today && isSameDay(event.date, today) === false
  })

  // const present = events.filter((event) => {
  //   // Events happening today or within the next 7 days
  //   return isSameDay(event.date, today) || (event.date > today && event.date <= addDays(today, 7))
  // })

  const upcoming = events.filter((event) => {
    return event.date > addDays(today, 7)
  })

  return { past, upcoming }
}


