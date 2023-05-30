'use client'


import { useCallback, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Conversation, Message, User } from "@prisma/client"
import { format } from "date-fns"
import { useSession } from "next-auth/react"
import clsx from "clsx"
import { FullConversationType } from "@/app/types"
import useOtherUser from "@/app/hooks/useOtherUser"
import Avatar from "@/app/components/Avatar"

interface ConversationBoxProps {
    data: FullConversationType,
    selected?: boolean
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
    data,
    selected
}) => {
    const otherUser = useOtherUser(data);
    const session = useSession()
    const router = useRouter()

    // handle click on conversation
    const handleClick = useCallback(() => {
        router.push(`/conversations/${data.id}`)

    }, [data.id, router])

    const lastMessage = useMemo(() => {
        const messages = data.messages || [];


        return messages[messages.length - 1]

    }, [data.messages])


    // fetch user email
    const userEmail = useMemo(() => {
        return session.data?.user?.email;
    }, [session.data?.user?.email])

    // user seen the message or not
    const hasSeen = useMemo(() => {
        // check if last message exist
        if (!lastMessage) {
            return false
        }
        // struct seen array
        const seenArray = lastMessage.seen || [];
        // there is no user email
        if (!userEmail) {
            return false
        }
        // check if user email exist in seen array
        return seenArray.filter((user) => user.email === userEmail).length !== 0
    }, [userEmail, lastMessage])

    const lastMessageText = useMemo(() => {
        // check if last message was image
        if (lastMessage?.image) {
            return "Image Sent"
        }

        // check if last message was text
        if (lastMessage?.body) {
            return lastMessage.body
        }
        return "Start a conversation"
    }, [lastMessage])
    return (
        <div className={clsx(`
            w-full relative flex items-center space-x-3 hover:bg-slate-100 rounded-lg transition cursor-pointer  p-3
        `,
            selected ? 'bg-slate-100' : 'bg-slate-50'
        )} onClick={handleClick}>
            <Avatar
                user={otherUser}
            />
            <div className="min-w-0 flex-1">
                <div className="focus:outline-none">
                    <div className="flex justify-between items-center mb-1">
                        <p className="text-md font-bold text-slate-900 capitalize">
                            {data.name || otherUser.name}
                        </p>
                        {lastMessage?.createdAt && (
                            <p className="text-xs text-slate-500">
                                {format(new Date(lastMessage.createdAt), "p")}
                            </p>
                        )}
                    </div>
                    <p className={clsx(`
                        truncate
                        text-sm
                    `, hasSeen ? 'text-slate-500' : 'text-slate-900 font-bold '
                    )}>
                        {lastMessageText}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ConversationBox