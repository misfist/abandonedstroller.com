import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import Menu from "./Menu"

const Header = ({ pageContext, toggleBackdrop, ...props }) => {
  const { wp } = useStaticQuery(graphql`
    {
      wp {
        generalSettings {
          title
          description
        }
      }
    }
  `)
  return (
    <header id="site-header" className="header-footer-group main-header" role="banner">
      <div className="header-inner section-inner">
        <div className="header-titles-wrapper">
          <h1 className="site-title">
            <Link
                to="/"
                dangerouslySetInnerHTML={{ __html: wp.generalSettings.title }}
              />
          </h1>
          <h3
            className="site-description"
            dangerouslySetInnerHTML={{
              __html: wp.generalSettings.description,
            }}
          />
        </div>

        <div className="header-navigation-wrapper">
          <Menu />
        </div>
      </div>
    </header>
  )
}

export default Header
