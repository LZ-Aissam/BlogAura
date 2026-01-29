// ============================================
// EMOJIREACTIONS.JSX - Composant des reactions emoji
// Affiche les boutons emoji avec leur compteur
// Permet de reagir a un post (si connecte)
// Le fameux systeme de like mais avec des emojis
// ============================================

import { useAuth } from '../contexts/AuthContext'
import { EMOJIS } from '../data/mockData' // La liste des emojis disponibles

// Props:
// - reactions: objet avec les reactions { emoji: [userId1, userId2, ...] }
// - onToggle: fonction appelee quand on clique sur un emoji
// - userId: l'id de l'utilisateur connecte
function EmojiReactions({ reactions, onToggle, userId }) {
  // On check si l'user est connecte pour activer/desactiver les boutons
  const { isAuthenticated } = useAuth()

  return (
    <div className="flex flex-wrap gap-2">
      {/* On boucle sur tous les emojis disponibles */}
      {EMOJIS.map(emoji => {
        // On compte combien de personnes ont react avec cet emoji
        // D'abord on verifie si l'emoji existe dans les reactions
        let count = 0
        if (reactions[emoji]) {
          count = reactions[emoji].length
        }

        // On verifie si l'user actuel a deja react avec cet emoji
        let hasReacted = false
        if (reactions[emoji] && userId) {
          hasReacted = reactions[emoji].includes(userId)
        }

        return (
          <button
            key={emoji} // key obligatoire pour les listes
            // onClick: si connecte, on appelle onToggle avec l'emoji
            // Le && fait que si isAuthenticated est false, rien ne se passe
            onClick={() => isAuthenticated && onToggle(emoji)}
            disabled={!isAuthenticated} // Desactive le bouton si pas connecte
            className={`
              flex items-center gap-1 px-3 py-1.5 rounded-full text-sm transition-all
              ${hasReacted
                // Si l'user a deja react: fond colore + bordure
                ? 'bg-primary-100 dark:bg-primary-900 border-2 border-primary-500'
                // Sinon: fond gris + pas de bordure visible
                : 'bg-gray-100 dark:bg-gray-700 border-2 border-transparent'
              }
              ${isAuthenticated
                // Si connecte: effet hover + curseur pointer
                ? 'hover:scale-110 cursor-pointer'
                // Si pas connecte: curseur interdit + opacite reduite
                : 'cursor-not-allowed opacity-70'
              }
            `}
            // Tooltip au survol
            title={isAuthenticated ? 'Cliquer pour réagir' : 'Connectez-vous pour réagir'}
          >
            {/* L'emoji lui-meme */}
            <span className="text-lg">{emoji}</span>
            {/* Le compteur (affiche seulement si > 0) */}
            {count > 0 && (
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                {count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

export default EmojiReactions
