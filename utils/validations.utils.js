/**
 *
 * validateCPF - it's function that make validation on cpf field
 *
 * @function validateCPF
 * @param  {string} strCPF  it's the cpf value
 * @returns {boolean} it's the validation
 */
export const validateCPF = (strCPF) => {
  let sum;
  let rest;
  sum = 0;
  if (strCPF === '00000000000') return false;

  for (let i = 1; i <= 9; i += 1) {
    sum += parseInt(strCPF.substring(i - 1, i), 10) * (11 - i);
  }

  rest = (sum * 10) % 11;

  if ((rest === 10) || (rest === 11)) rest = 0;
  if (rest !== parseInt(strCPF.substring(9, 10), 10)) return false;

  sum = 0;
  for (let i = 1; i <= 10; i += 1) sum += parseInt(strCPF.substring(i - 1, i), 10) * (12 - i);
  rest = (sum * 10) % 11;

  if ((rest === 10) || (rest === 11)) rest = 0;
  if (rest !== parseInt(strCPF.substring(10, 11), 10)) return false;
  return true;
};

/**
 *
 * extractNumbers - that function extract all numbers of an string
 *
 * @function extractNumbers
 * @param  {string} text  that function extract all numbers of an string
 * @returns {string} it's the string that have only the filtered numbers
 */
export const extractNumbers = (text) => {
  let number = '';

  Object.keys(text).forEach((i) => {
    const n = text[i];
    if (parseInt(n, 10) || parseInt(n, 10) === 0 || n === '+') number += n;
  });

  return number;
};
