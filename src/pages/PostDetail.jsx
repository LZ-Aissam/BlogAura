// ============================================
// POSTDETAIL.JSX - Page de detail d'un article
// Affiche un article complet avec tous ses commentaires
// Accessible via l'URL /post/:id
// ============================================

import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { TAGS } from '../data/mockData'
import EmojiReactions from '../components/EmojiReactions'
import CommentSection from '../components/CommentSection'

function PostDetail({ posts, comments, onToggleReaction, onAddComment }) {
  // useParams() permet de recuperer les parametres de l'URL
  // Ici :id dans la route /post/:id devient accessible via id
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  // On recupere l'id de l'user (ou null s'il est pas connecte)
  const userId = user ? user.id : null

  // On cherche le post avec l'id correspondant
  // parseInt() car l'id de l'URL est une string et nos IDs sont des numbers
  const post = posts.find(p => p.id === parseInt(id))

  // Si le post existe pas (mauvais id ou post supprime)
  // On affiche un message d'erreur avec un bouton retour
  if (!post) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Article non trouvé
        </h1>
        <button
          onClick={() => navigate('/')}
          className="text-primary-600 dark:text-primary-400 hover:underline"
        >
          Retour à l'accueil
        </button>
      </div>
    )
  }

  // On recupere les commentaires et tags du post
  const postComments = comments.filter(c => c.postId === post.id)
  const postTags = TAGS.filter(tag => post.tags.includes(tag.id))

  // Fonction pour formater la date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Bouton retour avec une fleche */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-6 transition-colors"
      >
        {/* Icone fleche gauche en SVG */}
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Retour aux articles
      </button>

      {/* L'article complet */}
      <article className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          {/* Les tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {postTags.map(tag => (
              <span
                key={tag.id}
                className={`px-3 py-1 text-sm text-white rounded-full ${tag.color}`}
              >
                {tag.name}
              </span>
            ))}
          </div>

          {/* Le titre en plus grand que sur la page d'accueil */}
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {post.title}
          </h1>

          {/* Auteur et date */}
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Par {post.author} - {formatDate(post.createdAt)}
          </p>

          {/* Le contenu complet de l'article */}
          {/* text-lg et leading-relaxed pour une meilleure lisibilite */}
          <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line text-lg leading-relaxed mb-8">
            {post.content}
          </div>

          {/* Les reactions emoji */}
          <EmojiReactions
            reactions={post.reactions}
            onToggle={(emoji) => onToggleReaction(post.id, emoji, userId)}
            userId={userId}
          />

          {/* Section commentaires */}
          {/* showAll = affiche tous les commentaires (pas de pagination) */}
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <CommentSection
              comments={postComments}
              onAddComment={(content) => onAddComment(post.id, {
                userId: user.id,
                userName: user.name,
                content,
                createdAt: new Date().toISOString(),
              })}
              showAll
            />
          </div>
        </div>
      </article>
    </div>
  )
}

export default PostDetail
