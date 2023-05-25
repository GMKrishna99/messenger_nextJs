import Image from 'next/image'
import Logo from '../../public/images/logo.png'
import AuthForm from './components/AuthForm/AuthForm'

export default function Home() {
    return (
        <div className='flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-slate-200'>
            <AuthForm />
        </div>
    )
}
