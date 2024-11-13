export const getStructuredPerson = async (person: any, section?: string) => {
  // get profile from sanity type profile
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.title,
    url: section
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/${section}/${person.slug.current}`
      : `${process.env.NEXT_PUBLIC_BASE_URL}/${person?.slug?.current}`,
    sameAs: person.sameAs,
  };
};
