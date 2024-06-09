import { Button, Modal, Popover, Space, Spin, Table, Tabs, Tag } from "antd";
import Column from "antd/es/table/Column";
import axios from "axios";
// import { jwtDecode } from "jwt-decode";
import { API_BASE } from "../../../config/config";
import { useEffect, useState } from "react";
import moment from "moment";
import { LoadingOutlined } from "@ant-design/icons";
import { Info, InfoIcon, LucideInfo } from "lucide-react";

export default function PendingRequests() {
    let savedToken = localStorage.getItem("token");
    const [isLoading, setLoading] = useState(true);

    const [modalMessage, setModalMessage] = useState("");
    const [modal2Open, setModal2Open] = useState(false);
    const [modalBodyContent, setModalBodyContent] = useState("");

    const [pendingRequests, setPendingRequests] = useState([]);
    async function getPendingRequests() {
        let response = await axios.get(
            `${API_BASE}/temp/requests/get-all-requests`,
            {
                headers: {
                    Authorization: `Bearer ${savedToken}`,
                },
            }
        );
        setPendingRequests(response.data);
        console.log(response.data);
        setLoading(false);
    }

    const [currentRequestID, setRequestID] = useState(0);
    function setModalMessages(record) {
        setRequestID(record.id);
        setModalMessage(`Are you sure you want to reject this request?`);
        setModalBodyContent(
            `Rejecting this labor request stops "${record.createdBy}" from accessing ${record.serviceTypeId} service.`
        );
        setModal2Open(true);
    }

    async function rejectRequest() {
        let response = await axios.post(
            `${API_BASE}/Requests/RequestApproval`,
            {
                stat: 0,
                id: currentRequestID,
            },
            {
                headers: {
                    Authorization: `Bearer ${savedToken}`,
                },
            }
        );
        if (response.status === 200 || response.status === 201) {
            getPendingRequests();
            setModal2Open(false);
        }
    }

    async function approveRequest(record) {
        let response = await axios.post(
            `${API_BASE}/Requests/RequestApproval`,
            {
                stat: 1,
                id: record.id,
            },
            {
                headers: {
                    Authorization: `Bearer ${savedToken}`,
                },
            }
        );
        if (response.status === 200 || response.status === 201) {
            getPendingRequests();
            setModal2Open(false);
        }
    }

    const [requestInfoList, setRequestInfoList] = useState(0);
    async function getRequestInfoList() {
        let response = await axios.get(`${API_BASE}/Requests/RequestInfoList`, {
            headers: {
                Authorization: `Bearer ${savedToken}`,
            },
        });
        setRequestInfoList(response.data);
        console.log(response.data);
        setLoading(false);
    }

    const [todaysRequests, setTodaysRequests] = useState([]);
    async function getTodaysRequests() {
        let response = await axios.get(
            `${API_BASE}/temp/requests/get-request-by-today`,
            {
                headers: {
                    Authorization: `Bearer ${savedToken}`,
                },
            }
        );
        setTodaysRequests(response.data);
        console.log(response.data);
        setLoading(false);
    }

    const onChange = (key) => {
        console.log(key);
    };

    useEffect(() => {
        getRequestInfoList();
        getPendingRequests();
        getTodaysRequests();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="p-10">
            <div className="font-semibold text-lg pb-2"> Pending Requests </div>
            <p className="pb-10 text-base">
                These are requests waiting for your approval or rejects. Kindly
                review each request and respond appropriately.
            </p>
            <Tabs
                onChange={onChange}
                type="card"
                items={[
                    {
                        label: "Priority Requests",
                        key: 1,
                        children: (
                            <div>
                                Here are all priority requests pending for
                                approval
                            </div>
                        ),
                    },
                    {
                        label: "Today's Requests",
                        key: 0,
                        children: (
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
                                        <Table dataSource={todaysRequests}>
                                            <Column
                                                title="Center ID"
                                                dataIndex="costCenterId"
                                                key="costCenterId"
                                                render={(_, record) =>
                                                    requestInfoList[
                                                        "costCenters"
                                                    ].map((value, index) => {
                                                        return value["id"] ===
                                                            record.costCenterId ? (
                                                            <Tag color="purple">
                                                                {
                                                                    value[
                                                                        "callCenterNumber"
                                                                    ]
                                                                }
                                                            </Tag>
                                                        ) : (
                                                            ""
                                                        );
                                                    })
                                                }
                                            />
                                            <Column
                                                title="Location ID"
                                                dataIndex="locationId"
                                                key="locationId"
                                                render={(_, record) =>
                                                    requestInfoList[
                                                        "location"
                                                    ].map((value, index) => {
                                                        return value["id"] ===
                                                            record.locationId ? (
                                                            <Tag
                                                                color="cyan"
                                                                className="cursor-pointer"
                                                            >
                                                                {
                                                                    value[
                                                                        "locationName"
                                                                    ]
                                                                }
                                                            </Tag>
                                                        ) : (
                                                            ""
                                                        );
                                                    })
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
                                                    requestInfoList[
                                                        "serviceType"
                                                    ].map((value, index) => {
                                                        return value["id"] ===
                                                            record.serviceTypeId ? (
                                                            <div className="flex gap-2">
                                                                <Popover
                                                                    content={
                                                                        <div className="flex text-center">
                                                                            <p className="font-semibold pr-2">
                                                                                Payment
                                                                                Rate
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
                                                                        {
                                                                            value[
                                                                                "title"
                                                                            ]
                                                                        }
                                                                    </Tag>
                                                                </Popover>
                                                            </div>
                                                        ) : (
                                                            ""
                                                        );
                                                    })
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
                                                title="First Date"
                                                dataIndex="firstDate"
                                                key="firstDate"
                                                render={(_, record) =>
                                                    record.secondDate
                                                }
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
                                                                <div className="text-center flex">
                                                                    <p className="font-semibold pb-2 pr-2">
                                                                        Requester
                                                                        —
                                                                    </p>
                                                                    <p>
                                                                        {
                                                                            record.createdBy
                                                                        }
                                                                    </p>
                                                                </div>
                                                                {record
                                                                    .serviceRequestMessage
                                                                    .length >
                                                                1 ? (
                                                                    <div className="text-center flex">
                                                                        <p className="font-semibold pb-2 pr-2">
                                                                            Message
                                                                            —
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
                                                                        Created
                                                                        At —
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
                                                        <Button>
                                                            More Info{" "}
                                                        </Button>
                                                    </Popover>
                                                )}
                                            />
                                            <Column
                                                title="Action"
                                                key="action"
                                                render={(_, record) => (
                                                    <Space size="middle">
                                                        <Button type="primary">
                                                            Assign
                                                        </Button>
                                                    </Space>
                                                )}
                                            />
                                        </Table>
                                    </div>
                                )}
                            </div>
                        ),
                    },
                    {
                        label: "Pending Approval",
                        key: 2,
                        children: (
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
                                    <Table dataSource={pendingRequests}>
                                        <Column
                                            title="Center ID"
                                            dataIndex="costCenterId"
                                            key="costCenterId"
                                            render={(_, record) =>
                                                requestInfoList[
                                                    "costCenters"
                                                ].map((value, index) => {
                                                    return value["id"] ===
                                                        record.costCenterId ? (
                                                        <Tag color="purple">
                                                            {
                                                                value[
                                                                    "callCenterNumber"
                                                                ]
                                                            }
                                                        </Tag>
                                                    ) : (
                                                        ""
                                                    );
                                                })
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
                                                                {
                                                                    value[
                                                                        "locationName"
                                                                    ]
                                                                }
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
                                                requestInfoList[
                                                    "serviceType"
                                                ].map((value, index) => {
                                                    return value["id"] ===
                                                        record.serviceTypeId ? (
                                                        <div className="flex gap-2">
                                                            <Popover
                                                                content={
                                                                    <div className="flex text-center">
                                                                        <p className="font-semibold pr-2">
                                                                            Payment
                                                                            Rate
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
                                                                    {
                                                                        value[
                                                                            "title"
                                                                        ]
                                                                    }
                                                                </Tag>
                                                            </Popover>
                                                        </div>
                                                    ) : (
                                                        ""
                                                    );
                                                })
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
                                            render={(_, record) =>
                                                record.secondDate
                                            }
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
                                                                    Requester —
                                                                </p>
                                                                <p>
                                                                    {
                                                                        record.createdBy
                                                                    }
                                                                </p>
                                                            </div>
                                                            {record
                                                                .serviceRequestMessage
                                                                .length > 1 ? (
                                                                <div className="text-center flex">
                                                                    <p className="font-semibold pb-2 pr-2">
                                                                        Message
                                                                        —
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
                                        <Column
                                            title="Action"
                                            key="action"
                                            render={(_, record) => (
                                                <Space size="middle">
                                                    <Button type="primary">
                                                        Approve
                                                    </Button>
                                                    <Button danger>
                                                        Reject
                                                    </Button>
                                                </Space>
                                            )}
                                        />
                                    </Table>
                                )}
                            </div>
                        ),
                    },
                ]}
            />

            {/* DELETE CONFIRMATION */}
            <Modal
                title={modalMessage}
                centered
                open={modal2Open}
                onCancel={() => setModal2Open(false)}
                footer={(_, { OkBtn, CancelBtn }) => (
                    <>
                        <Button
                            danger
                            onClick={() => {
                                rejectRequest();
                            }}
                        >
                            Confirm Reject
                        </Button>
                        <CancelBtn />
                        {/* <OkBtn /> */}
                    </>
                )}
            >
                <p> {modalBodyContent} </p>
            </Modal>
        </div>
    );
}
