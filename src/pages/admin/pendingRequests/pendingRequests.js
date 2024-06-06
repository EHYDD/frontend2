import { Button, Modal, Popover, Space, Spin, Table } from "antd";
import Column from "antd/es/table/Column";
import axios from "axios";
// import { jwtDecode } from "jwt-decode";
import { API_BASE } from "../../../config/config";
import { useEffect, useState } from "react";
import moment from "moment";
import { LoadingOutlined } from "@ant-design/icons";

export default function PendingRequests() {
    let savedToken = localStorage.getItem("token");
    const [isLoading, setLoading] = useState(true);

    const [pendingRequests, setPendingRequests] = useState([]);
    const [modalMessage, setModalMessage] = useState("");
    const [modal2Open, setModal2Open] = useState(false);
    const [modalBodyContent, setModalBodyContent] = useState("");

    async function getPendingRequests() {
        let response = await axios.get(`${API_BASE}/Requests/AllRequests`, {
            headers: {
                Authorization: `Bearer ${savedToken}`,
            },
        });
        setPendingRequests(response.data);
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

    useEffect(() => {
        getPendingRequests();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="p-10">
            <div className="font-semibold text-lg pb-2"> Pending Requests </div>
            <p className="pb-10 text-base">
                These are requests waiting for your approval or rejects. Kindly
                review each request and respond appropriately.
            </p>
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
                        dataSource={pendingRequests}
                        // expandable={{
                        //     expandedRowRender: (record) => (
                        //         <div className="flex justify-evenly">
                        //             <div className="text-center">
                        //                 <p className="font-semibold pb-2">
                        //                     Job Status
                        //                 </p>
                        //                 <p>{record.jobStatus}</p>
                        //             </div>
                        //             <div className="text-center">
                        //                 <p className="font-semibold pb-2">
                        //                     Overtime Duration
                        //                 </p>
                        //                 <p>{record.oTduration}</p>
                        //             </div>
                        //             <div className="text-center pb-2">
                        //                 <p className="font-semibold">Created At</p>
                        //                 <p>
                        //                     {moment(record.createdAt).format(
                        //                         "MMMM Do YYYY, h:mm:ss a"
                        //                     )}
                        //                 </p>
                        //             </div>
                        //         </div>
                        //     ),
                        //     expandRowByClick: true,
                        //     rowExpandable: (record) =>
                        //         record.id !== "Not Expandable",
                        // }}
                    >
                        <Column
                            title="ID"
                            dataIndex="id"
                            key="id"
                            fixed="left"
                        />
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
                                    <Button> More Info </Button>
                                </Popover>
                            )}
                        />

                        {/* <Column
                        title="jobStatus"
                        dataIndex="jobStatus" 
                        key="jobStatus"
                    />
                    <Column
                        title="oTduration"
                        dataIndex="oTduration"
                        key="oTduration"
                    />
                    
                    <Column
                        title="createdAt"
                        dataIndex="createdAt"
                        key="createdAt"
                    />
                    
                    */}

                        {/* <Column
                    title="Status"
                    dataIndex="status"
                    key="status"
                    render={(status) => (
                        <Tag color={"purple"} key={status}>
                            {status.toUpperCase()}
                        </Tag>
                    )}
                /> */}
                        <Column
                            title="Action"
                            key="action"
                            fixed="right"
                            render={(_, record) => (
                                <Space size="middle">
                                    <Button
                                        type="primary"
                                        onClick={() => approveRequest(record)}
                                    >
                                        Approve
                                    </Button>
                                    <Button
                                        danger
                                        onClick={() => setModalMessages(record)}
                                    >
                                        Reject
                                    </Button>
                                </Space>
                            )}
                        />
                    </Table>
                </div>
            )}

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
                            Confirm Delete
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
