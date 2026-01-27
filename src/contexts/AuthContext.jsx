// ============================================
// AUTHCONTEXT.JSX - Gestion de l'authentification
// C'est ici qu'on gere tout ce qui est connexion/deconnexion
// On utilise le Context API de React pour partager les infos user partout
// ============================================

import { createContext, useContext, useState, useEffect } from 'react'

// On cree le contexte, c'est comme une boite qui va contenir les infos de l'utilisateur
// null c'est la valeur par defaut (personne connecte)
const AuthContext = createContext(null)

// Les utilisateurs de test (fake users pour simuler une BDD)
// En vrai ca viendrait d'une API/base de donnees mais la on fait du front only
// ATTENTION: en vrai on stocke JAMAIS les mots de passe en clair comme ca hein
const MOCK_USERS = [
  { id: 1, email: 'admin@blog.com', password: 'admin123', name: 'Admin', role: 'admin' },
  { id: 2, email: 'user@blog.com', password: 'user123', name: 'Jean Dupont', role: 'user' },
  { id: 3, email: 'marie@blog.com', password: 'marie123', name: 'Marie Martin', role: 'user' },
]

// Le Provider c'est le composant qui va wrapper toute l'appli
// et fournir les infos d'authentification a tous les composants enfants
export function AuthProvider({ children }) {
  // State pour stocker l'utilisateur connecte
  const [user, setUser] = useState(null)

  // useEffect pour charger l'utilisateur depuis le localStorage au demarrage
  // Le tableau vide [] signifie que ca s'execute une seule fois au montage
  useEffect(() => {
    // On regarde si ya un user sauvegarde dans le localStorage
    const saved = localStorage.getItem('blogaura_user')
    if (saved) {
      // Si oui, on le parse et on le met dans le state
      setUser(JSON.parse(saved))
    }
  }, [])

  // Fonction de connexion
  // Elle prend l'email et le mot de passe en parametres
  const login = (email, password) => {
    // On cherche l'utilisateur dans notre liste de fake users
    // find() retourne le premier element qui match la condition
    const foundUser = MOCK_USERS.find(
      u => u.email === email && u.password === password
    )

    if (foundUser) {
      // Si on trouve l'user, on cree un nouvel objet SANS le mot de passe
      // C'est une question de securite (meme si c'est du fake data)
      const userSansMdp = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role
      }
      setUser(userSansMdp)
      // On sauvegarde dans le localStorage pour persister la connexion
      localStorage.setItem('blogaura_user', JSON.stringify(userSansMdp))
      return { success: true }
    }
    // Si on trouve pas l'user, on retourne une erreur
    return { success: false, error: 'Email ou mot de passe incorrect' }
  }

  // Fonction de deconnexion, assez simple
  const logout = () => {
    setUser(null) // On vide l'user
    localStorage.removeItem('blogaura_user') // On supprime du localStorage
  }

  // Variables pour savoir si l'user est admin ou connecte
  // On verifie que user existe avant d'acceder a role
  let isAdmin = false
  if (user !== null) {
    isAdmin = user.role === 'admin'
  }
  const isAuthenticated = user !== null

  // On retourne le Provider avec toutes les valeurs qu'on veut partager
  // Tous les composants enfants pourront acceder a ces valeurs avec useAuth()
  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook personnalise pour utiliser le contexte facilement
// Au lieu de faire useContext(AuthContext) partout, on fait juste useAuth()
// C'est plus propre et ca permet de verifier qu'on est bien dans un Provider
export function useAuth() {
  const context = useContext(AuthContext)
  // Si le context est null, c'est qu'on a oublie de wrapper avec AuthProvider
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
