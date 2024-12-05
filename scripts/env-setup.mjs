import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { input } from "@inquirer/prompts";
import chalk from "chalk";
import ora from "ora";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const questions = [
  {
    type: "input",
    name: "NEXT_PUBLIC_SANITY_PROJECT_ID",
    message: "Enter your Sanity Project ID:",
    validate: (input) => input.length > 0 || "Project ID is required",
  },
  {
    type: "input",
    name: "NEXT_PUBLIC_SANITY_DATASET",
    message: "Enter your Sanity Dataset name:",
    default: "production",
  },
  {
    type: "input",
    name: "SANITY_API_READ_TOKEN",
    message: "Enter your Sanity Read Token:",
    validate: (input) => input.length > 0 || "Read token is required",
  },
  {
    type: "input",
    name: "SANITY_API_WRITE_TOKEN",
    message: "Enter your Sanity Write Token:",
    validate: (input) => input.length > 0 || "Write token is required",
  },
  {
    type: "input",
    name: "NEXT_PUBLIC_NAME",
    message: "Enter your site name:",
    default: "Sanity Blog",
  },
  {
    type: "input",
    name: "VERCEL_PRODUCTION_URL",
    message: "Enter your development URL:",
    default: "https://localhost:3000",
  },
  {
    type: "input",
    name: "NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID",
    message: "Enter your Google Analytics Measurement ID (optional):",
  },
  {
    type: "input",
    name: "SANITY_STUDIO_DEV_SUBDOMAIN",
    message: "Enter your Sanity Studio development subdomain:",
  },
  {
    type: "input",
    name: "SANITY_STUDIO_PROD_SUBDOMAIN",
    message: "Enter your Sanity Studio production subdomain:",
  },
];

async function generateEnvFile() {
  const spinner = ora("Setting up environment variables").start();

  spinner.stop();

  try {
    const answers = {};
    for (const question of questions) {
      answers[question.name] = await input({
        message: question.message,
        default: question.default,
        validate: question.validate,
      });
    }

    spinner.start();

    const envContent = Object.entries(answers)
      .map(([key, value]) => `${key}="${value}"`)
      .join("\n");

    const envFilePath = path.join(process.cwd(), ".env");

    const fullEnvContent = `# SANITY TOKENS
${envContent}
#SANITY STUDIO
SANITY_STUDIO_DATASET="${answers.NEXT_PUBLIC_SANITY_DATASET}"
SANITY_STUDIO_PROJECT_ID="${answers.NEXT_PUBLIC_SANITY_PROJECT_ID}"
`;

    await fs.writeFile(envFilePath, fullEnvContent);

    spinner.succeed(chalk.green("Environment variables set up successfully!"));
    console.log(
      chalk.blue("\nCreated .env file with the following variables:")
    );
    console.log(chalk.gray(fullEnvContent));
  } catch (error) {
    spinner.fail(chalk.red("Error setting up environment variables"));
    console.error(error);
    process.exit(1);
  }
}

generateEnvFile(); 