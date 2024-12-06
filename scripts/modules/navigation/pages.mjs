import { createSpinner } from '../../utils/spinner.mjs'

export async function fetchPages(client) {
  const spinner = createSpinner('Fetching available pages...').start()
  try {
    const query = `*[_type == "page"] {
      title,
      "slug": slug.current
    }`
    const pages = await client.fetch(query)
    spinner.succeed()
    return pages
  } catch (error) {
    spinner.fail()
    throw error
  }
} 