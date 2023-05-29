'use client'

import Avatar from "@/app/components/Avatar"
import useOtherUser from "@/app/hooks/useOtherUser"
import { Conversation, User } from "@prisma/client"
import Link from "next/link"
import { useMemo } from "react"
import { HiChevronLeft } from "react-icons/hi"
import { HiEllipsisHorizontal } from "react-icons/hi2"


// interface props

interface HeaderProps {
    conversation: Conversation & {
        users: User[]
    }
}

const Header: React.FC<HeaderProps> = ({
    conversation
}) => {
    const otherUser = useOtherUser(conversation)
    const statusText = useMemo(() => {
        // it gonna show the how many members are in the group
        if (conversation.isGroup) {
            return `${conversation.users.length} members`
        }
        return 'Active'
    }, [conversation])
    return (
        <div className="bg-slate-100 w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 items-center justify-between shadow-sm">
            <div className="flex gap-3 items-center">
                <Link href="/conversations" className="lg:hidden block text-slate-800 hover:text-slate-900">
                    <HiChevronLeft size={32} />
                </Link>
                <Avatar
                    user={otherUser}
                />
                <div className="flex flex-col">
                    <div className="text-slate-800 font-bold text-lg">
                        {conversation.name || otherUser.name}
                    </div>
                    <div className="text-sm font-light text-slate-500 ">
                        {statusText}
                    </div>
                </div>
            </div>
            <HiEllipsisHorizontal
                size={32}
                className="text-slate-600 hover:text-slate-900 cursor-pointer transition"
            />
        </div>
    )
}

export default Header