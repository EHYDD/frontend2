import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

export default function AddNewDataPage() {
    return (
        <div className="p-10">
            <div className="w-1/3  gap-2 items-center pb-4">
                {/* ADD COST CENTER */}
                <div className="shadow-lg hover:shadow-xl py-5 px-5 rounded-xl border border-zinc-200">
                    <div className="font-semibold pb-5 text-center">
                        Add a new cost center
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-xl font-semibold pb-2">
                            Cost Center ID
                        </label>

                        <input
                            id="costCenter"
                            type="text"
                            placeholder="cost center number"
                            className="border rounded-lg px-5 py-2 text-xl bg-white"
                        />
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            size={"medium"}
                            className="mt-3"
                        >
                            Add
                        </Button>
                    </div>
                </div>

                <div className="h-10"></div>

                {/* ADD LOCATION */}
                <div className="shadow-lg hover:shadow-xl py-5 px-5 rounded-xl border border-zinc-200">
                    <div className="font-semibold pb-5 text-center">
                        Add a New Location
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-xl font-semibold pl-2 pb-0">
                            Location Name
                        </label>
                        <input
                            id="costCenter"
                            type="text"
                            placeholder="cost center number"
                            className="border rounded-lg px-5 py-2 text-xl bg-white"
                        />
                        <label className="text-xl font-semibold pt-4 pl-2 pb-0">
                            Pass Status
                        </label>
                        <input
                            id="costCenter"
                            type="text"
                            placeholder="cost center number"
                            className="border rounded-lg px-5 py-2 text-xl bg-white"
                        />
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            size={"medium"}
                            className="mt-3"
                        >
                            Add
                        </Button>
                    </div>
                </div>

                <div className="h-10"></div>

                {/* ADD SERVICE */}
                <div className="shadow-lg hover:shadow-xl py-5 px-5 rounded-xl border border-zinc-200">
                    <div className="font-semibold pb-5 text-center">
                        Add a New Service Type
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-xl font-semibold pl-2 pb-0">
                            Service Type
                        </label>
                        <input
                            id="costCenter"
                            type="text"
                            placeholder="cost center number"
                            className="border rounded-lg px-5 py-2 text-xl bg-white"
                        />
                        <label className="text-xl font-semibold pt-4 pl-2 pb-0">
                            Payment Rate
                        </label>
                        <input
                            id="costCenter"
                            type="text"
                            placeholder="cost center number"
                            className="border rounded-lg px-5 py-2 text-xl bg-white"
                        />
                        <label className="text-xl font-semibold pt-4 pl-2 pb-0">
                            Overtime Rate
                        </label>
                        <input
                            id="costCenter"
                            type="text"
                            placeholder="cost center number"
                            className="border rounded-lg px-5 py-2 text-xl bg-white"
                        />
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            size={"medium"}
                            className="mt-3"
                        >
                            Add
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
