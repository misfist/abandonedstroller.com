import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/Layout"
import Gallery from "../components/Gallery"
import Pagination from '../components/Pagination'

const BlogIndex = ({
  data,
  pageContext
}) => {
  const posts = data.allWpPost.nodes

  if (!posts.length) {
    return (
      <Layout isHomePage title="None Found" bodyClass={`archive`}>
        <p>
          No blog posts found. Add posts to your WordPress site and they'll
          appear here!
        </p>
      </Layout>
    )
  }

  return (
    <Layout isHomePage title="Home" bodyClass={`archive`}>

      <Gallery posts={posts} title="All Strollers" />
      <Pagination pageContext={pageContext} pathPrefix="/" />

    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query WordPressPostArchive($offset: Int!, $postsPerPage: Int!) {
    allWpPost(
      sort: { fields: [isSticky], order: DESC }
      limit: $postsPerPage
      skip: $offset
    ) {
      nodes {
        id
        databaseId
        title
        excerpt
        date(formatString: "MMMM DD, YYYY")
        slug
        isSticky
        featuredImage {
          node {
            title
            caption
            localFile {
              childImageSharp {
                fluid(maxWidth: 1600, quality: 80) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
                gatsbyImageData(
                  blurredOptions: {
                    toFormat: AUTO
                  }, 
                  placeholder: BLURRED
                )
              }
            }
          }
        }
      }
    }
  }
`
