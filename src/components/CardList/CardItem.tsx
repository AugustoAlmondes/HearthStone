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
  onDelete: (id: number) => void;
  onEdit: (card?: Card) => void;
}

export default function CardItem({ card, onDelete, onEdit }: CardItemProps) {
  const classColors = getClassColors(card.classe);

  return (
    <div className="relative group perspective-1000 w-[240px] h-[360px] cursor-pointer">
      <div className={`relative w-full h-full rounded-xl transition-all duration-300 transform-gpu group-hover:-translate-y-2 shadow-[0_8px_20px_rgba(0,0,0,0.6)] group-hover:shadow-[0_15px_30px_rgba(0,0,0,0.8)] flex flex-col pt-4 overflow-visible bg-neutral-200 border-2 border-primary-800`}>

        <div className="absolute inset-1 rounded-lg border border-primary-900/40 pointer-events-none z-10" />

        <div className={`absolute -top-3 -left-3 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg font-manrope z-30 border-2 ${getManaColor(card.mana)}`}>
          {card.mana}
        </div>

        <div className={`mx-2 mt-1 h-32 rounded-t-sm bg-linear-to-br ${classColors} shadow-inner flex items-center justify-center overflow-hidden relative border border-primary-900/60`}>
          <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
          <div className="absolute top-1 right-1 px-1.5 py-0.5 bg-neutral-900/60 rounded text-[10px] font-manrope font-bold text-white tracking-widest border border-white/20 z-10 shadow-sm">#{card.id}</div>
          <Hexagon className="w-16 h-16 text-white/20" strokeWidth={1} />
        </div>

        <div className="px-3 text-center z-20 mt-3">
          <h3 className="font-newsreader font-bold text-xl leading-tight text-neutral-900 drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)] line-clamp-2">
            {card.nome}
          </h3>
        </div>

        <div className="px-4 mt-4 flex-1 overflow-y-auto custom-scrollbar z-20">
          <p className="font-manrope text-sm text-neutral-800 text-center leading-snug">
            {card.descricao}
          </p>
        </div>

        <div className="flex justify-center gap-2 mt-auto pb-1 z-20">
          <span className="px-2 py-0.5 rounded-sm bg-neutral-300 border border-neutral-400 text-[10px] font-bold uppercase tracking-wider text-neutral-800 shadow-sm">
            {card.tipo}
          </span>
          <span className={`px-2 py-0.5 rounded-sm border text-[10px] font-bold uppercase tracking-wider shadow-sm bg-linear-to-r ${classColors}`}>
            {card.classe}
          </span>
        </div>

        <div className="h-10 flex border-t border-primary-900/30 z-20 bg-neutral-300/80 rounded-b-lg">
          {/* Ataque */}
          <div className={`flex-1 flex justify-center items-center gap-1.5 border-r border-primary-900/30`}>
            <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center border border-red-900 shadow-inner">
              <Sword className="w-3 h-3 text-white" />
            </div>
            <span className="font-newsreader font-bold text-xl text-neutral-900">{card.ataque}</span>
          </div>
          {/* Defesa */}
          <div className={`flex-1 flex justify-center items-center gap-1.5`}>
            <span className="font-newsreader font-bold text-xl text-neutral-900">{card.defesa}</span>
            <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center border border-blue-900 shadow-inner">
              <Shield className="w-3 h-3 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
        <button
          onClick={() => onEdit(card)}
          className="w-8 cursor-pointer h-8 rounded-full bg-neutral-300 hover:bg-neutral-500 text-white flex items-center justify-center border-2 border-neutral-900 shadow-lg transition-all hover:scale-110"
          title="Editar Carta"
        >
          <Edit2 className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(card.id)}
          className="w-8 cursor-pointer h-8 rounded-full bg-neutral-300 hover:bg-neutral-500 text-white flex items-center justify-center border-2 border-neutral-900 shadow-lg transition-all hover:scale-110"
          title="Deletar Carta"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
