# Documentation Technique - BlogAura

## Projet DEV Learn IT B3 - Création d'un Blog

**Date de soutenance :** 19 Février 2026
**Durée :** 30 minutes
**Type :** Front-end React.js

---

## Table des matières

1. [Présentation du projet](#1-présentation-du-projet)
2. [Technologies utilisées](#2-technologies-utilisées)
3. [Architecture du projet](#3-architecture-du-projet)
4. [Installation et lancement](#4-installation-et-lancement)
5. [Structure des fichiers](#5-structure-des-fichiers)
6. [Fonctionnalités implémentées](#6-fonctionnalités-implémentées)
7. [Composants React](#7-composants-react)
8. [Gestion de l'état](#8-gestion-de-létat)
9. [Système de routing](#9-système-de-routing)
10. [Stylisation avec Tailwind CSS](#10-stylisation-avec-tailwind-css)
11. [Fonctionnalités bonus](#11-fonctionnalités-bonus)
12. [Guide d'utilisation](#12-guide-dutilisation)
13. [Choix techniques et justifications](#13-choix-techniques-et-justifications)
14. [Difficultés rencontrées](#14-difficultés-rencontrées)
15. [Améliorations futures](#15-améliorations-futures)
16. [Conclusion](#16-conclusion)

---

## 1. Présentation du projet

### 1.1 Contexte

BlogAura est une application web de type blog développée dans le cadre du projet DEV Learn IT B3. L'objectif est de créer une plateforme permettant la publication et la consultation d'articles, avec un système d'authentification et d'interactions utilisateurs.

### 1.2 Objectifs

- Créer une interface utilisateur moderne et responsive
- Implémenter un système d'authentification (simulé côté front-end)
- Permettre la consultation d'articles avec système de commentaires
- Gérer les réactions par emojis avec compteurs
- Protéger certaines routes selon les rôles utilisateurs
- Offrir une expérience utilisateur fluide et intuitive

### 1.3 Périmètre

Ce projet couvre **uniquement la partie front-end**. Les données sont simulées (mockées) pour permettre une démonstration complète des fonctionnalités sans nécessiter de backend.

---

## 2. Technologies utilisées

### 2.1 Stack technique

| Technologie | Version | Rôle |
|-------------|---------|------|
| React | 19.x | Bibliothèque UI principale |
| Vite | 7.x | Outil de build et serveur de développement |
| React Router DOM | 7.x | Gestion du routing côté client |
| Tailwind CSS | 4.x | Framework CSS utilitaire |
| JavaScript (ES6+) | - | Langage de programmation |

### 2.2 Justification des choix

#### React 19
- Bibliothèque la plus populaire pour le développement front-end
- Écosystème riche et communauté active
- Approche composants réutilisables
- Hooks pour la gestion d'état

#### Vite
- Temps de démarrage quasi-instantané
- Hot Module Replacement (HMR) rapide
- Configuration minimale
- Build optimisé pour la production

#### Tailwind CSS 4
- Développement rapide avec classes utilitaires
- Pas de CSS personnalisé à écrire
- Thème facilement personnalisable
- Support natif du dark mode

#### React Router DOM
- Standard de facto pour le routing React
- Navigation déclarative
- Protection des routes simplifiée
- Paramètres d'URL dynamiques

---

## 3. Architecture du projet

### 3.1 Diagramme d'architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        BLOGAURA                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐   │
│  │   Contexts  │     │    Pages    │     │ Components  │   │
│  ├─────────────┤     ├─────────────┤     ├─────────────┤   │
│  │ AuthContext │────▶│    Home     │◀───▶│  PostCard   │   │
│  │ThemeContext │────▶│   Login     │◀───▶│   Navbar    │   │
│  └─────────────┘     │   About     │◀───▶│   Modal     │   │
│         │            │ CreatePost  │◀───▶│CommentSection│  │
│         │            │ PostDetail  │◀───▶│EmojiReactions│  │
│         ▼            └─────────────┘     └─────────────┘   │
│  ┌─────────────┐            │                              │
│  │    Data     │            │                              │
│  ├─────────────┤            ▼                              │
│  │  mockData   │◀──────────────────────────────────────    │
│  └─────────────┘                                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Flux de données

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│   User   │───▶│  Action  │───▶│  State   │───▶│   View   │
│  Event   │    │ Handler  │    │  Update  │    │  Render  │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
     ▲                                               │
     └───────────────────────────────────────────────┘
```

### 3.3 Pattern utilisé

L'application utilise le pattern **Container/Presentational** :
- **App.jsx** : Container principal qui gère l'état global
- **Pages** : Containers qui orchestrent les composants
- **Components** : Composants de présentation réutilisables

---

## 4. Installation et lancement

### 4.1 Prérequis

- Node.js version 18 ou supérieure
- npm version 9 ou supérieure
- Navigateur web moderne (Chrome, Firefox, Edge, Safari)

### 4.2 Installation

```bash
# Cloner le repository
git clone <url-du-repo>

# Accéder au dossier
cd BlogAura

# Installer les dépendances
npm install
```

### 4.3 Lancement en développement

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

### 4.4 Build pour la production

```bash
npm run build
```

Les fichiers de production seront générés dans le dossier `dist/`

### 4.5 Prévisualisation du build

```bash
npm run preview
```

---

## 5. Structure des fichiers

```
BlogAura/
├── index.html                 # Point d'entrée HTML
├── package.json               # Dépendances et scripts
├── vite.config.js            # Configuration Vite
├── tailwind.config.js        # Configuration Tailwind
├── postcss.config.js         # Configuration PostCSS
├── DOCUMENTATION.md          # Cette documentation
│
└── src/
    ├── main.jsx              # Point d'entrée React
    ├── App.jsx               # Composant racine + routing
    ├── index.css             # Styles globaux + Tailwind
    │
    ├── components/           # Composants réutilisables
    │   ├── Navbar.jsx        # Barre de navigation
    │   ├── PostCard.jsx      # Carte d'article
    │   ├── Modal.jsx         # Fenêtre modale
    │   ├── CommentSection.jsx # Section commentaires
    │   ├── EmojiReactions.jsx # Réactions emoji
    │   └── ProtectedRoute.jsx # Protection des routes
    │
    ├── pages/                # Pages de l'application
    │   ├── Home.jsx          # Page d'accueil
    │   ├── Login.jsx         # Page de connexion
    │   ├── About.jsx         # Page à propos
    │   ├── CreatePost.jsx    # Création d'article
    │   └── PostDetail.jsx    # Détail d'un article
    │
    ├── contexts/             # Contextes React
    │   ├── AuthContext.jsx   # Contexte d'authentification
    │   └── ThemeContext.jsx  # Contexte du thème
    │
    └── data/
        └── mockData.js       # Données simulées
```

---

## 6. Fonctionnalités implémentées

### 6.1 Tableau récapitulatif

| Fonctionnalité | Statut | Description |
|----------------|--------|-------------|
| Page de connexion | ✅ | Formulaire avec validation |
| Page d'affichage des posts | ✅ | Liste avec aperçu 5 lignes |
| Page à propos | ✅ | Présentation de l'auteur |
| Page de rédaction | ✅ | Création d'articles (admin) |
| Posts visibles par tous | ✅ | Accès public aux articles |
| Commentaires (connecté) | ✅ | Ajout de commentaires |
| Emojis avec compteur | ✅ | 6 emojis disponibles |
| Toggle emoji | ✅ | Clic = ajout/retrait |
| Lecture seule (non connecté) | ✅ | Pas d'interaction possible |
| Lien admin vers création | ✅ | Visible uniquement pour admin |
| Protection page création | ✅ | Redirection si non admin |
| Aperçu 5 lignes | ✅ | Avec bouton "Lire la suite" |
| Modale article complet | ✅ | Affichage en popup |
| Pagination commentaires | ✅ | 5 par page avec navigation |
| Tous commentaires (modale) | ✅ | Affichage complet |
| **Bonus : Dark/Light mode** | ✅ | Toggle dans la navbar |
| **Bonus : Système de tags** | ✅ | Filtrage par catégorie |

### 6.2 Détail des fonctionnalités

#### 6.2.1 Système d'authentification

L'authentification est simulée côté front-end avec des utilisateurs mockés :

| Rôle | Email | Mot de passe |
|------|-------|--------------|
| Admin | admin@blog.com | admin123 |
| User | user@blog.com | user123 |
| User | marie@blog.com | marie123 |

**Fonctionnement :**
- Les identifiants sont vérifiés contre la liste mockée
- En cas de succès, l'utilisateur est stocké dans le localStorage
- La session persiste après rafraîchissement de la page
- Déconnexion = suppression du localStorage

#### 6.2.2 Système de réactions emoji

6 emojis disponibles : 👍 ❤️ 😂 😮 😢 🎉

**Comportement :**
- Chaque emoji affiche un compteur du nombre de réactions
- Un utilisateur connecté peut cliquer pour réagir
- Re-cliquer retire sa réaction (toggle)
- Les utilisateurs non connectés voient les compteurs mais ne peuvent pas interagir
- Visual feedback : bordure colorée si l'utilisateur a réagi

#### 6.2.3 Système de commentaires

**Sur la page d'accueil :**
- Maximum 5 commentaires affichés par post
- Pagination si plus de 5 commentaires
- Boutons Précédent/Suivant

**Dans la modale (article complet) :**
- Tous les commentaires sont affichés
- Pas de pagination

**Ajout de commentaire :**
- Formulaire visible uniquement si connecté
- Validation : champ non vide requis
- Date automatique au moment de l'envoi

#### 6.2.4 Protection des routes

Le composant `ProtectedRoute` gère la protection :

```jsx
// Usage
<ProtectedRoute requireAdmin>
  <CreatePost />
</ProtectedRoute>
```

**Comportement :**
- Si non connecté → redirection vers `/login`
- Si connecté mais pas admin (et requireAdmin=true) → redirection vers `/`
- Si autorisé → affichage du composant enfant

---

## 7. Composants React

### 7.1 Hiérarchie des composants

```
App
├── Navbar
│   └── (Liens, ThemeToggle, UserInfo)
│
└── Routes
    ├── Home
    │   └── PostCard (×n)
    │       ├── EmojiReactions
    │       ├── CommentSection
    │       └── Modal
    │           ├── EmojiReactions
    │           └── CommentSection
    │
    ├── Login
    │
    ├── About
    │
    ├── PostDetail
    │   ├── EmojiReactions
    │   └── CommentSection
    │
    └── ProtectedRoute
        └── CreatePost
```

### 7.2 Description des composants

#### Navbar.jsx
**Rôle :** Barre de navigation persistante

**Props :** Aucune (utilise les contextes)

**Fonctionnalités :**
- Logo/nom du site (lien vers accueil)
- Liens de navigation (Accueil, À propos)
- Lien "Nouveau Post" (admin seulement)
- Bouton toggle thème (soleil/lune)
- Affichage nom utilisateur + badge admin
- Bouton connexion/déconnexion

---

#### PostCard.jsx
**Rôle :** Afficher un aperçu d'article

**Props :**
| Prop | Type | Description |
|------|------|-------------|
| post | Object | L'article à afficher |
| comments | Array | Tous les commentaires |
| onToggleReaction | Function | Callback pour les réactions |
| onAddComment | Function | Callback pour ajouter un commentaire |

**Fonctionnalités :**
- Affichage des tags colorés
- Titre et métadonnées (auteur, date)
- Contenu tronqué à 5 lignes (CSS line-clamp)
- Bouton "Lire la suite" ouvrant une modale
- Intégration EmojiReactions
- Intégration CommentSection avec pagination

---

#### Modal.jsx
**Rôle :** Afficher une fenêtre modale

**Props :**
| Prop | Type | Description |
|------|------|-------------|
| isOpen | Boolean | État ouvert/fermé |
| onClose | Function | Callback de fermeture |
| title | String | Titre de la modale |
| children | ReactNode | Contenu de la modale |

**Fonctionnalités :**
- Overlay sombre semi-transparent
- Fermeture au clic sur l'overlay
- Fermeture avec touche Échap
- Blocage du scroll du body quand ouverte
- Bouton X pour fermer
- Contenu scrollable si trop long

---

#### EmojiReactions.jsx
**Rôle :** Afficher et gérer les réactions emoji

**Props :**
| Prop | Type | Description |
|------|------|-------------|
| reactions | Object | { emoji: [userIds] } |
| onToggle | Function | Callback au clic |
| userId | Number | ID de l'utilisateur courant |

**Fonctionnalités :**
- Affichage des 6 emojis
- Compteur par emoji
- Style différent si l'utilisateur a réagi
- Désactivé si non connecté
- Effet hover (scale) si connecté

---

#### CommentSection.jsx
**Rôle :** Afficher et ajouter des commentaires

**Props :**
| Prop | Type | Description |
|------|------|-------------|
| comments | Array | Liste des commentaires |
| onAddComment | Function | Callback d'ajout |
| maxComments | Number | Commentaires par page (défaut: 5) |
| showPagination | Boolean | Afficher la pagination |
| showAll | Boolean | Afficher tous les commentaires |

**Fonctionnalités :**
- Formulaire d'ajout (si connecté)
- Message "Connectez-vous" (si non connecté)
- Liste des commentaires avec auteur et date
- Pagination avec boutons Précédent/Suivant
- Mode "showAll" pour la modale

---

#### ProtectedRoute.jsx
**Rôle :** Protéger l'accès aux routes

**Props :**
| Prop | Type | Description |
|------|------|-------------|
| children | ReactNode | Composant à protéger |
| requireAdmin | Boolean | Nécessite le rôle admin |

**Fonctionnalités :**
- Vérification de l'authentification
- Vérification du rôle admin si nécessaire
- Redirection automatique si non autorisé

---

## 8. Gestion de l'état

### 8.1 État local (useState)

Utilisé pour les états propres à un composant :

```jsx
// Exemple dans PostCard.jsx
const [showModal, setShowModal] = useState(false)

// Exemple dans CommentSection.jsx
const [newComment, setNewComment] = useState('')
const [currentPage, setCurrentPage] = useState(1)
```

### 8.2 État global (Context API)

#### AuthContext

**État géré :**
- `user` : Utilisateur connecté (ou null)

**Fonctions exposées :**
- `login(email, password)` : Connexion
- `logout()` : Déconnexion

**Valeurs dérivées :**
- `isAuthenticated` : Boolean
- `isAdmin` : Boolean

**Persistance :** localStorage (`blogaura_user`)

---

#### ThemeContext

**État géré :**
- `isDark` : Mode sombre activé ou non

**Fonctions exposées :**
- `toggleTheme()` : Basculer le thème

**Persistance :** localStorage (`blogaura_theme`)

**Initialisation :** Préférence système si pas de valeur sauvegardée

---

### 8.3 État partagé via props (lifting state up)

L'état des posts et commentaires est géré dans `App.jsx` et transmis via props :

```jsx
// App.jsx
const [posts, setPosts] = useState(INITIAL_POSTS)
const [comments, setComments] = useState(INITIAL_COMMENTS)

// Fonctions de modification
const addPost = (newPost) => { ... }
const addComment = (postId, comment) => { ... }
const toggleReaction = (postId, emoji, userId) => { ... }

// Transmission aux pages
<Home
  posts={posts}
  comments={comments}
  onToggleReaction={toggleReaction}
  onAddComment={addComment}
/>
```

---

## 9. Système de routing

### 9.1 Configuration des routes

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/about" element={<About />} />
  <Route path="/post/:id" element={<PostDetail />} />
  <Route path="/create" element={
    <ProtectedRoute requireAdmin>
      <CreatePost />
    </ProtectedRoute>
  } />
</Routes>
```

### 9.2 Tableau des routes

| Route | Composant | Accès | Description |
|-------|-----------|-------|-------------|
| `/` | Home | Public | Page d'accueil |
| `/login` | Login | Public | Connexion |
| `/about` | About | Public | À propos |
| `/post/:id` | PostDetail | Public | Détail article |
| `/create` | CreatePost | Admin | Création article |

### 9.3 Navigation programmatique

```jsx
const navigate = useNavigate()

// Redirection après connexion
navigate('/')

// Redirection après création d'article
navigate('/')
```

### 9.4 Paramètres d'URL

```jsx
// Dans PostDetail.jsx
const { id } = useParams()
const post = posts.find(p => p.id === parseInt(id))
```

---

## 10. Stylisation avec Tailwind CSS

### 10.1 Configuration du thème

```css
/* index.css */
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

@theme {
  --color-primary-50: #f0f9ff;
  --color-primary-100: #e0f2fe;
  /* ... autres couleurs */
  --color-primary-900: #0c4a6e;
}
```

### 10.2 Classes utilitaires principales

| Catégorie | Classes utilisées |
|-----------|-------------------|
| Layout | `container`, `mx-auto`, `px-4`, `py-8` |
| Flexbox | `flex`, `items-center`, `justify-between`, `gap-4` |
| Grid | `grid`, `grid-cols-2`, `gap-6` |
| Couleurs | `bg-gray-50`, `text-gray-900`, `bg-primary-600` |
| Dark mode | `dark:bg-gray-900`, `dark:text-white` |
| Bordures | `rounded-xl`, `border`, `shadow-md` |
| Transitions | `transition-colors`, `transition-all` |
| Responsive | `md:grid-cols-1`, `lg:grid-cols-2` |

### 10.3 Dark mode

Implémenté avec la stratégie "class" :

```jsx
// ThemeContext.jsx
if (isDark) {
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.remove('dark')
}
```

Utilisation dans les composants :
```jsx
<div className="bg-white dark:bg-gray-800">
  <p className="text-gray-900 dark:text-white">...</p>
</div>
```

---

## 11. Fonctionnalités bonus

### 11.1 Dark/Light Mode

**Implémentation :**
- Contexte React (`ThemeContext`) pour l'état global
- Classe `dark` sur l'élément `<html>`
- Préférence sauvegardée dans localStorage
- Initialisation basée sur la préférence système

**Interface :**
- Icône soleil (mode sombre → cliquer pour passer en clair)
- Icône lune (mode clair → cliquer pour passer en sombre)

---

### 11.2 Système de tags

**Tags disponibles :**
| Tag | Couleur |
|-----|---------|
| React | Bleu |
| JavaScript | Jaune |
| CSS | Rose |
| Node.js | Vert |
| TypeScript | Bleu foncé |
| Tutoriel | Violet |

**Fonctionnalités :**
- Affichage des tags sur chaque article
- Filtrage des articles par tag sur la page d'accueil
- Sélection multiple de tags lors de la création d'article
- Style visuel distinctif (pastilles colorées)

---

## 12. Guide d'utilisation

### 12.1 Utilisateur non connecté

1. **Consulter les articles**
   - Accéder à la page d'accueil
   - Voir la liste des articles avec aperçu
   - Cliquer sur "Lire la suite" pour voir l'article complet

2. **Filtrer par tag**
   - Cliquer sur un tag dans la barre de filtres
   - Seuls les articles avec ce tag s'affichent
   - Cliquer sur "Tous" pour réinitialiser

3. **Voir les réactions**
   - Les emojis et leurs compteurs sont visibles
   - Impossible de cliquer (désactivé)

4. **Changer le thème**
   - Cliquer sur l'icône soleil/lune dans la navbar

### 12.2 Utilisateur connecté (user)

1. **Se connecter**
   - Aller sur `/login`
   - Entrer email et mot de passe
   - Cliquer sur "Se connecter"

2. **Réagir à un article**
   - Cliquer sur un emoji pour réagir
   - Re-cliquer pour retirer sa réaction

3. **Commenter**
   - Écrire dans le champ "Ajouter un commentaire"
   - Cliquer sur "Envoyer"

4. **Se déconnecter**
   - Cliquer sur "Déconnexion" dans la navbar

### 12.3 Administrateur

1. **Accéder à la création d'article**
   - Se connecter en tant qu'admin
   - Cliquer sur "Nouveau Post" dans la navbar

2. **Créer un article**
   - Remplir le titre
   - Sélectionner un ou plusieurs tags
   - Rédiger le contenu
   - Cliquer sur "Publier"

---

## 13. Choix techniques et justifications

### 13.1 Pourquoi React ?

| Avantage | Explication |
|----------|-------------|
| Composants | Réutilisabilité et maintenabilité |
| Virtual DOM | Performance optimisée |
| Hooks | Gestion d'état simplifiée |
| Écosystème | Large choix de librairies |
| Communauté | Documentation et support |

### 13.2 Pourquoi Vite plutôt que CRA ?

| Critère | Vite | Create React App |
|---------|------|------------------|
| Démarrage | < 1s | 10-30s |
| HMR | Instantané | Lent |
| Build | Rapide | Lent |
| Config | Minimale | Complexe |

### 13.3 Pourquoi Tailwind CSS ?

| Avantage | Explication |
|----------|-------------|
| Rapidité | Pas de fichiers CSS séparés |
| Consistance | Design system intégré |
| Responsive | Classes utilitaires `md:`, `lg:` |
| Dark mode | Support natif |
| Taille | Purge automatique du CSS inutilisé |

### 13.4 Pourquoi Context API plutôt que Redux ?

- Application de taille moyenne
- Pas de logique métier complexe
- Moins de boilerplate
- Intégré nativement à React
- Suffisant pour l'authentification et le thème

---

## 14. Difficultés rencontrées

### 14.1 Configuration Tailwind CSS v4

**Problème :** Erreur PostCSS au démarrage

**Cause :** Tailwind v4 nécessite un plugin PostCSS séparé

**Solution :**
```bash
npm install -D @tailwindcss/postcss @tailwindcss/vite
```

Configuration mise à jour dans `vite.config.js` et `postcss.config.js`

---

### 14.2 Dark mode ne fonctionnait pas

**Problème :** Le toggle ne changeait pas les couleurs

**Cause :** Tailwind v4 utilise media query par défaut

**Solution :** Ajouter la directive custom-variant :
```css
@custom-variant dark (&:where(.dark, .dark *));
```

---

### 14.3 Gestion des réactions emoji

**Problème :** Logique complexe pour toggle les réactions

**Solution :** Fonction avec plusieurs conditions :
1. L'emoji n'existe pas → créer avec l'userId
2. L'utilisateur a déjà réagi → retirer
3. L'utilisateur n'a pas réagi → ajouter

---

## 15. Améliorations futures

### 15.1 Fonctionnelles

| Amélioration | Priorité | Complexité |
|--------------|----------|------------|
| Intégration backend réel | Haute | Haute |
| Système d'inscription | Haute | Moyenne |
| Édition des articles | Moyenne | Moyenne |
| Suppression des commentaires | Moyenne | Faible |
| Recherche d'articles | Moyenne | Moyenne |
| Insertion de GIF dans commentaires | Basse | Moyenne |
| Intégration IA pour améliorer texte | Basse | Haute |

### 15.2 Techniques

| Amélioration | Bénéfice |
|--------------|----------|
| TypeScript | Typage statique, moins de bugs |
| Tests unitaires | Fiabilité du code |
| Tests E2E (Cypress) | Validation des parcours utilisateur |
| PWA | Application installable |
| SSR (Next.js) | SEO et performances |

---

## 16. Conclusion

### 16.1 Bilan

Le projet BlogAura répond aux exigences du cahier des charges :

✅ **Toutes les fonctionnalités obligatoires** sont implémentées
✅ **Deux fonctionnalités bonus** (Dark mode et Tags)
✅ **Code commenté** et documenté
✅ **Architecture propre** et maintenable
✅ **Interface responsive** et moderne

### 16.2 Compétences acquises

- Développement React avec hooks
- Gestion d'état avec Context API
- Routing avec React Router
- Stylisation avec Tailwind CSS
- Organisation d'un projet front-end
- Documentation technique

### 16.3 Points forts du projet

1. **UX soignée** : Transitions fluides, feedback visuel
2. **Accessibilité** : Attributs ARIA, navigation au clavier
3. **Responsive** : Adapté mobile, tablette, desktop
4. **Maintenabilité** : Composants découplés, code commenté
5. **Extensibilité** : Architecture prête pour un backend

---

## Annexes

### A. Comptes de test

```
Admin:
  Email: admin@blog.com
  Password: admin123

User 1:
  Email: user@blog.com
  Password: user123

User 2:
  Email: marie@blog.com
  Password: marie123
```

### B. Scripts npm disponibles

```bash
npm run dev      # Lancer en développement
npm run build    # Construire pour la production
npm run preview  # Prévisualiser le build
```

### C. Dépendances du projet

**Production :**
- react
- react-dom
- react-router-dom

**Développement :**
- vite
- @vitejs/plugin-react
- tailwindcss
- @tailwindcss/vite
- @tailwindcss/postcss
- postcss
- autoprefixer

---

**Document rédigé le :** Février 2026
**Projet :** BlogAura - DEV Learn IT B3
