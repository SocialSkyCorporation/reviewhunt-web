import _ from "lodash";

/*

form: { name : "", email: "", ... }

requiredKeys: ex// ['name', 'email'] or '*'

defaultValues: { key: value } ex// { name : 'name'} shouldn't be allowed

*/
const validateForm = (form, requiredKeys, defaultValues) => {
  let errorMessages = [];
  if (!requiredKeys) requiredKeys = "*";

  for (const key in form) {
    if (
      (requiredKeys === "*" || requiredKeys.includes(key)) &&
      (!form[key] ||
        form[key].toUpperCase() === key.toUpperCase() ||
        _.startCase(key) === _.startCase(form[key]))
    ) {
      errorMessages.push(`${_.startCase(key)} is a required field.`);
    }
  }

  return errorMessages.length === 0 ? false : errorMessages;
};

export { validateForm };
