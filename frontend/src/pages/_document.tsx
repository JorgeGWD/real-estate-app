import Document, { Html, Head, Main, NextScript } from "next/document"

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="Browse real estate properties with filters by price, location, and name." />
          <meta name="keywords" content="real estate, properties, homes, buy house, rent house" />
          <meta name="robots" content="index, follow" />
          {/* Open Graph global */}
          <meta property="og:title" content="Real Estate Properties" />
          <meta
            property="og:description"
            content="Find your perfect home with our real estate listings."
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://yourdomain.com" />
          <meta property="og:image" content="https://picsum.photos/1200/630" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}