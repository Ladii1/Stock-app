import React from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { cn } from '@/lib/utils'

const InputField = ({name, label, placeholder, register, type="text",error, validation, disabled, value}:FormInputProps) => {
  return (
    <div className='space-y-2'>
        <Label>
            {label}
        </Label>
        <Input
            type={type}
            placeholder={placeholder}
            id={name}
            disabled={disabled}
            value={value}
            className={cn('form-input',{'opacity-50 cursor-not-allowed': disabled})}
            {...register(name, validation)}
        />
        {error && <p className='text-sm text-red-500'>{error.message}</p>}
    </div>
  )
}

export default InputField