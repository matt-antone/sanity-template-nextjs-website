import { faker } from '@faker-js/faker'
import { createSpinner } from '../../utils/spinner.mjs'
import { uploadImage } from '../../utils/image.mjs'

export async function generateAutoHome(client) {
  const spinner = createSpinner('Generating sample home page...').start()
  
  try {
    const imageId = await uploadImage(client, 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=800')
    
    return {
      _type: 'home',
      date: new Date().toISOString(),
      title: 'Welcome to Web Experts Collective',
      description: 'Your partner in creating exceptional web experiences',
      sections: [
        {
          _key: faker.string.uuid(),
          title: 'Our Expertise',
          content: [
            {
              _type: 'block',
              style: 'normal',
              _key: faker.string.uuid(),
              markDefs: [],
              children: [
                {
                  _type: 'span',
                  text: faker.lorem.paragraph(),
                  _key: faker.string.uuid(),
                }
              ]
            }
          ]
        },
        {
          _key: faker.string.uuid(),
          title: 'Our Process',
          content: [
            {
              _type: 'block',
              style: 'normal',
              _key: faker.string.uuid(),
              markDefs: [],
              children: [
                {
                  _type: 'span',
                  text: faker.lorem.paragraph(),
                  _key: faker.string.uuid(),
                }
              ]
            }
          ]
        }
      ],
      body: [
        {
          _type: 'block',
          style: 'normal',
          _key: faker.string.uuid(),
          markDefs: [],
          children: [
            {
              _type: 'span',
              text: faker.lorem.paragraphs(3),
              _key: faker.string.uuid(),
            }
          ]
        }
      ],
      gallery: [
        {
          _type: 'image',
          _key: faker.string.uuid(),
          asset: {
            _type: 'reference',
            _weak: true,
            _ref: imageId
          },
          caption: 'Modern workspace',
          attribution: 'Unsplash'
        }
      ]
    }
  } finally {
    spinner.stop()
  }
} 