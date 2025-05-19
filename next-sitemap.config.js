module.exports = {
	siteUrl: "https://sathishkannan.com",
	generateRobotsTxt: true,
	sitemapSize: 5000,
	changefreq: "weekly",
	priority: 0.7,
	exclude: ['/admin','/admin/create'], 
	robotsTxtOptions: {
		policies: [
			{
				userAgent: "*",
				allow: "/",
			},
		],
	},
};
