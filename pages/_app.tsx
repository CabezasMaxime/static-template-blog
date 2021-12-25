import { createGlobalStyle, DefaultTheme, ThemeProvider } from 'styled-components'
import Layout from '../components/Layout'
import HeaderSeo from '../components/HeaderSeo'
import { GetGlobal, GetSocials, GetTags } from '../utils/DataRequest'
import App from 'next/app'
import CustomError from '../components/CustomError'

const GlobalStyle = createGlobalStyle(({theme}) => {
  return `
    :root {
      --black: #333333;
      --light-grey: rgba(220, 220, 220, 1);
    }

    .list-reset {
      display: flex;
      justify-content: center;
      padding: 0;

      li {
        margin: 0 0.5%;
        list-style-type: none;
      }
    }

    body {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      background: rgba(240, 240, 240, 1);
      font-family: 'Roboto', sans-serif;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    * {
      box-sizing: border-box;
    }

    pre {
      padding: 1rem;
      border-radius: 2px;
      background-color: var(--light-grey);
    }

    blockquote {
      padding-left: 1rem;
      border-left: solid 5px ${theme.colors.primary};

      p:last-child {
        margin-bottom: 0rem;
      }

      p:first-child {
        margin-top: 0;
      }
    }

    a.link {
      color: blue;
      text-decoration: underline;

      &:visited {
        color: darkblue;
      }
    }

    table {
      border-collapse: collapse;
      border-spacing: 0;
      width: 100%;
      border: 1px solid #ddd;
    }

    th, td {
      text-align: left;
      padding: 8px;
    }

    th {
      border-top: solid 1px black;
      border-bottom: solid 1px black;
      border-left: solid 1px black;
    }

    th:last-child, td:last-child{
      border-right: solid 1px black;
    }
    
    td {
      border-bottom: solid 1px black;
      border-left: solid 1px black;
    }
  `
})

const theme: DefaultTheme = {
  media: {
    mobile: "max-width: 768px",
  },
  fontSize: {
    sm: "16px",
    md: "22px",
    xl: "32px",
  },
  colors: {
    primary: 'rgba(24, 116, 167, 1)',
    secondary: 'blue',
    white: "white",
    black: "#333333"
  },
}

function MyApp({ Component, pageProps, router }) {
  const { tags, global, socials } = pageProps

  if(!tags || !global || !socials) {
    return <CustomError error={{status: 404}} />
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <HeaderSeo router={router} pageProps={pageProps} />
        <Layout tags={tags} global={global} pageProps={pageProps} socials={socials} >
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  )
}

MyApp.getInitialProps = async (context) => {
  const tags = await GetTags()
  const global = await GetGlobal()
  const socials = await GetSocials()
  
  let appProps = await App.getInitialProps(context);
  appProps.pageProps.tags = tags.data ? tags.data : null
  appProps.pageProps.global = global.data ? global.data : null,
  appProps.pageProps.socials = socials.data ? socials : null

  return {
    ...appProps,
  }
}

export default MyApp
