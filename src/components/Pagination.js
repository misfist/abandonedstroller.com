import React from 'react'
import { Link } from 'gatsby'

const Pagination = ({ pageContext, pathPrefix }) => {
  const { previousPagePath, nextPagePath, totalPages, pagedPrefix } = pageContext

  const isMultiplePages = totalPages > 1;
  const pages = [...Array( totalPages )];
  
  return (
    <nav className="pagination section-inner" role="navigation">
      <ul className="navbar navbar-menu">
        {previousPagePath && (
          <li className="navbar-item">
            <Link 
              to={previousPagePath} 
              activeClassName="active"
              rel="prev"
              className="previous"
            >
              <span className="screen-reader-text">Previous</span>
            </Link>
          </li>
        )}
        {isMultiplePages && (
          pages.map( (item, index ) => {
            const pageNumber = index + 1;
            const page = ( pageNumber > 1 ) ? `/${pagedPrefix}/${pageNumber}` : `/`;
            return (
              <li key={index} className="navbar-item">
                <Link 
                  to={page}
                  activeClassName="active"
                  rel={`page-${pageNumber}`}
                >{pageNumber}</Link>
              </li>
            )
          } )
        )
        }
        {nextPagePath && (
          <li className="navbar-item">
            <Link 
              to={nextPagePath}
              activeClassName="active"
              className="next"
              rel="next"
            >
              <span className="screen-reader-text">Next</span>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Pagination
