import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image"

const Post = ( { post } ) => {

  return (
    <>
      {post.featuredImage.node.localFile && (
        <article className="post" key={post.databaseId}>
          <GatsbyImage
            image={
              post.featuredImage.node.localFile.childImageSharp.gatsbyImageData
            }
            alt={post.title}
            className="entry-image"
          />
          <img />
          <header className="entry-header">
            <h2 className="entry-title">
              <Link to={post.slug}>{post.title}</Link>
            </h2>
          </header>
          <div
            className="entry-content"
            dangerouslySetInnerHTML={{
              __html: post.excerpt,
            }}
          />
        </article>
      )}
    </>
  )
}

export default Post;