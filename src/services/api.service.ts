import { Books } from '../models/books';
import { Characters } from '../models/characters';
import { Houses } from '../models/houses';
import { Spells } from '../models/spell';

const BASE_URL = 'https://potterapi-fedeperin.vercel.app/en';

export const getBooks = (): Promise<Books> => {
  return fetch(`${BASE_URL}/books`).then((res) => res.json());
};
export const getCharacters = (): Promise<Characters> => {
  return fetch(`${BASE_URL}/characters`).then((res) => res.json());
};
export const getHouses = (): Promise<Houses> => {
  return fetch(`${BASE_URL}/houses`).then((res) => res.json());
};
export const getSpells = (): Promise<Spells> => {
  return fetch(`${BASE_URL}/spells`).then((res) => res.json());
};
