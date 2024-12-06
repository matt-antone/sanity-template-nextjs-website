import { createSanityClient } from '../../utils/client.mjs'
import { confirmAction } from '../../utils/confirm.mjs'
import { createSpinner, logSuccess, logError, logInfo } from '../../utils/spinner.mjs'

export async function configureHome(dataset) {
  let currentSpinner = null
  
  try {
    logInfo('\nStarting home page configuration...')
    
    // Create client
    const client = createSanityClient(dataset)
    
    // Check for existing home page
    currentSpinner = createSpinner('Checking for existing home page...').start()
    const existingHome = await client.fetch(`*[_type == "home"][0]`)
    currentSpinner.stop()
    
    // Only ask about deletion if home page exists
    if (existingHome) {
      const shouldDelete = await confirmAction('Do you want to delete existing home page before creating a new one?', false)
      
      if (shouldDelete) {
        currentSpinner = createSpinner('Deleting existing home page...').start()
        await client.delete(existingHome._id)
        currentSpinner.succeed('Deleted existing home page')
      } else {
        logInfo('Keeping existing home page')
        return
      }
    }
    
    // Create home page
    currentSpinner = createSpinner('Creating home page...').start()
    
    try {
      const home = {
        _type: 'home',
        title: 'Home',
        heading: 'Welcome to Our Website',
        subheading: 'Discover our latest content and updates',
        content: [
          {
            _type: 'block',
            style: 'normal',
            children: [
              {
                _type: 'span',
                text: 'Welcome to our website. Here you can find the latest updates and content.'
              }
            ]
          }
        ]
      }
      
      await client.create(home)
      currentSpinner.succeed('Created home page')
      logSuccess('Home page configuration complete!')
    } catch (error) {
      throw new Error(`Failed to create home page: ${error.message}`)
    }
  } catch (error) {
    if (currentSpinner) {
      currentSpinner.fail()
    }
    logError('\nHome Page Configuration Error:')
    logError(error.message)
    if (error.cause) {
      logError('Caused by:', error.cause)
    }
    throw new Error('Home page configuration failed')
  }
} 