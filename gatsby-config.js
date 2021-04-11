module.exports = {
  siteMetadata: {
    title: "gatsby-theme-ui-test",
  },
  plugins: [
    "gatsby-plugin-theme-ui",
    "gatsby-plugin-mdx",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
  ],
};
