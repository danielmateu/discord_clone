'use client'

import { UploadDropzone } from "@/lib/uploadthing"
import { X } from 'lucide-react'
import Image from "next/image"

// import '@uploadthing/react/styles.css'
import { ActionTooltip } from "./ActionTooltip"

interface FileUploadProps {
    onChange: (url?: string) => void
    value: string
    endpoint: 'messageFile' | 'serverImage'
}

export const FileUpload = ({
    onChange,
    value,
    endpoint
}: FileUploadProps) => {

    const fileType = value?.split('.').pop()

    if (value && fileType !== 'pdf') {
        return (
            <div className="relative h-20 w-20">
                <Image
                    fill
                    src={value}
                    alt='Imagen Cargada'
                    className="rounded-full"
                />
                <ActionTooltip
                    label="Eliminar imagen"
                    side="right"
                    align="center"
                >

                    <button
                        onClick={() => onChange('')}
                        className="bg-rose-500 text-white rounded-full absolute top-0 right-0 shadow-sm hover:rotate-90 transition" type="button"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </ActionTooltip>
            </div>
        )
    }

    return (
        <div>
            <UploadDropzone
                endpoint={endpoint}
                onClientUploadComplete={(res) => {
                    onChange(res?.[0].url)
                }}
                onUploadError={(err: Error) => {
                    console.log(err)
                }}
            />
        </div>
    )
}
