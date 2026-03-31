import { useEffect, useState } from "react"
import Modal from "../components/CardList/Modal"
import Aside from "../components/list/Aside"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "../components/ui/select"
import { PlusCircle, Search, X } from "lucide-react"
import { useCardStore } from "../store/cardStore"
import CardItem from "../components/CardList/CardItem"
import useCardFilters, { type CardFilters } from "../hooks/useCardFilters"
import type { CardClass, CardType } from "../types/card.types"

const classes = [
    "Mago",
    "Paladino",
    "Caçador",
    "Druida",
    "Qualquer",
]

const types = [
    "Magia",
    "Criatura",
    "Qualquer",
]

export default function List() {

    const {
        isFormOpen,
        cards,
        selectedCard,
        loadCards,
        createCard,
        updateCard,
        deleteCard,
        openForm,
        closeForm

    } = useCardStore();

    const [filters, setFilters] = useState<CardFilters>({ search: "", class: "", type: "" });
    const filteredCards = useCardFilters(cards, filters);

    useEffect(() => {
        loadCards();
    }, []);

    return (

        

        <>
            <div className="flex">
                <Aside />
                <div className="w-full min-h-screen pt-35 px-10 bg-linear-to-r from-neutral to-neutral-100">

                    <div>

                        <h1 className="text-neutral-900 text-6xl font-newsreader font-bold">
                            SUA COLEÇÃO
                        </h1>
                        <p className="text-neutral-700 text-lg font-light">
                            Gerencie suas cartas mais poderosas, crie baralhos e compartilhe com a comunidade.
                        </p>
                    </div>

                    <form className="mt-10 flex gap-6 items-end justify-between flex-wrap bg-neutral-100 p-8 rounded-md border border-primary-800 shadow-[0_4px_20px_rgba(0,0,0,0.6)] relative overflow-hidden">
                        {/* decorative corner accents */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-primary-400"></div>
                        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-primary-400"></div>
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-primary-400"></div>
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-primary-400"></div>

                        <div className="flex flex-col gap-2 flex-1 min-w-[280px] z-10">
                            <label className="text-primary-300 font-manrope text-xs uppercase tracking-[0.2em] font-bold flex items-center gap-2">
                                Procurar Carta
                            </label>
                            <div className="relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-600 group-focus-within:text-primary-400 transition-colors" />
                                <input
                                    className="pl-11 pr-4 h-12 w-full bg-neutral-200/80 text-neutral-900 placeholder:text-neutral-500 outline-none border border-primary-900/80 focus:border-primary-400 focus:bg-neutral-200 transition-all shadow-inner font-manrope text-sm rounded-sm"
                                    type="text"
                                    placeholder="Buscar por ID ou nome..."
                                    value={filters.search}
                                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 min-w-[180px] z-10">
                            <label className="text-primary-300 font-manrope text-xs uppercase tracking-[0.2em] font-bold">
                                Classe
                            </label>
                            <Select 
                                value={filters.class || "Todas"} 
                                onValueChange={(val) => setFilters({ ...filters, class: val === "Todas" ? "" : val as CardClass })}
                            >
                                <SelectTrigger className="cursor-pointer h-12 w-full rounded-sm border border-primary-900/80 bg-neutral-200/80 text-neutral-900 hover:border-primary-500 focus:bg-neutral-200 focus:border-primary-400 transition-all font-manrope text-sm shadow-inner group-focus-within:border-primary-400">
                                    <SelectValue placeholder="Todas as classes" />
                                </SelectTrigger>
                                <SelectContent className="rounded-sm border border-primary-600 bg-neutral-200 shadow-[0_5px_15px_rgba(0,0,0,0.7)]">
                                    <SelectGroup className="p-0">
                                        <SelectItem className="text-neutral-900 cursor-pointer rounded-none hover:text-primary-300 focus:text-primary-300 transition-colors font-manrope" value="Todas">Todas as classes</SelectItem>
                                        {classes.map((c) => (
                                            <SelectItem className="text-neutral-900 cursor-pointer rounded-none hover:text-primary-300 focus:text-primary-300 transition-colors font-manrope" key={c} value={c}>{c}</SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex flex-col gap-2 min-w-[180px] z-10">
                            <label className="text-primary-300 font-manrope text-xs uppercase tracking-[0.2em] font-bold">
                                Tipo
                            </label>
                            <Select 
                                value={filters.type || "Todos"} 
                                onValueChange={(val) => setFilters({ ...filters, type: val === "Todos" ? "" : val as CardType })}
                            >
                                <SelectTrigger className="cursor-pointer h-12 w-full rounded-sm border border-primary-900/80 bg-neutral-200/80 text-neutral-900 hover:border-primary-500 focus:bg-neutral-200 focus:border-primary-400 transition-all font-manrope text-sm shadow-inner">
                                    <SelectValue placeholder="Todos os tipos" />
                                </SelectTrigger>
                                <SelectContent className="rounded-sm border border-primary-600 bg-neutral-200 shadow-[0_5px_15px_rgba(0,0,0,0.7)]">
                                    <SelectGroup className="p-0">
                                        <SelectItem className="text-neutral-900 cursor-pointer rounded-none hover:text-primary-300 focus:text-primary-300 transition-colors font-manrope" value="Todos">Todos os tipos</SelectItem>
                                        {types.map((t) => (
                                            <SelectItem className="text-neutral-900 cursor-pointer rounded-none hover:text-primary-300 focus:text-primary-300 transition-colors font-manrope" key={t} value={t}>{t}</SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex items-end h-full z-10 w-full md:w-auto mt-2 md:mt-0">
                            <button 
                                type="button" 
                                onClick={() => setFilters({ search: "", class: "", type: "" })}
                                className="group h-12 px-5 flex w-full md:w-auto items-center justify-center gap-2 font-manrope text-xs uppercase tracking-wider font-bold text-neutral-700 bg-neutral-200 border border-neutral-400 rounded-sm hover:border-primary-400 hover:text-primary-300 hover:bg-neutral transition-all shadow-sm cursor-pointer"
                            >
                                <X className="w-4 h-4 group-hover:text-primary-400 transition-colors" />
                                Limpar
                            </button>
                        </div>
                    </form>

                    <div className="flex flex-wrap gap-6 mx justify-center mt-15">
                        {filteredCards.length === 0 ? (
                            <div className="w-full text-center py-12">
                                <p className="text-neutral-600 font-manrope text-lg">Nenhuma carta encontrada.</p>
                            </div>
                        ) : (
                            filteredCards.map((c) => (
                                <CardItem key={c.id} card={c} onDelete={deleteCard} onEdit={openForm} />
                            ))
                        )}
                        <div
                            onClick={() => openForm()}
                            className="relative group perspective-1000 w-[240px] h-[360px] cursor-pointer">
                            <div className="relative w-full h-full rounded-xl transition-all duration-300 transform-gpu group-hover:border-neutral-400 flex flex-col overflow-visible bg-neutral-200/30 border-2 border-dashed border-neutral-300">
                                <div className="flex flex-col gap-2 items-center justify-center h-full">
                                    <PlusCircle size={50} className="text-neutral-300 group-hover:text-neutral-400 transition-colors" />
                                    <h2 className="text-neutral-300 font-newsreader text-2xl font-bold group-hover:text-neutral-400 transition-colors">Nova carta</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                isFormOpen={isFormOpen}
                closeForm={closeForm}
                createCard={createCard}
                updateCard={updateCard}
                selectedCard={selectedCard}
            />
        </>
    )
}