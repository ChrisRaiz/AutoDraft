function formatSSN(value: string): string {
  // if input value is falsy eg if the user deletes the input, then just return
  if (!value) return value;

  // clean the input for any non-digit values.
  const SSN = value.replace(/[^\d]/g, '');

  // SSNLength is used to know when to apply our formatting for the value
  const SSNLength = SSN.length;

  // we need to return the value with no formatting if its less then four digits
  // this is to avoid weird behavior that occurs if you  format the area code too early

  if (SSNLength < 4) return SSN;

  // if SSNLength is greater than 4 and less the 6 we start to return
  // the formatted number
  if (SSNLength < 6) {
    return `${SSN.slice(0, 3)}-${SSN.slice(3)}`;
  }

  // finally, if the SSNLength is greater then 6, we add the last
  // bit of formatting and return it.
  return `${SSN.slice(0, 3)}-${SSN.slice(3, 5)}-${SSN.slice(5, 9)}`;
}

export default formatSSN;
