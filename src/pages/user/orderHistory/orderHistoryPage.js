/* eslint-disable no-unused-vars */
import { List, Collapse, Table, Button, Popover, Spin, Tag } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import { API_BASE } from "../../../config/config";
import { useEffect, useState } from "react";
import Column from "antd/es/table/Column";
import moment from "moment";

export default function OrderHistory() {
    let savedToken = localStorage.getItem("token");

    const [isLoading, setIsLoading] = useState(true);
    const [orderHistory, setOrderHistory] = useState([]);
    async function getOrderHistory() {
        let response = await axios.get(
            `${API_BASE}/temp/requests/get-all-requests-for-user`, // `${API_BASE}/Requests/PersonalRequests`,
            {
                headers: {
                    Authorization: `Bearer ${savedToken}`,
                },
            }
        );
        setOrderHistory(response.data);
        console.log(response.data);
    }

    const [requestInfoList, setRequestInfoList] = useState(0);
    async function getRequestInfoList() {
        setIsLoading(true);
        let response = await axios.get(`${API_BASE}/Requests/RequestInfoList`, {
            headers: {
                Authorization: `Bearer ${savedToken}`,
            },
        });
        setRequestInfoList(response.data);
        setIsLoading(false);
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

            <div>
                {isLoading === true ? (
                    <div>
                        <Spin
                            indicator={
                                <LoadingOutlined
                                    style={{
                                        fontSize: 25,
                                    }}
                                    spin
                                />
                            }
                        />
                    </div>
                ) : (
                    <div>
                        <Table dataSource={orderHistory}>
                            <Column
                                title="Center ID"
                                dataIndex="costCenterId"
                                key="costCenterId"
                                render={(_, record) =>
                                    requestInfoList["costCenters"].map(
                                        (value, index) => {
                                            return value["id"] ===
                                                record.costCenterId ? (
                                                <Tag color="purple">
                                                    {value["callCenterNumber"]}
                                                </Tag>
                                            ) : (
                                                ""
                                            );
                                        }
                                    )
                                }
                            />
                            <Column
                                title="Location ID"
                                dataIndex="locationId"
                                key="locationId"
                                render={(_, record) =>
                                    requestInfoList["location"].map(
                                        (value, index) => {
                                            return value["id"] ===
                                                record.locationId ? (
                                                <Tag
                                                    color="cyan"
                                                    className="cursor-pointer"
                                                >
                                                    {value["locationName"]}
                                                </Tag>
                                            ) : (
                                                ""
                                            );
                                        }
                                    )
                                }
                            />
                            {/* <Column
                                            title="Job Status"
                                            dataIndex="jobStatus"
                                            key="jobStatus"
                                        /> */}
                            <Column
                                title="Service Type ID"
                                dataIndex="serviceTypeId"
                                key="serviceTypeId"
                                render={(_, record) =>
                                    requestInfoList["serviceType"].map(
                                        (value, index) => {
                                            return value["id"] ===
                                                record.serviceTypeId ? (
                                                <div className="flex gap-2">
                                                    <Popover
                                                        content={
                                                            <div className="flex text-center">
                                                                <p className="font-semibold pr-2">
                                                                    Payment Rate
                                                                    —
                                                                </p>

                                                                {
                                                                    value[
                                                                        "paymentRate"
                                                                    ]
                                                                }
                                                            </div>
                                                        }
                                                        title=""
                                                        trigger="hover"
                                                    >
                                                        <Tag
                                                            color="green"
                                                            className="cursor-pointer"
                                                        >
                                                            {value["title"]}
                                                        </Tag>
                                                    </Popover>
                                                </div>
                                            ) : (
                                                ""
                                            );
                                        }
                                    )
                                }
                            />
                            <Column
                                title="Approved"
                                dataIndex="isApproved"
                                key="isApproved"
                                render={(_, record) =>
                                    record.isApproved === false ? (
                                        <Tag color="red">No</Tag>
                                    ) : (
                                        <Tag color="green">Yes</Tag>
                                    )
                                }
                            />
                            <Column
                                title="Man Power"
                                dataIndex="manPower"
                                key="manPower"
                            />
                            <Column
                                title="Duration (hr)"
                                dataIndex="requestedduration"
                                key="requestedduration"
                            />
                            <Column
                                title="Date"
                                dataIndex="firstDate"
                                key="firstDate"
                                render={(_, record) => (
                                    <div>
                                        {record.firstDate} —{" "}
                                        {record.secondDate < 2
                                            ? record.firstDate
                                            : record.secondDate}
                                    </div>
                                )}
                            />
                            {/* <Column
                                title="Second Date"
                                dataIndex="secondDate"
                                key="secondDate"
                            /> */}
                            <Column
                                title="More Info"
                                key="action"
                                fixed="right"
                                render={(_, record) => (
                                    <Popover
                                        content={
                                            <div className="flex flex-col justify-evenly">
                                                {record.serviceRequestMessage
                                                    .length > 1 ? (
                                                    <div className="text-center flex">
                                                        <p className="font-semibold pb-2 pr-2">
                                                            Message —
                                                        </p>
                                                        <p>
                                                            {
                                                                record.serviceRequestMessage
                                                            }
                                                        </p>
                                                    </div>
                                                ) : (
                                                    ""
                                                )}

                                                <div className="text-center pb-2 flex">
                                                    <p className="font-semibold pb-2 pr-2">
                                                        Created At —
                                                    </p>
                                                    <p>
                                                        {moment(
                                                            record.createdAt
                                                        ).format(
                                                            "MMMM Do YYYY, h:mm:ss a"
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        }
                                        title=""
                                        trigger="hover"
                                    >
                                        <Button>More Info </Button>
                                    </Popover>
                                )}
                            />
                        </Table>
                    </div>
                )}
            </div>
        </div>
    );
}
