export const getStructuredPerson = async (person: any, section?: string) => {
  // get profile from sanity type profile
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.title,
    url: section
      ? `${process.env.VERCEL_PRODUCTION_URL}/${section}/${person.slug.current}`
      : `${process.env.VERCEL_PRODUCTION_URL}/${person?.slug?.current}`,
    sameAs: person.sameAs,
  };
};
