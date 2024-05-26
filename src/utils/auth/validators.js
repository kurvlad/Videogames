export const required = (value) => value.trim() !== "";

export const length = (value) => {
  const config = { min: 5, max: 35 };
  let isValid = true;
  if (config.min) {
    isValid = isValid && value.trim().length >= config.min;
  }
  if (config.max ? config.max : false) {
    isValid = isValid && value.trim().length <= config.max;
  }
  return isValid;
};