import { promises as fs } from "fs"
import path from "path"

export async function generateEnvFile(answers) {
  const envContent = Object.entries(answers)
    .map(([key, value]) => `${key}="${value}"`)
    .join("\n")

  const fullEnvContent = `# SANITY TOKENS
${envContent}
#SANITY STUDIO
SANITY_STUDIO_DATASET="${answers.NEXT_PUBLIC_SANITY_DATASET}"
SANITY_STUDIO_PROJECT_ID="${answers.NEXT_PUBLIC_SANITY_PROJECT_ID}"
`

  const envFilePath = path.join(process.cwd(), ".env")
  await fs.writeFile(envFilePath, fullEnvContent)
  
  return fullEnvContent
} 