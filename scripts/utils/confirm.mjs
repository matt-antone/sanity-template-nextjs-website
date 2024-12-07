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
    console.log('Confirm prompt error:', error.name)  // Debug log
    if (error.name === 'ExitPromptError') {
      // Gracefully handle the interrupt
      console.log('Prompt interrupted')  // Debug log
      return false
    }
    throw error
  }
} 