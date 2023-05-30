"use client"

import useConversation from "@/app/hooks/useConversation";
import { FullMessageType } from "@/app/types";
import { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import axios from "axios";


interface BodyProps {
    initialMessages: FullMessageType[]

}

const Body: React.FC<BodyProps> = ({
    initialMessages
}) => {
    const [messages, setMessages] = useState(initialMessages)

    // bottom Reference for when user ge new messages 

    const bottomRef = useRef<HTMLDivElement>(null)

    // use conversation to extract conversation id
    const { conversationId } = useConversation()
    // seen last messages
    useEffect(() => {
        axios.post(`/api/conversations/${conversationId}/seen`)
    }, [conversationId])
    return (
        <div className="flex-1 overflow-y-auto">
            {/* iteration for message box */}
            {messages.map((message, i) => (
                <MessageBox
                    isLast={i === messages.length - 1}
                    key={message.id}
                    data={message}
                />
            ))}
            <div
                ref={bottomRef}
                className="pt-24"
            />
        </div>
    )
}

export default Body;