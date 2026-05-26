import { defineQuery } from "next-sanity";

export const WORKS_LIST_QUERY = defineQuery(`
  *[_type == "works"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    thumbnail {
      asset->{
        _id,
        url
      }
    },
    projectDetails {
      projectField,
      duration
    }
  }
`);

// Query for SSG - get all work slugs
export const WORKS_SLUGS_QUERY = defineQuery(`
  *[_type == "works"] {
    "slug": slug.current
  }
`);

// Query for all works with minimal data (for next project logic)
export const ALL_WORKS_MINIMAL_QUERY = defineQuery(`
  *[_type == "works"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    thumbnail {
      asset->{
        _id,
        url
      }
    }
  }
`);

export const WORK_DETAILS_QUERY = defineQuery(`
  *[_type == "works" && slug.current == $id][0] {
    _id,
    title,
    "slug": slug.current,
    thumbnail {
      asset->{
        _id,
        url
      }
    },
    description,
    summary,
    workGif,
    projectDetails,
    workDone,
    keyRoles,
    introduction,
    challenge,
    challengeGif,
    objectives,
    researchProcess,
    painPoints,
    solutionDesign {
      description,
      solutions[] {
        problemBlock,
        solutionBlock,
        imagesBlock[] {
          asset->{
            _id,
            url
          }
        }
      }
    },
    projectShots[] {
      title,
      images[] {
        asset->{
          _id,
          url
        }
      }
    },
    impactResults
  }
`);

export const TESTIMONIALS_QUERY = defineQuery(`
  *[_type == "testimonials"] | order(_createdAt desc) {
    _id,
    name,
    profession,
    image {
      asset->{
        _id,
        url
      }
    },
    title,
    description
  }
`);

export const ABOUT_QUERY = defineQuery(`
  *[_type == "about"][0] {
    _id,
    bio,
    location,
    isAvailable,
    profileImages[] {
      asset->{
        _id,
        url
      }
    },
    library[] {
      title,
      author,
      thumbnail {
        asset->{
          _id,
          url
        }
      },
      textColor,
      bgColor
    },
    experience[] {
      company,
      role,
      startDate,
      endDate,
      isCurrentJob
    }
  }
`);
