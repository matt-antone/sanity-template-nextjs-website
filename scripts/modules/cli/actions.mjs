import { logSuccess, logError, logInfo } from '../../utils/spinner.mjs'
import { getDatasetChoice } from '../../utils/dataset.mjs'
import { runWithDataset } from './utils.mjs'
import { setupEnvironment } from '../env-setup/index.mjs'
import { validateEnvVars } from '../../utils/validation.mjs'
import dotenv from 'dotenv'

export const setupChoices = [
  { name: 'Initialize Website', value: 'complete' },
  // { name: 'Initialize environment variables', value: 'env' },
  // { name: 'Create dataset', value: 'create-dataset' },
  { name: 'Change dataset', value: 'change-dataset' },
  { name: 'Migrate content between datasets', value: 'migrate' },
  { name: 'Deploy Sanity Studio', value: 'deploy' },
  // { name: 'Configure site settings', value: 'settings' },
  // { name: 'Configure home page', value: 'home' },
  // { name: 'Configure navigation', value: 'navigation' },
  // { name: 'Scaffold sample content', value: 'scaffold' }
]

export async function handleSetupChoice(action, dataset) {
  switch (action) {
    case 'complete':
      logInfo('Running complete setup...')
      
      const { configureSettings } = await import('../settings/index.mjs')
      const { configureHome } = await import('../home/index.mjs')
      const { scaffoldContent } = await import('../scaffold/index.mjs')
      const { configureNavigation } = await import('../navigation/index.mjs')
      
      // Run setup steps in sequence  - navigation should always be last
      await configureSettings(dataset)
      await configureHome(dataset)
      const { confirmAction } = await import('../../utils/confirm.mjs')
      const shouldScaffold = await confirmAction('Do you want to scaffold sample content and navigation?', false)
      if (shouldScaffold) {
        await scaffoldContent(dataset)
        await configureNavigation(dataset)
      }
      
      logSuccess('Complete setup finished!')
      break
      
    case 'env':
      await setupEnvironment()
      break
      
    case 'deploy':
      const { deployStudio } = await import('../deploy-studio/index.mjs')
      await deployStudio()
      break
      
    case 'migrate':
      const { migrateContent } = await import('../migrate/index.mjs')
      await migrateContent()
      break
      
    case 'settings':
      const { configureSettings: settings } = await import('../settings/index.mjs')
      await settings(dataset)
      break
      
    case 'home':
      const { configureHome: home } = await import('../home/index.mjs')
      await home(dataset)
      break
      
    case 'navigation':
      const { configureNavigation: nav } = await import('../navigation/index.mjs')
      await nav(dataset)
      break
      
    case 'scaffold':
      const { scaffoldContent: scaffold } = await import('../scaffold/index.mjs')
      await scaffold(dataset)
      break
      
    case 'create-dataset':
      const { createDataset } = await import('../dataset/index.mjs')
      await createDataset()
      break
      
    case 'change-dataset':
      const { changeDataset } = await import('../dataset/change.mjs')
      await changeDataset()
      break
  }
}

async function handleDatasetAction(action) {
  const dataset = await getDatasetChoice('Select dataset to work with:')
  
  switch (action) {
    case 'settings':
      const { configureSettings } = await import('../settings/index.mjs')
      await configureSettings(dataset)
      break
      
    case 'home':
      const { configureHome } = await import('../home/index.mjs')
      await configureHome(dataset)
      break
      
    case 'navigation':
      const { configureNavigation } = await import('../navigation/index.mjs')
      await configureNavigation(dataset)
      break
      
    case 'scaffold':
      const { scaffoldContent } = await import('../scaffold/index.mjs')
      await scaffoldContent(dataset)
      break
  }
}

async function handleCompleteSetup() {
  logInfo('Running complete setup...')
  
  // const { setupEnvironment } = await import('../env-setup/index.mjs')
  // await setupEnvironment()
  
  const dataset = await getDatasetChoice('Select dataset for content setup:')
  
  const { configureSettings } = await import('../settings/index.mjs')
  const { configureHome } = await import('../home/index.mjs')
  const { configureNavigation } = await import('../navigation/index.mjs')
  const { scaffoldContent } = await import('../scaffold/index.mjs')
  
  await configureSettings(dataset)
  await configureHome(dataset)
  await scaffoldContent(dataset)
  await configureNavigation(dataset)
  
  logSuccess('Complete setup finished!')
}

export function registerStandaloneCommands(program) {
  program
    .command('env')
    .description('Initialize environment variables')
    .action(async () => {
      try {
        const { setupEnvironment } = await import('../env-setup/index.mjs')
        await setupEnvironment()
      } catch (error) {
        logError('Failed to initialize environment:', error)
        process.exit(1)
      }
    })

  program
    .command('deploy')
    .description('Deploy Sanity Studio')
    .action(async () => {
      try {
        const { deployStudio } = await import('../deploy-studio/index.mjs')
        await deployStudio()
      } catch (error) {
        logError('Failed to deploy studio:', error)
        process.exit(1)
      }
    })

  program
    .command('migrate')
    .description('Migrate content between datasets')
    .action(async () => {
      try {
        const { migrateContent } = await import('../migrate/index.mjs')
        await migrateContent()
      } catch (error) {
        logError('Failed to migrate content:', error)
        process.exit(1)
      }
    })
}

export function registerDatasetCommands(program) {
  const datasetCommands = [
    {
      command: 'settings',
      description: 'Configure site settings',
      action: async (dataset) => {
        const { configureSettings } = await import('../settings/index.mjs')
        await configureSettings(dataset)
      }
    },
    {
      command: 'home',
      description: 'Configure home page',
      action: async (dataset) => {
        const { configureHome } = await import('../home/index.mjs')
        await configureHome(dataset)
      }
    },
    {
      command: 'navigation',
      description: 'Configure navigation menus',
      action: async (dataset) => {
        const { configureNavigation } = await import('../navigation/index.mjs')
        await configureNavigation(dataset)
      }
    },
    {
      command: 'scaffold',
      description: 'Scaffold sample content',
      action: async (dataset) => {
        const { scaffoldContent } = await import('../scaffold/index.mjs')
        await scaffoldContent(dataset)
      }
    }
  ]

  datasetCommands.forEach(({ command, description, action }) => {
    program
      .command(command)
      .description(description)
      .action(() => runWithDataset(action))
  })
} 