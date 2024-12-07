import { confirm } from '@inquirer/prompts'

export async function confirmAction(message, defaultValue = false) {
  try {
    const result = await confirm({
      message,
      default: defaultValue,
      // Add these options to better handle interrupts
      prefix: '',
      waitForAnswer: true
    })
    return result
  } catch (error) {
    if (error.name === 'ExitPromptError') {
      // Gracefully handle the interrupt
      return false
    }
    throw error
  }
} 