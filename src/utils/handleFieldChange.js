// utils/handleFieldChange.js

export const handleFieldChange = async (updateRegistrationData, section, fieldName, value) => {
  if (value === undefined) {
    console.log(`Skipping update for ${fieldName} as value is undefined.`);
    return;
  }

  console.log(`Updating field: ${fieldName} in ${section} with value: ${value}`);

  // Update only the specified field in the nested object
  await updateRegistrationData((prevData) => ({
    ...prevData,
    [section]: {
      ...prevData[section],
      [fieldName]: value,
    },
  }));
};
