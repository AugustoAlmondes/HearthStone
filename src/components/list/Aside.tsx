import { useState } from "react"
import { IoIosArrowBack } from "react-icons/io";

export default function Aside() {
    const [open, setOpen] = useState(true);
    return (
        <>
            <aside
                className={`${open ? 'w-64' : 'w-20'} pt-20 transition-all duration-300 ease-in-out bg-linear-to-r from-neutral-100/95 to-neutral-100 border-r-2 border-primary-700`}
            >
                <div className="flex h-full">
                    {/* content */}
                    <div className="text-neutral-800 w-full h-full">
                        <ul>
                            <li>
                                LINK 1
                            </li>
                            <li>
                                LINK 2
                            </li>
                            <li>
                                LINK 3
                            </li>
                        </ul>
                    </div>
                    <div className="flex-1 text-neutral-800 flex items-center hover:bg-primary-400/10 cursor-pointer" onClick={() => setOpen(!open)}>
                        <IoIosArrowBack size={20} />
                    </div>
                </div>
            </aside>
        </>
    )
}