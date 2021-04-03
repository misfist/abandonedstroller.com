import React from "react"
import { Link, graphql } from "gatsby"
import parse from "html-react-parser"

const PageNavigation = ( { data: { previous, next, post } }) => {

  return (
    <nav className="blog-post-nav  section-inner">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.uri} rel="prev">
                ← {parse(previous.title)}
              </Link>
            )}
          </li>

          <li>
            {next && (
              <Link to={next.uri} rel="next">
                {parse(next.title)} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
  )
}

export default PageNavigation