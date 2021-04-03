import React from 'react'
import Helmet from 'react-helmet'
import classNames from 'classnames'
import slugify from 'slugify'
import Seo from './Seo';
import Header from "./Header"
import Footer from "./Footer"

const Layout = ({ children, title, description, bodyClass }) => {
  const slug = slugify( title, { lower: true } );

  const bodyClasses = classNames(
    bodyClass,
    `page-${slug}`
  );

  return (
    <>
      <Helmet
        bodyAttributes={{
            class: bodyClasses
        }}
      />

      <Seo title={title} description={description} />

      <Header />

      <main id="site-content" className="main-content" role="main">
        {children}
      </main>

      <Footer />
    </>
  )
}

export default Layout
