import { faker } from '@faker-js/faker'
import inquirer from 'inquirer'
import { confirmAction } from '../../utils/confirm.mjs'

export async function getBodyContent() {
  const { includeBody } = await confirmAction('Would you like to add body content?', false)
  
  if (!includeBody) return {}
  
  const { content } = await inquirer.prompt([{
    type: 'input',
    name: 'content',
    message: 'Enter body content:',
  }])

  return {
    body: [
      {
        _type: 'block',
        style: 'normal',
        _key: faker.string.uuid(),
        markDefs: [],
        children: [
          {
            _type: 'span',
            text: content,
            _key: faker.string.uuid(),
          }
        ]
      }
    ]
  }
} 