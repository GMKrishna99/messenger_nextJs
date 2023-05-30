'use client'

import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { TbPhotoPlus, TbBrandTelegram } from "react-icons/tb";
import MessageInput from "./MessageInput";
import { CldUploadButton } from "next-cloudinary";

const Form = () => {
    const { conversationId } = useConversation()

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }

    } = useForm<FieldValues>({
        defaultValues: {
            message: ''
        }
    })
    // onSubmit 
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        // to clear message after submit 
        setValue('message', '', { shouldValidate: true })
        // post request to api
        axios.post('/api/messages', {
            ...data,
            conversationId
        })
    }

    // image upload in cloudinary
    const handleUpload = (result: any) => {
        axios.post('/api/messages', {
            image: result?.info?.secure_url,
            conversationId
        })
    }
    return (
        <div className="py-4 px-4 bg-slate-100 border-t flex items-center gap-2 lg:gap-4 w-full ">
            <CldUploadButton options={{ maxFiles: 1 }} onUpload={handleUpload} uploadPreset="cktnivk5">
                <TbPhotoPlus size={28} className="text-slate-500 hover:text-slate-900 cursor-pointer" />
            </CldUploadButton>
            <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2 lg:gap-4 w-full " >
                <MessageInput
                    id="message"
                    register={register}
                    errors={errors}
                    required
                    placeholder="Enter a message"
                />
                <button type="submit" className="rounded-full bg-slate-800 cursor-pointer hover:bg-slate-900 transition p-2">
                    <TbBrandTelegram size={20} className="text-slate-100" />
                </button>
            </form>
        </div >
    )
}

export default Form;