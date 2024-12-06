import { select } from "@inquirer/prompts"

export async function getEnvironmentConfig() {
  const environment = await select({
    message: "Select deployment environment:",
    choices: [
      { value: "production", label: "Production", description: "Deploy to production environment" },
      { value: "development", label: "Development", description: "Deploy to development environment" }
    ],
    default: "development"
  })

  const subdomain = environment === 'production' 
    ? process.env.SANITY_STUDIO_PROD_SUBDOMAIN 
    : process.env.SANITY_STUDIO_DEV_SUBDOMAIN

  return { environment, subdomain }
} 