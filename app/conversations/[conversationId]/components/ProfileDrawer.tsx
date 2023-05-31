'use client'

import Avatar from "@/app/components/Avatar";
import Modal from "@/app/components/Modal";
import useOtherUser from "@/app/hooks/useOtherUser";
import { Dialog, Transition } from "@headlessui/react";
import { Conversation, User } from "@prisma/client";
import { format, set } from "date-fns";
import { Fragment, useMemo, useState } from "react";
import { IoClose } from 'react-icons/io5';
import { TbTrashXFilled } from 'react-icons/tb'
import ConfirmModal from "./ConfirmModal";
import AvatarGroup from "@/app/components/AvatarGroup";

interface ProfileDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    data: Conversation & {
        users: User[];
    }
}
const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
    isOpen,
    onClose,
    data
}) => {
    const otherUser = useOtherUser(data);
    const [confirmOpen, setIsConfirmOpen] = useState(false);
    // user joined date
    const joinedDate = useMemo(() => {
        return format(new Date(otherUser.createdAt), 'PP')
    }, [otherUser.createdAt])

    // title
    const title = useMemo(() => {
        return data.name || otherUser.name
    }, [data.name, otherUser.name])

    // status text
    const statusText = useMemo(() => {
        if (data.isGroup) {
            return `${data.users.length} members`
        }

        return 'Active'
    }, [data])

    return (
        <>
            {/* delete Modal */}
            <ConfirmModal
                isOpen={confirmOpen}
                onClose={() => setIsConfirmOpen(false)}
            />

            {/* side profile drawer */}
            <Transition.Root show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative x-50" onClose={onClose} >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-slate-900 bg-opacity-40" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                                <Transition.Child as={Fragment} enter="transform transition ease-in-out duration-500 sm:duration-700" enterFrom="translate-x-full" enterTo="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leaveFrom="translate-x- 0" leaveTo="translate-x-full">
                                    <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                        <div className="flex h-full flex-col overflow-y-scroll bg-slate-50 py-6 shadow-xl">
                                            <div className=" px-4 sm:px-6">
                                                <div className="flex items-start justify-end">
                                                    <div className="ml-3 flex h-7 items-center">
                                                        <button type='button'
                                                            className="rounded-md  p-1 text-slate-900 hover:text-slate-50 transition hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2" onClick={onClose}>
                                                            <span className="sr-only">Close Pannel</span>
                                                            <IoClose size={24} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* avatar */}
                                            <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                                <div className="flex flex-col items-center">
                                                    <div className="mb-2">
                                                        {data.isGroup ? (
                                                            <AvatarGroup users={data.users} />
                                                        ) : (
                                                            <Avatar user={otherUser} />
                                                        )}
                                                    </div>
                                                    <div className="capitalize text-lg font-semibold text-slate-800">
                                                        {title}
                                                    </div>
                                                    <div className="text-sm text-slate-500">
                                                        {statusText}
                                                    </div>
                                                    <div className="flex gap-10 my-8">
                                                        <div className="flex flex-col gap-3 items-center cursor-pointer hover:opacity-75" onClick={() => setIsConfirmOpen(true)}>
                                                            <div className=" w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-slate-50 ">
                                                                <TbTrashXFilled size={20} />
                                                            </div>
                                                            <div className="text-sm font-bold text-slate-900 -mt-1">
                                                                Delete
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="w-full pb-5 pt-5 sm:px-0 sm:pt-0">
                                                        <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
                                                            {data.isGroup && (
                                                                <div >
                                                                    <dt className="text-sm font-medium text-slate-500 sm;w-40 sm:flex-shrink-0">
                                                                        Emails
                                                                    </dt>
                                                                    <dd className="mt-1 text-sm text-slate-900  sm:col-span-2">
                                                                        {data.users.map((user) => user.email).join(',  ')}

                                                                    </dd>
                                                                </div>
                                                            )}
                                                            {!data.isGroup && (
                                                                <div className="">
                                                                    <dt className="text-sm font-medium text-slate-500 sm:w-40 sm:flex-shrink-0">
                                                                        Email
                                                                    </dt>
                                                                    <dd className="mt-1 text-sm text-slate-900  sm:col-span-2">
                                                                        {otherUser.email}
                                                                    </dd>
                                                                </div>
                                                            )}
                                                            {!data.isGroup && (
                                                                <>
                                                                    <hr />
                                                                    <div className="">
                                                                        <dt className="text-sm font-medium text-slate-500 sm:w-40 sm:flex-shrink-0">
                                                                            Date of Joined
                                                                        </dt>
                                                                        <dd className="mt-1 text-sm text-slate-900  sm:col-span-2">
                                                                            <time dateTime={joinedDate}>
                                                                                {joinedDate}
                                                                            </time>
                                                                        </dd>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </dl>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
};

export default ProfileDrawer;