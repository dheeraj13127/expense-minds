export const formatToISODateString = (
  year: number,
  month: number,
  date: number
) => {
  const specificDate = new Date(Date.UTC(year, month, date, 0, 0, 0));
  const isoString = specificDate.toISOString();
  return isoString;
};
