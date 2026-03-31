import {
  Shield,
  Sword,
  Hexagon,
  Edit2,
  Trash2
} from "lucide-react";
import { type Card } from "../../types/card.types";
import { getClassColors, getManaColor } from "../../utils/card";

interface CardItemProps {
  card: Card;
  onEdit: () => void;
  onDelete: () => void;
}

export default function CardItem({ card, onEdit, onDelete }: CardItemProps) {
  const classColors = getClassColors(card.class);
  const isMagia = card.type === "Magia";

  return (    
    <div className="relative group perspective-1000 w-[240px] h-[360px] cursor-pointer">
      {/* Container Principal da Carta com Efeito de Hover (Lift + Glow) */}
      <div className={`relative w-full h-full rounded-xl transition-all duration-300 transform-gpu group-hover:-translate-y-2 shadow-[0_8px_20px_rgba(0,0,0,0.6)] group-hover:shadow-[0_15px_30px_rgba(0,0,0,0.8)] flex flex-col pt-4 overflow-visible bg-neutral-200 border-2 border-primary-800`}>

        {/* Frame/Moldura interna baseada na classe */}
        <div className="absolute inset-1 rounded-lg border border-primary-900/40 pointer-events-none z-10" />

        {/* Gema de Mana (Canto Superior Esquerdo) */}
        <div className={`absolute -top-3 -left-3 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg font-manrope z-30 border-2 ${getManaColor(card.mana)}`}>
          {card.mana}
        </div>

        {/* Área de ilustração superior */}
        <div className={`mx-2 mt-1 h-32 rounded-t-sm bg-linear-to-br ${classColors} shadow-inner flex items-center justify-center overflow-hidden relative border border-primary-900/60`}>
          {/* Elemento de background decorativo */}
          <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
          <Hexagon className="w-16 h-16 text-white/20" strokeWidth={1} />
        </div>

        {/* Nome da Carta */}
        <div className="px-3 text-center z-20 mt-3">
          <h3 className="font-newsreader font-bold text-xl leading-tight text-neutral-900 drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)] line-clamp-2">
            {card.name}
          </h3>
        </div>

        {/* Descrição */}
        <div className="px-4 mt-4 flex-1 overflow-y-auto custom-scrollbar z-20">
          <p className="font-manrope text-sm text-neutral-800 text-center leading-snug">
            {card.description}
          </p>
        </div>

        {/* Badges Tipo/Classe */}
        <div className="flex justify-center gap-2 mt-auto pb-1 z-20">
          <span className="px-2 py-0.5 rounded-sm bg-neutral-300 border border-neutral-400 text-[10px] font-bold uppercase tracking-wider text-neutral-800 shadow-sm">
            {card.type}
          </span>
          <span className={`px-2 py-0.5 rounded-sm border text-[10px] font-bold uppercase tracking-wider shadow-sm bg-linear-to-r ${classColors}`}>
            {card.class}
          </span>
        </div>

        {/* Stat Block (Rodapé) */}
        <div className="h-10 flex border-t border-primary-900/30 z-20 bg-neutral-300/80 rounded-b-lg">
          {/* Ataque */}
          <div className={`flex-1 flex justify-center items-center gap-1.5 border-r border-primary-900/30 ${isMagia ? "opacity-30" : "bg-linear-to-t from-orange-400/20 to-transparent"}`}>
            <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center border border-red-900 shadow-inner">
              <Sword className="w-3 h-3 text-white" />
            </div>
            <span className="font-newsreader font-bold text-xl text-neutral-900">{isMagia ? '-' : card.attack}</span>
          </div>
          {/* Defesa */}
          <div className={`flex-1 flex justify-center items-center gap-1.5 ${isMagia ? "opacity-30" : "bg-linear-to-t from-blue-400/20 to-transparent"}`}>
            <span className="font-newsreader font-bold text-xl text-neutral-900">{isMagia ? '-' : card.defense}</span>
            <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center border border-blue-900 shadow-inner">
              <Shield className="w-3 h-3 text-white" />
            </div>
          </div>
        </div>

        {/* Ações (Editar/Excluir) - Reveladas no Hover */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 z-50 pointer-events-none group-hover:pointer-events-auto scale-90 group-hover:scale-100">
          <button
            onClick={(e) => { e.stopPropagation(); onEdit(); }}
            className="w-12 h-12 rounded-full bg-neutral-100 border-2 border-primary-400 text-primary-400 flex items-center justify-center hover:bg-primary-500 hover:text-neutral-100 hover:border-neutral-100 hover:scale-110 transition-all shadow-[0_0_15px_rgba(0,0,0,0.8)] cursor-pointer"
            title="Editar"
          >
            <Edit2 className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
            className="w-12 h-12 rounded-full bg-neutral-100 border-2 border-red-500 text-red-500 flex items-center justify-center hover:bg-red-600 hover:text-neutral-100 hover:border-neutral-100 hover:scale-110 transition-all shadow-[0_0_15px_rgba(0,0,0,0.8)] cursor-pointer"
            title="Excluir"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

      </div>

      {/* Glow background que aparece no hover */}
      <div className={`absolute inset-0 bg-linear-to-br ${classColors} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 -z-10 rounded-xl pointer-events-none`} />

    </div>
  );
}
