// ============================================
// MAIN.JSX - Le point d'entrée de l'application
// C'est ici que tout commence, genre le Big Bang du projet
// ============================================

import { StrictMode } from 'react' // StrictMode c'est pour detecter les problemes, ca aide au debug
import { createRoot } from 'react-dom/client' // Pour injecter React dans le HTML
import { BrowserRouter } from 'react-router-dom' // Pour gerer les routes (les differentes pages quoi)
import App from './App.jsx' // Le composant principal de l'appli
import { AuthProvider } from './contexts/AuthContext.jsx' // Pour gerer la connexion utilisateur
import { ThemeProvider } from './contexts/ThemeContext.jsx' // Pour le mode sombre/clair
import './index.css' // Les styles Tailwind CSS

// Ici on rend l'application dans le DOM
// document.getElementById('root') recupere la div avec id="root" dans index.html
// Ensuite on wrap tout avec les Providers pour que tous les composants enfants
// puissent acceder au theme et a l'authentification
// C'est comme des poupees russes, chaque Provider englobe le suivant
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* BrowserRouter permet d'utiliser les routes genre /login, /about etc */}
    <BrowserRouter>
      {/* ThemeProvider donne acces au dark mode partout dans l'appli */}
      <ThemeProvider>
        {/* AuthProvider donne acces a l'utilisateur connecte partout */}
        <AuthProvider>
          {/* App c'est le composant principal qui contient tout le reste */}
          <App />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
