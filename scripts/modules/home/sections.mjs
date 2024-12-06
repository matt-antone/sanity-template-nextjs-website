import { faker } from '@faker-js/faker'
import inquirer from 'inquirer'
import { confirmAction } from '../../utils/confirm.mjs'

export async function getSections() {
  const { includeSections } = await confirmAction('Would you like to add sections?', true)
  
  if (!includeSections) return {}
  
  const sections = []
  let addingSections = true

  while (addingSections) {
    const section = await inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Enter section title:',
      },
      {
        type: 'input',
        name: 'content',
        message: 'Enter section content:',
      }
    ])

    if (section.title || section.content) {
      sections.push({
        _key: faker.string.uuid(),
        title: section.title || undefined,
        content: section.content ? [
          {
            _type: 'block',
            style: 'normal',
            _key: faker.string.uuid(),
            markDefs: [],
            children: [
              {
                _type: 'span',
                text: section.content,
                _key: faker.string.uuid(),
              }
            ]
          }
        ] : undefined
      })
    }

    addingSections = await confirmAction('Would you like to add another section?', false)
  }

  return { sections }
} 