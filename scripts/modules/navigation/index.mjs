import { createSanityClient } from '../../utils/client.mjs'
import { confirmAction } from '../../utils/confirm.mjs'
import { createSpinner, logSuccess, logError, logInfo } from '../../utils/spinner.mjs'

export async function configureNavigation(dataset) {
  let currentSpinner = null
  
  try {
    logInfo('Starting navigation configuration...')
    
    // Create client
    const client = createSanityClient(dataset)
    
    // Check for existing navigation
    currentSpinner = createSpinner('Checking for existing navigation...').start()
    const existingNavigation = await client.fetch('count(*[_type == "navigation"])')
    currentSpinner.stop()
    
    // Only ask about deletion if navigation exists
    if (existingNavigation > 0) {
      logInfo(`\nFound ${existingNavigation} existing navigation items`)
      
      const shouldDelete = await confirmAction('Do you want to delete existing navigation before creating new ones?', false)
      
      if (shouldDelete) {
        currentSpinner = createSpinner('Deleting existing navigation...').start()
        await client.delete({ query: '*[_type == "navigation"]' })
        currentSpinner.succeed('Deleted existing navigation')
      } else {
        logInfo('Keeping existing navigation')
        return
      }
    }
    
    // Create navigation
    currentSpinner = createSpinner('Creating navigation...').start()
    
    try {
      // Get pages for navigation
      const pages = await client.fetch(`*[_type == "page"]{ _id, title, slug }`)
      
      // Create main navigation
      const mainNav = {
        _type: 'navigation',
        title: 'Main Navigation',
        items: pages.map(page => ({
          _type: 'navigationItem',
          _key: page.slug.current,
          label: page.title,
          link: {
            _type: 'reference',
            _weak: true,
            _ref: page._id
          }
        }))
      }
      
      await client.create(mainNav)
      currentSpinner.succeed('Created navigation')
      logSuccess('Navigation configuration complete!')
    } catch (error) {
      throw new Error(`Failed to create navigation: ${error.message}`)
    }
  } catch (error) {
    if (currentSpinner) {
      currentSpinner.fail()
    }
    logError('Navigation Configuration Error:')
    logError(error.message)
    if (error.cause) {
      logError('Caused by:', error.cause)
    }
    throw new Error('Navigation configuration failed')
  }
} 