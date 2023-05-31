'use client'

import { User } from "@prisma/client";
import Image from "next/image";

interface AvatarGroupProps {
    users?: User[]
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({
    users = []
}) => {
    // it will get three users from users profiles
    const slicedUsers = users.slice(0, 4);

    const positionMap = {
        0: 'top-0 left-0',
        1: 'bottom-0',
        2: 'bottom-0 right-0',
        3: 'top-0 right-0'
    }

    return (
        <div className="relative h-11 w-11 ">
            {slicedUsers.map((user, index) => (
                <div key={user.id} className={`absolute inline-block rounded-full overflow-hidden h-[21px] w-[21px]  ${positionMap[index as keyof typeof positionMap]}`}>
                    <Image
                        src={user?.image || '/images/placeholder.jpg'}
                        alt="Avatar"
                        fill
                    />
                </div>
            ))}
        </div>
    );
};

export default AvatarGroup;