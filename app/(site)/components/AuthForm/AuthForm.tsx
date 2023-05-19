'use client'
import Button from "@/app/components/Button";
// imports
import Input from "@/app/components/Input/Input";


// imports from react
import { useCallback, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AuthSocialButton from "../AuthSocialButton";


// import icons

import { AiOutlineGoogle, AiFillGithub } from 'react-icons/ai'
// imports


// type for login and register
type Variant = 'LOGIN' | 'REGISTER'

const AuthForm = () => {

    const [variant, setVariant] = useState<Variant>('LOGIN');

    // it gonna be used to disable & enable buttons
    const [isLoading, setIsLoading] = useState(false);

    // toggle for switch between Register & login
    const toggleVariant = useCallback(() => {
        // change the variant depending on requirement
        if (variant === 'LOGIN') {
            setVariant('REGISTER');
        } else {
            setVariant('LOGIN')
        }
    }, [variant])

    // react hook form submit function and other functions
    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    // onSubmit Function
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        // isLoading true
        setIsLoading(true);

        // AXIOS call for Register
        if (variant === 'REGISTER') {

        }

        // NextAuth signIn
        if (variant === 'LOGIN') {

        }
    }

    // social SignIn & SignUp
    const socialAction = (action: string) => {
        setIsLoading(true)
    }

    return (
        // login form container
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            {/* login form  */}
            <div className="bg-slate-100 px-4 py-8 shadow sm:rounded-lg sm:px-10">
                {/* form fields 
                    ** written handleSubmit for get data when submit and we abe to send && get form the server
                */}
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    {/* input component */}

                    {/*Registration input fields */}
                    {variant === 'REGISTER' && (
                        <Input
                            id="name"
                            label="Name"
                            register={register}
                            errors={errors}
                            disabled={isLoading}
                        />
                    )}

                    {/* login input fields  */}
                    <Input
                        id="email"
                        label="Email address"
                        type="email"
                        register={register}
                        errors={errors}
                        disabled={isLoading}
                    />
                    <Input
                        id="password"
                        label="Password"
                        type="password"
                        register={register}
                        errors={errors}
                        disabled={isLoading}
                    />
                    {/* button */}
                    <div className="">
                        <Button disabled={isLoading} fullWidth type="submit" >
                            {variant === 'LOGIN' ? 'Sign in' : 'Register'}
                        </Button>
                    </div>
                </form>
                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            {/* divider  */}
                            <div className="w-full border-t border-slate-300" />
                        </div>
                        {/* social media login login heading*/}
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-slate-100 px-5 text-slate-600">
                                {variant === 'LOGIN' ? "or Login with" : "or register with"}
                            </span>
                        </div>
                    </div>
                    <div className="mt-6 flex gap-2 ">
                        {/* social login buttons component */}
                        <AuthSocialButton
                            icon={AiFillGithub}
                            onClick={() => socialAction('github')}
                        />

                        <AuthSocialButton
                            icon={AiOutlineGoogle}
                            onClick={() => socialAction('google')}
                        />
                    </div>
                </div>
                <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-slate-600">
                    <div>
                        {variant === 'LOGIN' ? 'New to Messenger ?' : 'Already have an Account ?'}
                    </div>
                    <div onClick={toggleVariant} className="text-slate-500 hover:text-slate-950 font-bold cursor-pointer">
                        {variant === 'LOGIN' ? "Create an Account" : 'Login'}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthForm