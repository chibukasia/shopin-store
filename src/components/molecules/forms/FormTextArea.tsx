import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InputProps } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Control } from "react-hook-form";

interface FITextAreaProps extends InputProps {
    control: Control
    label: string
    name: string
    description?: string
}

const FormTextarea = (props: FITextAreaProps) => {
    const {name, control, label, placeholder, description} = props
    return(
        <FormField control={control}
        name={name}
        render={({field}) =>(
            <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                    <Textarea placeholder={placeholder} {...field}/>
                </FormControl>
                <FormDescription>
                    {description}
                </FormDescription>
                <FormMessage className="text-xs"/>
            </FormItem>
        )}
        />
    )
}

export default FormTextarea