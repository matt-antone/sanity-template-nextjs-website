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
    console.log(phone)
    const phoneString = String(phone);
    console.log(phoneString)
    console.log(isValidPhoneNumber(phoneString))
    return isValidPhoneNumber(phoneString) ? true : 'Please enter a valid phone number';
    return true;
    // return isValidPhoneNumber(phone) ? true : 'Please enter a valid phone number'
  })
}