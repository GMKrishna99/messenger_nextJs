'use client'


import useConversation from "@/app/hooks/useConversation";
import { FullConversationType } from "@/app/types";
import { Conversation, User } from "@prisma/client";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { AiOutlineUsergroupAdd } from 'react-icons/ai'
import ConversationBox from "./ConversationBox";
import GroupChatModal from "./GroupChatModal";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";


interface ConversationListProps {
    initialItems: FullConversationType[]
    users: User[];
}
const ConversationList: React.FC<ConversationListProps> = ({
    initialItems,
    users
}) => {
    const [items, setItems] = useState(initialItems)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const session = useSession()

    const router = useRouter();

    const { conversationId, isOpen } = useConversation()
    // pusher key
    const pusherKey = useMemo(() => {
        return session.data?.user?.email
    }, [session.data?.user?.email])


    useEffect(() => {
        if (!pusherKey) {
            return;
        }

        pusherClient.subscribe(pusherKey);

        const updateHandler = (conversation: FullConversationType) => {
            setItems((current) => current.map((currentConversation) => {
                if (currentConversation.id === conversation.id) {
                    return {
                        ...currentConversation,
                        messages: conversation.messages
                    };
                }

                return currentConversation;
            }));
        }

        const newHandler = (conversation: FullConversationType) => {
            setItems((current) => {
                if (find(current, { id: conversation.id })) {
                    return current;
                }

                return [conversation, ...current]
            });
        }

        const removeHandler = (conversation: FullConversationType) => {
            setItems((current) => {
                return [...current.filter((singleConversation) => singleConversation.id !== conversation.id)]
            });
        }

        pusherClient.bind('conversation:update', updateHandler)
        pusherClient.bind('conversation:new', newHandler)
        pusherClient.bind('conversation:remove', removeHandler)

        return () => {
            pusherClient.unbind('conversation:update', updateHandler)
            pusherClient.unbind('conversation:new', newHandler)
            pusherClient.unbind('conversation:remove', removeHandler)
        }
    }, [pusherKey, router]);

    // pusher channel
    return (
        <>
            <GroupChatModal
                users={users}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
            <aside className={clsx(`
            fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overscroll-y-auto border-r border-slate-200
        `,
                isOpen ? 'hidden' : 'block w-full left-0'
            )}>
                <div className="px-5">
                    <div className="flex justify-between mb-4 pt-4">
                        <div className="text-2xl font-bold text-slate-900">
                            Messages
                        </div>
                        <div onClick={() => setIsModalOpen(true)} className="rounded-full bg-slate-100 p-2 text-slate-900 cursor-pointer hover:bg-slate-900 hover:text-slate-50 transition">
                            <AiOutlineUsergroupAdd size={23} />
                        </div>
                    </div>
                    {items.map((item) => (
                        <ConversationBox
                            key={item.id}
                            data={item}
                            selected={conversationId === item.id}
                        />
                    ))}
                </div >
            </aside>
        </>
    )
}

export default ConversationList;