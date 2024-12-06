import ora from 'ora'
import chalk from 'chalk'

export function createSpinner(text) {
  return ora(text)
}

export function logSuccess(message) {
  console.log(chalk.green(`✅ ${message}`))
}

export function logError(message) {
  console.error(chalk.red(`❌ ${message}`))
}

export function logInfo(message) {
  console.log(chalk.blue(`ℹ️ ${message}`))
} 