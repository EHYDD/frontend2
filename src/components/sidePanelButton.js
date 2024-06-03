export default function SidePanelButton(props) {
    return (
        <div className="py-2 cursor-pointer">
            <div
                className={
                    props.isSelected === true
                        ? "flex justify-center items-center rounded-xl py-3 text-emerald-400 bg-zinc-800 hover:text-emerald-400"
                        : "flex justify-center items-center rounded-xl py-3 text-gray-400 hover:bg-zinc-800 hover:text-white"
                }
            >
                <div className="flex w-72 pl-5">
                    <div className="w-10">{props.icon}</div>
                    <span className="font-semibold line-clamp-1  w-fit">
                        {props.title}
                    </span>
                </div>
            </div>
        </div>
    );
}
