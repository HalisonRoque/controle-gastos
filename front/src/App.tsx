import './styles/theme.css'
import './styles/global.css'
import { BrowserRouter } from 'react-router-dom'
import VerticalNav from './components/Navigation/Vertical/VerticalNav'
import { Container } from './components/Container'
import { Suspense } from 'react'
import AppRoutes from './pages/routers'

function App() {

  return (
    <BrowserRouter>
      <div style={{ display: 'flex' }}>
        <div className="sidebar">
          <VerticalNav />
        </div>

        <Container>
          <Suspense fallback={<h1>Carregando...</h1>}>
            <AppRoutes />
          </Suspense>
        </Container>
      </div>
    </BrowserRouter>
  )
}

export default App
