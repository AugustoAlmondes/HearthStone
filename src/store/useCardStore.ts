import { v4 as uuidv4 } from "uuid";
import { cardService } from "../services/cardService";
import { type Card, type CardFormData } from "../types/card.types";
import { create } from 'zustand';
import { seedCards } from "../data/seedCards";

interface CardStore {
    cards: Card[];
    selectedCard: Card | null;
    isFormOpen: boolean;

    loadCards: () => void;
    createCard: (data: CardFormData) => void;
    updateCard: (id: string, data: CardFormData) => void;
    deleteCard: (id: string) => void;
    selectCard: (card: Card | null) => void;
    openForm: (card?: Card) => void;
    closeForm: () => void;
}

export const useCardStore = create<CardStore>((set, get) => ({
    cards: [],
    selectedCard: null,
    isFormOpen: false,

    loadCards: () => {
        let cards = cardService.getAll();
        
        // Popula com seed se o storage estiver vazio ou contiver dados antigos (sem campo 'nome')
        const isOldData = cards.length > 0 && !('nome' in cards[0]);
        if (cards.length === 0 || isOldData) {
            cardService.save(seedCards);
            cards = seedCards;
        }
        
        set({ cards });
    },

    createCard: (data) => {
        const newCard: Card = { id: uuidv4(), ...data };
        const updated = cardService.create(get().cards, newCard);
        set({ cards: updated, isFormOpen: false, selectedCard: null });
    },

    updateCard: (id, data) => {
        const updated = cardService.update(get().cards, { id, ...data });
        set({ cards: updated, isFormOpen: false, selectedCard: null })
    },

    deleteCard: (id) => {
        const updated = cardService.delete(get().cards, id);
        set({ cards: updated });
    },

    selectCard: (card) => set({ selectedCard: card }),

    openForm: (card = undefined) => {
        set({ isFormOpen: true, selectedCard: card ?? null })
    },

    closeForm: () => {
        set({ isFormOpen: false, selectedCard: null })
    }
}))