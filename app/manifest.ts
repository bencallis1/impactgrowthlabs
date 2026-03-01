import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Impact Growth Labs',
    short_name: 'Impact Growth Labs',
    description: 'An impact venture studio backing founders who build a better world. We invest in bold ideas at the intersection of business and positive change.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}