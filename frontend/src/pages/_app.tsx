import type { AppProps } from "next/app"
import Head from "next/head"
import "../styles/globals.css"
import { ThemeProvider } from "@/context/ThemeContext"
import Footer from "@/components/commons/Footer"
import Navbar from "@/components/commons/Navbar"

export default function MyApp({ Component, pageProps }: AppProps & { pageProps: { title?: string } }) {
  const defaultTitle = "Real Estate Properties"
  const title = pageProps.title ? `${pageProps.title} | ${defaultTitle}` : defaultTitle
  const description = "Browse real estate properties with filters by price, location, and name."
  const url = "https://yourdomain.com"
  const ogImage = "https://picsum.photos/1200/630"

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="real estate, properties, homes, buy house, rent house" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={ogImage} />
      </Head>
      <ThemeProvider>
        <Navbar />
        <div className="main-content">
          <Component {...pageProps} />
        </div>
        <Footer />
      </ThemeProvider>
    </>
  )
}