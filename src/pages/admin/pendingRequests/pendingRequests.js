import { Button, Space, Table, Tag } from "antd";
import Column from "antd/es/table/Column";

export default function PendingRequests() {
    let orderHistory = [
        {
            user: "Dagmawi Babi",
            date: Date().toString().substring(0, 15),
            manPower: 5,
            location: "Location 1",
            serviceType: "labor",
            dateRange: [
                Date().toString().substring(0, 15),
                Date().toString().substring(0, 15),
            ],
            status: "pending",
        },
        {
            user: "Dagmawi Babi",
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
            user: "Dagmawi Babi",
            date: Date().toString().substring(0, 15),
            manPower: 4,
            location: "Location 3",
            serviceType: "labor",
            dateRange: [
                Date().toString().substring(0, 15),
                Date().toString().substring(0, 15),
            ],
            status: "pending",
        },
        {
            user: "Dagmawi Babi",
            date: Date().toString().substring(0, 15),
            manPower: 3,
            location: "Location 1",
            serviceType: "cleaning",
            dateRange: [
                Date().toString().substring(0, 15),
                Date().toString().substring(0, 15),
            ],
            status: "pending",
        },
        {
            user: "Dagmawi Babi",
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
            user: "Dagmawi Babi",
            date: Date().toString().substring(0, 15),
            manPower: 3,
            location: "Location 3",
            serviceType: "cleaning",
            dateRange: [
                Date().toString().substring(0, 15),
                Date().toString().substring(0, 15),
            ],
            status: "pending",
        },
        {
            user: "Dagmawi Babi",
            date: Date().toString().substring(0, 15),
            manPower: 5,
            location: "Location 1",
            serviceType: "labor",
            dateRange: [
                Date().toString().substring(0, 15),
                Date().toString().substring(0, 15),
            ],
            status: "pending",
        },
        {
            user: "Dagmawi Babi",
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
            user: "Dagmawi Babi",
            date: Date().toString().substring(0, 15),
            manPower: 4,
            location: "Location 3",
            serviceType: "labor",
            dateRange: [
                Date().toString().substring(0, 15),
                Date().toString().substring(0, 15),
            ],
            status: "pending",
        },
    ];
    return (
        <div className="p-10">
            <div className="font-semibold text-lg pb-2"> Pending Requests </div>
            <p className="pb-10 text-base">
                These are requests waiting for your approval or rejects. Kindly
                review each request and respond appropriately.
            </p>
            <Table dataSource={orderHistory}>
                <Column title="User" dataIndex="user" key="user" />
                <Column title="Date" dataIndex="date" key="date" />
                <Column title="Man Power" dataIndex="manPower" key="manPower" />
                <Column title="Location" dataIndex="location" key="location" />
                <Column
                    title="ServiceType"
                    dataIndex="serviceType"
                    key="serviceType"
                />
                <Column
                    title="Status"
                    dataIndex="status"
                    key="status"
                    render={(status) => (
                        <Tag color={"purple"} key={status}>
                            {status.toUpperCase()}
                        </Tag>
                    )}
                />
                <Column
                    title="Action"
                    key="action"
                    render={(_, record) => (
                        <Space size="middle">
                            <Button type="primary"> Approve </Button>
                            <Button danger> Reject </Button>
                        </Space>
                    )}
                />
            </Table>
        </div>
    );
}
