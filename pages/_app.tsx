import { createGlobalStyle, DefaultTheme, ThemeProvider } from 'styled-components'
import Layout from '../components/Layout'

const GlobalStyle = createGlobalStyle`
  :root {
    --black: #333333;
    --light-grey: rgba(240,240,240,1);
  }

  body {
    height: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    width: 100%;
    background: rgba(240, 240, 240, 1);
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }

  pre {
    padding: 0.2rem 0.5rem;
    border-radius: 5px;
    background: var(--light-grey);
  }

  blockquote {
    padding-left: 1rem;
    border-left: solid 5px var(--light-grey);

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

const theme: DefaultTheme = {
  media: {
    mobile: "max-width: 768px"
  },
  fontSize: {
    sm: "16px",
    md: "22px",
    xl: "32px",
  },
  colors: {
    primary: '#0070f3',
    secondary: 'blue',
    white: "white",
    black: "#333333"
  },
}

function MyApp({ Component, pageProps }) {

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Layout tags={pageProps.tags} global={pageProps.global} pageProps={pageProps} >
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  )
}

export default MyApp
