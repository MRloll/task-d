import { useI18n } from 'vue-i18n'
import { type Field, type SelectField } from '@/types'
import { useFormValidation } from './useFormValidation'
export function useField() {
  const { t } = useI18n()
  const { rules: formRules } = useFormValidation()
  const createTextField: (field: Field) => Field = ({
    filedKey,
    label = '',
    disabled = false,
    cols = { md: 4, lg: 4 },
    value,
    clearable = false,
    rules = [],
    icon = null,
    id,
    required = false,
  }) => ({
    filedKey,
    type: 'text',
    label: t(label),
    placeholder: t(label),
    value,
    disabled,
    clearable,
    icon,
    id,
    rules: [...rules, ...(required ? [formRules.value.required] : [])],
    cols: { sm: 12, ...cols },
  })

  const createSelectField: (field: SelectField) => SelectField = ({
    filedKey,
    label = '',
    disabled = false,
    cols = { md: 4, lg: 4 },
    value,
    clearable = false,
    rules = [],
    icon = null,
    id,
    options = [],
    itemValue,
    itemTitle,
    returnObject,
    required = false,
  }) => ({
    filedKey,
    type: 'select',
    label: t(label),
    placeholder: t(label),
    value,
    disabled,
    clearable,
    icon,
    id,
    cols: { sm: 12, ...cols },
    options,
    itemValue,
    itemTitle,
    returnObject,
    rules: [...rules, ...(required ? [formRules.value.required] : [])],
  })

  const createTextareaField: (field: SelectField) => SelectField = ({
    filedKey,
    label = '',
    disabled = false,
    cols = { md: 4, lg: 4 },
    value,
    clearable = false,
    rules = [],
    icon = null,
    id,
    required = false,
  }) => ({
    filedKey,
    type: 'textarea',
    label: t(label),
    placeholder: t(label),
    value,
    disabled,
    clearable,
    icon,
    id,
    rules: [...rules, ...(required ? [formRules.value.required] : [])],
    cols: { sm: 12, ...cols },
  })
  return {
    createTextField,
    createSelectField,
    createTextareaField,
  }
}
