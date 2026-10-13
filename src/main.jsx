import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CartProvider } from './components/CartProvider.jsx'
import { WishlistProvider } from './components/WishlistProvider.jsx' // 1. استيراد مزود المفضلة
import './index.css'
import App from './App.jsx'
import 'react-loading-skeleton/dist/skeleton.css'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <WishlistProvider> 
        <App />
      </WishlistProvider>
    </CartProvider>
  </StrictMode>
)