/* eslint-disable no-unused-vars */
import axios from "axios";
import { API_BASE } from "../../../config/config";
import { List, Collapse, Table, Space, Button } from "antd";
import { useEffect, useState } from "react";
import Column from "antd/es/table/Column";

export default function PriorityRequests() {
    let savedToken = localStorage.getItem("token");

    const [priorityRequests, setPriorityRequests] = useState([]);
    async function getPriorityRequests() {
        let response = await axios.get(
            `${API_BASE}/Requests/AllPriorityRequests`,
            {
                headers: {
                    Authorization: `Bearer ${savedToken}`,
                },
            }
        );
        setPriorityRequests(response.data);
    }

    useEffect(() => {
        getPriorityRequests();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="p-10">
            <div className="font-semibold text-lg pb-2">Order History</div>
            <div className="pb-10 w-[50vw] text-base">
                This table is showing you your labor order history. This table
                allows you to filter and sort the information using various
                parameters, making it easy to locate specific orders based on
                criteria such as date, status, man power and more.
            </div>
            <Table dataSource={priorityRequests}>
                <Column title="ID" dataIndex="id" key="id" />
                <Column
                    title="Location Name"
                    dataIndex="locationName"
                    key="locationName"
                />
                {/* <Column
                                title="Pass Status"
                                dataIndex="passStatus"
                                key="passStatus"
                                sorter={(a, b) => a.passStatus - b.passStatus}
                                render={(status) =>
                                    status === 0 ? (
                                        <Tag color={"blue"} key={status}>
                                            {status}
                                        </Tag>
                                    ) : (
                                        <Tag color={"purple"} key={status}>
                                            {status}
                                        </Tag>
                                    )
                                }
                            /> */}
                <Column
                    title="Created By"
                    dataIndex="createdBy"
                    key="createdBy"
                />
                <Column
                    title="Updated By"
                    dataIndex="updatedBy"
                    key="updatedBy"
                />
            </Table>

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
