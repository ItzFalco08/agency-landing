import React from 'react'
import {ThemeProvider as NextThemeProvider} from "next-themes";

function ThemeProvider({children, ...props}: React.ComponentProps<typeof NextThemeProvider>) {
  return (
    <NextThemeProvider attribute="class" defaultTheme="system" {...props}>
      {children}
    </NextThemeProvider>
  )
}

export default ThemeProvider