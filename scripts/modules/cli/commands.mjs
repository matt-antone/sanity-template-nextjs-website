import { setupWizard } from './setup.mjs'
import { registerDatasetCommands, registerStandaloneCommands } from './actions.mjs'

export async function setupCommands(program) {
  // Setup wizard command
  program
    .command('setup')
    .description('Interactive setup wizard')
    .action(setupWizard)

  // Register standalone commands (env, deploy)
  registerStandaloneCommands(program)

  // Register dataset-specific commands (settings, home, navigation, scaffold)
  registerDatasetCommands(program)
} 