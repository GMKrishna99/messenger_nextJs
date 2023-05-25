'use client'

import Link from 'next/link'
import clsx from 'clsx'


interface MobileItemProps {
    href: string;
    icon: any;
    active?: boolean;
    onClick?: () => void;
}
const MobileItem: React.FC<MobileItemProps> = ({
    href,
    icon: Icon,
    active,
    onClick
}) => {
    const handleClick = () => {
        if (onClick) {
            return onClick()
        }
    }
    return (
        <Link className={clsx(`
            group  flex gap-x-3 text-sm leading-6 font-semibold w-full justify-center p-4 text-slate-900 hover:text-slate-100 hover:bg-slate-900
        `, active && 'bg-slate-900 text-white')} href={href} onClick={onClick} >
            <Icon className="w-6 h-6" />

        </Link>
    )
}

export default MobileItem