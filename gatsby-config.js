require("dotenv").config({
  path: `.env`,
})

// require .env.development or .env.production
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Abandoned Strollers`,
    description: `Where have all the children gone...`,
    author: `@misfist`,
    siteUrl: process.env.WEBSITE_URL,
    social: [
      {
        name: "twitter",
        url: "https://twitter.com/misfist",
      },
      {
        name: "github",
        url: "https://github.com/misfist",
      },
    ],
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        url:
          process.env.WPGRAPHQL_URL ||
          `https://editor.abandonedstroller.com/graphql`,
        // The base url to your WP site.
        baseUrl: process.env.WP_BASE_URL,
        // WP.com sites set to true, WP.org set to false
        hostingWPCOM: false,
        // The protocol. This can be http or https.
        protocol: 'https',
        // Use 'Advanced Custom Fields' Wordpress plugin
        useACF: false,
        auth: {},
        // Set to true to debug endpoints on 'gatsby build'
        verboseOutput: false,
        presets: [
          {
            useIf: () => process.env.NODE_ENV === `development`,
          },
        ],
        debug: {
          preview: true,
          graphql: {
            showQueryVarsOnError: true,
            showQueryOnError: true,
            writeQueriesToDisk: true,
          },
        },
        production: {
          allow404Images: true,
        },
        schema: {
          requestConcurrency: 10,
          previewRequestConcurrency: 2,
        },
        type: {
          MediaItem: {
            lazyNodes: true,
          },
          Comment: {
            exclude: true,
          },
          // User: {
          //   exclude: true,
          // },
        },
      },
    },
    `gatsby-plugin-image`,
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/src/assets`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
      // See https://www.gatsbyjs.com/plugins/gatsby-plugin-sass/
      resolve: `gatsby-plugin-sass`,
      // options: {
      //   sassOptions: {
      //     includePaths: [`${__dirname}/src/assets/scss`],
      //   },
      //   options: {
      //     implementation: require("node-sass"),
      //   },
      //   cssLoaderOptions: {
      //     camelCase: false,
      //   },
      //   // useResolveUrlLoader: false,
      // },
    },
    {
      // See https://www.gatsbyjs.com/plugins/gatsby-plugin-htaccess/
      resolve: 'gatsby-plugin-htaccess',
      options: {
        https: true,
        www: false,
        SymLinksIfOwnerMatch: true,
        host: process.env.WEBSITE_DOMAIN, // if 'www' is set to 'false', be sure to also remove it here!
      },
    },
  ],
}
