import inquirer from 'inquirer'

const questions = [
  {
    type: 'input',
    name: "NEXT_PUBLIC_SANITY_PROJECT_ID",
    message: "Enter your Sanity Project ID:",
    validate: (input) => input.length > 0 || "Project ID is required",
  },
  {
    type: 'input',
    name: "NEXT_PUBLIC_SANITY_DATASET",
    message: "Enter your Sanity Dataset name:",
    default: "production",
  },
  {
    type: 'input',
    name: "SANITY_API_READ_TOKEN",
    message: "Enter your Sanity Read Token:",
    validate: (input) => input.length > 0 || "Read token is required",
  },
  {
    type: 'input',
    name: "SANITY_API_WRITE_TOKEN",
    message: "Enter your Sanity Write Token:",
    validate: (input) => input.length > 0 || "Write token is required",
  },
  {
    type: 'input',
    name: "SANITY_STUDIO_DEV_SUBDOMAIN",
    message: "Enter your Sanity Studio development subdomain:",
  },
  {
    type: 'input',
    name: "SANITY_STUDIO_PROD_SUBDOMAIN",
    message: "Enter your Sanity Studio production subdomain:",
  },
  {
    type: 'input',
    name: "NEXT_PUBLIC_NAME",
    message: "Enter your site name:",
    default: "Sanity Blog",
  },
  {
    type: 'input',
    name: "VERCEL_PRODUCTION_URL",
    message: "Enter your development URL:",
    default: "https://localhost:3000",
  },
  {
    type: 'input',
    name: "NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID",
    message: "Enter your Google Analytics Measurement ID (optional):",
  },
]

export async function getEnvironmentVariables() {
  return inquirer.prompt(questions)
} 