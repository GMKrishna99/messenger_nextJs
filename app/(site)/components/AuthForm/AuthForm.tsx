'use client'
// imports
import axios from "axios";
import Input from "@/app/components/Input/Input";
import Button from "@/app/components/Button";
import AuthSocialButton from "../AuthSocialButton";

// imports from react
import { useCallback, useEffect, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'


import Image from 'next/image'
import Logo from '../../../../public/images/logo.png'

// import icons
import { AiOutlineGoogle, AiFillGithub } from 'react-icons/ai'
// imports


// type for login and register
type Variant = 'LOGIN' | 'REGISTER'

const AuthForm = () => {
    // session hook authenticated then redirect to home page
    const session = useSession();

    //use router hook for redirecting 
    const router = useRouter();

    const [variant, setVariant] = useState<Variant>('LOGIN');

    // it gonna be used to disable & enable buttons
    const [isLoading, setIsLoading] = useState(false);

    // if current status is authenticated then redirect to home page
    useEffect(() => {
        if (session?.status === 'authenticated') {
            // redirect to users page
            router.push('/users')
        }
    }, [session?.status, router])


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
            axios.post('/api/register', data)
                // sign when register is success
                .then(() => signIn('credentials', data))
                .catch(() => toast.error('Something went wrong'))
                .finally(() => {
                    // isLoading false
                    setIsLoading(false);
                }
                )
        }

        // NextAuth signIn  function for login and register
        if (variant === 'LOGIN') {
            // callback to get credentials from server
            signIn('credentials', {
                ...data,
                redirect: false
            })
                // if user enter invalid credentials
                .then((callback) => {
                    if (callback?.error) {
                        toast.error('Invalid Credentials')
                    }
                    // if user enter valid credentials
                    if (callback?.ok && !callback?.error) {
                        toast.success("Successfully Logged In")
                        router.push('/users')

                    }
                })
                .finally(() => setIsLoading(false))
        }
    }

    // social SignIn & SignUp
    const socialAction = (action: string) => {
        setIsLoading(true)

        signIn(action, { redirect: false })
            .then((callback) => {
                if (callback?.error) {
                    toast.error('Something went wrong')
                }
                if (callback?.ok && !callback?.error) {
                    toast.success("Successfully Logged In")
                }
            }
            )
            .finally(() => setIsLoading(false))
    }
    return (
        // login form container
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            {/* login form  */}
            <div className="bg-slate-100 px-4 py-8 shadow sm:rounded-lg sm:px-10">
                <div className='min-h-full justify-center py-12 sm:px-6 lg:px-8'>
                    <div className='sm:mx-auto sm:w-full sm:max-w-md flex items-center justify-center'>
                        <Image
                            alt='Logo'
                            height="48"
                            width="48"
                            className='mx-auto w-auto'
                            src={Logo}
                        />
                        <h2 className=' w-full  text-center text-2xl font-bold text-slate-900'>
                            {variant === 'LOGIN' ? 'Welcome Back' : 'Create an Account'}
                        </h2>
                    </div>
                    {/* <AuthForm /> */}

                </div>
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