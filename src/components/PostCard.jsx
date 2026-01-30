// ============================================
// POSTCARD.JSX - Carte d'article
// C'est le composant qui affiche un article sur la page d'accueil
// Il affiche le titre, un apercu du contenu (5 lignes max),
// les tags, les emojis et les commentaires
// ============================================

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { TAGS, EMOJIS } from '../data/mockData' // Les tags et emojis disponibles
import EmojiReactions from './EmojiReactions' // Composant pour les reactions emoji
import CommentSection from './CommentSection' // Composant pour les commentaires
import Modal from './Modal' // La modale pour voir l'article complet

// Props:
// - post: l'article a afficher
// - comments: tous les commentaires (on filtrera ceux du post)
// - onToggleReaction: fonction pour ajouter/retirer une reaction
// - onAddComment: fonction pour ajouter un commentaire
function PostCard({ post, comments, onToggleReaction, onAddComment }) {
  // State pour savoir si la modale est ouverte ou pas
  const [showModal, setShowModal] = useState(false)

  // On recupere l'user connecte pour les reactions et commentaires
  const { user } = useAuth()

  // On recupere l'id de l'user (ou null s'il est pas connecte)
  const userId = user ? user.id : null

  // On filtre les commentaires pour garder que ceux de ce post
  // filter() cree un nouveau tableau avec les elements qui matchent la condition
  const postComments = comments.filter(c => c.postId === post.id)

  // On recupere les objets tags complets a partir des IDs stockes dans le post
  // Genre si post.tags = [1, 3], on recupere les objets tag avec id 1 et 3
  const postTags = TAGS.filter(tag => post.tags.includes(tag.id))

  // Fonction pour formater la date en francais
  // Ex: "15 janvier 2026"
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  return (
    // Fragment <> pour retourner plusieurs elements sans div wrapper
    // On a besoin de ca car on retourne l'article ET la modale
    <>
      {/* La carte de l'article */}
      <article className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="p-6">
          {/* Les tags de l'article */}
          <div className="flex flex-wrap gap-2 mb-3">
            {/* On boucle sur les tags avec map() */}
            {postTags.map(tag => (
              <span
                key={tag.id} // key obligatoire pour les listes en React
                className={`px-2 py-1 text-xs text-white rounded-full ${tag.color}`}
              >
                {tag.name}
              </span>
            ))}
          </div>

          {/* Le titre de l'article */}
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {post.title}
          </h2>

          {/* Auteur et date */}
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            Par {post.author} - {formatDate(post.createdAt)}
          </p>

          {/* Le contenu avec line-clamp-5 pour limiter a 5 lignes */}
          {/* line-clamp-5 c'est une classe CSS qu'on a defini dans index.css */}
          <div className="text-gray-700 dark:text-gray-300 line-clamp-5 mb-4">
            {post.content}
          </div>

          {/* Bouton "Lire la suite" qui ouvre la modale */}
          <button
            onClick={() => setShowModal(true)}
            className="text-primary-600 dark:text-primary-400 hover:underline font-medium mb-4 inline-block"
          >
            Lire la suite +
          </button>

          {/* Les reactions emoji */}
          <EmojiReactions
            reactions={post.reactions}
            onToggle={(emoji) => onToggleReaction(post.id, emoji, userId)}
            userId={userId}
          />

          {/* Section commentaires avec une bordure en haut */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <CommentSection
              comments={postComments}
              onAddComment={(content) => onAddComment(post.id, {
                userId: user.id,
                userName: user.name,
                content,
                createdAt: new Date().toISOString(), // Date actuelle en format ISO
              })}
              maxComments={5} // Max 5 commentaires affiches
              showPagination // Active la pagination
            />
          </div>
        </div>
      </article>

      {/* La modale qui affiche l'article complet */}
      {/* Elle s'ouvre quand showModal est true */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={post.title}>
        {/* Contenu de la modale: article complet */}
        <div className="flex flex-wrap gap-2 mb-4">
          {postTags.map(tag => (
            <span
              key={tag.id}
              className={`px-2 py-1 text-xs text-white rounded-full ${tag.color}`}
            >
              {tag.name}
            </span>
          ))}
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Par {post.author} - {formatDate(post.createdAt)}
        </p>
        {/* whitespace-pre-line garde les retours a la ligne du texte */}
        <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line mb-6">
          {post.content}
        </div>
        <EmojiReactions
          reactions={post.reactions}
          onToggle={(emoji) => onToggleReaction(post.id, emoji, userId)}
          userId={userId}
        />
        {/* Dans la modale, on affiche TOUS les commentaires (showAll) */}
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <CommentSection
            comments={postComments}
            onAddComment={(content) => onAddComment(post.id, {
              userId: user.id,
              userName: user.name,
              content,
              createdAt: new Date().toISOString(),
            })}
            showAll // Affiche tous les commentaires sans pagination
          />
        </div>
      </Modal>
    </>
  )
}

export default PostCard
