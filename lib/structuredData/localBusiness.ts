import { SanityAsset } from "@sanity/image-url/lib/types/types";

export type LocalBusiness = {
  type: string;
  title: string;
  description: string;
  url: string;
  images: SanityAsset[];
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  country: string;
}
export function createLocalBusiness(business:LocalBusiness) {
  const businessData:any = {
    "@context": "https://schema.org",
    "@type": business.type,
    name: "Enenstein Pham Glass & Rabbat",
    address: {
      "@type": "businessalAddress",
      streetAddress: `${business.address1} ${business.address2}`,
      addressLocality: business.city,
      addressRegion: business.state,
      businessalCode: business.zip,
      addressCountry: business.country,
    },
    image: [],
    url: "https://www.epgrlawyers.com",
    telephone: business.phone,
  }
  if(business.images){
    businessData.image = business.images.map( (image) => image.asset.url )
  }
  return business
}

// AnimalShelter
// ArchiveOrganization
// AutomotiveBusiness
// ChildCare
// Dentist
// DryCleaningOrLaundry
// EmergencyService
// EmploymentAgency
// EntertainmentBusiness
// FinancialService
// FoodEstablishment
// GovernmentOffice
// HealthAndBeautyBusiness
// HomeAndConstructionBusiness
// InternetCafe
// LegalService
// Library
// LodgingBusiness
// MedicalBusiness
// ProfessionalService
// RadioStation
// RealEstateAgent
// RecyclingCenter
// SelfStorage
// ShoppingCenter
// SportsActivityLocation
// Store
// TelevisionStation
// TouristInformationCenter
// TravelAgency