import { faker } from '@faker-js/faker'

const PAGE_SECTIONS = {
  'About Us': ['Our Story', 'Our Mission', 'Our Values'],
  'Services': ['What We Do', 'Our Process', 'Why Choose Us'],
  'Contact': ['Get In Touch', 'Office Locations', 'Working Hours'],
  'Our Team': ['Leadership', 'Development Team', 'Design Team'],
  'Case Studies': ['Recent Projects', 'Client Success Stories', 'Results']
}

function generateBlock(text, style = 'normal') {
  try {
    if (!text) {
      throw new Error('Text content is required')
    }
    
    return {
      _type: 'block',
      style,
      _key: faker.string.uuid(),
      markDefs: [],
      children: [
        {
          _type: 'span',
          text,
          _key: faker.string.uuid(),
        }
      ]
    }
  } catch (error) {
    throw new Error(`Failed to generate content block: ${error.message}`)
  }
}

export function generateStructuredContent(type, pageTitle = '') {
  try {
    switch(type) {
      case 'privacy': {
        try {
          return [
            generateBlock('Last updated: ' + faker.date.recent().toLocaleDateString()),
            generateBlock('Privacy Policy', 'h1'),
            generateBlock(faker.lorem.paragraphs(2)),
            generateBlock('Information We Collect', 'h2'),
            generateBlock(faker.lorem.paragraphs(2)),
            generateBlock('How We Use Your Information', 'h2'),
            generateBlock(faker.lorem.paragraphs(2)),
            generateBlock('Data Security', 'h2'),
            generateBlock(faker.lorem.paragraphs(2)),
            generateBlock('Your Rights', 'h2'),
            generateBlock(faker.lorem.paragraphs(2)),
            generateBlock('Contact Us', 'h2'),
            generateBlock(faker.lorem.paragraphs(1))
          ]
        } catch (error) {
          throw new Error(`Failed to generate privacy policy content: ${error.message}`)
        }
      }
      
      case 'post': {
        try {
          return [
            generateBlock('Overview', 'h2'),
            generateBlock(faker.lorem.paragraphs(1)),
            generateBlock('Key Points', 'h2'),
            generateBlock(faker.lorem.paragraphs(2)),
            generateBlock('Technical Details', 'h2'),
            generateBlock(faker.lorem.paragraphs(2)),
            generateBlock('Implementation', 'h2'),
            generateBlock(faker.lorem.paragraphs(2)),
            generateBlock('Conclusion', 'h2'),
            generateBlock(faker.lorem.paragraphs(1))
          ]
        } catch (error) {
          throw new Error(`Failed to generate post content: ${error.message}`)
        }
      }
      
      case 'page': {
        try {
          if (!pageTitle) {
            throw new Error('Page title is required for page content generation')
          }
          
          const sections = PAGE_SECTIONS[pageTitle] || ['Introduction', 'What We Offer', 'Get In Touch']
          
          return sections.reduce((content, section) => {
            try {
              content.push(
                generateBlock(section, 'h2'),
                generateBlock(faker.lorem.paragraphs(2))
              )
              return content
            } catch (error) {
              throw new Error(`Failed to generate section "${section}": ${error.message}`)
            }
          }, [])
        } catch (error) {
          throw new Error(`Failed to generate page content for "${pageTitle}": ${error.message}`)
        }
      }
      
      default:
        try {
          return [generateBlock(faker.lorem.paragraphs(3))]
        } catch (error) {
          throw new Error(`Failed to generate default content: ${error.message}`)
        }
    }
  } catch (error) {
    throw new Error(`Content generation failed for type "${type}": ${error.message}`)
  }
} 