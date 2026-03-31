import Aside from "../components/list/Aside"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../components/ui/select"

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

                    <form className="mt-10 flex gap-4 items-center justify-between flex-wrap text-neutral-900 bg-neutral-200/30 p-10 rounded-lg">
                        <div className="flex flex-col gap-2">
                            <label className="text-primary-400">PROCURAR CARTA</label>
                            <input className="pl-10 h-15 w-90 bg-neutral outline-none" type="text" placeholder="Digite o nome da carta" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-primary-400">CLASSE</label>
                            <Select>
                                <SelectTrigger className="cursor-pointer h-15! w-60 rounded-none border-none bg-neutral">
                                    <SelectValue placeholder="Selecione uma classe" />
                                </SelectTrigger>
                                <SelectContent className="rounded-none border border-primary-400">
                                    <SelectGroup className="bg-neutral-200 p-0 rounded-none border-1/2 border-primary-400">
                                        {classes.map((c) => (
                                            <SelectItem className="text-neutral-900 cursor-pointer rounded-none" key={c} value={c}>{c}</SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-primary-400">TIPO</label>
                            <Select>
                                <SelectTrigger className="cursor-pointer h-15! w-60 rounded-none border-none bg-neutral">
                                    <SelectValue placeholder="Selecione um tipo" />
                                </SelectTrigger>
                                <SelectContent className="rounded-none border border-primary-400">
                                    <SelectGroup className="bg-neutral-200 p-0 rounded-none border-1/2 border-primary-400">
                                        {types.map((t) => (
                                            <SelectItem className="text-neutral-900 cursor-pointer rounded-none" key={t} value={t}>{t}</SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}