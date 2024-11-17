import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { InputProps } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ReactNode } from "react"
import { Control, useForm } from "react-hook-form"

interface FormSelectProps extends InputProps {
    name: string
    label?: ReactNode
    description?: string
    control: Control<any>
    items: {
        label: string
        value: string
    }[]
}
const FormSelect = (props: FormSelectProps) => {
    const {control, name, label, placeholder, description, items} = props
    return(
        <FormField
        control={control}
        name={name}
        render={({field}) => (
            <FormItem>
                <FormLabel>{label}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} >
                    <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder={placeholder ?? 'Select...'}/>
                        </SelectTrigger>
                        
                    </FormControl>
                    <SelectContent>
                        {items.map((item) =>(
                            <SelectItem value={item.value} key={item.label}>{item.label}</SelectItem>
                        ))}
                    </SelectContent>
                    <FormMessage className="text-xs"/>
                </Select>
            </FormItem>
        )}
         />
    )
}

export default FormSelect