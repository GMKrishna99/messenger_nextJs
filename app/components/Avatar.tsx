'use client'

import { User } from "@prisma/client"
import AvatarCharacter from '../../public/images/placeholder.jpg'
import Image from "next/image"

interface AvatarProps {
    user?: User
}
const Avatar: React.FC<AvatarProps> = ({
    user
}) => {
    return (
        <div className="relative">
            <div className="relative inline-block rounded-full overflow-hidden h-7 w-7 md:h-10 md:w-11 border-[3px] border-slate-900 ">
                <Image
                    alt="avatar"
                    src={user?.image || AvatarCharacter}
                    fill
                />
            </div>
            <span
                className="absolute block rounded-full bg-green-500 ring-2 ring-slate-100 top-0 right-0 h-2 w-2 md:h-3 md:w-3  "
            />
        </div>
    )
}

export default Avatar