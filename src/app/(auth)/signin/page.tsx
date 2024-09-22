import SignInForm from "@/screens/auth/sign-in-form";
import { Heading } from "@radix-ui/themes";
import React from "react";

export default function SigninPage(){
    return(
        <div className="w-full h-screen flex flex-col justify-center items-center gap-4 ring-offset-1 ring-1 rounded-lg p-4 ring-slate-400">
            <div>
                <Heading>ShopInn</Heading>
            </div>
            <div className="flex flex-col gap-3">
                <Heading>Admin Login </Heading>
                <SignInForm />
            </div>
            
        </div>
    )
}

