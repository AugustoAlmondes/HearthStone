import { Plus } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCardStore } from "../../store/useCardStore";

export default function Header() {

    const location = useLocation();

    console.log(location)

    const { openForm } = useCardStore();

    return (
        <header
            className="
            fixed
        bg-linear-to-b from-neutral-100 via-neutral-100/95 to-neutral-100
        border-b-2 border-primary-700
        w-full h-20 gap-5
        flex items-center justify-between
        px-20 shadow-2xl
        "
        >
            <div className="w-40">
                <img src="/images/logo.png" alt="logo" className="w-full" />
            </div>

            <div>
                <button className="
                flex items-center gap-2 bg-primary-400 px-2 py-1 text-black
                border-2 border-primary-400 font-medium cursor-pointer
                hover:bg-primary-600 hover:border-primary-600 transition-all duration-200
                active:translate-y-0.5
                "
                    onClick={() => openForm()}
                >
                    <Plus size={17} />
                    <p>NOVA CARTA</p>
                </button>
            </div>
        </header>
    )
}   