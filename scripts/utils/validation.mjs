import chalk from 'chalk'

export function validateEnvVars(requiredVars) {
  const missing = requiredVars.filter(varName => !process.env[varName])
  
  if (missing.length > 0) {
    console.error(chalk.red('Error: Required environment variables are not set:'))
    console.error(chalk.red(missing.join(', ')))
    console.error(chalk.yellow('Please set these variables in your .env file:'))
    missing.forEach(varName => {
      console.error(chalk.yellow(`${varName}="your-value-here"`))
    })
    console.error(chalk.blue('You can set these by running:'))
    console.error(chalk.blue('yarn lucy env'))
    process.exit(1)
  }
  
  return true
} 