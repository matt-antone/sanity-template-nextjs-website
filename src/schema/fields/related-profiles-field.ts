export const relatedProfiles = {
  name: 'relatedProfiles',
  title: 'Related Profiles',
  type: 'array',
  of: [{
    type: 'reference',
    weak: true,
    to: [{type: 'profile'}]
  }],
  description: 'Select related profiles.'
}