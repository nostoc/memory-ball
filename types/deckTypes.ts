
export interface Deck {
  _id: string;
  title: string;
  description?: string;
  owner: string;
  isPublic: boolean;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface DeckFormData {
  title: string;
  description: string;
  isPublic: boolean;
  tags?: string[];
}