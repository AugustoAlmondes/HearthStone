import { useState } from "react"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Library, Swords, ShoppingBag, Trophy, ScrollText } from "lucide-react";

export default function Aside() {
    const [open, setOpen] = useState(true);

    const navItems = [
        { icon: Library, label: "Coleção", active: true },
        { icon: Swords, label: "Duelos", active: false },
        { icon: ScrollText, label: "Missões", active: false },
        { icon: ShoppingBag, label: "Loja", active: false },
        { icon: Trophy, label: "Conquistas", active: false },
    ];

    return (
        <>
            <aside
                className={`${open ? 'w-64' : 'w-20'} hidden md:block pt-20 transition-all duration-300 ease-in-out bg-linear-to-r from-neutral-100/95 to-neutral-100 border-r-2 border-primary-700`}
            >
                <div className="flex h-full">
                    {/* content */}
                    <div className="text-neutral-800 w-full h-full flex flex-col py-6 overflow-hidden">
                        <ul className="space-y-2 px-2">
                            {navItems.map((item, index) => (
                                <li key={index}>
                                    <div className={`flex items-center gap-4 py-3 rounded-lg cursor-default transition-all ${item.active ? 'bg-primary-700 text-neutral-100 shadow-md' : 'hover:bg-primary-100 text-neutral-600 hover:text-primary-800'}`}>
                                        <div className="flex items-center justify-center min-w-8">
                                            <item.icon size={22} />
                                        </div>
                                        {open && (
                                            <span className="font-manrope font-bold uppercase tracking-wider text-sm truncate">
                                                {item.label}
                                            </span>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                        
                        {/* Rodapé Decorativo Simplificado */}
                        <div className="mt-auto px-4 pb-6">
                            <div className={`h-px bg-primary-900/20 mb-4 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} />
                            <div className="flex items-center gap-3 border border-primary-900/20 rounded-lg p-2 bg-neutral-200/50">
                                <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold shrink-0 shadow-inner">
                                    A
                                </div>
                                {open && (
                                    <div className="flex flex-col truncate">
                                        <span className="font-newsreader font-bold text-neutral-900 truncate">Arthas</span>
                                        <span className="text-[10px] font-manrope font-bold uppercase text-primary-600 tracking-wider">Invocador</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* Toggle */}
                    <div className="flex-1 text-neutral-800 flex items-center justify-center hover:bg-primary-400/10 cursor-pointer transition-colors border-l border-primary-900/10" onClick={() => setOpen(!open)}>
                        {open ? <IoIosArrowBack size={20} /> : <IoIosArrowForward size={20} />}
                    </div>
                </div>
            </aside>
        </>
    )
}