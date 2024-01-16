import { QueryClientProvider } from '@tanstack/react-query'
import { Routes } from './Routes'
import './styles/global.css'
import { queryclient } from './lib/react-query'

export function App() {
  return (
    <QueryClientProvider client={queryclient}>
      <Routes />
    </QueryClientProvider>
  )
}
