// ============================================
// HOME.JSX - Page d'accueil du blog
// C'est la page principale qui affiche tous les articles
// Avec un systeme de filtrage par tags
// ============================================

import { useState } from 'react'
import PostCard from '../components/PostCard' // Le composant carte d'article
import { TAGS } from '../data/mockData' // La liste des tags disponibles

// Props recues depuis App.jsx:
// - posts: la liste de tous les articles
// - comments: la liste de tous les commentaires
// - onToggleReaction: fonction pour ajouter/retirer une reaction emoji
// - onAddComment: fonction pour ajouter un commentaire
function Home({ posts, comments, onToggleReaction, onAddComment }) {
  // State pour le tag selectionne (null = tous les articles)
  const [selectedTag, setSelectedTag] = useState(null)

  // On filtre les posts selon le tag selectionne
  // Si selectedTag est null, on garde tous les posts
  // Sinon on garde que ceux qui ont ce tag
  const filteredPosts = selectedTag
    ? posts.filter(post => post.tags.includes(selectedTag))
    : posts

  return (
    <div>
      {/* Header de la page avec titre et description */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Bienvenue sur BlogAura
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Découvrez les derniers articles sur le développement web
        </p>
      </div>

      {/* Barre de filtres par tags */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {/* Bouton "Tous" pour afficher tous les articles */}
        <button
          onClick={() => setSelectedTag(null)} // Remet le filtre a null
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedTag === null
              ? 'bg-primary-600 text-white' // Style actif
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600' // Style inactif
          }`}
        >
          Tous
        </button>

        {/* On genere un bouton pour chaque tag */}
        {TAGS.map(tag => (
          <button
            key={tag.id}
            onClick={() => setSelectedTag(tag.id)} // Selectionne ce tag
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedTag === tag.id
                ? `${tag.color} text-white` // Style actif avec la couleur du tag
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {tag.name}
          </button>
        ))}
      </div>

      {/* Grille des articles */}
      {/* grid = CSS Grid, gap-6 = espacement, responsive avec md: et lg: */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {/* On boucle sur les posts filtres pour afficher les cartes */}
        {filteredPosts.map(post => (
          <PostCard
            key={post.id}
            post={post}
            comments={comments}
            onToggleReaction={onToggleReaction}
            onAddComment={onAddComment}
          />
        ))}
      </div>

      {/* Message si aucun article trouve avec ce tag */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            Aucun article trouvé pour ce tag.
          </p>
        </div>
      )}
    </div>
  )
}

export default Home
