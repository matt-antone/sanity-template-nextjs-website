import { createClient } from '@sanity/client'
import { faker } from '@faker-js/faker'
import dotenv from 'dotenv'
import inquirer from 'inquirer'

dotenv.config()

// Get dataset choice from user
async function getDatasetChoice() {
  const { dataset } = await inquirer.prompt([
    {
      type: 'list',
      name: 'dataset',
      message: 'Which dataset would you like to configure navigation for?',
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

// Delete existing navigation
async function deleteNavigation() {
  const query = `*[_type == "navigation"]`
  const documents = await client.fetch(query)
  
  if (documents.length > 0) {
    console.log(`🗑️  Deleting existing navigation...`)
    await Promise.all(documents.map(doc => client.delete(doc._id)))
    console.log(`✅ Deleted existing navigation`)
  }
}

// Generate navigation items
async function generateNavigationItems() {
  // Fetch all pages from Sanity
  const query = `*[_type == "page"] {
    title,
    "slug": slug.current
  }`
  const pages = await client.fetch(query)
  
  // Convert pages to navigation items, excluding privacy policy
  const pageLinks = pages
    .filter(page => page.slug !== 'privacy-policy')
    .map(page => ({
      text: page.title,
      url: `/${page.slug}`
    }))
  
  const possibleLinks = [
    ...pageLinks
  ]
  
  // Randomly select 4 items
  const selectedLinks = faker.helpers.shuffle(possibleLinks).slice(0, 4)
  
  return selectedLinks.map(link => ({
    _key: faker.string.uuid(),
    _type: 'navItem',
    text: link.text,
    navigationItemUrl: link.url
  }))
}

// Generate navigation records
async function generateNavigation() {
  // Generate shared navigation items
  const mainItems = await generateNavigationItems()

  // Add Posts link at the end
  const postsLink = {
    _key: faker.string.uuid(),
    _type: 'navItem',
    text: 'Posts',
    navigationItemUrl: '/posts'
  }
  mainItems.push(postsLink)

  // Main Navigation
  const mainNavigation = {
    _type: 'navigation',
    title: 'Main Navigation',
    slug: {
      _type: 'slug',
      current: 'main-navigation'
    },
    items: mainItems
  }

  // Mobile Navigation (same items as main)
  const mobileNavigation = {
    _type: 'navigation',
    title: 'Mobile Navigation',
    slug: {
      _type: 'slug',
      current: 'mobile-navigation'
    },
    items: mainItems
  }

  // Footer Navigation (only privacy policy)
  const footerNavigation = {
    _type: 'navigation',
    title: 'Footer Navigation',
    slug: {
      _type: 'slug',
      current: 'footer-navigation'
    },
    items: [
      {
        _key: faker.string.uuid(),
        _type: 'navItem',
        text: 'Privacy Policy',
        navigationItemUrl: '/privacy-policy'
      }
    ]
  }

  return [mainNavigation, mobileNavigation, footerNavigation]
}

// Main function
async function main() {
  try {
    console.log('🚀 Starting navigation configuration...')
    
    console.log(`📊 Using dataset: ${client.config().dataset}`)
    
    // Ask for confirmation before deleting
    const { shouldDelete } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'shouldDelete',
        message: 'Do you want to delete existing navigation before creating new ones?',
        default: false
      }
    ])
    
    if (shouldDelete) {
      await deleteNavigation()
    }
    
    console.log('📝 Creating navigation...')
    const navigations = await generateNavigation()
    await Promise.all(navigations.map(nav => client.create(nav)))
    console.log('✅ Created navigation menus')
    
    console.log('🎉 Navigation configuration complete!')
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

main() 