/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://novadev.solutions",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,

  exclude: [
    "/login",
    "/register",
    "/dashboard",
    "/admin",
    "/api/*",
  ],

  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      {
        userAgent: "*",
        disallow: ["/login", "/register", "/dashboard", "/admin", "/api"],
      },
    ],
  },
};
