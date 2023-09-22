

import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react"
import { redirect } from "next/navigation"
import { ChannelType, MemberRole } from "@prisma/client"

import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"

import { ServerHeader } from "./ServerHeader"
import { ScrollArea } from "../ui/scroll-area"
import { ServerSearch } from "./ServerSearch"
import { Separator } from "../ui/separator"
import { ServerSection } from "./ServerSection"
import { ServerChannel } from "./ServerChannel"
import { ServerMember } from "./ServerMember"

interface ServerSidebarProps {
    serverId: string
}

const iconMap = {
    [ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4" />,
    [ChannelType.AUDIO]: <Mic className="mr-2 h-4 w-4" />,
    [ChannelType.VIDEO]: <Video className="mr-2 h-4 w-4" />,
}

const roleIconMap = {
    [MemberRole.GUEST]: null,
    [MemberRole.MODERATOR]: <ShieldCheck className="text-indigo-500 h-4 w-4 mr-2" />,
    [MemberRole.ADMIN]: <ShieldAlert className="text-rose-500 h-4 w-4 mr-2" />,
}

export const ServerSidebar = async ({
    serverId
}: ServerSidebarProps) => {

    const profile = await currentProfile()

    if (!profile) {
        return redirect('/')
    }

    const server = await db.server.findUnique({
        where: {
            id: serverId,
        },
        include: {
            channels: {
                orderBy: {
                    createdAt: 'asc'
                }
            },
            members: {
                include: {
                    profile: true
                },
                orderBy: {
                    role: 'asc'
                }
            }
        }
    })

    const textChannels = server?.channels.filter((channel) => channel.type === ChannelType.TEXT)
    const audioChannels = server?.channels.filter((channel) => channel.type === ChannelType.AUDIO)
    const videoChannels = server?.channels.filter((channel) => channel.type === ChannelType.VIDEO)

    const members = server?.members.filter((member) => member.profileId !== profile.id)

    if (!server) {
        return redirect('/')
    }

    const role = server.members.find((member) => member.profileId === profile.id)?.role

    return (
        <div className="flex flex-col h-full text-primary w-full bg-[#F2F3F5] dark:bg-[#2b2D31]">
            <ServerHeader
                server={server}
                role={role}
            />
            <ScrollArea
                className="flex px-3"
            >
                <div className="mt-2">
                    <ServerSearch
                        data={[
                            {
                                label: 'Canales de Texto',
                                type: 'channel',
                                data: textChannels?.map((channel) => ({
                                    id: channel.id,
                                    name: channel.name,
                                    icon: iconMap[channel.type]
                                }))
                            },
                            {
                                label: 'Canales de Voz',
                                type: 'channel',
                                data: audioChannels?.map((channel) => ({
                                    id: channel.id,
                                    name: channel.name,
                                    icon: iconMap[channel.type]
                                }))
                            },
                            {
                                label: 'Canales de Video',
                                type: 'channel',
                                data: videoChannels?.map((channel) => ({
                                    id: channel.id,
                                    name: channel.name,
                                    icon: iconMap[channel.type]
                                }))
                            },
                            {
                                label: 'Members',
                                type: 'member',
                                data: members?.map((member) => ({
                                    id: member.profile.id,
                                    name: member.profile.name,
                                    icon: roleIconMap[member.role]
                                }))
                            }
                        ]}
                    />
                </div>
                <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />
                {!!textChannels?.length && (
                    <div className="mb-2">
                        <ServerSection
                            sectionType="channels"
                            channelType={ChannelType.TEXT}
                            role={role}
                            label="Canales de Texto"
                        />
                        <div className="space-y-1">
                            {textChannels.map((channel) => (
                                <ServerChannel
                                    key={channel.id}
                                    channel={channel}
                                    server={server}
                                    role={role}
                                />
                            ))}
                        </div>

                    </div>
                )}
                {!!audioChannels?.length && (
                    <div className="mb-2">
                        <ServerSection
                            sectionType="channels"
                            channelType={ChannelType.AUDIO}
                            role={role}
                            label="Canales de Voz"
                        />
                        <div className="space-y-1">
                            {audioChannels.map((channel) => (
                                <ServerChannel
                                    key={channel.id}
                                    channel={channel}
                                    server={server}
                                    role={role}
                                />
                            ))}
                        </div>

                    </div>
                )}
                {!!videoChannels?.length && (
                    <div className="mb-2">
                        <ServerSection
                            sectionType="channels"
                            channelType={ChannelType.VIDEO}
                            role={role}
                            label="Canales de Video"
                        />
                        <div className="space-y-1">
                            {videoChannels.map((channel) => (
                                <ServerChannel
                                    key={channel.id}
                                    channel={channel}
                                    server={server}
                                    role={role}
                                />
                            ))}
                        </div>
                    </div>
                )}
                {!!members?.length && (
                    <div className="mb-2">
                        <ServerSection
                            sectionType="members"
                            role={role}
                            label="Miembros"
                            server={server}
                        />
                        <div className="space-y-1">
                            {members.map((member) => (
                                <ServerMember
                                    key={member.id}
                                    member={member}
                                    server={server}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </ScrollArea>
        </div>
    )
}
