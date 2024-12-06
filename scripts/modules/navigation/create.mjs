import { createSpinner, logSuccess } from '../../utils/spinner.mjs'

export async function createNavigationMenus(client, navigations) {
  const spinner = createSpinner('Creating navigation menus...').start()
  try {
    await Promise.all(navigations.map(nav => client.create(nav)))
    spinner.succeed()
    logSuccess('Created navigation menus')
  } catch (error) {
    spinner.fail()
    throw error
  }
} 