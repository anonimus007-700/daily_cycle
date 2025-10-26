function toDecimalHours(hours: number, minutes: number): number {
  return hours + minutes / 60;
}

function decimalHoursToMinutes(decimalHours: number): number {
  return decimalHours * 60;
}

export function getCordinates (current_time: string, day_length: string, sunrise: string) {
  const [datePart, timePart] = current_time.split(" ");
  const [cHour, cMin, cSec] = timePart.split(":").map(Number);

  const [dlHour, dlMin, dlSec] = day_length.split(":").map(Number);

  const [sHour, sMin, sSec] = sunrise.split(":").map(Number);

  const st = decimalHoursToMinutes(toDecimalHours(sHour, sMin));
  const ct = decimalHoursToMinutes(toDecimalHours(cHour, cMin));
  const dl = decimalHoursToMinutes(toDecimalHours(dlHour, dlMin));

  const V = 1469.693 / dl;
  const S = (ct - st) * V;

  return { "x": S, "y": 0.0016 * Math.pow(S - 768, 2) + 160 };


