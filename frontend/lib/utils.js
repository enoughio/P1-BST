import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}





/**
 * Converts a DMS (Degrees, Minutes, Seconds) coordinate string to Decimal Degrees.
 * Example input: "40°42'46.08\"N, 74°00'21.6\"W"
 *
//  param {string} dms - The DMS coordinate string.
 returns {[number, number] | null} - An array containing [latitude, longitude] in decimal degrees, or null if parsing fails.
 */
export function convertDMStoDD(dms) {
  // Split the input string by comma to separate latitude and longitude.
  const parts = dms.split(',');
  if (parts.length !== 2) return null; // Ensure we have both parts.

  const latStr = parts[0].trim();
  const lonStr = parts[1].trim();

  // Helper function to convert a single DMS string (e.g., "40°42'46.08\"N") to decimal degrees.
  function dmsToDecimal(dmsStr) {
    // Regular expression to extract degrees, minutes, seconds, and the direction.
    const regex = /(\d+)°(\d+)'([\d.]+)"([NSEW])/;
    const match = dmsStr.match(regex);
    if (!match) return null;

    const degrees = parseFloat(match[1]);
    const minutes = parseFloat(match[2]);
    const seconds = parseFloat(match[3]);
    const direction = match[4];

    // Convert to decimal degrees.
    let decimal = degrees + minutes / 60 + seconds / 3600;

    // If direction is South or West, make the value negative.
    if (direction === 'S' || direction === 'W') {
      decimal = -decimal;
    }
    return decimal;
  }

  const latitude = dmsToDecimal(latStr);
  const longitude = dmsToDecimal(lonStr);

  if (latitude === null || longitude === null) {
    return null;
  }
  return [latitude, longitude];
}


// Example usage:
// const dmsString = '40°42\'46.08"N, 74°00\'21.6"W';
// const decimalCoords = convertDMStoDD(dmsString);
// console.log(decimalCoords); // Expected output: [40.7128, -74.006]
