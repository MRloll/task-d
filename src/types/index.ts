export interface Field {
  filedKey: string
  label?: string
  disabled?: boolean
  cols: { md: number; lg: number }
  value?: string
  clearable?: boolean
  rules?: any[]
  icon?: string | null
  id?: string
  type?: string
  placeholder?: string
  required?: boolean
}

export interface SelectField extends Field {
  options?: any[]
  multiple?: boolean
  itemValue?: string
  itemTitle?: string
  returnObject?: boolean
}
