import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { cardSchema, type Card, type CardFormData, CARD_TYPES, CARD_CLASSES } from "../../types/card.types";

interface ModalProps {
    isFormOpen: boolean;
    closeForm: () => void;
    createCard: (data: CardFormData) => void;
    updateCard: (id: string, data: CardFormData) => void;
    selectedCard?: Card | null;
}

export default function Modal({
    isFormOpen,
    closeForm,
    createCard,
    updateCard,
    selectedCard
}: ModalProps) {
    const isEditing = !!selectedCard;

    const {
        register,
        handleSubmit,
        control,
        reset,
        watch,
        formState: { errors }
    } = useForm<CardFormData>({
        resolver: zodResolver(cardSchema),
        defaultValues: {
            name: "",
            description: "",
            type: "Criatura",
            class: "Qualquer",
            attack: 0,
            defense: 0,
            mana: 1,
        }
    });

    const watchType = watch("type");

    useEffect(() => {
        if (isFormOpen) {
            if (selectedCard) {
                reset({
                    name: selectedCard.name,
                    description: selectedCard.description,
                    type: selectedCard.type,
                    class: selectedCard.class,
                    attack: selectedCard.attack,
                    defense: selectedCard.defense,
                    mana: selectedCard.mana,
                });
            } else {
                reset({
                    name: "",
                    description: "",
                    type: "Criatura",
                    class: "Qualquer",
                    attack: 0,
                    defense: 0,
                    mana: 1,
                });
            }
        }
    }, [isFormOpen, selectedCard, reset]);

    if (!isFormOpen) return null;

    const onSubmit = (data: CardFormData) => {
        if (isEditing && selectedCard) {
            updateCard(selectedCard.id, data);
        } else {
            createCard(data);
        }
        closeForm();
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            closeForm();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300"
            onClick={handleBackdropClick}
        >
            <div className="relative w-full max-w-2xl bg-neutral-100 rounded-lg shadow-[0_10px_40px_rgba(0,0,0,0.8)] border border-primary-800 flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300">

                {/* Bordas Ornamentadas Decorativas */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary-400 rounded-tl-lg pointer-events-none" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary-400 rounded-tr-lg pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary-400 rounded-bl-lg pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary-400 rounded-br-lg pointer-events-none" />

                {/* Cabeçalho */}
                <div className="flex items-center justify-between p-6 border-b border-primary-900/30 bg-neutral-200/50">
                    <h2 className="text-3xl font-newsreader font-bold text-neutral-900 drop-shadow-sm flex items-center gap-3">
                        {isEditing ? "Editar Carta" : "Adicionar Carta"}
                    </h2>
                    <button
                        type="button"
                        onClick={closeForm}
                        className="text-neutral-500 hover:text-neutral-900 transition-colors p-2 hover:bg-neutral-300 rounded-full cursor-pointer"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Corpo do Formulário */}
                <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
                    <form id="card-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">

                        {/* Linha 1: Nome */}
                        <div className="flex flex-col gap-2">
                            <label className="text-neutral-900 font-manrope text-sm uppercase tracking-widest font-bold flex items-center gap-2">
                                Nome da Carta
                            </label>
                            <input
                                {...register("name")}
                                placeholder="Exifício Ancião..."
                                className={`h-12 w-full px-4 bg-neutral-200 text-neutral-900 placeholder:text-neutral-500 outline-none border focus:bg-neutral-100 transition-all font-manrope shadow-inner rounded-sm ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-primary-900/50 focus:border-primary-400'}`}
                            />
                            {errors.name && <span className="text-red-500 text-xs font-bold uppercase tracking-wider">{errors.name.message}</span>}
                        </div>

                        {/* Linha 2: Descrição */}
                        <div className="flex flex-col gap-2">
                            <label className="text-neutral-900 font-manrope text-sm uppercase tracking-widest font-bold flex items-center gap-2">
                                Efeito / Descrição
                            </label>
                            <textarea
                                {...register("description")}
                                placeholder="Grito de Guerra: Cause 3 de dano a um lacaio inimigo..."
                                rows={3}
                                className={`w-full p-4 bg-neutral-200 text-neutral-900 placeholder:text-neutral-500 outline-none border focus:bg-neutral-100 transition-all font-manrope shadow-inner rounded-sm resize-none ${errors.description ? 'border-red-500 focus:border-red-500' : 'border-primary-900/50 focus:border-primary-400'}`}
                            />
                            {errors.description && <span className="text-red-500 text-xs font-bold uppercase tracking-wider">{errors.description.message}</span>}
                        </div>

                        {/* Linha 3: Tipo e Classe */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-neutral-900 font-manrope text-sm uppercase tracking-widest font-bold flex items-center gap-2">
                                    Tipo
                                </label>
                                <div className="relative">
                                    <select
                                        {...register("type")}
                                        className="h-12 w-full px-4 appearance-none cursor-pointer bg-neutral-200 text-neutral-900 border border-primary-900/50 hover:border-primary-400 focus:border-primary-400 transition-all font-manrope rounded-sm shadow-inner outline-none"
                                    >
                                        {CARD_TYPES.map((tipo) => (
                                            <option key={tipo} value={tipo}>{tipo}</option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-primary-500">

                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-neutral-900 font-manrope text-sm uppercase tracking-widest font-bold flex items-center gap-2">
                                    Classe
                                </label>
                                <div className="relative">
                                    <select
                                        {...register("class")}
                                        className="h-12 w-full px-4 appearance-none cursor-pointer bg-neutral-200 text-neutral-900 border border-primary-900/50 hover:border-primary-400 focus:border-primary-400 transition-all font-manrope rounded-sm shadow-inner outline-none"
                                    >
                                        {CARD_CLASSES.map((classe) => (
                                            <option key={classe} value={classe}>{classe}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Linha 4: Atributos Numéricos (Ataque, Defesa, Mana) */}
                        <div className="grid grid-cols-3 gap-4 border-t border-primary-900/20 pt-6 mt-2">

                            {/* Custo de Mana */}
                            <div className="flex flex-col items-center gap-3">
                                <label className="text-neutral-900 font-manrope text-xs uppercase tracking-widest font-bold flex items-center gap-1">
                                    Mana
                                </label>
                                <Controller
                                    name="mana"
                                    control={control}
                                    render={({ field }) => (
                                        <>
                                            <input type="number" onChange={(e) => field.onChange(Number(e.target.value))} value={field.value}
                                                className="w-12 h-12 text-center text-2xl font-bold font-manrope text-neutral-900 bg-neutral-200 border border-primary-900/50 hover:border-primary-400 focus:border-primary-400 transition-all rounded-sm shadow-inner outline-none appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                                        </>
                                    )}
                                />
                            </div>

                            <div className={`flex flex-col items-center gap-3 transition-opacity`}>
                                <label className="text-neutral-900 font-manrope text-xs uppercase tracking-widest font-bold flex items-center gap-1">
                                    Ataque
                                </label>
                                <Controller
                                    name="attack"
                                    control={control}
                                    render={({ field }) => (
                                        <>
                                            <input type="number" onChange={(e) => field.onChange(Number(e.target.value))} value={field.value}
                                                className="w-12 h-12 text-center text-2xl font-bold font-manrope text-neutral-900 bg-neutral-200 border border-primary-900/50 hover:border-primary-400 focus:border-primary-400 transition-all rounded-sm shadow-inner outline-none appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                                        </>
                                    )}
                                />
                            </div>

                            {/* Defesa */}
                            <div className={`flex flex-col items-center gap-3 transition-opacity`}>
                                <label className="text-neutral-900 font-manrope text-xs uppercase tracking-widest font-bold flex items-center gap-1">
                                    Defesa
                                </label>
                                <Controller
                                    name="defense"
                                    control={control}
                                    render={({ field }) => (
                                        <>
                                            <input type="number" onChange={(e) => field.onChange(Number(e.target.value))} value={field.value}
                                                className="w-12 h-12 text-center text-2xl font-bold font-manrope text-neutral-900 bg-neutral-200 border border-primary-900/50 hover:border-primary-400 focus:border-primary-400 transition-all rounded-sm shadow-inner outline-none appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                                        </>
                                    )}
                                />
                            </div>
                        </div>
                    </form>
                </div>

                <div className="p-6 border-t border-primary-900/30 bg-neutral-200/80 flex justify-end gap-4 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
                    <button
                        type="button"
                        onClick={closeForm}
                        className="px-6 py-3 font-manrope text-sm uppercase tracking-wider font-bold text-neutral-600 hover:text-neutral-900 hover:bg-neutral-300 rounded-sm transition-colors cursor-pointer"
                    >
                        Cancelar
                    </button>

                    <button
                        form="card-form"
                        type="submit"
                        className="px-8 py-3 bg-primary-600 hover:bg-primary-500 text-neutral-100 border border-primary-400 font-manrope text-sm uppercase tracking-wider font-bold rounded-sm shadow-[0_4px_10px_var(--color-primary-700)] focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2 focus:ring-offset-neutral-200 transition-all flex items-center gap-2 cursor-pointer group"
                    >
                        {isEditing ? "Salvar Alterações" : "Criar Carta"}
                    </button>
                </div>
            </div>
        </div>
    );
}