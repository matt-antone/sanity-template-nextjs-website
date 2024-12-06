import { Command } from 'commander'
import { setupCommands } from './commands.mjs'

export async function runCLI() {
  const program = new Command()

  program
    .name('sanity-cli')
    .description('CLI to manage Sanity Studio deployment and content')
    .version('1.0.0')

  await setupCommands(program)
  program.parse(process.argv)
} 