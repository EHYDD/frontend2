import { useEffect, useState } from "react";
import { API_BASE } from "../../../config/config";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import { Button, Modal, Popover, Spin, Table, Tag } from "antd";

import Column from "antd/es/table/Column";
import moment from "moment";

export default function Feedbacks() {
    let savedToken = localStorage.getItem("token");

    const [feedbacks, setFeedbacks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [modalMessage, setModalMessage] = useState("");
    const [approvalModal2Open, setApprovalModal2Open] = useState(false);
    async function getFeedbacks() {
        setIsLoading(true);
        let response = await axios.get(`${API_BASE}/Feedbacks`, {
            headers: {
                Authorization: `Bearer ${savedToken}`,
            },
        });
        console.log(response.data);
        setFeedbacks(response.data);
        setIsLoading(false);
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

            {/* READ REASON */}
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
        </div>
    );
}
