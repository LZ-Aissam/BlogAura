// ============================================
// MODAL.JSX - Composant de fenetre modale
// C'est la popup qui s'affiche quand on clique sur "Lire la suite"
// Elle affiche le post en entier avec tous les commentaires
// ============================================

import { useEffect } from 'react'

// Props:
// - isOpen: boolean pour savoir si la modale est ouverte ou fermee
// - onClose: fonction a appeler pour fermer la modale
// - title: le titre affiche en haut de la modale
// - children: le contenu de la modale (tout ce qu'on met entre <Modal> et </Modal>)
function Modal({ isOpen, onClose, title, children }) {
  // useEffect pour gerer les effets de bord (side effects)
  // Ici on gere la fermeture avec la touche Echap et le scroll du body
  useEffect(() => {
    // Fonction qui detecte si on appuie sur Echap
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose() // Si c'est Echap, on ferme
    }

    // Si la modale est ouverte
    if (isOpen) {
      // On ecoute les touches du clavier
      document.addEventListener('keydown', handleEscape)
      // On bloque le scroll du body pour pas scroller la page derriere
      document.body.style.overflow = 'hidden'
    }

    // Fonction de nettoyage (cleanup) qui s'execute quand le composant se demonte
    // ou quand les dependances changent
    // C'est important pour eviter les fuites de memoire (memory leaks)
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset' // On reactive le scroll
    }
  }, [isOpen, onClose]) // Dependances: le useEffect se relance si isOpen ou onClose change

  // Si la modale est fermee, on retourne null (rien a afficher)
  if (!isOpen) return null

  return (
    // Le conteneur principal qui prend tout l'ecran
    // fixed = position fixe, inset-0 = top/right/bottom/left a 0
    // z-50 = z-index eleve pour etre au dessus de tout
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Le fond sombre semi-transparent (overlay) */}
      {/* Quand on clique dessus, ca ferme la modale */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />

      {/* Le conteneur qui centre la modale */}
      <div className="flex min-h-full items-center justify-center p-4">
        {/* La modale elle-meme */}
        <div className="relative w-full max-w-3xl bg-white dark:bg-gray-800 rounded-xl shadow-xl transform transition-all">
          {/* Header de la modale avec le titre et le bouton fermer */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {title}
            </h2>
            {/* Bouton X pour fermer */}
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {/* Icone X en SVG */}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Le contenu de la modale avec scroll si trop grand */}
          {/* max-h-[70vh] = hauteur max de 70% de la hauteur de l'ecran */}
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
