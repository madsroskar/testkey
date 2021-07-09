const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  // Use the prefix in production and not development.
  reactStrictMode: true,
  assetPrefix: isProd ? '/your-github-repo-name/' : '',
}
