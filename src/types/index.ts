export type PriceRange = {
  min?: number
  max?: number
}

export type RecipientType = 'homme' | 'femme' | 'enfant' | 'adolescent' | 'senior'

export type Interest = 
  | 'sports' 
  | 'technologie' 
  | 'mode' 
  | 'cuisine' 
  | 'lecture' 
  | 'jeux'
  | 'décoration'
  | 'bien-être'
  | 'musique' 
  | 'art'
  | 'sport'
  | 'gourmandise'
  | 'développement personnel'
  | 'jardinage'
  | 'détente'
  | 'boissons'
  | 'films'
  | 'séries'
  | 'jeux vidéo'
  | 'beauté'
  | 'plein air'
  | 'créativité'
  | 'apprentissage'
  | 'shopping'
  | 'maison'
  | 'photographie' 
  | 'voyage'

export type Category = 
  | 'électronique'
  | 'divers' 
  | 'décoration'
  | 'divertissement'
  | 'voyage'
  | 'technologie'
  | 'électroménager' 
  | 'livres'
  | 'loisirs' 
  | 'jeux'
  | 'livre'
  | 'bien-être'
  | 'jardinage'
  | 'gourmandise'
  | 'mode' 
  | 'sport' 
  | 'expérience'
  | 'cuisine' 
  | 'beauté'

export type Occasion = 
  | 'anniversaire' 
  | 'noël' 
  | 'mariage' 
  | 'naissance' 
  | 'saint-valentin' 
  | 'fête-des-mères' 
  | 'fête-des-pères'

export type Gift = {
  id: string
  name: string
  description: string
  price: number
  imageSrc: string
  purchaseUrl: string
  categories: Category[]
  interests: Interest[]
  recipientTypes: RecipientType[]
  occasions: Occasion[]
}