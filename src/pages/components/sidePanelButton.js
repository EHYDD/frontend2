export default function SidePanelButton(props) {
    return (
        <div className="py-2">
            <div className={
                props.isSelected === true ? 
                    "flex justify-center rounded-2xl py-5 text-emerald-400 bg-zinc-800 hover:text-emerald-400" : 
                    "flex justify-center rounded-2xl py-5 text-gray-400 hover:bg-zinc-800 hover:text-white"
                }>
                <div className="flex w-64">
                    {props.icon}
                    <span className="pl-2 text-2xl font-semibold ">
                        {props.title}
                    </span>
                </div>
            </div>
        </div>
    );
}