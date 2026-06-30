export interface CommunityCategory {
  id: string
  title: string
  description?: string
  order?: number
}

export interface CommunityPackage {
  id: string
  categoryId: string
  title: string
  description: string
  /** Pre-rendered card image (16:9). Overrides composed thumbnail. */
  thumbnail?: string
  /** Square dapp/service logo. Composed onto a gradient when `thumbnail` is unset. */
  logoUrl?: string
  zipUrl: string
  author?: string
  size?: number
  sha256?: string
  programIds?: string[]
  network?: 'mainnet-beta' | 'devnet' | 'testnet' | 'custom'
  tags?: string[]
  createdAt?: string
}

export interface CommunityIndex {
  version: number
  updatedAt?: string
  categories: CommunityCategory[]
  packages: CommunityPackage[]
}
