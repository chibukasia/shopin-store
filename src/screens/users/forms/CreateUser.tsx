"use client";
import ActionButton from "@/components/atoms/buttons/ActionButton";
import FormInput from "@/components/molecules/forms/FormInput";
import FormSelect from "@/components/molecules/forms/FormSelect";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createUser } from "../api";
import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EUser } from "@/utils/entities";
import { authRedirect } from "@/utils";

const userSchema = z.object({
  firstName: z.string({ required_error: "First name is required" }),
  lastName: z.string({ required_error: "Last name is required" }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must contain at least 6 characters" })
    .max(15, { message: "Password too long" }),
  role: z.string({ required_error: "Role is required" }),
});

type User = z.infer<typeof userSchema>;
const roles = [
  {
    label: "Branch Admin",
    value: "branch_admin",
  },
];
const CreateUserScreen = () => {
  const form = useForm<User>({
    resolver: zodResolver(userSchema),
  });
  const formRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient()

  const {mutate, isPending, isError, error} = useMutation({
    mutationKey: ['user'],
    mutationFn: (user: EUser) => createUser(user),
    onSuccess(){
      queryClient.invalidateQueries({queryKey: ['user', 'users']})
      router.push("/users");
    },
    onError(error: any){
      console.log(error)
      authRedirect(router, error)
    }
  })

  const handleSubmit = (data: User) => {
    mutate({
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      role: data.role,
      password: data.password,
    })
  };
  return (
    <div className="flex flex-col justify-center items-center pt-8">
      {isError && <p>Could not create user</p>}
      <h2 className="text-xl text-center pb-5 font-semibold">
        Create New User
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="sm:w-full md:w-1/2 lg:w-1/3"
          ref={formRef}
        >
          <div className="flex w-full justify-between flex-wrap">
            <div className="w-[48%]">
              <FormInput
                control={form.control}
                name="firstName"
                label="Fist Name"
                placeholder="Enter first name..."
              />
            </div>
            <div className="w-[48%]">
              <FormInput
                control={form.control}
                name="lastName"
                label="Last Name"
                placeholder="Enter last name..."
              />
            </div>
          </div>
          <FormSelect
            label="User Role"
            name="role"
            control={form.control}
            items={roles}
            placeholder="Select Role..."
          />
          <FormInput
            control={form.control}
            name="email"
            label="Email"
            type="email"
            placeholder="Enter email..."
          />
          <FormInput
            control={form.control}
            name="password"
            label="Password"
            type="password"
            placeholder="Enter password..."
          />
          <div>
            <ActionButton
              title="Create user"
              loading={isPending}
              loaderText="Creating User..."
            />
          </div>
        </form>
      </Form>
      <div onClick={() =>router.back()} className="sm:w-full md:w-1/2 lg:w-1/3 pt-10 flex items-center cursor-pointer">
        <ArrowLeft />
        <p>Back</p>
      </div>
      
    </div>
  );
};

export default CreateUserScreen;
