import Column from "antd/es/table/Column";
import { Button, message, Modal, Popover, Space, Spin, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { API_BASE } from "../../../config/config";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import moment from "moment";

export default function AppealsPage() {
    let savedToken = localStorage.getItem("token");

    const [appeals, setAppeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    async function getAppeals() {
        let response = await axios.get(`${API_BASE}/auth/admin/appeals`, {
            headers: {
                Authorization: `Bearer ${savedToken}`,
            },
        });
        setAppeals(response.data);
        setIsLoading(false);
    }

    const [modalMessage, setModalMessage] = useState("");
    const [approvalModal2Open, setApprovalModal2Open] = useState(false);
    const [approvalModalOpen, setApprovalModalOpen] = useState(false);

    async function setModal(record) {
        setModalMessage(record.reason);
        setApprovalModal2Open(true);
    }

    const [currentRecord, setCurrentRecord] = useState({});
    const [isApproving, setIsApproving] = useState(false);
    async function approveAppeal() {
        setIsApproving(true);
        try {
            let response = await axios.post(
                `${API_BASE}/auth/admin/appeals/process`,
                {
                    email: currentRecord.userEmail,
                    rate: Math.floor(Math.random() * 100) + 1,
                    unblockUser: true,
                },
                {
                    headers: {
                        Authorization: `Bearer ${savedToken}`,
                    },
                }
            );
            if (response.status === 200 || response.status === 201) {
                getAppeals();
                setIsApproving(false);
                setApprovalModalOpen(false);
            } else {
                getAppeals();
                setApprovalModalOpen(false);
                setIsApproving(false);
            }
            message.success("Appeal Accepted!");
        } catch (error) {
            message.success("Appeal Could Not Be Accepted!");
        }
    }

    const [isDeclining, setIsDeclining] = useState(false);
    const [approvalModal3Open, setApprovalModal3Open] = useState(false);
    async function declineAppeal() {
        setIsDeclining(true);
        setApprovalModal3Open(true);
        try {
            let response = await axios.post(
                `${API_BASE}/auth/admin/appeals/process`,
                {
                    email: currentRecord.userEmail,
                    rate: Math.floor(Math.random() * 100) + 1,
                    unblockUser: false,
                },
                {
                    headers: {
                        Authorization: `Bearer ${savedToken}`,
                    },
                }
            );
            if (response.status === 200 || response.status === 201) {
                getAppeals();
                setIsDeclining(false);
                setApprovalModal3Open(false);
            } else {
                getAppeals();
                setIsDeclining(false);
                setApprovalModal3Open(false);
            }
            message.success("Appeal Rejected!");
        } catch (error) {
            message.success("Appeal Could Not Be Rejected!");
        }
    }

    useEffect(() => {
        getAppeals();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className="p-10">
            <div className="font-semibold text-lg pb-2"> Appeal Requests </div>
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
                    <Table dataSource={appeals}>
                        <Column
                            title="User Email"
                            dataIndex="userEmail"
                            key="userEmail"
                        />
                        <Column
                            title="Cost Center"
                            dataIndex="costCenter"
                            key="costCenter"
                        />
                        <Column
                            title="Reason"
                            dataIndex="reason"
                            key="reason"
                            render={(_, record) => {
                                return (
                                    <Popover
                                        content={
                                            <div>Click to read reason</div>
                                        }
                                        title=""
                                        trigger="hover"
                                        onClick={(e) => setModal(record)}
                                    >
                                        <Tag
                                            color="cyan"
                                            className="truncate w-64 cursor-pointer border rounded-lg px-4"
                                        >
                                            {record.reason}
                                        </Tag>
                                    </Popover>
                                );
                            }}
                        />
                        <Column
                            title="Is Processed"
                            dataIndex="isProcessed"
                            key="isProcessed"
                            render={(_, record) => {
                                return (
                                    <p>
                                        {record.isProcessed === true ? (
                                            <Tag color="green">Yes</Tag>
                                        ) : (
                                            <Tag color="purple">Waiting</Tag>
                                        )}
                                    </p>
                                );
                            }}
                        />
                        <Column
                            title="Created At"
                            dataIndex="createdAt"
                            key="createdAt"
                            render={(_, record) => {
                                return (
                                    <p>
                                        {moment(record.createdAt).format(
                                            "MMMM Do YYYY, h:mm:ss a"
                                        )}
                                    </p>
                                );
                            }}
                        />
                        <Column
                            title="Action"
                            key="action"
                            render={(_, record) => (
                                <Space size="middle">
                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            setApprovalModalOpen(true);
                                            setCurrentRecord(record);
                                        }}
                                    >
                                        Accept
                                    </Button>

                                    <Button
                                        danger
                                        onClick={(e) => {
                                            setApprovalModal3Open(true);
                                            setCurrentRecord(record);
                                        }}
                                    >
                                        Decline
                                    </Button>
                                </Space>
                            )}
                        />
                    </Table>
                </div>
            )}

            {/* READ REASON */}
            <Modal
                title={"Reason"}
                centered
                open={approvalModal2Open}
                onOk={() => approveAppeal()}
                onCancel={() => setApprovalModal2Open(false)}
                footer={(_, { OkBtn, CancelBtn }) => (
                    <>
                        <Button
                            type="primary"
                            onClick={(e) => setApprovalModal2Open(false)}
                        >
                            Close
                        </Button>
                    </>
                )}
            >
                <p> {modalMessage} </p>
            </Modal>

            {/* ACCEPT REASON */}
            <Modal
                title={"Proceed to Accept?"}
                centered
                open={approvalModalOpen}
                onOk={() => approveAppeal()}
                onCancel={() => setApprovalModalOpen(false)}
                footer={(_, { OkBtn, CancelBtn }) => (
                    <div className="flex gap-4 justify-end">
                        {isApproving === false ? (
                            <OkBtn />
                        ) : (
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
                        )}

                        <CancelBtn />
                    </div>
                )}
            >
                <p>
                    Are you sure you want to accept this appeal? It will unblock
                    the user.
                </p>
            </Modal>

            {/* DECLINE REASON */}
            <Modal
                title={"Decline Appeal?"}
                centered
                open={approvalModal3Open}
                onOk={() => declineAppeal()}
                onCancel={() => setApprovalModal3Open(false)}
                footer={(_, { OkBtn, CancelBtn }) => (
                    <div className="flex gap-4 justify-end">
                        {isDeclining === false ? (
                            // <OkBtn />
                            <Button danger onClick={(e) => declineAppeal()}>
                                Proceed to Decline
                            </Button>
                        ) : (
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
                        )}

                        <CancelBtn />
                    </div>
                )}
            >
                <p>
                    Are you sure you want to decline this appeal? User will
                    remain blocked and can't log in.
                </p>
            </Modal>
        </div>
    );
}
