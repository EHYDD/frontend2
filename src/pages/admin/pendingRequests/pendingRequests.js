import {
    Button,
    ConfigProvider,
    message,
    Modal,
    Popover,
    Space,
    Spin,
    Table,
    Tabs,
    Tag,
} from "antd";
import Column from "antd/es/table/Column";
import axios from "axios";
import { API_BASE } from "../../../config/config";
import { useEffect, useState } from "react";
import moment from "moment";
import { LoadingOutlined, UndoOutlined } from "@ant-design/icons";

var requestObject = {};
var startDate = "";
var endDate = "";
export default function PendingRequests() {
    let savedToken = localStorage.getItem("token");
    const [isLoading, setLoading] = useState(true);

    const [modalMessage, setModalMessage] = useState("");
    const [modal2Open, setModal2Open] = useState(false);
    const [modalBodyContent, setModalBodyContent] = useState("");

    const [requestInfoList, setRequestInfoList] = useState(0);
    async function getRequestInfoList() {
        let response = await axios.get(`${API_BASE}/Requests/RequestInfoList`, {
            headers: {
                Authorization: `Bearer ${savedToken}`,
            },
        });
        setRequestInfoList(response.data);
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
        setLoading(false);
    }

    const [pendingRequests, setPendingRequests] = useState([]);
    const [priorityRequests, setPriorityRequests] = useState([]);
    async function getPendingRequests() {
        let response = await axios.get(
            `${API_BASE}/temp/requests/get-all-requests`,
            {
                headers: {
                    Authorization: `Bearer ${savedToken}`,
                },
            }
        );

        var tempPriorityRequests = [];
        var tempOtherRequests = [];
        for (var i of response.data) {
            if (i["isPriority"] === true) {
                tempPriorityRequests.push(i);
            } else {
                tempOtherRequests.push(i);
            }
        }
        setPendingRequests(tempOtherRequests);
        setPriorityRequests(tempPriorityRequests);
    }

    const [currentRequestID, setRequestID] = useState(0);
    function openRejectModal(record) {
        setRequestID(record.id);
        setModalMessage(`Are you sure you want to reject this request?`);
        setModalBodyContent(
            `Rejecting this labor request stops "${record.createdBy}" from accessing services.`
        );
        setModal2Open(true);
    }

    const [isRejecting, setIsRejecting] = useState(0);
    async function rejectRequest() {
        setIsRejecting(true);

        let response = await axios.post(
            `${API_BASE}/temp/requests/process-request/${currentRequestID}`,
            {
                id: currentRequestID,
                status: false,
                start: "2024-06-09T15:33:11.331Z",
                end: "2024-06-09T15:33:11.331Z",
            },
            {
                headers: {
                    Authorization: `Bearer ${savedToken}`,
                },
            }
        );
        if (response.status === 200 || response.status === 201) {
            message.success("Request has been approved!");
            getPendingRequests();
            setIsRejecting(false);
        } else {
            message.success("Failed to approve request!");
        }
        setModal2Open(false);
    }

    const [approvalModalMessage, setApprovalModalMessage] = useState("");
    const [approvalModal2Open, setApprovalModal2Open] = useState(false);
    const [approvalModalBodyContent, setApprovalModalBodyContent] =
        useState("");
    const [gotNoLaborers, setGotNoLaborers] = useState(false);
    async function checkAvailableDate(record) {
        requestObject = record;
        setGotNoLaborers(false);
        let response = await axios.get(
            `${API_BASE}/temp/requests/check-laborers-availability?requiredManPower=${record.manPower}&date=${record.firstDate}&duration=${record.requestedduration}`,
            {
                headers: {
                    Authorization: `Bearer ${savedToken}`,
                },
            }
        );
        setApprovalModalMessage("Available Slots");

        if (response.data.length > 0) {
            startDate = moment(response.data[0]["start"]).format("YYYY-MM-DD");
            endDate = moment(response.data[0]["end"]).format("YYYY-MM-DD");
            setApprovalModalBodyContent(
                <div>
                    <p>The next available slots for the request are:</p>
                    {response.data.map((value, index) => (
                        <div className="hover:bg-zinc-200 rounded-lg px-4 py-2 flex justify-center cursor-pointer w-fit">
                            <Tag color="green">
                                {moment(value["start"]).format(
                                    "MMMM Do YYYY, h:mm a"
                                )}
                            </Tag>
                            <span className="pr-3">to</span>
                            <Tag color="green">
                                {moment(value["end"]).format(
                                    "MMMM Do YYYY, h:mm:ss a"
                                )}
                            </Tag>
                        </div>
                    ))}

                    <p>Proceed?</p>
                </div>
            );
        } else {
            setGotNoLaborers(true);
            setApprovalModalBodyContent(
                <div>
                    <p>There are no available laborers to proceed.</p>
                </div>
            );
        }

        setApprovalModal2Open(true);
    }

    async function approveRequest() {
        let response = await axios.post(
            `${API_BASE}/temp/requests/process-request/${requestObject.id}`,
            {
                id: requestObject.id,
                status: true,
                start: startDate,
                end: endDate,
            },
            {
                headers: {
                    Authorization: `Bearer ${savedToken}`,
                },
            }
        );
        if (response.status === 200 || response.status === 201) {
            message.success("Request has been approved!");
            getRequestInfoList();
            getPendingRequests();
            getTodaysRequests();
        } else {
            message.success("Failed to approve request!");
        }
        setApprovalModal2Open(false);
    }

    async function checkAvailableLaborers() {
        let response = await axios.get(
            `${API_BASE}/temp/requests/get-available-laborers-today`,
            {
                headers: {
                    Authorization: `Bearer ${savedToken}`,
                },
            }
        );
        console.log(response.data);
    }

    const onChange = (key) => {
        // console.log(key);
    };

    async function refreshAllData() {
        setLoading(true);
        await getRequestInfoList();
        await getPendingRequests();
        await getTodaysRequests();
        setLoading(false);
    }

    async function initialCalls() {
        await getRequestInfoList();
        await getPendingRequests();
        await getTodaysRequests();
    }

    useEffect(() => {
        initialCalls();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="p-10">
            <div className="font-semibold text-lg pb-2"> Pending Requests </div>
            <p className="pb-10 text-base">
                These are requests waiting for your approval or rejects. Kindly
                review each request and respond appropriately.
            </p>
            <div className="pb-8">
                <ConfigProvider
                    theme={{
                        components: {
                            Button: {
                                colorPrimary: "lightGreen",
                                primaryColor: "black",
                            },
                        },
                    }}
                >
                    <Button
                        type="primary"
                        icon={<UndoOutlined />}
                        onClick={(e) => refreshAllData()}
                    >
                        Refresh All Data
                    </Button>
                </ConfigProvider>
            </div>

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
                <Tabs
                    onChange={onChange}
                    type="card"
                    items={[
                        {
                            label: "Priority Requests",
                            key: 1,
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
                                            <Table
                                                dataSource={priorityRequests}
                                            >
                                                <Column
                                                    title="Center ID"
                                                    dataIndex="costCenterId"
                                                    key="costCenterId"
                                                    render={(_, record) =>
                                                        requestInfoList[
                                                            "costCenters"
                                                        ].map(
                                                            (value, index) => {
                                                                return value[
                                                                    "id"
                                                                ] ===
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
                                                            }
                                                        )
                                                    }
                                                />
                                                <Column
                                                    title="Location ID"
                                                    dataIndex="locationId"
                                                    key="locationId"
                                                    render={(_, record) =>
                                                        requestInfoList[
                                                            "location"
                                                        ].map(
                                                            (value, index) => {
                                                                return value[
                                                                    "id"
                                                                ] ===
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
                                                        ].map(
                                                            (value, index) => {
                                                                return value[
                                                                    "id"
                                                                ] ===
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
                                                            }
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
                                                            <Button
                                                                type="primary"
                                                                onClick={(e) =>
                                                                    checkAvailableLaborers()
                                                                }
                                                            >
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
                                                        ].map(
                                                            (value, index) => {
                                                                return value[
                                                                    "id"
                                                                ] ===
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
                                                            }
                                                        )
                                                    }
                                                />
                                                <Column
                                                    title="Location ID"
                                                    dataIndex="locationId"
                                                    key="locationId"
                                                    render={(_, record) =>
                                                        requestInfoList[
                                                            "location"
                                                        ].map(
                                                            (value, index) => {
                                                                return value[
                                                                    "id"
                                                                ] ===
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
                                                        ].map(
                                                            (value, index) => {
                                                                return value[
                                                                    "id"
                                                                ] ===
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
                                                            }
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
                                                            <Button
                                                                type="primary"
                                                                onClick={(e) =>
                                                                    checkAvailableLaborers()
                                                                }
                                                            >
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
                                                title="Date"
                                                dataIndex="firstDate"
                                                key="firstDate"
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
                                                        {record.isApproved ===
                                                        false ? (
                                                            <ConfigProvider
                                                                theme={{
                                                                    components:
                                                                        {
                                                                            Button: {
                                                                                colorPrimary:
                                                                                    "lightGreen",
                                                                                primaryColor:
                                                                                    "black",
                                                                            },
                                                                        },
                                                                }}
                                                            >
                                                                <Button
                                                                    type="primary"
                                                                    colorPrimary="red"
                                                                    onClick={(
                                                                        e
                                                                    ) =>
                                                                        checkAvailableDate(
                                                                            record
                                                                        )
                                                                    }
                                                                >
                                                                    Approve
                                                                </Button>
                                                            </ConfigProvider>
                                                        ) : (
                                                            <Button
                                                                danger
                                                                onClick={(e) =>
                                                                    openRejectModal(
                                                                        record
                                                                    )
                                                                }
                                                            >
                                                                Reject
                                                            </Button>
                                                        )}
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
            )}

            {/* REJECT CONFIRMATION */}
            <Modal
                title={modalMessage}
                centered
                open={modal2Open}
                onCancel={() => setModal2Open(false)}
                footer={(_, { OkBtn, CancelBtn }) => (
                    <div className="flex gap-4 justify-end">
                        {isRejecting === true ? (
                            <div>
                                <Spin
                                    indicator={
                                        <LoadingOutlined
                                            style={{
                                                fontSize: 25,
                                                color: "red",
                                            }}
                                            spin
                                        />
                                    }
                                />
                            </div>
                        ) : (
                            <Button
                                danger
                                onClick={() => {
                                    rejectRequest();
                                }}
                            >
                                Confirm Reject
                            </Button>
                        )}
                        <CancelBtn />
                        {/* <OkBtn /> */}
                    </div>
                )}
            >
                <p> {modalBodyContent} </p>
            </Modal>

            {/* CONFIRM APPROVAL */}
            <Modal
                title={approvalModalMessage}
                centered
                open={approvalModal2Open}
                onOk={() => setApprovalModal2Open(false)}
                onCancel={() => setApprovalModal2Open(false)}
                footer={(_, { OkBtn, CancelBtn }) => (
                    <div className="flex gap-4 justify-end">
                        {gotNoLaborers === true ? (
                            <div></div>
                        ) : (
                            <Button
                                type="primary"
                                onClick={() => {
                                    approveRequest();
                                }}
                            >
                                Confirm Approval
                            </Button>
                        )}

                        {gotNoLaborers === true ? <OkBtn /> : <CancelBtn />}
                    </div>
                )}
            >
                <p> {approvalModalBodyContent} </p>
            </Modal>
        </div>
    );
}
