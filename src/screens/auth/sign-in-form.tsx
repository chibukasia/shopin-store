"use client"

import {z} from 'zod'
import { useForm } from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form'
import { Button, TextField } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import axiosClient from '@/utils/axios-client'
import { useState } from 'react'
import ActionButton from '@/components/atoms/buttons/ActionButton'

const formSchema = z.object({
    email: z.string({required_error: 'Email is required'}).email().max(50, {message: 'Maximum character limit reached'}),
    password: z.string().min(1, {message: 'Password is required'})
})

export default function SignInForm(){

    const [loading, setloading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const form = useForm<z.infer <typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const router = useRouter()

    const onSubmit = async (values: z.infer<typeof formSchema>)=>{
        setloading(true)
        axiosClient.post('login', values)
        .then((data) => {
            if(data.data.role === 'store_admin'){
                localStorage.setItem('token', data.data.token)
                form.reset()
                router.push('/')
            }else{
                setError('Invalid email or password')
                return
            }
            
        })
        .catch((err) => {
            setError(err.response.data.error)
        })
        .finally(()=> setloading(false))
        
       
    }
    return(
        <Form {...form}>
            {error && <p className='text-red-500'>{error}</p>}
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 w-full md:w-96'>
                <FormField 
                control={form.control}
                name='email'
                render={({field})=>(
                    <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                            <TextField.Root placeholder='Enter your email address' {...field}/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name='password'
                render={({field})=>(
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <TextField.Root placeholder='Enter your password ' {...field}/>
                        </FormControl>
                    </FormItem>
                )}
                 />
                <ActionButton title='Sign In' type='submit' className='cursor-pointer text-white w-32' loading={loading}  loaderText='Signing in...'/>
            </form>
        </Form>
    )
}
