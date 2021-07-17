import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { AlurakutStyles } from '../src/components/lib/AluraCommons'

const GlobalStyle = createGlobalStyle`

//RESET
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: #c7c7c7;
    font-family: sans-serif;
  }

  #__next {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
    border-radius: 8px;
  }

${AlurakutStyles}
`

const theme = {
  colors: {
    primary: '#0070f3',
  },
}



export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
