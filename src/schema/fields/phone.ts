import {parsePhoneNumber, isValidPhoneNumber} from 'libphonenumber-js'
import { Rule } from 'sanity'

export const phone = {
  name: 'phone',
  title: 'Phone',
  type: 'string',
  validation: (Rule: Rule) => Rule.optional().custom( (phone:any) => {
    if (typeof phone === 'undefined') {
      return true // Allow undefined values
    }
    const phoneString = String(phone);
    return isValidPhoneNumber(phoneString) ? true : 'Please enter a valid phone number';
    return true;
    // return isValidPhoneNumber(phone) ? true : 'Please enter a valid phone number'
  })
}