import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { type Ref } from 'vue'

export function useFormValidation() {
  const formRef = ref<Ref | null>(null)
  const { t } = useI18n()
  const rules = computed(() => ({
    required: (v: any) => {
      if (Array.isArray(v)) {
        return v.length > 0 || t('errors.required')
      } else {
        return (v !== null && v !== undefined && v !== '') || t('errors.required')
      }
    },
    minLength: (length: number) => (value: string) =>
      value?.length >= length || `يجب أن يكون ${length} أحرف على الأقل.`,
    phoneNumber: (value: string | number) =>
      /^[+]?[0-9]{9,10}$/.test(value.toString()) || 'رقم الهاتف غير صحيح.',
    passwordStrength: (value: any) =>
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W_]).{8,}$/.test(value) ||
      'كلمة المرور ضعيفة. يجب أن تحتوي على 8 أحرف على الأقل بما في ذلك حرف كبير وحرف صغير ورقم ورمز.',
    email: (v: string) => !v || /.+@.+\..+/.test(v) || t('errors.invalid_email'),
    integar: (v: number) => Number.isInteger(Number(v)) || t('errors.intger_only'),
  }))
  const validate = async () => {
    if (!formRef.value) {
      throw new Error('Form reference is null')
    }
    const { valid } = await formRef.value.validate()
    if (!valid) {
      alert('Form is invalid')
      throw new Error('Form is invalid')
    }
    return valid
  }

  const reset = () => {
    formRef.value.reset()
  }

  return { rules, validate, reset, formRef }
}
