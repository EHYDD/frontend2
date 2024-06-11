import { useEffect, useState } from "react";
import { API_BASE } from "../../../config/config";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import { Button, message, Modal, Popover, Spin, Table, Tag } from "antd";
import { UndoOutlined, PlusOutlined } from "@ant-design/icons";

import Column from "antd/es/table/Column";
import moment from "moment";

export default function FeedbackPage() {
    let savedToken = localStorage.getItem("token");

    const [feedbacks, setFeedbacks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [modalMessage, setModalMessage] = useState("");
    const [approvalModal2Open, setApprovalModal2Open] = useState(false);
    async function getFeedbacks() {
        setIsLoading(true);
        let response = await axios.get(
            `${API_BASE}/Feedbacks/PersonalFeedbacks`,
            {
                headers: {
                    Authorization: `Bearer ${savedToken}`,
                },
            }
        );
        console.log(response.data);
        setFeedbacks(response.data);
        setIsLoading(false);
    }

    const [feedbackModal2Open, setFeedbackModal2Open] = useState(false);
    const [isSendingFeedback, setIsSendingFeedback] = useState(false);
    async function sendFeedback() {
        var feedback = document.getElementById("feedbackText").value;
        try {
            let response = await axios.post(
                `${API_BASE}/Feedbacks`,
                {
                    feedback: feedback.toString().trim(),
                    ratings: 5,
                    // costCenter: parseInt(appealCostCenter.toString().trim()),
                },
                {
                    headers: {
                        Authorization: `Bearer ${savedToken}`,
                    },
                }
            );

            if (response.status === 200 || response.status === 201) {
                message.success("Feedback has been successfully submitted!");
            } else {
                message.error("Couldn't submmit feedback.");
            }
        } catch (error) {
            message.error(`Couldn't submmit feedback. \n Error: ${error}`);
        }
        getFeedbacks();
        setIsSendingFeedback(false);
        setFeedbackModal2Open(false);
    }

    useEffect(() => {
        getFeedbacks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="p-10">
            <div className="font-semibold text-lg pb-2"> Feedbacks </div>
            <p className="pb-10 text-base">
                These are requests waiting for your approval or rejects. Kindly
                review each request and respond appropriately.
            </p>
            <div className="pb-8 flex justify-between">
                <Button
                    type="primary"
                    icon={<UndoOutlined />}
                    onClick={(e) => getFeedbacks()}
                >
                    Refresh Data
                </Button>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={(e) => setFeedbackModal2Open(true)}
                >
                    New Feedback
                </Button>
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
                <div>
                    <Table dataSource={feedbacks}>
                        <Column
                            title="Created By"
                            dataIndex="createdBy"
                            key="createdBy"
                        />
                        <Column
                            title="Feedback"
                            dataIndex="feedback"
                            key="feedback"
                            render={(_, record) => {
                                return (
                                    <Tag
                                        color="cyan"
                                        className="truncate w-64 cursor-pointer border rounded-lg px-4"
                                    >
                                        {record.feedback}
                                    </Tag>
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
                            title="More Info"
                            key="action"
                            fixed="right"
                            render={(_, record) => (
                                <Popover
                                    content={<div>Click to read feedback</div>}
                                    title=""
                                    trigger="hover"
                                >
                                    <Button
                                        onClick={(e) => {
                                            setApprovalModal2Open(true);
                                            setModalMessage(record.feedback);
                                        }}
                                    >
                                        More Info
                                    </Button>
                                </Popover>
                            )}
                        />
                    </Table>
                </div>
            )}

            {/* READ FEEDBACK */}
            <Modal
                title={"Feedback"}
                centered
                open={approvalModal2Open}
                onOk={() => setApprovalModal2Open(false)}
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

            {/* APPEAL FORM */}
            <Modal
                title={"Feedback Form"}
                centered
                open={feedbackModal2Open}
                onOk={() => setFeedbackModal2Open(false)}
                onCancel={() => setFeedbackModal2Open(false)}
                footer={(_, { OkBtn, CancelBtn }) => (
                    <div className="flex gap-4 justify-end">
                        {isSendingFeedback === true ? (
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
                            <Button
                                type="primary"
                                onClick={() => {
                                    setIsSendingFeedback(true);
                                    sendFeedback();
                                }}
                            >
                                Send Feedback
                            </Button>
                        )}
                        <CancelBtn />
                    </div>
                )}
            >
                <div className="flex flex-col">
                    {/* FEEDBACK */}
                    {/* <label className="pb-2"> Feedback </label> */}
                    <textarea
                        id="feedbackText"
                        rows={5}
                        cols={10}
                        placeholder="feedback..."
                        className="border-2 rounded-lg px-3 py-1 bg-white outline-none"
                    />
                    <div className="h-4"></div>
                </div>
            </Modal>
        </div>
    );
}
