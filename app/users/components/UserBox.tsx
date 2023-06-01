'use client'

import Avatar from "@/app/components/Avatar";
import LoadingModal from "@/app/components/LoadingModal";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";


interface UserBoxProps {
    data: User
}

const UserBox: React.FC<UserBoxProps> = ({
    data
}) => {
    // importing router for routing
    const router = useRouter();
    // disabling when loading 
    const [isLoading, setIsLoading] = useState(false)

    // handle click for api call
    const handleClick = useCallback(() => {
        setIsLoading(true)


        axios.post('/api/conversations', {
            userId: data.id
        })
            .then((data) => {
                router.push(`/conversations/${data.data.id}`)
            })
            .finally(() => setIsLoading(false))
    }, [data, router])

    return (
        <>
            {isLoading && (
                <LoadingModal />
            )}
            <div className="w-full relative flex items-center space-x-3 bg-slate-50 p-3 hover:bg-slate-200 rounded-lg hover:border-transparent transition cursor-pointer " onClick={handleClick}>
                <Avatar
                    user={data}
                />
                <div className="min-w-0 flex-1">
                    <div className="focus:outline-none">
                        <div className="flex justify-between items-center mb-1">
                            <p className="text-sm font-bold text-slate-900 capitalize">{data.name}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default UserBox;