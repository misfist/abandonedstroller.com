import React from "react"
import { Link } from "gatsby"

const Footer = ({}) => {
  return (
    <footer id="site-footer" role="contentinfo" className="header-footer-group">
      <div className="section-inner">
        <div className="footer-credits">
          <p className="footer-copyright">
            © {new Date().getFullYear()}{" "}
            <Link to={"/"}>Abandoned Stroller</Link>
          </p>
          <p>
            Proudly built with
            <a
              className="powered-by-wordpress"
              href="https://wordpress.com"
              rel="noreferrer noopener"
            >
              WordPress
            </a>
            and
            <a
              className="powered-by-wordpress"
              href="https://www.gatsbyjs.com"
              rel="noreferrer noopener"
            >
              Gatsby
            </a>
          </p>
        </div>

        <a className="to-the-top" href="#site-header">
          <span className="to-the-top-long">
            To the top{" "}
            <span className="arrow" aria-hidden="true">
              ↑
            </span>
          </span>
          <span className="to-the-top-short">
            Up{" "}
            <span className="arrow" aria-hidden="true">
              ↑
            </span>
          </span>
        </a>
      </div>
    </footer>
  )
}

export default Footer
