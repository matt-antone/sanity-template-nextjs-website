import { faker } from '@faker-js/faker'

function generateNavigationItems(pages) {
  // Convert pages to navigation items, excluding privacy policy
  const pageLinks = pages
    .filter(page => page.slug !== 'privacy-policy')
    .map(page => ({
      text: page.title,
      url: `/${page.slug}`
    }))
  
  const possibleLinks = [...pageLinks]
  
  // Randomly select 4 items
  const selectedLinks = faker.helpers.shuffle(possibleLinks).slice(0, 4)
  
  return selectedLinks.map(link => ({
    _key: faker.string.uuid(),
    _type: 'navItem',
    text: link.text,
    navigationItemUrl: link.url
  }))
}

export async function generateNavigation(pages) {
  // Generate shared navigation items
  const mainItems = generateNavigationItems(pages)

  // Add Posts link at the end
  const postsLink = {
    _key: faker.string.uuid(),
    _type: 'navItem',
    text: 'Posts',
    navigationItemUrl: '/posts'
  }
  mainItems.push(postsLink)

  // Main Navigation
  const mainNavigation = {
    _type: 'navigation',
    title: 'Main Navigation',
    slug: {
      _type: 'slug',
      current: 'main-navigation'
    },
    items: mainItems
  }

  // Mobile Navigation (same items as main)
  const mobileNavigation = {
    _type: 'navigation',
    title: 'Mobile Navigation',
    slug: {
      _type: 'slug',
      current: 'mobile-navigation'
    },
    items: mainItems
  }

  // Footer Navigation (only privacy policy)
  const footerNavigation = {
    _type: 'navigation',
    title: 'Footer Navigation',
    slug: {
      _type: 'slug',
      current: 'footer-navigation'
    },
    items: [
      {
        _key: faker.string.uuid(),
        _type: 'navItem',
        text: 'Privacy Policy',
        navigationItemUrl: '/privacy-policy'
      }
    ]
  }

  return [mainNavigation, mobileNavigation, footerNavigation]
} 