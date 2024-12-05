import { select } from "@inquirer/prompts";
import { execSync } from "child_process";
import chalk from "chalk";
import ora from "ora";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), '.env') });

// Validate required environment variables
if (!process.env.SANITY_STUDIO_PROJECT_ID || !process.env.SANITY_STUDIO_DEV_SUBDOMAIN || !process.env.SANITY_STUDIO_PROD_SUBDOMAIN) {
  console.error(chalk.red('Error: Required environment variables are not set in .env'));
  process.exit(1);
}

async function deployStudio() {
  const spinner = ora("Preparing to deploy Sanity Studio").start();
  spinner.stop();

  try {
    // Get environment choice
    const environment = await select({
      message: "Select deployment environment:",
      choices: [
        { value: "production", label: "Production", description: "Deploy to production environment" },
        { value: "development", label: "Development", description: "Deploy to development environment" }
      ],
      default: "development"
    });

    // Get subdomain based on environment
    const subdomain = environment === 'production' 
      ? process.env.SANITY_STUDIO_PROD_SUBDOMAIN 
      : process.env.SANITY_STUDIO_DEV_SUBDOMAIN;

    spinner.start(`Deploying Sanity Studio to ${environment} environment...`);

    try {
      // Store original NODE_ENV
      const originalNodeEnv = process.env.NODE_ENV;

      // Set new NODE_ENV
      process.env.NODE_ENV = environment;

      // Execute sanity deploy command
      execSync(`npx sanity deploy --project=${process.env.SANITY_STUDIO_PROJECT_ID} --dataset=${environment}`, {
        stdio: 'inherit',
        env: { 
          ...process.env, 
          NODE_ENV: environment,
          SANITY_STUDIO_DATASET: environment
        }
      });

      // Restore original NODE_ENV
      process.env.NODE_ENV = originalNodeEnv;

      spinner.succeed(chalk.green(`Successfully deployed Sanity Studio to ${chalk.bold(environment)} environment!`));
      console.log(chalk.blue(`\nYour studio is now deployed to https://${subdomain}.sanity.studio/`));
    } catch (error) {
      throw new Error(`Failed to deploy: ${error.message}`);
    }

  } catch (error) {
    spinner.fail(chalk.red("Deployment failed"));
    console.error(chalk.red(`\nError: ${error.message}`));
    process.exit(1);
  }
}

deployStudio();