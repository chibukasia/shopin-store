interface IBadgeProps {
    title: string,
    bgColor?: string,
    color?: string
}
const Badge = (props: IBadgeProps) => {

    const { title, bgColor="black", color } = props
    return(
        <div className={`p-1 w-28 bg-black rounded-xl`} >
            <p className={`${color? `text-${color}` : "text-white"} font-semibold text-center text-xs`}>{title}</p>
        </div>
    )
}

export default Badge