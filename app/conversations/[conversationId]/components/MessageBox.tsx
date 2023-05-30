'use client';

import Avatar from "@/app/components/Avatar";
import { FullMessageType } from "@/app/types";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import format from "date-fns/format";
import Image from "next/image";


interface MessageBoxProps {
    data: FullMessageType
    isLast?: boolean

}

const MessageBox: React.FC<MessageBoxProps> = ({
    data,
    isLast
}) => {
    // session hook
    const session = useSession();

    // check if the message is sent by the current user or other user and seen by some one 
    const isOwn = session?.data?.user?.email === data?.sender?.email;
    // seen messages 
    const seenList = (data.seen || [])
        .filter((user) => user.email !== data.sender?.email)
        .map((user) => user.name)
        .join(',');
    // container dynamic classes
    const container = clsx(
        'flex gap-3 p-3',
        isOwn && "justify-end"
    )
    // avatar dynamic classes
    const avatar = clsx(isOwn && "order-2")
    // body dynamic classes
    const body = clsx('flex flex-col gap-2', isOwn && "items-end")
    // message dynamic classes
    const message = clsx('text-sm w-fit overflow-hidden',
        isOwn ? 'bg-slate-900 text-slate-50 ' : 'bg-slate-200 text-slate-900',
        data.image ? 'rounded-md p-0' : 'rounded-lg py-2 px-3'
    )
    return (
        <div className={container}>
            <div className={avatar}>
                <Avatar
                    user={data.sender}
                />
            </div>
            <div className={body}>
                <div className="flex items-center gap-1">
                    <div className="text-sm text-slate-600">
                        {data.sender.name}
                    </div>
                    <div className="text-xs text-slate-400">
                        {format(new Date(data.createdAt), 'p')}
                    </div>
                </div>
                <div className={message}>
                    {data.image ? (
                        <Image
                            alt="sent image"
                            height="288"
                            width="288"
                            src={data.image}
                            className="object-cover cursor-pointer hover:scale-110 transition translate"
                        />
                    ) : (
                        <div>{data.body}</div>
                    )}

                </div>
                {
                    isLast && isOwn && seenList.length > 0 && (
                        <div className="text-xs text-slate-400">
                            {`Seen by ${seenList}`}
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default MessageBox;