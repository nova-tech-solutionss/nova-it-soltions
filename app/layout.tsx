// app/layout.tsx
import './globals.css'
import Script from 'next/script'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" >
      {/*For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life. John 3:16 */}
      <head>
        <Script src='javascripts/jeeva.js' strategy="beforeInteractive"></Script>
      </head>
      <body className="h-full">{children}</body>
    </html>
  )
}
