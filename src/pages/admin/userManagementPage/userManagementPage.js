import { useEffect, useState } from "react";
import { message, Modal, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import { API_BASE } from "../../../config/config";
import { Button, Space, Table } from "antd";
import Column from "antd/es/table/Column";

let selectedEmail = "";
export default function UserManagementPage() {
    let savedToken = localStorage.getItem("token");

    const [isLoading, setLoading] = useState(true);
    const [userList, setUserList] = useState([]);
    const [isUnblockingEmail, setIsUnblockingEmail] = useState("0");
    const [isBlockingEmail, setIsBlockingEmail] = useState(false);
    // const [selectedEmail, setEmail] = useState("");

    async function getApprovedUsers() {
        let response = await axios.get(`${API_BASE}/ApprovedUsers`, {
            headers: {
                Authorization: `Bearer ${savedToken}`,
            },
        });
        setUserList(response.data);
        setLoading(false);
    }

    async function blockUser(selectedEmail) {
        setIsBlockingEmail(true);
        let response = await axios.post(
            `${API_BASE}/admin/block-user`,
            {
                email: selectedEmail,
            },
            {
                headers: {
                    Authorization: `Bearer ${savedToken}`,
                },
            }
        );
        if (response.status === 200) {
            message.success(`User Blocked Successfully`);
            getApprovedUsers();
            setIsBlockingEmail(false);
            setModal2Open(false);
        }
    }

    async function unblockUser(record) {
        setIsUnblockingEmail(record.email);
        let response = await axios.post(
            `${API_BASE}/admin/unblock-user`,
            {
                email: record.email,
            },
            {
                headers: {
                    Authorization: `Bearer ${savedToken}`,
                },
            }
        );
        if (response.status === 200) {
            message.success(`User Unblocked Successfully`);
            getApprovedUsers();
            setIsUnblockingEmail("0");
        }
    }

    const [modal2Open, setModal2Open] = useState(false);

    function setModalMessageAndAction(record) {
        selectedEmail = record.email;
        // blockUser(selectedEmail);
        setModal2Open(true);
    }

    useEffect(() => {
        getApprovedUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className="p-10">
            <div className="font-semibold text-lg pb-2"> User Management </div>
            <div className="pb-10 w-[50vw] text-base">
                This table is showing you your labor order history. This table
                allows you to filter and sort the information using various
                parameters, making it easy to locate specific orders based on
                criteria such as date, status, man power and more.
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
                    <Table dataSource={userList}>
                        <Column title="UserID" dataIndex="userId" key="user" />
                        <Column title="Email" dataIndex="email" key="date" />
                        <Column
                            title="Authority Level"
                            dataIndex="authorityLevel"
                            key="date"
                            onFilter={(value, record) =>
                                record.authorityLevel.indexOf(value) === 0
                            }
                            // defaultSortOrder={"descend"}
                            sorter={(a, b) =>
                                a.authorityLevel - b.authorityLevel
                            }
                        />
                        <Column title="Status" dataIndex="status" key="date" />

                        <Column
                            title="Action"
                            key="action"
                            render={(_, record) => (
                                <Space size="middle">
                                    {/* <Button
                                        type="primary"
                                        onClick={(e) => unblockUser(record)}
                                    >
                                        Unblock
                                    </Button>
                                    <Button
                                        danger
                                        onClick={(e) =>
                                            setModalMessageAndAction(record)
                                        }
                                    >
                                        Block
                                    </Button> */}
                                    {record.status === 0 ? (
                                        isUnblockingEmail === record.email ? (
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
                                                onClick={(e) =>
                                                    unblockUser(record)
                                                }
                                            >
                                                Unblock
                                            </Button>
                                        )
                                    ) : (
                                        <Button
                                            danger
                                            onClick={(e) =>
                                                setModalMessageAndAction(record)
                                            }
                                        >
                                            Block
                                        </Button>
                                    )}
                                </Space>
                            )}
                        />
                    </Table>
                </div>
            )}
            <Modal
                title={`Are you sure you want to block "${selectedEmail}"?`}
                centered
                open={modal2Open}
                onCancel={() => setModal2Open(false)}
                footer={(_, { OkBtn, CancelBtn }) => (
                    <div className="flex gap-3 justify-end">
                        {isBlockingEmail === true ? (
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
                                danger
                                onClick={() => {
                                    blockUser(selectedEmail);
                                }}
                            >
                                Confirm Block
                            </Button>
                        )}
                        <CancelBtn />
                        {/* <OkBtn /> */}
                    </div>
                )}
            >
                <p>
                    Blocking this user will disable them from requesting any
                    service using this platform.
                </p>
            </Modal>
        </div>
    );
}
