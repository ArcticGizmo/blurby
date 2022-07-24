import { ref, inject, provide, computed, isRef, toRefs } from 'vue';

// inject can also me used in the form component to attach to
// the form

function validateSchema(schema, data) {
  const valueData = toValueData(data);
  const payload = baseErrors(schema);

  try {
    schema.validateSync(valueData, { abortEarly: false });
    return payload;
  } catch (error) {
    error.inner.map(parseValidationError).forEach(item => {
      payload[item.field].errors.push(item.error);
      payload[item.field].hasErrors = true;
    });
  }

  return payload;
}

function toValueData(d) {
  const data = isRef(d) ? toRefs(d) : d;

  return Object.entries(data).reduce((acc, [key, value]) => {
    value = isRef(value) ? value.value : value;
    acc[key] = value;
    return acc;
  }, {});
}

function validateSchemaField(name, schema, value) {
  const payload = { errors: [], hasErrors: false };

  try {
    schema.validateSyncAt(name, value, { abortEarly: false });
  } catch (error) {
    error.inner.map(parseValidationError).forEach(item => {
      payload.errors.push(item.error);
      payload.hasErrors = true;
    });
  }

  return payload;
}

function baseErrors(schema) {
  const payload = {};
  Object.keys(schema.fields).map(key => {
    payload[key] = { errors: [], hasErrors: false };
  });

  return payload;
}

function parseValidationError(e) {
  return {
    field: e.params.path,
    error: e.message,
  };
}

export function useForm(schema, data, options) {
  const opts = options || {};
  if (!schema) {
    throw 'Form must be provided a schema';
  }

  const errors = ref(baseErrors(schema));
  const showErrors = ref(opts.showErrors ?? false);
  const hasErrors = computed(() => Object.keys(errors.value).length > 0);

  const validateField = name => {
    console.dir('----validate field');

    const fieldState = validateSchemaField(name, schema, data[name]);

    errors.value[name] = fieldState;
  };

  const validateAll = localOpts => {
    showErrors.value = localOpts.showErrors ?? true;
    errors.value = validateSchema(schema, data);
  };

  const resetAll = localOpts => {
    showErrors.value = localOpts.showErrors ?? opts.showErrors ?? false;
    errors.value = baseErrors(schema);
  };

  const form = {
    schema,
    showErrors,
    hasErrors,
    errors,
    validateField,
    validateAll,
    resetAll,
  };

  // this allows fast binding for components that have useForm and useField
  // in the same context
  form.useField = (name, options) => {
    const opts = options || {};
    opts.form = form;

    return useField(name, opts);
  };

  provide('form', form);

  return form;
}

export function useField(name, options) {
  const opts = options || {};

  const form = opts.form || inject('form');

  if (!form) {
    throw 'useField must be a child of useForm component, or be provided one through options.form';
  }

  const errors = ref([]);

  const hasErrors = computed(() => errors.value.length > 0);

  // FIX: this does not work correctly
  const validate = o => form.validateField(name, o);

  return {
    hasErrors,
    errors,
    validate,
  };
}
