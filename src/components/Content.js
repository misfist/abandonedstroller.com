import React from 'react'
import { GatsbyImage } from "gatsby-plugin-image"
import slugify from 'slugify'
import classNames from 'classnames'
import ContributeForm from './ContributeForm'

const Content = ( { post } ) => {
  const nodeType = post?.contentType?.node?.nodeType || '';
  const slug = slugify( nodeType, { lower: true } );
  const classes = classNames(
    slug,
    'section-inner'
  );

  return (
    <article
        className={classes}
        itemScope
        itemType="http://schema.org/Article"
      >
        <header className="entry-header">
          <h1 className="entry-title" itemProp="headline">{post.title}</h1>

          {/* if we have a featured image for this post let's display it .featuredImage.node.localFile.childImageSharp.gatsbyImageData*/}
          {post?.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData && (
            <figure className="featured-image">
              <GatsbyImage
                image={post.featuredImage.node.localFile.childImageSharp.gatsbyImageData}
                alt={post.featuredImage.node.altText}
              />
              {post?.featuredImage?.node?.caption && (
                <figcaption className="caption" dangerouslySetInnerHTML={{ __html: post.featuredImage.node.caption }} />
              )}
            </figure>
          )}
        </header>

        { post.slug === 'contribute' ? (
          <ContributeForm />
        ) : (
          !!post.content && (
            <div className="entry-content" itemProp="articleBody" dangerouslySetInnerHTML={{ __html: post.content }} />
          )      
        ) }

      </article>
  )
}

export default Content
