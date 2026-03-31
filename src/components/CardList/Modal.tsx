import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Sword, Shield, Hexagon, Sparkles, Heading, BookText, Minus, Plus, Save } from "lucide-react";
import { cardSchema, type Card, type CardFormData, CARD_TYPES, CARD_CLASSES } from "../../types/card.types";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: CardFormData) => void;
    initialData?: Card | null;
}

export default function Modal({ isOpen, onClose, onSave, initialData }: ModalProps) {
    const isEditing = !!initialData;

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
        if (isOpen) {
            if (initialData) {
                reset({
                    name: initialData.name,
                    description: initialData.description,
                    type: initialData.type,
                    class: initialData.class,
                    attack: initialData.attack,
                    defense: initialData.defense,
                    mana: initialData.mana,
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
    }, [isOpen, initialData, reset]);

    if (!isOpen) return null;

    const onSubmit = (data: CardFormData) => {
        // Para feitiços, forçamos ataque e defesa a 0 (regra de HearthStone pode exigir)
        const finalData = {
            ...data,
            attack: data.type === "Magia" ? 0 : data.attack,
            defense: data.type === "Magia" ? 0 : data.defense,
        };
        onSave(finalData);
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
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
                    <h2 className="text-3xl font-newsreader font-bold text-primary-900 drop-shadow-sm flex items-center gap-3">
                        <Sparkles className="text-primary-500 w-8 h-8" />
                        {isEditing ? "Editar Carta" : "Forjar Nova Carta"}
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-neutral-500 hover:text-primary-500 transition-colors p-2 hover:bg-neutral-300 rounded-full cursor-pointer"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Corpo do Formulário */}
                <div className="p-6 overflow-y-auto custom-scrollbar flex-1 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAiLz4KPHBhdGggZD0iTTAgMEwyIDJNMCA0TDIgMiNMNCB0TDIgMiNMNCBvTDIgMiIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utb3BhY2l0eT0iMC4wNSIvPgo8L3N2Zz4=')]">
                    <form id="card-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">

                        {/* Linha 1: Nome */}
                        <div className="flex flex-col gap-2">
                            <label className="text-primary-300 font-manrope text-sm uppercase tracking-widest font-bold flex items-center gap-2">
                                <Heading className="w-4 h-4" /> Nome da Carta
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
                            <label className="text-primary-300 font-manrope text-sm uppercase tracking-widest font-bold flex items-center gap-2">
                                <BookText className="w-4 h-4" /> Efeito / Descrição
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
                                <label className="text-primary-300 font-manrope text-sm uppercase tracking-widest font-bold flex items-center gap-2">
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
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-primary-300 font-manrope text-sm uppercase tracking-widest font-bold flex items-center gap-2">
                                    <Sparkles className="w-4 h-4" /> Classe
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
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-primary-500">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Linha 4: Atributos Numéricos (Ataque, Defesa, Mana) */}
                        <div className="grid grid-cols-3 gap-4 border-t border-primary-900/20 pt-6 mt-2">

                            {/* Custo de Mana */}
                            <div className="flex flex-col items-center gap-3">
                                <label className="text-blue-600 font-manrope text-xs uppercase tracking-widest font-bold flex items-center gap-1">
                                    <Hexagon className="w-4 h-4" /> Mana
                                </label>
                                <Controller
                                    name="mana"
                                    control={control}
                                    render={({ field }) => (
                                        <NumberInput
                                            value={field.value}
                                            onChange={field.onChange}
                                            colorClass="bg-blue-600 border-blue-800 text-white"
                                        />
                                    )}
                                />
                            </div>

                            {/* Ataque */}
                            <div className={`flex flex-col items-center gap-3 transition-opacity ${watchType === "Magia" ? "opacity-30 pointer-events-none" : "opacity-100"}`}>
                                <label className="text-orange-600 font-manrope text-xs uppercase tracking-widest font-bold flex items-center gap-1">
                                    <Sword className="w-4 h-4" /> Ataque
                                </label>
                                <Controller
                                    name="attack"
                                    control={control}
                                    render={({ field }) => (
                                        <NumberInput
                                            value={field.value}
                                            onChange={field.onChange}
                                            colorClass="bg-orange-500 border-red-900 text-white"
                                        />
                                    )}
                                />
                            </div>

                            {/* Defesa */}
                            <div className={`flex flex-col items-center gap-3 transition-opacity ${watchType === "Magia" ? "opacity-30 pointer-events-none" : "opacity-100"}`}>
                                <label className="text-gray-600 font-manrope text-xs uppercase tracking-widest font-bold flex items-center gap-1">
                                    <Shield className="w-4 h-4" /> Defesa
                                </label>
                                <Controller
                                    name="defense"
                                    control={control}
                                    render={({ field }) => (
                                        <NumberInput
                                            value={field.value}
                                            onChange={field.onChange}
                                            colorClass="bg-neutral-500 border-neutral-800 text-white"
                                        />
                                    )}
                                />
                            </div>
                        </div>
                    </form>
                </div>

                {/* Rodapé e Ações */}
                <div className="p-6 border-t border-primary-900/30 bg-neutral-200/80 flex justify-end gap-4 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-3 font-manrope text-sm uppercase tracking-wider font-bold text-neutral-600 hover:text-neutral-900 hover:bg-neutral-300 rounded-sm transition-colors cursor-pointer"
                    >
                        Cancelar
                    </button>

                    <button
                        form="card-form"
                        type="submit"
                        className="px-8 py-3 bg-primary-600 hover:bg-primary-500 text-neutral-100 border border-primary-400 font-manrope text-sm uppercase tracking-wider font-bold rounded-sm shadow-[0_4px_10px_var(--color-primary-700)] focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2 focus:ring-offset-neutral-200 transition-all flex items-center gap-2 cursor-pointer group"
                    >
                        <Save className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        {isEditing ? "Salvar Alterações" : "Criar Carta"}
                    </button>
                </div>
            </div>
        </div>
    );
}

// Componente helper para os inputs numéricos (+ / -)
interface NumberInputProps {
    value: number;
    onChange: (val: number) => void;
    colorClass: string;
}

function NumberInput({ value, onChange, colorClass }: NumberInputProps) {
    const handleDecrement = () => {
        if (value > 0) onChange(value - 1);
    };
    const handleIncrement = () => {
        if (value < 10) onChange(value + 1);
    };

    return (
        <div className="flex items-center">
            <button
                type="button"
                onClick={handleDecrement}
                disabled={value <= 0}
                className="w-10 h-10 flex items-center justify-center bg-neutral-300 border border-neutral-400 text-neutral-700 rounded-l-sm hover:bg-neutral-400 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
                <Minus className="w-4 h-4" />
            </button>

            <div className={`w-14 h-12 flex items-center justify-center font-newsreader font-bold text-2xl border-y border-neutral-400 shadow-inner ${colorClass}`}>
                {value}
            </div>

            <button
                type="button"
                onClick={handleIncrement}
                disabled={value >= 10}
                className="w-10 h-10 flex items-center justify-center bg-neutral-300 border border-neutral-400 text-neutral-700 rounded-r-sm hover:bg-neutral-400 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
                <Plus className="w-4 h-4" />
            </button>
        </div>
    );
}