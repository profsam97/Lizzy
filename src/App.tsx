import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes'
import Header from './Components/Layouts/Header'
import { QueryClient, QueryClientProvider } from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
import Notification from './utils/Notification'
import { useContext } from 'react'
import ContextApi from './store/ContextApi'
import { ThemeProvider, createTheme } from '@mui/material'
function App() {

  const client = new QueryClient();

  const mode : boolean = useContext(ContextApi).mode;
  const customTheme = createTheme({
    palette: {
        mode: mode ? "dark" : "light",
        contrastThreshold: 5
    },
    typography: {
        fontFamily: "Open Sans" 

    }
  },)
      
    return (
    <BrowserRouter >
    <ThemeProvider theme={customTheme}>
    <QueryClientProvider client={client}>
      <Header/>
    <AppRoutes/>
    <Notification/>
    <ReactQueryDevtools position='bottom-right' initialIsOpen={false}/>
    </QueryClientProvider>
    </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
