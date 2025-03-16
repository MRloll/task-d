import { type Field, type SelectField, type User } from '@/types'

export const setValuesToSchema = (schema: Field[] | SelectField[], form: any) => {
  schema.forEach((field) => {
    field.value = form[field.filedKey]
  })
}
export const transfromSchemaToObject = (schema: Field[] | SelectField[]) => {
  const formObject = {} as User
  schema.forEach((field) => {
    if (field.type == 'slot') return
    formObject[field.filedKey] = field.value
  })
  return formObject
}
