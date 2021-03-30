import React from "react"
import { Link, graphql } from "gatsby"

// We're using Gutenberg so we need the block styles
import "@wordpress/block-library/build-style/style.css"
import "@wordpress/block-library/build-style/theme.css"

import Layout from "../components/Layout"
import Content from "../components/Content"
import PageNav from '../components/PageNav'

const PageTemplate = ({ data: { previous, next, post } }) => {
  const featuredImage = {
    fluid: post.featuredImage?.node?.localFile?.childImageSharp?.fluid,
    alt: post.featuredImage?.node?.alt || ``,
  }

  return (
    <Layout title={post.title} description={post.excerpt} bodyClass={`single-page`}>

      <Content post={{post}} />

      <PageNav data={{ previous, next, post }} />

    </Layout>
  )
}

export default PageTemplate

export const pageQuery = graphql`
  query PageById(
    # these variables are passed in via createPage.pageContext in gatsby-node.js
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    # selecting the current post by id
    post: wpPage(id: { eq: $id }) {
      ...PageContent
    }

    # this gets us the previous post by id (if it exists)
    previous: wpPage(id: { eq: $previousPostId }) {
      uri
      title
    }

    # this gets us the next post by id (if it exists)
    next: wpPage(id: { eq: $nextPostId }) {
      uri
      title
    }
  }
`
