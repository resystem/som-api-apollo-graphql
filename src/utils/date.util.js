/**
 *
 * typeDateToString - that function transform an date to string (pattern: dd/MM/YYYY)
 *
 * @function typeDateToString
 * @param  {Date} date it's the date to be formatted
 * @returns {string} it's formatted string
 */
 export const dateToStringDDMMYYY = (date) => {
  if (!date) return '--/--/---';

  let myDate = date;
  if (typeof myDate === 'string' || typeof myDate === 'number') myDate = new Date(myDate);

  const day = myDate.getDate() > 9 ? myDate.getDate() : `0${myDate.getDate()}`;
  const month = myDate.getMonth() + 1 > 9 ? myDate.getMonth() + 1 : `0${myDate.getMonth() + 1}`;
  const year = myDate.getFullYear();

  return `${day}/${month}/${year}`;
};
