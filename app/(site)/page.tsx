import Image from 'next/image'
import Logo from '../../public/images/logo.png'
import AuthForm from './components/AuthForm/AuthForm'

export default function Home() {
    return (
        <div className='flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-slate-200'>
            <div className='sm:mx-auto sm:w-full sm:max-w-md'>
                <Image
                    alt='Logo'
                    height="48"
                    width="48"
                    className='mx-auto w-auto'
                    src={Logo}
                />
                <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-slate-800'>Login to your account</h2>
            </div>
            {/* Authentication Form */}
            <AuthForm />

        </div>
    )
}
