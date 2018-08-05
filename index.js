export function initForm(selector, schema){
  $(selector).html("");
  $(selector).jsonForm(schema)
}