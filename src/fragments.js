import { graphql } from 'gatsby'

export const fragments = graphql`
  fragment Image on File {
    childImageSharp {
      fluid(maxWidth: 1600, quality: 80) {
        ...GatsbyImageSharpFluid_tracedSVG
      }
      gatsbyImageData(blurredOptions: { toFormat: AUTO }, placeholder: BLURRED)
    }
  }

  fragment ImageContent on WpMediaItem {
    title
    altText
    caption
    localFile {
      ...Image
    }
  }

  fragment PostContent on WpPost {
    id
    excerpt
    content
    title
    date(formatString: "MMMM DD, YYYY")

    isSticky
    nodeType

    featuredImage {
      node {
        ...ImageContent
      }
    }
    categories {
      nodes {
        name
        slug
        uri
      }
    }
  }

  fragment PageContent on WpPage {
    id
    content
    title
    date(formatString: "MMMM DD, YYYY")

    nodeType

    featuredImage {
      node {
        ...ImageContent
      }
    }
  }
`
