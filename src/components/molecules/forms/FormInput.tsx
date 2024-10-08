import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control } from "react-hook-form"
import { InputProps } from '../../ui/input';

interface FormIputProps extends InputProps {
    name: string
    label: string
    description?: string
    control: Control<any>
}
const FormInput = (props: FormIputProps) => {
    const {name, label, placeholder,description, control, type} = props
    return(<FormField 
    control={control}
    name={name}
    render={({field})=>(
        <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
                <Input placeholder={placeholder} {...field} type={type}/>
            </FormControl>
            <FormDescription>
                {description}
            </FormDescription>
            <FormMessage className="text-xs"/>
        </FormItem>
    )}
    />)
}

export default FormInput