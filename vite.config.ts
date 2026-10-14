import { defineConfig, loadEnv, type Connect, type Plugin } from 'vite'

const FALLBACK_SITE_URL = 'https://example.com'

function resolveSiteUrl(mode: string): string {
  const fileEnv = loadEnv(mode, process.cwd(), 'VITE_')
  const raw = process.env.VITE_SITE_URL || fileEnv.VITE_SITE_URL || FALLBACK_SITE_URL
  return raw.trim().replace(/\/+$/, '')
}

function seoFiles(siteUrl: string): Plugin {
  const robots = `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
  </url>
</urlset>
`

  const serve: Connect.NextHandleFunction = (req, res, next) => {
    const path = req.url?.split('?')[0]
    if (path === '/robots.txt') {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8')
      res.end(robots)
      return
    }
    if (path === '/sitemap.xml') {
      res.setHeader('Content-Type', 'application/xml; charset=utf-8')
      res.end(sitemap)
      return
    }
    next()
  }

  return {
    name: 'seo-files',
    configureServer(server) {
      server.middlewares.use(serve)
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots })
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap })
    },
  }
}

export default defineConfig(({ mode }) => {
  const siteUrl = resolveSiteUrl(mode)
  process.env.VITE_SITE_URL = siteUrl

  return {
    plugins: [seoFiles(siteUrl)],
  }
})
