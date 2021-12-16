// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    fontSize: {
      sm: string
      md: string
      xl: string
    },
    colors: {
        primary: string
        secondary: string

        black: string
        white: string
    }
  }
}