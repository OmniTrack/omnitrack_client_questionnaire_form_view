import 'jsonform';
import 'bootstrap/js/dist/dropdown';

var requiredValues = []

export function initForm(schema) {
  schema = typeof schema === 'string' ? JSON.parse(schema) : schema
  schema.onSubmit = function (error, values) {

    console.log("value submitted - ")
    console.log(values)

    if (error) {
      console.error(error)
      if (window.ExternalHandler) {
        window.ExternalHandler.onSubmitted(JSON.stringify(error), null)
      }
      return;
    }

    var emptyKeys = []

    //check
    for (const requiredKey of requiredValues) {
      if (values[requiredKey] == null) {
        emptyKeys.push(requiredKey)
      } else if (values[requiredKey] instanceof Array && values[requiredKey].length === 0) {
        emptyKeys.push(requiredKey)
      }
    }
    if (emptyKeys.length === 0) {
      if (window.ExternalHandler) {
        window.ExternalHandler.onSubmitted(null, JSON.stringify(values))
      }
    } else {
      const err = {
        error: "RequiredFields",
        unsetFields: emptyKeys,
        unsetFieldTitles: emptyKeys.map(key => {
          return schema.schema[key].title || key
        })
      }
      console.error(err)
      window.ExternalHandler.onSubmitted(JSON.stringify(err), JSON.stringify(values))
    }
  }

  requiredValues = []
  for (const key of Object.keys(schema.schema)) {
    if (schema.schema[key].required === true) {
      requiredValues.push(key)
    }
  }

  console.log(requiredValues)

  $("form.jsonform-container").html("");
  $("form.jsonform-container").jsonForm(schema)
}

export function submit() {
  $('form.jsonform-container').submit(function (event) {
    event.preventDefault();
    console.log(event)
  })
}

window.initForm = initForm
window.submit = submit