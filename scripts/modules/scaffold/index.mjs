import { createSanityClient } from '../../utils/client.mjs'
import { confirmAction } from '../../utils/confirm.mjs'
import { createSpinner, logSuccess, logError, logInfo } from '../../utils/spinner.mjs'
import { generateCategories } from './categories.mjs'
import { generateTags } from './tags.mjs'
import { generateProfiles } from './profiles.mjs'
import { generatePosts } from './posts.mjs'

export async function scaffoldContent(dataset) {
  let currentSpinner = createSpinner('Preparing to scaffold content...').start()
  
  try {
    // Create client
    const client = createSanityClient(dataset)
    
    // Check for existing content
    currentSpinner.text = 'Checking for existing content...'
    const [categoryCount, tagCount, profileCount, postCount] = await Promise.all([
      client.fetch('count(*[_type == "category"])'),
      client.fetch('count(*[_type == "tag"])'),
      client.fetch('count(*[_type == "profile"])'),
      client.fetch('count(*[_type == "post"])')
    ])
    
    const hasContent = categoryCount > 0 || tagCount > 0 || profileCount > 0 || postCount > 0
    
    // Only ask about deletion if content exists
    if (hasContent) {
      currentSpinner.stop()
      logInfo('Found existing content:')
      if (categoryCount > 0) logInfo(`- ${categoryCount} categories`)
      if (tagCount > 0) logInfo(`- ${tagCount} tags`)
      if (profileCount > 0) logInfo(`- ${profileCount} profiles`)
      if (postCount > 0) logInfo(`- ${postCount} posts`)
      
      const shouldDelete = await confirmAction('Do you want to delete all existing content before scaffolding?', false)
      
      if (shouldDelete) {
        currentSpinner = createSpinner('Deleting existing content...').start()
        await Promise.all([
          client.delete({ query: '*[_type == "category"]' }),
          client.delete({ query: '*[_type == "tag"]' }),
          client.delete({ query: '*[_type == "profile"]' }),
          client.delete({ query: '*[_type == "post"]' })
        ])
        currentSpinner.succeed('Deleted existing content')
      } else {
        return
      }
    }
    
    // Generate content
    currentSpinner.text = 'Generating content...'
    
    try {
      const generatedProfiles = await generateProfiles(client)
      const generatedCategories = await generateCategories(client)
      const generatedTags = await generateTags(client)
      await generatePosts(client, generatedProfiles, generatedCategories, generatedTags)
      
      currentSpinner.succeed('Content generation complete')
      logSuccess('Content scaffolding complete!')
    } catch (error) {
      throw new Error(`Failed to generate content: ${error.message}`)
    }
  } catch (error) {
    if (currentSpinner) {
      currentSpinner.fail()
    }
    logError('Content Scaffolding Error:')
    logError(error.message)
    if (error.cause) {
      logError('Caused by:', error.cause)
    }
    throw new Error('Content scaffolding failed')
  }
} 