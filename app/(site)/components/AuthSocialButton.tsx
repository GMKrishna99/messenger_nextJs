
// imports
import { IconType } from "react-icons"



interface AuthSocialButtonProps {
    icon: IconType,
    onClick: () => void;
}
const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
    icon: Icon,
    onClick
}) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="inline-flex w-full justify-center rounded-md bg-slate-800 px-4 py-2 text-white shadow-sm hover:bg-slate-900 focus:outline-offset-0 "
        >
            <Icon size='24' />
        </button>
    )
}
export default AuthSocialButton