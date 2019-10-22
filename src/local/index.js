import { extend } from 'vee-validate'
import { required, email, min, length} from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: '请输入{_field_}'
})

extend('email', {
  ...email,
  message: `请输入正确的邮箱格式`,
})

extend('min', {
  ...min,
  message: '{_field_}不符合最小长度'
})

extend('length', {
  ...length,
  message: '{_field_}需要{length}位'
})

// 限制最大长度
extend('maxLength', {
  params: ['max'],
  validate (value, { max }) {
    return value.length < max
  },
  message: '{_field_}超过最大长度'
})
