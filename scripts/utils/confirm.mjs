import { confirm } from '@inquirer/prompts'

export async function confirmAction(message, defaultValue = false) {
  try {
    console.log('Starting confirm prompt:', message)  // Debug log
    const result = await confirm({
      message,
      default: defaultValue,
      // Add these options to better handle interrupts
      prefix: '',
      waitForAnswer: true
    })
    console.log('Confirm prompt result:', result)  // Debug log
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