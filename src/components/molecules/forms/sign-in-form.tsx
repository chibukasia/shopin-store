"use client"

import {z} from 'zod'
import { useForm } from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription} from '@/components/ui/form'
import { Button, TextField } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import axiosClient from '@/utils/axios-client'

const formSchema = z.object({
    email: z.string({required_error: 'Email is required'}).email().max(50, {message: 'Maximum character limit reached'}),
    password: z.string().min(1, {message: 'Password is required'})
})

export default function SignInForm(){

    const form = useForm<z.infer <typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const router = useRouter()

    const onSubmit = async (values: z.infer<typeof formSchema>)=>{
        axiosClient.post('http://localhost:8000/login', values)
        .then((data) => {
            console.log(data.data)
            localStorage.setItem('token', data.data.token)
            form.reset()
            router.push('/')
        })
        .catch((err) => console.log(err))
        
       
    }
    return(
        <Form {...form}>
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
                <Button type='submit' variant='solid' className='cursor-pointer text-white w-32'>Sign In</Button>
            </form>
        </Form>
    )
}
