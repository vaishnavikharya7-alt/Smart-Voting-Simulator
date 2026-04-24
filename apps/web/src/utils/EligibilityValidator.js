export function validateEligibility(age, citizenship) {
  const isAgeValid = age >= 18;
  const isCitizenshipValid = citizenship === 'Indian';
  
  const eligible = isAgeValid && isCitizenshipValid;
  
  let message = '';
  
  if (eligible) {
    message = 'eligibleMessage';
  } else if (!isAgeValid) {
    message = 'notEligibleAge';
  } else if (!isCitizenshipValid) {
    message = 'notEligibleCitizen';
  }
  
  return {
    eligible,
    message
  };
}