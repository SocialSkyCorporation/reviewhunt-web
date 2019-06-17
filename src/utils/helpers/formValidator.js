import _ from "lodash";

/*

form: { name : "", email: "", ... }

requiredKeys: ex// ['name', 'email'] or '*'

defaultValues: { key: value } ex// { name : 'name'} shouldn't be allowed

*/
export const validateForm = (form, requiredKeys = "*", defaultValues) => {
  let errorMessages = [];

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

/* eslint-disable no-control-regex */
export const sanitizeText = function(text, stripEndDot = false) {
  let t = text.trim().replace(/[\x00-\x09\x0B-\x0C\x0E-\x1F\x7F-\x9F]/g, '');

  if (stripEndDot) {
    return t.replace(/(\.)$/, '');
  } else {
    return t;
  }
}

