import { faker } from '@faker-js/faker'
import { createSpinner, logSuccess, logError } from '../../utils/spinner.mjs'
import { uploadImage } from '../../utils/image.mjs'
import { generateStructuredContent } from './content.mjs'

// Predefined image URLs for posts
const TECH_IMAGES = [
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=800',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=800',
  'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1200&h=800',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=800',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=800'
]

async function createPost(client, profiles, categories, tags, index) {
  try {
    // Upload image
    let imageId
    try {
      imageId = await uploadImage(client, TECH_IMAGES[index % TECH_IMAGES.length])
    } catch (error) {
      throw new Error(`Failed to upload image for post ${index + 1}: ${error.message}`)
    }
    
    // Generate content
    let body
    try {
      body = generateStructuredContent('post')
    } catch (error) {
      throw new Error(`Failed to generate content for post ${index + 1}: ${error.message}`)
    }
    
    // Create post document
    const title = faker.lorem.sentence()
    return {
      _type: 'post',
      title,
      slug: {
        _type: 'slug',
        current: faker.helpers.slugify(title).toLowerCase()
      },
      description: faker.lorem.paragraph(),
      date: faker.date.past(),
      relatedProfiles: [
        {
          _type: 'reference',
          _key: faker.string.uuid(),
          _weak: true,
          _ref: profiles[Math.floor(Math.random() * profiles.length)]._id
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
          caption: 'Tech illustration',
          attribution: 'Unsplash'
        }
      ],
      category: {
        _type: 'reference',
        _weak: true,
        _ref: categories[Math.floor(Math.random() * categories.length)]._id
      },
      tags: [
        {
          _type: 'reference',
          _key: faker.string.uuid(),
          _weak: true,
          _ref: tags[Math.floor(Math.random() * tags.length)]._id
        },
        {
          _type: 'reference',
          _key: faker.string.uuid(),
          _weak: true,
          _ref: tags[Math.floor(Math.random() * tags.length)]._id
        }
      ],
      body
    }
  } catch (error) {
    throw new Error(`Failed to create post ${index + 1}: ${error.message}`)
  }
}

export async function generatePosts(client, profiles, categories, tags) {
  let currentSpinner = null
  
  try {
    currentSpinner = createSpinner('Creating posts...').start()
    
    // Validate input references
    if (!profiles?.length) throw new Error('No profiles available')
    if (!categories?.length) throw new Error('No categories available')
    if (!tags?.length) throw new Error('No tags available')
    
    const posts = []
    const numPosts = 25 // Generate 25 sample posts
    const BATCH_SIZE = 5 // Process posts in smaller batches
    
    // Create posts in batches
    for (let i = 0; i < numPosts; i += BATCH_SIZE) {
      const batchSize = Math.min(BATCH_SIZE, numPosts - i)
      const batchPromises = []
      
      for (let j = 0; j < batchSize; j++) {
        const index = i + j
        currentSpinner.text = `Creating post ${index + 1}/${numPosts}...`
        
        try {
          const post = await createPost(client, profiles, categories, tags, index)
          const createPromise = client.create(post).catch(error => {
            throw new Error(`Failed to save post "${post.title}": ${error.message}`)
          })
          batchPromises.push(createPromise)
        } catch (error) {
          throw new Error(`Failed to process post ${index + 1}: ${error.message}`)
        }
      }
      
      try {
        const batchResults = await Promise.all(batchPromises)
        posts.push(...batchResults)
      } catch (error) {
        throw new Error(`Failed to save batch of posts: ${error.message}`)
      }
      
      currentSpinner.text = `Created ${posts.length}/${numPosts} posts`
    }
    
    currentSpinner.succeed()
    logSuccess(`Created ${posts.length} posts`)
    return posts
  } catch (error) {
    if (currentSpinner) {
      currentSpinner.fail()
    }
    logError('\nPost Generation Error:')
    logError(error.message)
    if (error.cause) {
      logError('Caused by:', error.cause)
    }
    throw new Error(`Post generation failed: ${error.message}`)
  }
} 