import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, AlertCircle } from "lucide-react";
import { cardSchema, type Card, type CardFormData, CARD_TYPES, CARD_CLASSES } from "../../types/card.types";

interface ModalProps {
    isFormOpen: boolean;
    closeForm: () => void;
    createCard: (data: CardFormData) => void;
    updateCard: (id: number, data: CardFormData) => void;
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
    const [storeError, setStoreError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors }
    } = useForm<CardFormData>({
        resolver: zodResolver(cardSchema),
        defaultValues: {
            nome: "",
            descricao: "",
            tipo: "Criatura",
            classe: "Qualquer",
            ataque: 0,
            defesa: 0,
            mana: 1,
        }
    });

    useEffect(() => {
        if (isFormOpen) {
            setStoreError(null);
            if (selectedCard) {
                reset({
                    nome: selectedCard.nome,
                    descricao: selectedCard.descricao,
                    tipo: selectedCard.tipo,
                    classe: selectedCard.classe,
                    ataque: selectedCard.ataque,
                    defesa: selectedCard.defesa,
                    mana: selectedCard.mana,
                });
            } else {
                reset({
                    nome: "",
                    descricao: "",
                    tipo: "Criatura",
                    classe: "Qualquer",
                    ataque: 0,
                    defesa: 0,
                    mana: 1,
                });
            }
        }
    }, [isFormOpen, selectedCard, reset]);

    if (!isFormOpen) return null;

    const onSubmit = (data: CardFormData) => {
        try {
            setStoreError(null);
            if (isEditing && selectedCard) {
                updateCard(selectedCard.id, data);
            } else {
                createCard(data);
            }
            closeForm();
        } catch (error: any) {
            setStoreError(error.message || "Erro ao salvar a carta.");
        }
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

                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary-400 rounded-tl-lg pointer-events-none" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary-400 rounded-tr-lg pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary-400 rounded-bl-lg pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary-400 rounded-br-lg pointer-events-none" />

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

                <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
                    {storeError && (
                        <div className="mb-6 p-4 rounded-md bg-red-500/10 border border-red-500/50 flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                            <p className="text-red-500 font-manrope font-bold text-sm leading-tight">{storeError}</p>
                        </div>
                    )}
                    <form id="card-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">

                        <div className="flex flex-col gap-2">
                            <label className="text-neutral-900 font-manrope text-sm uppercase tracking-widest font-bold flex items-center gap-2">
                                Nome da Carta
                            </label>
                            <input
                                {...register("nome")}
                                placeholder="Exifício Ancião..."
                                className={`h-12 w-full px-4 bg-neutral-200 text-neutral-900 placeholder:text-neutral-500 outline-none border focus:bg-neutral-100 transition-all font-manrope shadow-inner rounded-sm ${errors.nome ? 'border-red-500 focus:border-red-500' : 'border-primary-900/50 focus:border-primary-400'}`}
                            />
                            {errors.nome && <span className="text-red-500 text-xs font-bold uppercase tracking-wider">{errors.nome.message}</span>}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-neutral-900 font-manrope text-sm uppercase tracking-widest font-bold flex items-center gap-2">
                                Efeito / Descrição
                            </label>
                            <textarea
                                {...register("descricao")}
                                placeholder="Grito de Guerra: Cause 3 de dano a um lacaio inimigo..."
                                rows={3}
                                className={`w-full p-4 bg-neutral-200 text-neutral-900 placeholder:text-neutral-500 outline-none border focus:bg-neutral-100 transition-all font-manrope shadow-inner rounded-sm resize-none ${errors.descricao ? 'border-red-500 focus:border-red-500' : 'border-primary-900/50 focus:border-primary-400'}`}
                            />
                            {errors.descricao && <span className="text-red-500 text-xs font-bold uppercase tracking-wider">{errors.descricao.message}</span>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-neutral-900 font-manrope text-sm uppercase tracking-widest font-bold flex items-center gap-2">
                                    Tipo
                                </label>
                                <div className="relative">
                                    <select
                                        {...register("tipo")}
                                        className="h-12 w-full px-4 appearance-none cursor-pointer bg-neutral-200 text-neutral-900 border border-primary-900/50 hover:border-primary-400 focus:border-primary-400 transition-all font-manrope rounded-sm shadow-inner outline-none"
                                    >
                                        {CARD_TYPES.map((tipo) => (
                                            <option key={tipo} value={tipo}>{tipo}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-neutral-900 font-manrope text-sm uppercase tracking-widest font-bold flex items-center gap-2">
                                    Classe
                                </label>
                                <div className="relative">
                                    <select
                                        {...register("classe")}
                                        className="h-12 w-full px-4 appearance-none cursor-pointer bg-neutral-200 text-neutral-900 border border-primary-900/50 hover:border-primary-400 focus:border-primary-400 transition-all font-manrope rounded-sm shadow-inner outline-none"
                                    >
                                        {CARD_CLASSES.map((classe) => (
                                            <option key={classe} value={classe}>{classe}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 border-t border-primary-900/20 pt-6 mt-2 relative">
                            <div className="flex flex-col items-center gap-3 relative">
                                <label className="text-neutral-900 font-manrope text-xs uppercase tracking-widest font-bold flex items-center gap-1">
                                    Mana
                                </label>
                                <Controller
                                    name="mana"
                                    control={control}
                                    render={({ field }) => (
                                        <input type="number" onChange={(e) => field.onChange(Number(e.target.value))} value={field.value}
                                            className={`w-12 h-12 text-center text-2xl font-bold font-manrope text-neutral-900 bg-neutral-200 border hover:border-primary-400 focus:border-primary-400 transition-all rounded-sm shadow-inner outline-none appearance-none ${errors.mana ? 'border-red-500' : 'border-primary-900/50'}`} />
                                    )}
                                />
                                {errors.mana && <span className="absolute -bottom-5 text-red-500 text-[10px] font-bold uppercase tracking-wider w-max">{errors.mana.message}</span>}
                            </div>

                            <div className="flex flex-col items-center gap-3 relative transition-opacity">
                                <label className="text-neutral-900 font-manrope text-xs uppercase tracking-widest font-bold flex items-center gap-1">
                                    Ataque
                                </label>
                                <Controller
                                    name="ataque"
                                    control={control}
                                    render={({ field }) => (
                                        <input type="number" onChange={(e) => field.onChange(Number(e.target.value))} value={field.value}
                                            className={`w-12 h-12 text-center text-2xl font-bold font-manrope text-neutral-900 bg-neutral-200 border hover:border-primary-400 focus:border-primary-400 transition-all rounded-sm shadow-inner outline-none appearance-none ${errors.ataque ? 'border-red-500' : 'border-primary-900/50'}`} />
                                    )}
                                />
                                {errors.ataque && <span className="absolute -bottom-5 text-red-500 text-[10px] font-bold uppercase tracking-wider w-max">{errors.ataque.message}</span>}
                            </div>

                            <div className="flex flex-col items-center gap-3 relative transition-opacity">
                                <label className="text-neutral-900 font-manrope text-xs uppercase tracking-widest font-bold flex items-center gap-1">
                                    Defesa
                                </label>
                                <Controller
                                    name="defesa"
                                    control={control}
                                    render={({ field }) => (
                                        <input type="number" onChange={(e) => field.onChange(Number(e.target.value))} value={field.value}
                                            className={`w-12 h-12 text-center text-2xl font-bold font-manrope text-neutral-900 bg-neutral-200 border hover:border-primary-400 focus:border-primary-400 transition-all rounded-sm shadow-inner outline-none appearance-none ${errors.defesa ? 'border-red-500' : 'border-primary-900/50'}`} />
                                    )}
                                />
                                {errors.defesa && <span className="absolute -bottom-5 text-red-500 text-[10px] font-bold uppercase tracking-wider w-max">{errors.defesa.message}</span>}
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