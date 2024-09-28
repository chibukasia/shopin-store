import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

interface StoreCardProps {
    image_url: string,
    name: string
    onClick: () => void
}

const StoreCard = (props: StoreCardProps) => {
    return(
        <Card className="bg-muted/90 rounded-xl sm-w-full md:w-52 cursor-pointer hover:brightness-90" onClick={props.onClick}>
            <CardContent className="flex justify-center items-center h-[81.5%]">
                <Image src={props.image_url} width={100} height={80} alt={props.name} className="object-cover"/>
            </CardContent>
            
            <div className="flex items-center justify-start px-2 bg-teal-300 rounded-b-xl">
                <p className="text-lg font-semibold text-white">{props.name}</p>
            </div>
        </Card>
    )
}

export default StoreCard