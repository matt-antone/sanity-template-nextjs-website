import { createClient } from '@sanity/client'
import { faker } from '@faker-js/faker'
import dotenv from 'dotenv'
import fetch from 'node-fetch'
import inquirer from 'inquirer'

dotenv.config()

// Get dataset choice from user
async function getDatasetChoice() {
  const { dataset } = await inquirer.prompt([
    {
      type: 'list',
      name: 'dataset',
      message: 'Which dataset would you like to populate?',
      choices: [
        { name: 'Development', value: 'development' },
        { name: 'Production', value: 'production' }
      ],
      default: 'development'
    }
  ])
  return dataset
}

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: await getDatasetChoice(),
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: '2023-05-03',
  useCdn: false,
})

// Add function to delete existing content
async function deleteAllContent() {
  const types = ['post', 'page', 'profile', 'category', 'tag']
  
  for (const type of types) {
    const query = `*[_type == "${type}"]`
    const documents = await client.fetch(query)
    
    if (documents.length > 0) {
      console.log(`🗑️  Deleting ${documents.length} ${type}s...`)
      
      // Delete documents in batches to avoid timeout
      const batchSize = 50
      for (let i = 0; i < documents.length; i += batchSize) {
        const batch = documents.slice(i, i + batchSize)
        await Promise.all(
          batch.map(doc => client.delete(doc._id))
        )
      }
      
      const plural = type === 'category' ? 'categories' : `${type}s`
      console.log(`✅ Deleted ${documents.length} ${plural}`)
    }
  }
}

// Predefined image URLs (all from Unsplash but using direct URLs)
const IMAGES = {
  tech: [
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=800',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=800',
    'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1200&h=800',
    'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=1200&h=800',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=800',
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=800',
    'https://images.unsplash.com/photo-1503437313881-503a91226402?w=1200&h=800',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=800',
    'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=1200&h=800',
    'https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?w=1200&h=800',
    'https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?w=1200&h=800',
    'https://images.unsplash.com/photo-1527427337751-fdca2f128ce5?w=1200&h=800',
    'https://images.unsplash.com/photo-1550439062-609e1531270e?w=1200&h=800',
    'https://images.unsplash.com/photo-1549692520-acc6669e2f0c?w=1200&h=800',
    'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1200&h=800',
    'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1200&h=800',
    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1200&h=800',
    'https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200&h=800',
    'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=1200&h=800',
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&h=800',
    'https://images.unsplash.com/photo-1531498860502-7c67cf02f657?w=1200&h=800',
    'https://images.unsplash.com/photo-1498758536662-35b82cd15e29?w=1200&h=800',
    'https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=1200&h=800',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=800',
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=800'
  ],
  pages: [
    'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1920&h=1080',
    'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=1920&h=1080',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080',
    'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1920&h=1080',
    'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1920&h=1080',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&h=1080',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=1080',
    'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&h=1080',
    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1920&h=1080',
    'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1920&h=1080'
  ]
}

// Helper function to upload image and get proper Sanity reference
async function uploadImage(imageUrl) {
  const imageResponse = await fetch(imageUrl)
  const arrayBuffer = await imageResponse.arrayBuffer()
  const imageBuffer = Buffer.from(arrayBuffer)
  const imageAsset = await client.assets.upload('image', imageBuffer)
  return imageAsset._id
}

// Generate categories
async function generateCategories() {
  const categoryNames = ['Web Development', 'UX Design', 'Performance', 'Accessibility', 'DevOps']
  const categories = categoryNames.map(name => ({
    _type: 'category',
    title: name,
    slug: {
      _type: 'slug',
      current: faker.helpers.slugify(name).toLowerCase()
    },
    description: faker.lorem.sentence()
  }))
  
  return await Promise.all(categories.map(category => client.create(category)))
}

// Generate tags
async function generateTags() {
  const tagNames = ['JavaScript', 'React', 'Next.js', 'TypeScript', 'CSS', 'HTML', 'Node.js', 'API', 'Testing', 'UI/UX']
  const tags = tagNames.map(name => ({
    _type: 'tag',
    title: name,
    slug: {
      _type: 'slug',
      current: faker.helpers.slugify(name).toLowerCase()
    },
    description: faker.lorem.sentence()
  }))
  
  return await Promise.all(tags.map(tag => client.create(tag)))
}

// Generate profiles
async function generateProfiles() {
  const profiles = []
  const roles = ['Senior Frontend Developer', 'UX Designer', 'Full Stack Developer', 'Technical Architect']
  
  for (let i = 0; i < 4; i++) {
    const firstName = faker.person.firstName()
    const gender = faker.person.sex()
    const lastName = faker.person.lastName()
    // Generate avatar URL using UI Avatars
    const avatarUrl = `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random&size=400`
    const imageId = await uploadImage(avatarUrl)
    const name = {
      firstName: firstName,
      middleName: faker.person.middleName(),
      lastName: lastName
    }
    
    // Add prefix and suffix with 30% chance
    if (Math.random() < 0.3) {
      name.prefix = gender === 'male' ? 
        faker.helpers.arrayElement(['Mr.', 'Dr.', 'Prof.']) : 
        faker.helpers.arrayElement(['Ms.', 'Mrs.', 'Dr.', 'Prof.'])
    }
    if (Math.random() < 0.3) {
      name.suffix = faker.person.suffix()
    }
    
    // Construct title from name components
    const titleParts = []
    if (name.prefix) titleParts.push(name.prefix)
    titleParts.push(name.firstName)
    if (name.middleName) titleParts.push(name.middleName)
    titleParts.push(name.lastName)
    if (name.suffix) titleParts.push(name.suffix)
    
    const profile = {
      _type: 'profile',
      date: faker.date.past(),
      title: titleParts.join(' '),
      name,
      slug: {
        _type: 'slug',
        current: faker.helpers.slugify(`${firstName}-${lastName}`).toLowerCase()
      },
      description: faker.lorem.paragraph(),
      email: faker.internet.email(),
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageId
        },
        caption: 'Profile photo',
        attribution: 'Unsplash'
      },
      sections: [
        {
          _key: faker.string.uuid(),
          heading: 'Bio',
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
            },
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
          heading: 'Education',
          content: [
            {
              _type: 'block',
              style: 'normal',
              _key: faker.string.uuid(),
              markDefs: [],
              children: [
                {
                  _type: 'span',
                  text: `${faker.company.name()} University`,
                  _key: faker.string.uuid(),
                }
              ]
            },
            {
              _type: 'block',
              style: 'normal',
              _key: faker.string.uuid(),
              markDefs: [],
              children: [
                {
                  _type: 'span',
                  text: `Bachelor of ${faker.person.jobArea()}`,
                  _key: faker.string.uuid(),
                }
              ]
            }
          ]
        }
      ],
      socialLinks: [
        {
          _key: faker.string.uuid(),
          label: 'Twitter',
          url: `https://twitter.com/${faker.internet.username()}`
        },
        {
          _key: faker.string.uuid(),
          label: 'GitHub',
          url: `https://github.com/${faker.internet.username()}`
        },
        {
          _key: faker.string.uuid(),
          label: 'LinkedIn',
          url: `https://linkedin.com/in/${faker.internet.username()}`
        }
      ]
    }
    profiles.push(profile)
  }
  
  return await Promise.all(profiles.map(profile => client.create(profile)))
}

// Generate posts
async function generatePosts(profiles, categories, tags) {
  const posts = []
  
  for (let i = 0; i < 25; i++) {
    const imageId = await uploadImage(IMAGES.tech[i % IMAGES.tech.length])
    const post = {
      _type: 'post',
      title: faker.lorem.sentence(),
      slug: {
        _type: 'slug',
        current: faker.helpers.slugify(faker.lorem.sentence()).toLowerCase()
      },
      description: faker.lorem.paragraph(),
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
      body: generateStructuredContent('post'),
      date: faker.date.past()
    }
    posts.push(post)
  }
  
  return await Promise.all(posts.map(post => client.create(post)))
}

// Generate pages
async function generatePages(profiles) {
  const pages = []
  const pageNames = [
    'About Us',
    'Services',
    'Contact',
    'Privacy Policy',
    'Our Team',
    'Case Studies'
  ]
  
  for (let i = 0; i < pageNames.length; i++) {
    const imageId = await uploadImage(IMAGES.pages[i % IMAGES.pages.length])
    const page = {
      _type: 'page',
      date: faker.date.past(),
      title: pageNames[i],
      slug: {
        _type: 'slug',
        current: faker.helpers.slugify(pageNames[i]).toLowerCase()
      },
      description: faker.lorem.paragraph(),
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
          caption: `${pageNames[i]} header image`,
          attribution: 'Unsplash'
        }
      ],
      body: pageNames[i] === 'Privacy Policy' 
        ? generateStructuredContent('privacy')
        : generateStructuredContent('page')
    }
    pages.push(page)
  }
  
  return await Promise.all(pages.map(page => client.create(page)))
}

// Helper function to generate structured content with headers and sections
function generateStructuredContent(type) {
  switch(type) {
    case 'privacy':
      return [
        {
          _type: 'block',
          style: 'normal',
          _key: faker.string.uuid(),
          markDefs: [],
          children: [{ _type: 'span', text: 'Last updated: ' + faker.date.recent().toLocaleDateString(), _key: faker.string.uuid() }]
        },
        {
          _type: 'block',
          style: 'h2',
          _key: faker.string.uuid(),
          markDefs: [],
          children: [{ _type: 'span', text: 'Introduction', _key: faker.string.uuid() }]
        },
        {
          _type: 'block',
          style: 'normal',
          _key: faker.string.uuid(),
          markDefs: [],
          children: [{ _type: 'span', text: 'We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.', _key: faker.string.uuid() }]
        },
        {
          _type: 'block',
          style: 'h2',
          _key: faker.string.uuid(),
          markDefs: [],
          children: [{ _type: 'span', text: 'Information We Collect', _key: faker.string.uuid() }]
        },
        {
          _type: 'block',
          style: 'normal',
          _key: faker.string.uuid(),
          markDefs: [],
          children: [{ _type: 'span', text: 'We may collect, use, store and transfer different kinds of personal data about you including: Identity Data, Contact Data, Technical Data, Usage Data, Marketing and Communications Data.', _key: faker.string.uuid() }]
        },
        {
          _type: 'block',
          style: 'h2',
          _key: faker.string.uuid(),
          markDefs: [],
          children: [{ _type: 'span', text: 'How We Use Your Information', _key: faker.string.uuid() }]
        },
        {
          _type: 'block',
          style: 'normal',
          _key: faker.string.uuid(),
          markDefs: [],
          children: [{ _type: 'span', text: 'We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances: Where we need to perform the contract we are about to enter into or have entered into with you. Where it is necessary for our legitimate interests and your interests and fundamental rights do not override those interests. Where we need to comply with a legal or regulatory obligation.', _key: faker.string.uuid() }]
        },
        {
          _type: 'block',
          style: 'h2',
          _key: faker.string.uuid(),
          markDefs: [],
          children: [{ _type: 'span', text: 'Data Security', _key: faker.string.uuid() }]
        },
        {
          _type: 'block',
          style: 'normal',
          _key: faker.string.uuid(),
          markDefs: [],
          children: [{ _type: 'span', text: 'We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. We limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.', _key: faker.string.uuid() }]
        },
        {
          _type: 'block',
          style: 'h2',
          _key: faker.string.uuid(),
          markDefs: [],
          children: [{ _type: 'span', text: 'Your Legal Rights', _key: faker.string.uuid() }]
        },
        {
          _type: 'block',
          style: 'normal',
          _key: faker.string.uuid(),
          markDefs: [],
          children: [{ _type: 'span', text: 'Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, restriction, transfer, to object to processing, to portability of data and (where the lawful ground of processing is consent) to withdraw consent.', _key: faker.string.uuid() }]
        },
        {
          _type: 'block',
          style: 'h2',
          _key: faker.string.uuid(),
          markDefs: [],
          children: [{ _type: 'span', text: 'Contact Us', _key: faker.string.uuid() }]
        },
        {
          _type: 'block',
          style: 'normal',
          _key: faker.string.uuid(),
          markDefs: [],
          children: [{ _type: 'span', text: 'If you have any questions about this privacy policy or our privacy practices, please contact us. You have the right to make a complaint at any time to the supervisory authority for data protection issues in your jurisdiction.', _key: faker.string.uuid() }]
        }
      ];
    
    case 'post':
      return [
        {
          _type: 'block',
          style: 'h2',
          _key: faker.string.uuid(),
          markDefs: [],
          children: [{ _type: 'span', text: 'Overview', _key: faker.string.uuid() }]
        },
        {
          _type: 'block',
          style: 'normal',
          _key: faker.string.uuid(),
          markDefs: [],
          children: [{ _type: 'span', text: faker.lorem.paragraph(), _key: faker.string.uuid() }]
        },
        {
          _type: 'block',
          style: 'h2',
          _key: faker.string.uuid(),
          markDefs: [],
          children: [{ _type: 'span', text: 'Key Features', _key: faker.string.uuid() }]
        },
        {
          _type: 'block',
          style: 'normal',
          _key: faker.string.uuid(),
          markDefs: [],
          children: [{ _type: 'span', text: faker.lorem.paragraph(), _key: faker.string.uuid() }]
        },
        {
          _type: 'block',
          style: 'h2',
          _key: faker.string.uuid(),
          markDefs: [],
          children: [{ _type: 'span', text: 'Conclusion', _key: faker.string.uuid() }]
        },
        {
          _type: 'block',
          style: 'normal',
          _key: faker.string.uuid(),
          markDefs: [],
          children: [{ _type: 'span', text: faker.lorem.paragraph(), _key: faker.string.uuid() }]
        }
      ];
    
    case 'page':
      // Customize content based on page type
      const titles = {
        'About Us': ['Our Story', 'Our Mission', 'Our Values'],
        'Services': ['What We Do', 'Our Process', 'Why Choose Us'],
        'Contact': ['Get In Touch', 'Office Locations', 'Working Hours'],
        'Our Team': ['Leadership', 'Development Team', 'Design Team'],
        'Case Studies': ['Recent Projects', 'Client Success Stories', 'Results']
      }
      
      const sections = titles[type] || ['Introduction', 'What We Offer', 'Get In Touch']
      
      return [
        {
          _type: 'block',
          style: 'h2',
          _key: faker.string.uuid(),
          markDefs: [],
          children: [{ _type: 'span', text: sections[0], _key: faker.string.uuid() }]
        },
        {
          _type: 'block',
          style: 'normal',
          _key: faker.string.uuid(),
          markDefs: [],
          children: [{ _type: 'span', text: faker.lorem.paragraph(), _key: faker.string.uuid() }]
        },
        {
          _type: 'block',
          style: 'h2',
          _key: faker.string.uuid(),
          markDefs: [],
          children: [{ _type: 'span', text: sections[1], _key: faker.string.uuid() }]
        },
        {
          _type: 'block',
          style: 'normal',
          _key: faker.string.uuid(),
          markDefs: [],
          children: [{ _type: 'span', text: faker.lorem.paragraph(), _key: faker.string.uuid() }]
        },
        {
          _type: 'block',
          style: 'h2',
          _key: faker.string.uuid(),
          markDefs: [],
          children: [{ _type: 'span', text: sections[2], _key: faker.string.uuid() }]
        },
        {
          _type: 'block',
          style: 'normal',
          _key: faker.string.uuid(),
          markDefs: [],
          children: [{ _type: 'span', text: faker.lorem.paragraph(), _key: faker.string.uuid() }]
        }
      ];
    
    default:
      return [];
  }
}

// Main function to run the scaffold
async function scaffold() {
  try {
    console.log('🚀 Starting content scaffolding...')
    
    console.log(`📊 Using dataset: ${client.config().dataset}`)
    
    // Ask for confirmation before deleting
    const { shouldDelete } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'shouldDelete',
        message: 'Do you want to delete all existing content before scaffolding?',
        default: false
      }
    ])
    
    if (shouldDelete) {
      console.log('🗑️  Deleting existing content...')
      await deleteAllContent()
      console.log('✅ Content deletion complete')
    }
    
    console.log('📝 Creating categories...')
    const categories = await generateCategories()
    console.log(`✅ Created ${categories.length} categories`)
    
    console.log('📝 Creating tags...')
    const tags = await generateTags()
    console.log(`✅ Created ${tags.length} tags`)
    
    console.log('📝 Creating profiles...')
    const profiles = await generateProfiles()
    console.log(`✅ Created ${profiles.length} profiles`)
    
    console.log('📝 Creating posts...')
    const posts = await generatePosts(profiles, categories, tags)
    console.log(`✅ Created ${posts.length} posts`)
    
    console.log('📝 Creating pages...')
    const pages = await generatePages(profiles)
    console.log(`✅ Created ${pages.length} pages`)
    
    console.log(' Content scaffolding complete!')
  } catch (error) {
    console.error('❌ Error during scaffolding:', error)
    process.exit(1)
  }
}

scaffold() 