// Real, unaltered photos (crop and resize only). Grouped like the galleries on
// robertfortrustee.ca. Add "schools" photos only with YRDSB-compliant consent and
// no identifiable students.

export type PhotoCategory = "schools" | "governments" | "community";

export interface CommunityPhoto {
  src: string;
  alt: string;
  category: PhotoCategory;
}

export const PHOTO_CATEGORIES: { id: PhotoCategory; title: string }[] = [
  { id: "schools", title: "In Our Schools" },
  { id: "governments", title: "Working Across Governments" },
  { id: "community", title: "In the Community" },
];

export const COMMUNITY_PHOTOS: CommunityPhoto[] = [
  {
    src: "/images/community/dorit-michelle-cooper.jpg",
    alt: "Dorit on stage with MPP Michelle Cooper at the Volunteer Service Awards",
    category: "governments",
  },
  {
    src: "/images/community/dorit-del-duca.jpg",
    alt: "Dorit with Vaughan Mayor Steven Del Duca at an evening reception",
    category: "governments",
  },
  {
    src: "/images/community/dorit-vincent-ho.jpg",
    alt: "Dorit with MP Vincent Ho at an evening conference reception",
    category: "governments",
  },
  {
    src: "/images/community/dorit-roman-baber.jpg",
    alt: "Dorit with MP Roman Baber at the UJA Walk with Israel",
    category: "governments",
  },
  {
    src: "/images/community/dorit-police.jpg",
    alt: "Dorit and her daughter with York Regional Police officers at a community festival",
    category: "community",
  },
  {
    src: "/images/community/dorit-indigenous.jpg",
    alt: "Dorit at a community gathering with Indigenous leaders and neighbours",
    category: "community",
  },
  {
    src: "/images/community/dorit-king-city.jpg",
    alt: "Dorit visiting a local artisan booth at a community market",
    category: "community",
  },
  {
    src: "/images/community/dorit-anna.jpg",
    alt: "Dorit with a community member at a local art exhibition",
    category: "community",
  },
  {
    src: "/images/community/dorit-family.jpg",
    alt: "Dorit and her family at a community event",
    category: "community",
  },
];

/** Campaign-era photo, shown only on /2026-campaign. */
export const NOMINATION_PHOTO = {
  src: "/images/community/dorit-nomination.jpg",
  alt: "Dorit and her husband filing her trustee nomination package for the 2026 King municipal election",
};
