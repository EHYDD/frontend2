export default function SidePanelButton(props) {
    return (
        <div className="py-2">
            <div className={
                props.isSelected === true ? 
                    "flex justify-center rounded-2xl py-4 text-emerald-400 bg-zinc-800 hover:text-emerald-400" : 
                    "flex justify-center rounded-2xl py-4 text-gray-400 hover:bg-zinc-800 hover:text-white"
                }>
                <div className="flex w-72">
                    <div className="w-10">
                        {props.icon}
                    </div>
                    <span className="pl-2 text-xl font-semibold line-clamp-1  w-fit">
                        {props.title}
                    </span>
                </div>
            </div>
        </div>
    );
}