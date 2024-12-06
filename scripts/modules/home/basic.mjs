import inquirer from 'inquirer'

export async function getBasicInformation() {
  const basicInfo = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter home page title:',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Enter home page description:',
    }
  ])

  return {
    title: basicInfo.title || undefined,
    description: basicInfo.description || undefined
  }
} 