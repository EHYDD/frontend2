/* eslint-disable no-unused-vars */
import { List, Collapse, Table } from "antd";

export default function PriorityRequests() {
    let orderHistory = [
        {
            date: Date().toString().substring(0, 15),
            manPower: 5,
            location: "Location 1",
            serviceType: "labor",
            dateRange: [
                Date().toString().substring(0, 15),
                Date().toString().substring(0, 15),
            ],
            status: "active",
        },
        {
            date: Date().toString().substring(0, 15),
            manPower: 8,
            location: "Location 2",
            serviceType: "cleaning",
            dateRange: [
                Date().toString().substring(0, 15),
                Date().toString().substring(0, 15),
            ],
            status: "pending",
        },
        {
            date: Date().toString().substring(0, 15),
            manPower: 4,
            location: "Location 3",
            serviceType: "labor",
            dateRange: [
                Date().toString().substring(0, 15),
                Date().toString().substring(0, 15),
            ],
            status: "completed",
        },
        {
            date: Date().toString().substring(0, 15),
            manPower: 3,
            location: "Location 1",
            serviceType: "cleaning",
            dateRange: [
                Date().toString().substring(0, 15),
                Date().toString().substring(0, 15),
            ],
            status: "active",
        },
        {
            date: Date().toString().substring(0, 15),
            manPower: 2,
            location: "Location 2",
            serviceType: "labor",
            dateRange: [
                Date().toString().substring(0, 15),
                Date().toString().substring(0, 15),
            ],
            status: "pending",
        },
        {
            date: Date().toString().substring(0, 15),
            manPower: 3,
            location: "Location 3",
            serviceType: "cleaning",
            dateRange: [
                Date().toString().substring(0, 15),
                Date().toString().substring(0, 15),
            ],
            status: "completed",
        },
        {
            date: Date().toString().substring(0, 15),
            manPower: 5,
            location: "Location 1",
            serviceType: "labor",
            dateRange: [
                Date().toString().substring(0, 15),
                Date().toString().substring(0, 15),
            ],
            status: "active",
        },
        {
            date: Date().toString().substring(0, 15),
            manPower: 8,
            location: "Location 2",
            serviceType: "cleaning",
            dateRange: [
                Date().toString().substring(0, 15),
                Date().toString().substring(0, 15),
            ],
            status: "pending",
        },
        {
            date: Date().toString().substring(0, 15),
            manPower: 4,
            location: "Location 3",
            serviceType: "labor",
            dateRange: [
                Date().toString().substring(0, 15),
                Date().toString().substring(0, 15),
            ],
            status: "completed",
        },
    ];

    const columns = [
        {
            title: "Date",
            dataIndex: "date",
            showSorterTooltip: {
                target: "full-header",
            },

            // specify the condition of filtering result
            // here is that finding the name started with `value`
            onFilter: (value, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ["descend"],
        },
        {
            title: "Man Power",
            dataIndex: "manPower",
            defaultSortOrder: "descend",
            sorter: (a, b) => a.manPower - b.manPower,
        },
        {
            title: "Location",
            dataIndex: "location",
            filters: [
                {
                    text: "Location 1",
                    value: "Location 1",
                },
                {
                    text: "Location 2",
                    value: "Location 2",
                },
                {
                    text: "Location 3",
                    value: "Location 3",
                },
            ],
            onFilter: (value, record) => record.location.indexOf(value) === 0,
        },
        {
            title: "Service Type",
            dataIndex: "serviceType",
            filters: [
                {
                    text: "Labor",
                    value: "labor",
                },
                {
                    text: "Cleaning",
                    value: "cleaning",
                },
                {
                    text: "More Service",
                    value: "More Service",
                },
                {
                    text: "More Slavery",
                    value: "More Slavery",
                },
            ],
            onFilter: (value, record) =>
                record.serviceType.indexOf(value) === 0,
        },
        {
            title: "Status",
            dataIndex: "status",
            filters: [
                {
                    text: "Active",
                    value: "active",
                },
                {
                    text: "Pending",
                    value: "pending",
                },
                {
                    text: "Completed",
                    value: "completed",
                },
            ],
            onFilter: (value, record) => record.status.indexOf(value) === 0,
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log("params", pagination, filters, sorter, extra);
    };
    return (
        <div className="p-10">
            <div className="font-semibold text-lg pb-2">Order History</div>
            <div className="pb-10 w-[50vw] text-base">
                This table is showing you your labor order history. This table
                allows you to filter and sort the information using various
                parameters, making it easy to locate specific orders based on
                criteria such as date, status, man power and more.
            </div>
            <Table
                columns={columns}
                dataSource={orderHistory}
                onChange={onChange}
                showSorterTooltip={{
                    target: "sorter-icon",
                }}
            />

            {/* <List
                size="large"
                header={
                    <div className="font-bold text-2xl"> Order History </div>
                }
                footer={<div className="font-bold text-xl"> End of Orders </div>}
                bordered
                dataSource={                    
                    orderHistory.map((value, index) => {
                        return <div key={index} className="flex justify-between items-center">
                            <p className="pr-5 font-semibold"> {index+1} </p>
                            <Collapse
                                items={[{
                                    key: index,
                                    label: <div className="font-semibold text-xl pr-96"> {value.date} </div>,
                                    children: <div> 
                                        <p> <span className="font-semibold"> Man Power </span>: {value.manPower} </p>
                                        <p> <span className="font-semibold"> Location </span>: {value.location} </p>
                                        <p> <span className="font-semibold"> Service Type </span>: {value.serviceType} </p>
                                        <p> <span className="font-semibold"> Date Range </span>: {value.dateRange[0]} — {value.dateRange[1]} </p>
                                    </div>,
                                }]}
                            />
                            <div className="w-5"></div>
                            <div className="border border-zinc-300 rounded-xl w-36 py-2 text-center px-2">
                                {value.status}
                            </div>
                        </div>
                    })
                }
                renderItem={(item) => <List.Item>{item}</List.Item>}
            /> */}
        </div>
    );
}
