'use client'
// imports
import clsx from "clsx"
import {
    FieldErrors,
    FieldValues,
    UseFormRegister
} from 'react-hook-form'
// imports

// interface props fr input fields
interface InputProps {
    label: string;
    id: string;
    type?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors,
    disabled?: boolean
}

const Input: React.FC<InputProps> = ({
    label,
    id,
    type,
    required,
    register,
    errors,
    disabled
}) => {
    return (
        <div className="">
            {/* label for inputs */}
            <label
                className="block text-sm font-medium leading-6 text-slate-800"
                htmlFor={id}>
                {label}
            </label>
            {/* input fields */}
            <div className="mt-2">
                <input
                    id={id}
                    type={type}
                    autoComplete={id}
                    disabled={disabled}
                    {...register(id, { required })}
                    // clsx for write dynamic classes
                    className={clsx(`form-input block w-full rounded-md border-0 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300
                     placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-slate-900 sm:text-lg sm:leading-6 bg-slate-100`,
                        errors[id] && "focus:ring-rose-600",
                        disabled && "opacity-50 cursor-default"
                    )}
                />
            </div>
        </div>
    )
}

export default Input