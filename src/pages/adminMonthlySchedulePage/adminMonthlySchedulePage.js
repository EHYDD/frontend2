import { Calendar, theme, Button, Table } from "antd";
import { useState } from "react";

export default function AdminMonthlySchedulePage() {
    const { token } = theme.useToken();
    const wrapperStyle = {
        width: 450,
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
    };
    const onPanelChange = (value, mode) => {
        console.log(value.format("YYYY-MM-DD"), mode);
    };

    const [loadings, setLoadings] = useState([]);
    const [available, setAvailability] = useState(false);

    const enterLoading = (index) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });
        setTimeout(() => {
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[index] = false;
                setAvailability(!available);
                return newLoadings;
            });
        }, 2000);
    };

    let sampleData = [
        { hour: "14:00", status: "0" },
        { hour: "03:00", status: "1" },
        { hour: "18:00", status: "0" },
        { hour: "21:00", status: "1" },
        { hour: "07:00", status: "0" },
        { hour: "12:00", status: "1" },
        { hour: "05:00", status: "0" },
        { hour: "23:00", status: "1" },
        { hour: "16:00", status: "0" },
        { hour: "01:00", status: "1" },
    ];

    const columns = [
        {
            title: "Hour",
            dataIndex: "hour",
        },
        {
            title: "Status",
            dataIndex: "status",
            filters: [
                {
                    text: "Holiday",
                    value: "holiday",
                },
                {
                    text: "Available",
                    value: "0",
                },
                {
                    text: "Not Available",
                    value: "1",
                },
            ],
            onFilter: (value, record) => record.status.indexOf(value) === 0,
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log("params", pagination, filters, sorter, extra);
    };

    return (
        <div className="flex h-screen">
            {/* SCHEDULE */}
            <div className="w-3/5 p-8 border-l-4 border-double">
                <div className="pb-2 text-lg font-semibold">
                    Labor Request Schedule
                </div>
                <div className="pb-12 text-base">
                    This's the Availability Calendar section of our labor
                    management platform! Here, employees can easily visualize
                    the availability of labor for scheduling tasks across
                    different dates and timeframes. The calendar provides a
                    comprehensive overview of occupied dates, where labor
                    resources have already been allocated, as well as available
                    dates, where manpower is ready to be assigned.
                </div>
                <div className="w-fit pl-20">
                    {/* SEARCH DATE */}
                    <div style={wrapperStyle}>
                        <Calendar
                            fullscreen={false}
                            onPanelChange={onPanelChange}
                        />
                    </div>

                    {/* SEARCH DATE */}
                    <div className="pt-5 flex justify-end">
                        <Button
                            type="primary"
                            loading={loadings[0]}
                            onClick={() => enterLoading(0)}
                        >
                            Check Schedule
                        </Button>
                    </div>
                </div>
            </div>

            {/*  */}
            <div
                className={
                    available === true
                        ? "border-l-4 border-double p-8"
                        : "hidden"
                }
            >
                <div className="font-semibold text-xl pb-5">Daily Schedule</div>
                <div className="w-full pl-5 pt-5">
                    <Table
                        columns={columns}
                        dataSource={sampleData}
                        onChange={onChange}
                        showSorterTooltip={{
                            target: "sorter-icon",
                        }}
                        style={{ width: 300 }}
                    />
                </div>
            </div>
        </div>
    );
}
