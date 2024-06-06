/* eslint-disable no-unused-vars */
import { List, Collapse, Table, Button, Popover } from "antd";
import axios from "axios";
import { API_BASE } from "../../../config/config";
import { useEffect, useState } from "react";
import Column from "antd/es/table/Column";
import moment from "moment";

export default function OrderHistory() {
    let savedToken = localStorage.getItem("token");

    const [orderHistory, setOrderHistory] = useState([]);
    async function getOrderHistory() {
        let response = await axios.get(
            `${API_BASE}/Requests/PersonalRequests`,
            {
                headers: {
                    Authorization: `Bearer ${savedToken}`,
                },
            }
        );
        setOrderHistory(response.data);
    }

    const [requestInfoList, setRequestInfoList] = useState(0);
    async function getRequestInfoList() {
        let response = await axios.get(`${API_BASE}/Requests/RequestInfoList`, {
            headers: {
                Authorization: `Bearer ${savedToken}`,
            },
        });
        setRequestInfoList(response.data);
    }

    useEffect(() => {
        getRequestInfoList();
        getOrderHistory();
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

            <Table dataSource={orderHistory}>
                <Column title="ID" dataIndex="id" key="id" fixed="left" />
                <Column
                    title="Created By"
                    dataIndex="createdBy"
                    key="createdBy"
                />
                <Column
                    title="Cost Center ID"
                    dataIndex="costCenterId"
                    key="costCenterId"
                    fixed="left"
                />
                <Column
                    title="Location"
                    dataIndex="locationId"
                    key="locationId"
                    fixed="left"
                    // render={(_, record) => {
                    //     <div>
                    //         {record.locationId}
                    //         {/* {requestInfoList.location.find((location) =>
                    //             location.id === record.locationId ? (
                    //                 <div>{location.locationName}</div>
                    //             ) : (
                    //                 <div> HMMM </div>
                    //             )
                    //         )} */}
                    //     </div>;
                    // }}
                />
                <Column
                    title="Service Type ID"
                    dataIndex="serviceTypeId"
                    key="serviceTypeId"
                    fixed="left"
                />

                <Column
                    title="Requested Duration"
                    dataIndex="requestedduration"
                    key="requestedduration"
                    fixed="left"
                />
                <Column
                    title="First Date"
                    dataIndex="firstDate"
                    key="firstDate"
                    fixed="left"
                />
                <Column
                    title="Second Date"
                    dataIndex="secondDate"
                    key="secondDate"
                />
                <Column
                    title="More Info"
                    key="action"
                    fixed="right"
                    render={(_, record) => (
                        <Popover
                            content={
                                <div className="flex flex-col justify-evenly">
                                    <div className="text-center flex">
                                        <p className="font-semibold pb-2 pr-2">
                                            Job Status —
                                        </p>
                                        <p>{record.jobStatus}</p>
                                    </div>
                                    <div className="text-center flex">
                                        <p className="font-semibold pb-2 pr-2">
                                            Overtime Duration —
                                        </p>
                                        <p>{record.oTduration}</p>
                                    </div>
                                    <div className="text-center pb-2 flex">
                                        <p className="font-semibold pb-2 pr-2">
                                            Created At —
                                        </p>
                                        <p>
                                            {moment(record.createdAt).format(
                                                "MMMM Do YYYY, h:mm:ss a"
                                            )}
                                        </p>
                                    </div>
                                </div>
                            }
                            title=""
                            trigger="hover"
                        >
                            <Button> More Info </Button>
                        </Popover>
                    )}
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
