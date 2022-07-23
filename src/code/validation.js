import * as yup from 'yup';

export function validate(schema, data) {
  // it is possible to manually validate a
  // specific field

  const payload = {};
  Object.keys(schema.fields).map(key => {
    payload[key] = { errors: [], hasErrors: false };
  });

  try {
    schema.validateSync(data, { abortEarly: false });
    return payload;
  } catch (error) {
    error.stack = null;
    console.dir(error);
    const p = error.inner.map(parseValidationError);
    console.dir(p);

    p.forEach(item => {
      payload[item.field].errors.push(item.error);
      payload[item.field].hasErrors = true;
    });

    return payload;
  }
}

function parseValidationError(e) {
  e.stack = null;
  console.dir(e);
  return {
    field: e.params.path,
    error: e.message,
  };
}
