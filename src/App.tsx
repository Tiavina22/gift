import React, { useState, useEffect } from 'react'
import { Gift as GiftIcon, Shuffle, Heart } from 'lucide-react'
import { Filters } from './components/Filters'
import { GiftGrid } from './components/GiftGrid'
import type { Gift, PriceRange, RecipientType, Interest, Category, Occasion } from './types'
import { ThemeProvider } from './theme/ThemeContext'
import { ThemeToggle } from './components/ThemeToggle'
import { useFavorites } from './hooks/useFavorites'

// On remplacer par une vraie API)plus tard
const mockGifts: Gift[] = [
  {
    id: '1',
    name: 'Casque audio sans fil',
    description: 'Casque bluetooth avec réduction de bruit active, parfait pour la musique et les appels',
    price: 199.99,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    purchaseUrl: '#',
    categories: ['électronique'],
    interests: ['musique', 'technologie'],
    recipientTypes: ['homme', 'femme', 'adolescent'],
    occasions: ['anniversaire', 'noël']
  },
  {
    id: '2',
    name: 'Kit de jardinage',
    description: 'Ensemble complet d\'outils de jardinage avec sac de rangement',
    price: 49.99,
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b',
    purchaseUrl: '#',
    categories: ['jardinage'],
    interests: ['jardinage'],
    recipientTypes: ['homme', 'femme', 'senior'],
    occasions: ['anniversaire', 'fête-des-mères', 'fête-des-pères']
  },
  {
    id: '3',
    name: 'Montre connectée',
    description: 'Montre intelligente avec suivi d\'activité, notifications et autonomie de 7 jours',
    price: 129.99,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
    purchaseUrl: '#',
    categories: ['électronique', 'mode'],
    interests: ['sport', 'technologie'],
    recipientTypes: ['homme', 'femme', 'adolescent'],
    occasions: ['anniversaire', 'noël']
  },
  {
    id: '4',
    name: 'Coffret de chocolats fins',
    description: 'Assortiment de chocolats artisanaux dans un élégant coffret cadeau',
    price: 29.99,
    imageUrl: 'https://images.unsplash.com/photo-1511381939415-e44015466834',
    purchaseUrl: '#',
    categories: ['gourmandise'],
    interests: ['cuisine', 'gourmandise'],
    recipientTypes: ['homme', 'femme'],
    occasions: ['anniversaire', 'noël', 'fête-des-mères']
  },
  {
    id: '5',
    name: 'Cours de cuisine en ligne',
    description: 'Accès à un cours de cuisine en ligne avec un chef professionnel',
    price: 59.99,
    imageUrl: 'https://images.unsplash.com/photo-1493770348161-369560ae357d',
    purchaseUrl: '#',
    categories: ['expérience'],
    interests: ['cuisine'],
    recipientTypes: ['homme', 'femme'],
    occasions: ['anniversaire', 'fête-des-mères', 'fête-des-pères']
  },
  {
    id: '6',
    name: 'Livre de développement personnel',
    description: 'Best-seller sur la gestion du temps et la productivité',
    price: 19.99,
    imageUrl: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19',
    purchaseUrl: '#',
    categories: ['livre'],
    interests: ['lecture', 'développement personnel'],
    recipientTypes: ['homme', 'femme'],
    occasions: ['anniversaire', 'noël']
  },
  {
    id: '7',
    name: 'Bougie parfumée',
    description: 'Bougie artisanale avec parfum vanille et amande',
    price: 24.99,
    imageUrl: 'https://images.unsplash.com/photo-1589782182703-2aaa69037b5b',
    purchaseUrl: '#',
    categories: ['décoration'],
    interests: ['décoration', 'bien-être'],
    recipientTypes: ['homme', 'femme'],
    occasions: ['anniversaire', 'noël', 'fête-des-mères']
  },
  {
    id: '8',
    name: 'Carte cadeau spa',
    description: 'Carte cadeau pour une journée de détente dans un spa local',
    price: 79.99,
    imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874',
    purchaseUrl: '#',
    categories: ['expérience'],
    interests: ['bien-être'],
    recipientTypes: ['homme', 'femme'],
    occasions: ['anniversaire', 'fête-des-mères']
  },
  {
    id: '9',
    name: 'Jeu de société',
    description: 'Jeu de stratégie pour 2 à 4 joueurs, durée de jeu : 60 minutes',
    price: 39.99,
    imageUrl: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09',
    purchaseUrl: '#',
    categories: ['loisirs'],
    interests: ['jeux'],
    recipientTypes: ['homme', 'femme', 'adolescent'],
    occasions: ['anniversaire', 'noël']
  },
  {
    id: '10',
    name: 'Tapis de yoga',
    description: 'Tapis de yoga antidérapant et écologique',
    price: 34.99,
    imageUrl: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0',
    purchaseUrl: '#',
    categories: ['sport'],
    interests: ['sport', 'bien-être'],
    recipientTypes: ['homme', 'femme'],
    occasions: ['anniversaire', 'noël']
  },
  {
    id: '11',
    name: 'Drone avec caméra HD',
    description: 'Drone compact avec caméra HD pour des prises de vue aériennes impressionnantes',
    price: 299.99,
    imageUrl: 'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9',
    purchaseUrl: '#',
    categories: ['électronique', 'loisirs'],
    interests: ['technologie', 'photographie'],
    recipientTypes: ['homme', 'femme', 'adolescent'],
    occasions: ['anniversaire', 'noël']
  },
  {
    id: '12',
    name: 'Coussin chauffant',
    description: 'Coussin relaxant avec fonction chauffante pour soulager les tensions musculaires',
    price: 39.99,
    imageUrl: 'https://images.unsplash.com/photo-1616628188551-2d5bd3a54b1a',
    purchaseUrl: '#',
    categories: ['bien-être'],
    interests: ['bien-être', 'détente'],
    recipientTypes: ['homme', 'femme', 'senior'],
    occasions: ['anniversaire', 'fête-des-mères', 'fête-des-pères']
  },
  {
    id: '13',
    name: 'Enceinte portable étanche',
    description: 'Enceinte Bluetooth résistante à l\'eau pour écouter de la musique partout',
    price: 89.99,
    imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b',
    purchaseUrl: '#',
    categories: ['électronique'],
    interests: ['musique', 'technologie'],
    recipientTypes: ['homme', 'femme', 'adolescent'],
    occasions: ['anniversaire', 'noël']
  },
  {
    id: '14',
    name: 'Coffret de thé premium',
    description: 'Sélection de thés rares et savoureux dans un coffret cadeau élégant',
    price: 49.99,
    imageUrl: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9',
    purchaseUrl: '#',
    categories: ['gourmandise'],
    interests: ['cuisine', 'détente'],
    recipientTypes: ['homme', 'femme'],
    occasions: ['anniversaire', 'fête-des-mères']
  },
  {
    id: '15',
    name: 'Lampe de lecture LED',
    description: 'Lampe de lecture réglable avec lumière chaude pour un confort optimal',
    price: 29.99,
    imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae',
    purchaseUrl: '#',
    categories: ['décoration', 'électronique'],
    interests: ['lecture', 'décoration'],
    recipientTypes: ['homme', 'femme', 'senior'],
    occasions: ['anniversaire', 'noël']
  },
  {
    id: '16',
    name: 'Carte cadeau Netflix',
    description: 'Carte cadeau pour un abonnement Netflix de 6 mois',
    price: 59.99,
    imageUrl: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb',
    purchaseUrl: '#',
    categories: ['divertissement'],
    interests: ['films', 'séries'],
    recipientTypes: ['homme', 'femme', 'adolescent'],
    occasions: ['anniversaire', 'noël']
  },
  {
    id: '17',
    name: 'Sac à dos anti-vol',
    description: 'Sac à dos sécurisé avec fermetures éclair dissimulées et protection RFID',
    price: 79.99,
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62',
    purchaseUrl: '#',
    categories: ['mode', 'voyage'],
    interests: ['voyage', 'technologie'],
    recipientTypes: ['homme', 'femme'],
    occasions: ['anniversaire', 'noël']
  },
  {
    id: '18',
    name: 'Cafetière programmable',
    description: 'Cafetière avec minuterie et fonction keep-warm pour des matins sans stress',
    price: 69.99,
    imageUrl: 'https://images.unsplash.com/photo-1595854341625-f33ee10dbf94',
    purchaseUrl: '#',
    categories: ['électroménager'],
    interests: ['cuisine'],
    recipientTypes: ['homme', 'femme'],
    occasions: ['anniversaire', 'fête-des-mères', 'fête-des-pères']
  },
  {
    id: '19',
    name: 'Puzzle 1000 pièces',
    description: 'Puzzle artistique de 1000 pièces pour les amateurs de défis',
    price: 24.99,
    imageUrl: 'https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6',
    purchaseUrl: '#',
    categories: ['loisirs'],
    interests: ['jeux', 'détente'],
    recipientTypes: ['homme', 'femme', 'senior'],
    occasions: ['anniversaire', 'noël']
  },
  {
    id: '20',
    name: 'Bouquet de fleurs séchées',
    description: 'Bouquet de fleurs séchées pour une décoration intérieure élégante',
    price: 44.99,
    imageUrl: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f',
    purchaseUrl: '#',
    categories: ['décoration'],
    interests: ['décoration'],
    recipientTypes: ['homme', 'femme'],
    occasions: ['anniversaire', 'fête-des-mères']
  },
  {
    id: '21',
    name: 'Carte cadeau restaurant',
    description: 'Carte cadeau pour un dîner dans un restaurant gastronomique',
    price: 100.00,
    imageUrl: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c',
    purchaseUrl: '#',
    categories: ['expérience'],
    interests: ['cuisine'],
    recipientTypes: ['homme', 'femme'],
    occasions: ['anniversaire', 'fête-des-mères', 'fête-des-pères']
  },
  {
    id: '22',
    name: 'Stylo 3D',
    description: 'Stylo pour dessiner en 3D avec des filaments de couleur',
    price: 59.99,
    imageUrl: 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe',
    purchaseUrl: '#',
    categories: ['loisirs', 'technologie'],
    interests: ['créativité', 'technologie'],
    recipientTypes: ['adolescent', 'enfant'],
    occasions: ['anniversaire', 'noël']
  },
  {
    id: '23',
    name: 'Coffret de bières artisanales',
    description: 'Sélection de bières artisanales locales dans un coffret cadeau',
    price: 39.99,
    imageUrl: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13',
    purchaseUrl: '#',
    categories: ['gourmandise'],
    interests: ['boissons'],
    recipientTypes: ['homme', 'femme'],
    occasions: ['anniversaire', 'fête-des-pères']
  },
  {
    id: '24',
    name: 'Tente de camping légère',
    description: 'Tente compacte et légère pour les amateurs de plein air',
    price: 129.99,
    imageUrl: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7',
    purchaseUrl: '#',
    categories: ['sport', 'voyage'],
    interests: ['plein air'],
    recipientTypes: ['homme', 'femme'],
    occasions: ['anniversaire', 'noël']
  },
  {
    id: '25',
    name: 'Carte cadeau Spotify',
    description: 'Carte cadeau pour un abonnement Spotify Premium de 6 mois',
    price: 59.99,
    imageUrl: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff',
    purchaseUrl: '#',
    categories: ['divertissement'],
    interests: ['musique'],
    recipientTypes: ['homme', 'femme', 'adolescent'],
    occasions: ['anniversaire', 'noël']
  },
  {
    id: '26',
    name: 'Réveil simulateur d\'aube',
    description: 'Réveil qui simule le lever du soleil pour un réveil naturel et en douceur',
    price: 89.99,
    imageUrl: 'https://images.unsplash.com/photo-1582771498000-8ad44e6c84db',
    purchaseUrl: '#',
    categories: ['bien-être'],
    interests: ['bien-être', 'détente'],
    recipientTypes: ['homme', 'femme'],
    occasions: ['anniversaire', 'noël']
  },
  {
    id: '27',
    name: 'Coffret de vins rouges',
    description: 'Sélection de vins rouges de différentes régions dans un coffret cadeau',
    price: 79.99,
    imageUrl: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb',
    purchaseUrl: '#',
    categories: ['gourmandise'],
    interests: ['boissons'],
    recipientTypes: ['homme', 'femme'],
    occasions: ['anniversaire', 'noël', 'fête-des-pères']
  },
  {
    id: '28',
    name: 'Robot aspirateur',
    description: 'Aspirateur robot intelligent avec navigation laser et contrôle via smartphone',
    price: 299.99,
    imageUrl: 'https://images.unsplash.com/photo-1587049016823-69ef9d68bd44',
    purchaseUrl: '#',
    categories: ['électroménager'],
    interests: ['technologie', 'maison'],
    recipientTypes: ['homme', 'femme'],
    occasions: ['anniversaire', 'noël']
  },
  {
    id: '29',
    name: 'Carte cadeau cinéma',
    description: 'Carte cadeau pour une séance de cinéma dans un complexe partenaire',
    price: 25.00,
    imageUrl: 'https://images.unsplash.com/photo-1595769816263-9b910be24d5f',
    purchaseUrl: '#',
    categories: ['divertissement'],
    interests: ['films'],
    recipientTypes: ['homme', 'femme', 'adolescent'],
    occasions: ['anniversaire', 'noël']
  },
  {
    id: '30',
    name: 'Coussin massant chauffant',
    description: 'Coussin de massage avec fonction chauffante pour soulager les tensions',
    price: 69.99,
    imageUrl: 'https://images.unsplash.com/photo-1616628188551-2d5bd3a54b1a',
    purchaseUrl: '#',
    categories: ['bien-être'],
    interests: ['bien-être', 'détente'],
    recipientTypes: ['homme', 'femme', 'senior'],
    occasions: ['anniversaire', 'fête-des-mères', 'fête-des-pères']
  },
  {
    id: '31',
    name: 'Carte cadeau Amazon',
    description: 'Carte cadeau pour acheter tout ce que vous voulez sur Amazon',
    price: 50.00,
    imageUrl: 'https://images.unsplash.com/photo-1605787020600-b9ebd5df1d07',
    purchaseUrl: '#',
    categories: ['divers'],
    interests: ['shopping'],
    recipientTypes: ['homme', 'femme', 'adolescent'],
    occasions: ['anniversaire', 'noël']
  },
  {
    id: '32',
    name: 'Kit de cocktail',
    description: 'Kit complet pour préparer des cocktails à la maison, avec recettes incluses',
    price: 59.99,
    imageUrl: 'https://images.unsplash.com/photo-1551751299-1b51cab2694c',
    purchaseUrl: '#',
    categories: ['gourmandise'],
    interests: ['boissons', 'cuisine'],
    recipientTypes: ['homme', 'femme'],
    occasions: ['anniversaire', 'noël']
  },
  {
    id: '33',
    name: 'Carte cadeau voyage',
    description: 'Carte cadeau pour réserver un voyage ou des activités via une plateforme partenaire',
    price: 200.00,
    imageUrl: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b',
    purchaseUrl: '#',
    categories: ['voyage'],
    interests: ['voyage'],
    recipientTypes: ['homme', 'femme'],
    occasions: ['anniversaire', 'noël']
  },
  {
    id: '34',
    name: 'Carte cadeau cours en ligne',
    description: 'Carte cadeau pour suivre des cours en ligne sur une plateforme éducative',
    price: 100.00,
    imageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8',
    purchaseUrl: '#',
    categories: ['expérience'],
    interests: ['apprentissage'],
    recipientTypes: ['homme', 'femme'],
    occasions: ['anniversaire', 'noël']
  },
  {
    id: '35',
    name: 'Carte cadeau sport',
    description: 'Carte cadeau pour un abonnement dans une salle de sport ou des cours de fitness',
    price: 75.00,
    imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b',
    purchaseUrl: '#',
    categories: ['sport'],
    interests: ['sport'],
    recipientTypes: ['homme', 'femme'],
    occasions: ['anniversaire', 'noël']
  },
  {
    id: '36',
    name: 'Carte cadeau musique',
    description: 'Carte cadeau pour acheter de la musique ou des albums sur une plateforme en ligne',
    price: 30.00,
    imageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad',
    purchaseUrl: '#',
    categories: ['divertissement'],
    interests: ['musique'],
    recipientTypes: ['homme', 'femme', 'adolescent'],
    occasions: ['anniversaire', 'noël']
  },
  {
    id: '37',
    name: 'Carte cadeau livre',
    description: 'Carte cadeau pour acheter des livres dans une librairie partenaire',
    price: 40.00,
    imageUrl: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d',
    purchaseUrl: '#',
    categories: ['livre'],
    interests: ['lecture'],
    recipientTypes: ['homme', 'femme'],
    occasions: ['anniversaire', 'noël']
  },
  {
    id: '38',
    name: 'Carte cadeau jeu vidéo',
    description: 'Carte cadeau pour acheter des jeux vidéo ou du contenu supplémentaire',
    price: 50.00,
    imageUrl: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e',
    purchaseUrl: '#',
    categories: ['divertissement'],
    interests: ['jeux vidéo'],
    recipientTypes: ['homme', 'femme', 'adolescent'],
    occasions: ['anniversaire', 'noël']
  },
  {
    id: '39',
    name: 'Carte cadeau beauté',
    description: 'Carte cadeau pour des produits de beauté ou des soins dans un magasin partenaire',
    price: 60.00,
    imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9',
    purchaseUrl: '#',
    categories: ['beauté'],
    interests: ['beauté'],
    recipientTypes: ['femme'],
    occasions: ['anniversaire', 'fête-des-mères']
  },
  {
    id: '40',
    name: 'Carte cadeau mode',
    description: 'Carte cadeau pour acheter des vêtements ou accessoires dans un magasin partenaire',
    price: 80.00,
    imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b',
    purchaseUrl: '#',
    categories: ['mode'],
    interests: ['mode'],
    recipientTypes: ['homme', 'femme'],
    occasions: ['anniversaire', 'noël']
  }
]

function App() {
  const [priceRange, setPriceRange] = useState<PriceRange>({})
  const [selectedRecipient, setSelectedRecipient] = useState<RecipientType | null>(null)
  const [selectedInterests, setSelectedInterests] = useState<Interest[]>([])
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([])
  const [selectedOccasion, setSelectedOccasion] = useState<Occasion | null>(null)
  const [showOnlyFavorites, setShowOnlyFavorites] = useState<boolean>(false)
  const [sortOrder, setSortOrder] = useState<'relevance' | 'price-asc' | 'price-desc'>('relevance')
  const { favorites, toggleFavorite } = useFavorites()

  const filteredGifts = mockGifts.filter((gift) => {
    if (priceRange.min && gift.price < priceRange.min) return false
    if (priceRange.max && gift.price > priceRange.max) return false
    if (selectedRecipient && !gift.recipientTypes.includes(selectedRecipient)) return false
    if (selectedInterests.length > 0 && !selectedInterests.some(interest => gift.interests.includes(interest))) return false
    if (selectedCategories.length > 0 && !selectedCategories.some(category => gift.categories.includes(category))) return false
    if (selectedOccasion && !gift.occasions.includes(selectedOccasion)) return false
    return true
  })

  const getRandomSuggestions = () => {
    setSelectedRecipient(null)
    setSelectedInterests([])
    setSelectedCategories([])
    setSelectedOccasion(null)
    setPriceRange({})
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <header className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <GiftIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Idées Cadeaux</h1>
              </div>
              <div className="flex items-center gap-4">
                <ThemeToggle />
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {favorites.length} favori{favorites.length !== 1 ? 's' : ''}
                </div>
                <button
                  onClick={getRandomSuggestions}
                  className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <Shuffle className="w-4 h-4" />
                  Suggestions aléatoires
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-[300px,1fr] gap-8">
            <aside>
              <Filters
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                selectedRecipient={selectedRecipient}
                setSelectedRecipient={setSelectedRecipient}
                selectedInterests={selectedInterests}
                setSelectedInterests={setSelectedInterests}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                selectedOccasion={selectedOccasion}
                setSelectedOccasion={setSelectedOccasion}
              />
            </aside>

            <div>
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                  <p className="text-gray-600 dark:text-gray-400">
                    {filteredGifts.length} résultat{filteredGifts.length !== 1 ? 's' : ''}
                  </p>
                  <button
                    onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                      showOnlyFavorites
                        ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 border-2 border-red-500'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${showOnlyFavorites ? 'fill-current' : ''}`} />
                    Favoris
                  </button>
                </div>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as typeof sortOrder)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="relevance">Pertinence</option>
                  <option value="price-asc">Prix croissant</option>
                  <option value="price-desc">Prix décroissant</option>
                </select>
              </div>

              <GiftGrid
                gifts={showOnlyFavorites ? filteredGifts.filter(gift => favorites.includes(gift.id)) : filteredGifts}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
                sortOrder={sortOrder}
              />
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App