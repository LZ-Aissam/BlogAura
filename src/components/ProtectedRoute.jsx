// ============================================
// PROTECTEDROUTE.JSX - Protection des routes
// Ce composant sert a proteger certaines pages
// Genre la page de creation de post qui est reservee aux admins
// Si t'es pas connecte ou pas admin, tu te fais rediriger, c'est le videur du projet quoi
// ============================================

import { Navigate } from 'react-router-dom' // Pour rediriger l'utilisateur
import { useAuth } from '../contexts/AuthContext' // Pour checker si l'user est connecte/admin

// children = le composant enfant qu'on veut proteger
// requireAdmin = est-ce qu'il faut etre admin pour acceder (par defaut non)
function ProtectedRoute({ children, requireAdmin = false }) {
  // On recupere les infos d'auth
  const { isAuthenticated, isAdmin } = useAuth()

  // Si l'user est pas connecte du tout, on le redirige vers la page de login
  // replace empeche de revenir en arriere avec le bouton retour du navigateur
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Si la route necessite d'etre admin mais que l'user est pas admin
  // On le redirige vers l'accueil (pas le droit d'etre la mon gars)
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />
  }

  // Si tout est ok, on affiche le composant enfant normalement
  return children
}

export default ProtectedRoute
