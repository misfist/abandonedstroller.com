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
          <p className="powered-by-wordpress">
            Proudly built with
            {" "}
            <a
              href="https://wordpress.com"
              rel="noreferrer noopener"
              target="_blank"
            >
              WordPress 
            </a>
            {" "}
            and
            {" "}
            <a
              href="https://www.gatsbyjs.com"
              rel="noreferrer noopener"
              target="_blank"
            >
              Gatsby
            </a>
          </p>
        </div>

        
          <div className="to-the-top-wrapper">
            <a className="to-the-top-link" aria-label="Scroll to Top" href="#site-header">
              <span className="screen-reader-text">To the top{" "}</span>
              <span className="arrow" aria-hidden="true">
                ↑
              </span>
            </a>
          </div>
        
      </div>
    </footer>
  )
}

export default Footer
