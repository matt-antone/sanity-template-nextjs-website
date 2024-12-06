import { faker } from '@faker-js/faker'
import inquirer from 'inquirer'
import { confirmAction } from '../../utils/confirm.mjs'
import { uploadImage } from '../../utils/image.mjs'

export async function getGalleryImages(client) {
  const { includeGallery } = await confirmAction('Would you like to add gallery images?', false)
  
  if (!includeGallery) return {}
  
  const gallery = []
  let addingImages = true

  while (addingImages) {
    const image = await inquirer.prompt([
      {
        type: 'input',
        name: 'url',
        message: 'Enter image URL:',
      },
      {
        type: 'input',
        name: 'caption',
        message: 'Enter image caption:',
      },
      {
        type: 'input',
        name: 'attribution',
        message: 'Enter image attribution:',
      }
    ])

    if (image.url) {
      const imageId = await uploadImage(client, image.url)
      gallery.push({
        _type: 'image',
        _key: faker.string.uuid(),
        asset: {
          _type: 'reference',
          _weak: true,
          _ref: imageId
        },
        caption: image.caption || undefined,
        attribution: image.attribution || undefined
      })
    }

    addingImages = await confirmAction('Would you like to add another image?', false)
  }

  return { gallery }
} 