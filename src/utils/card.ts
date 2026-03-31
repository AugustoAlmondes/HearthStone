import type { CardClass } from "../types/card.types";

export const getClassColors = (classe: CardClass) => {
    switch (classe) {
        case "Mago":
            return "from-tertiary-600 to-tertiary-800 border-tertiary-300 text-tertiary-100";
        case "Paladino":
            return "from-primary-300 to-primary-500 border-primary-200 text-primary-900";
        case "Caçador":
            return "from-green-600 to-green-800 border-green-400 text-green-100";
        case "Druida":
            return "from-emerald-700 to-emerald-900 border-emerald-500 text-emerald-100";
        default:
            return "from-neutral-500 to-neutral-700 border-neutral-300 text-neutral-900";
    }
};

export const getManaColor = (mana: number) => {
    // Escala de azul claro ao roxo intenso
    if (mana <= 2) return "bg-blue-400 border-blue-200 text-white shadow-[0_0_10px_theme(colors.blue.400)]";
    if (mana <= 5) return "bg-blue-600 border-blue-300 text-white shadow-[0_0_10px_theme(colors.blue.500)]";
    if (mana <= 8) return "bg-indigo-600 border-indigo-400 text-white shadow-[0_0_12px_theme(colors.indigo.500)]";
    return "bg-tertiary-600 border-tertiary-300 text-white shadow-[0_0_15px_theme(colors.tertiary.500)]";
};