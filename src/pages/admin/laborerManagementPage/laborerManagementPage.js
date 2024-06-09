import { useEffect, useState } from "react";
import { Button, Modal, Space, Spin, Table, Tag, Upload, message } from "antd";
import {
    LoadingOutlined,
    PlusOutlined,
    UndoOutlined,
    UploadOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { API_BASE } from "../../../config/config";
import Column from "antd/es/table/Column";
import moment from "moment";
import * as XLSX from "xlsx";

export default function LaborerManagementPage() {
    let savedToken = localStorage.getItem("token");

    const [isLoading, setLoading] = useState(true);

    const [laborersList, setLaborersList] = useState(true);

    async function getLaborers() {
        let response = await axios.get(`${API_BASE}/Laborers`, {
            headers: {
                Authorization: `Bearer ${savedToken}`,
            },
        });
        // console.log(response);
        setLaborersList(response.data);
        setLoading(false);
    }

    async function refresh() {
        setLoading(true);
        await getLaborers();
        setLoading(false);
    }

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editModalMessage, setEditModalMessage] = useState("");
    const [editModalBodyContent, setEditModalBodyContent] = useState("");
    const [editID, setEditID] = useState(0);
    function openEditLaborerModal(record) {
        setEditID(record.id);
        setEditModalMessage("Edit Laborer Profile");
        setEditModalBodyContent(
            <div>
                <div className="flex flex-col">
                    <label className="pb-2"> Employee ID </label>
                    <input
                        id="editEmployeeID"
                        type="text"
                        defaultValue={record.employeeID}
                        placeholder={record.employeeID}
                        className="border rounded-lg px-3 py-1 bg-white"
                    />
                    <div className="h-5"></div>
                    <label className="pb-2"> RFID </label>
                    <input
                        id="editRFID"
                        type="text"
                        defaultValue={record.rfid}
                        placeholder="RFID..."
                        className="border rounded-lg px-3 py-1 bg-white"
                    />
                    <div className="h-5"></div>

                    <label className="pb-2"> First Name </label>
                    <input
                        id="editFirstName"
                        type="text"
                        defaultValue={record.firstName}
                        placeholder={record.firstName}
                        className="border rounded-lg px-3 py-1 bg-white"
                    />
                    <div className="h-5"></div>
                    <label className="pb-2"> Last Name </label>
                    <input
                        id="editLastName"
                        type="text"
                        defaultValue={record.lastName}
                        placeholder={record.lastName}
                        className="border rounded-lg px-3 py-1 bg-white"
                    />
                    <div className="h-5"></div>
                </div>
            </div>
        );
        setEditModalOpen(true);
    }

    async function editLaborer() {
        let editEmployeeIDNew = document.getElementById("editEmployeeID").value;
        let editRFIDDNew = document.getElementById("editRFID").value;
        let editFirstName = document.getElementById("editFirstName").value;
        let editLastName = document.getElementById("editLastName").value;

        let response = await axios.put(
            `${API_BASE}/Laborers/${editID}`,
            {
                id: editID,
                firstName: editFirstName.toString().trim(),
                lastName: editLastName.toString().trim(),
                employeeID: parseInt(editEmployeeIDNew.toString().trim()),
                rfid: parseInt(editRFIDDNew.toString().trim()),
                status: 1,
                laborerStatus: 1,
            },
            {
                headers: {
                    Authorization: `Bearer ${savedToken}`,
                },
            }
        );
        if (response.status === 200 || response.status === 201) {
            message.success(`Laborer Profile Edited Successfully`);
            getLaborers();
            setEditModalOpen(false);
        }
    }

    const [modalMessage, setModalMessage] = useState("");
    const [modalBodyContent, setModalBodyContent] = useState("");
    const [modal2Open, setModal2Open] = useState(false);
    const [itemID, setItemID] = useState(0);
    async function deleteLaborer() {
        await axios.delete(`${API_BASE}/Laborers/${itemID}`, {
            headers: {
                Authorization: `Bearer ${savedToken}`,
            },
        });
        message.success(`Laborer Profile Deleted Successfully`);
        getLaborers();
        setModal2Open(false);
    }

    async function setModalMessageAndAction(ID) {
        setModal2Open(true);
        setItemID(ID);
        setModalMessage("Are you sure you want to delete this Laborer?");
        setModalBodyContent(
            "Deleting this Laborer is not reversible and makes the Laborer inaccessible for all users."
        );
    }

    const [addModalOpen, setAddModalOpen] = useState(false);
    const [addModalMessage, setAddModalMessage] = useState("");
    const [addModalBodyContent, setAddModalBodyContent] = useState("");

    async function openAddLaborerModal() {
        setAddModalMessage("Add New Laborer");
        setAddModalBodyContent(
            <div>
                <div className="flex flex-col">
                    <label className="pb-2"> First Name </label>
                    <input
                        id="addFirstName"
                        type="text"
                        placeholder="first name..."
                        className="border rounded-lg px-3 py-1 bg-white"
                    />
                    <div className="h-5"></div>

                    <label className="pb-2"> Last Name </label>
                    <input
                        id="addLastName"
                        type="text"
                        placeholder="last name..."
                        className="border rounded-lg px-3 py-1 bg-white"
                    />
                    <div className="h-5"></div>

                    <label className="pb-2"> Employee ID </label>
                    <input
                        id="addEmployeeID"
                        type="text"
                        placeholder="employee ID..."
                        className="border rounded-lg px-3 py-1 bg-white"
                    />
                    <div className="h-5"></div>

                    <label className="pb-2"> RFID </label>
                    <input
                        id="addRFID"
                        type="text"
                        placeholder="RFID..."
                        className="border rounded-lg px-3 py-1 bg-white"
                    />
                    <div className="h-5"></div>
                </div>
            </div>
        );
        setAddModalOpen(true);
    }
    async function addLaborer() {
        let addFirstName = document.getElementById("addFirstName").value;
        let addLastName = document.getElementById("addLastName").value;
        let addEmployeeID = document.getElementById("addEmployeeID").value;
        let addRFID = document.getElementById("addRFID").value;

        let response = await axios.post(
            `${API_BASE}/Laborers`,
            {
                firstName: addFirstName,
                lastName: addLastName,
                employeeID: addEmployeeID,
                rfid: addRFID,
                status: 1,
                laborerStatus: 1,
            },
            {
                headers: {
                    Authorization: `Bearer ${savedToken}`,
                },
            }
        );
        if (response.status === 200 || response.status === 201) {
            message.success(`New Laborer Profile Created Successfully`);
            getLaborers();
            setAddModalOpen(false);
        }
    }

    const props = {
        name: "file",
        action: `/Upload`,
        headers: {
            authorization: "authorization-text",
        },
        onChange(info) {
            if (info.file.status !== "uploading") {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === "done") {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === "error") {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    const [data, setData] = useState([]);
    async function handleFileUpload(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const binaryStr = e.target.result;
            const workbook = XLSX.read(binaryStr, { type: "binary" });

            // Assuming the first sheet is the one we want to read
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(sheet);
            console.log(json);

            // Set the parsed data
            setData(json);
        };

        reader.readAsBinaryString(file);
    }

    useEffect(() => {
        getLaborers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="p-10">
            <div className="font-semibold text-lg pb-2">Laborer Management</div>
            <div className="pb-10 w-[50vw] text-base">
                This table is showing you your labor order history. This table
                allows you to filter and sort the information using various
                parameters, making it easy to locate specific orders based on
                criteria such as date, status, man power and more.
            </div>
            <div>
                <div className="flex justify-between pb-5">
                    <Button
                        type="primary"
                        icon={<UndoOutlined />}
                        onClick={(e) => refresh()}
                    >
                        Refresh
                    </Button>
                    {isLoading === true ? (
                        <></>
                    ) : (
                        <div className="flex gap-4">
                            <input
                                type="file"
                                accept=".xlsx, .xls, .csv"
                                onChange={handleFileUpload}
                            />
                            {/* <Upload {...props}>
                                <Button icon={<UploadOutlined />}>
                                    Click to Upload
                                </Button>
                            </Upload> */}

                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={(e) => openAddLaborerModal()}
                            >
                                New Laborer
                            </Button>
                        </div>
                    )}
                </div>
                {isLoading === true ? (
                    <div>
                        <Spin
                            indicator={
                                <LoadingOutlined
                                    style={{
                                        fontSize: 18,
                                        accentColor: "white",
                                    }}
                                    spin
                                />
                            }
                        />
                    </div>
                ) : (
                    <Table dataSource={laborersList}>
                        <Column
                            title="Employee ID"
                            dataIndex="employeeID"
                            key="employeeID"
                            render={(_, record) => {
                                return (
                                    <Tag color="purple">
                                        {record.employeeID}
                                    </Tag>
                                );
                            }}
                        />
                        <Column
                            title="RFID"
                            dataIndex="rfid"
                            key="rfid"
                            render={(_, record) => {
                                return <Tag color="cyan">{record.rfid}</Tag>;
                            }}
                        />
                        <Column
                            title="First Name"
                            dataIndex="firstName"
                            key="firstName"
                        />
                        <Column
                            title="Last Name"
                            dataIndex="lastName"
                            key="lastName"
                        />

                        <Column
                            title="Created By"
                            dataIndex="createdBy"
                            key="createdBy"
                        />
                        <Column
                            title="Created At"
                            dataIndex="createdAt"
                            key="createdAt"
                            render={(_, record) => {
                                return moment(record.createdAt).format(
                                    "MMMM Do YYYY, h:mma"
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
                                        onClick={(e) =>
                                            openEditLaborerModal(record)
                                        }
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        danger
                                        onClick={(e) =>
                                            setModalMessageAndAction(record.id)
                                        }
                                    >
                                        Delete
                                    </Button>
                                </Space>
                            )}
                        />
                    </Table>
                )}
            </div>

            {/* EDIT MODAL */}
            <Modal
                title={editModalMessage}
                centered
                open={editModalOpen}
                onCancel={() => setEditModalOpen(false)}
                footer={(_, { OkBtn, CancelBtn }) => (
                    <>
                        <Button
                            type="primary"
                            onClick={() => {
                                editLaborer();
                            }}
                        >
                            Confirm Edit
                        </Button>
                        <CancelBtn />
                    </>
                )}
            >
                <div> {editModalBodyContent} </div>
            </Modal>

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
                                deleteLaborer();
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

            {/* ADD MODAL */}
            <Modal
                title={addModalMessage}
                centered
                open={addModalOpen}
                onOk={() => addLaborer()}
                onCancel={() => setAddModalOpen(false)}
                footer={(_, { OkBtn, CancelBtn }) => (
                    <>
                        <OkBtn />
                        <CancelBtn />
                    </>
                )}
            >
                <p> {addModalBodyContent} </p>
            </Modal>
        </div>
    );
}
