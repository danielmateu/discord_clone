'use client'

import { Plus } from "lucide-react"

export const NavigationAction = () => {
    return (
        <div>
            <button className="group flex items-center">
                <div className="flex items-center justify-center mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden bg-background dark:bg-neutral-700 group-hover:bg-emerald-500 mt-2">
                    <Plus className="group-hover:text-white text-emerald-500 transition" size={25} />
                </div>
            </button>
        </div>
    )
}
