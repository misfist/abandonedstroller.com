import React from 'react'
import Layout from '../components/Layout'

const NotFoundPage = () => (
  <Layout title="404" bodyClass={`404`}>
    <article className={classes} itemScope itemType="http://schema.org/Article">
      <header className="entry-header">
        <h1 className="entry-title" itemProp="headline">
          Not Found
        </h1>
      </header>
      <div className="entry-content">
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </div>
    </article>
  </Layout>
)

export default NotFoundPage
