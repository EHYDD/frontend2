import {
    PlusOutlined,
    LoadingOutlined,
    LockOutlined,
    UnlockOutlined,
    UndoOutlined,
} from "@ant-design/icons";
import { Button, message, Modal, Space, Spin, Table, Tag } from "antd";
import { API_BASE } from "../../../config/config";
import Column from "antd/es/table/Column";
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function AddNewDataPage() {
    let savedToken = localStorage.getItem("token");

    const [isLoading, setLoading] = useState(true);
    const [locationList, setLocationList] = useState([]);
    const [costCenterList, setCostCenterList] = useState([]);
    const [serviceTypeList, setServiceTypeList] = useState([]);

    async function getLocations() {
        let response = await axios.get(
            `${API_BASE}/Location`,
            {
                headers: {
                    Authorization: `Bearer ${savedToken}`,
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${savedToken}`,
                },
            }
        );
        setLocationList(response.data);
    }

    async function getCostCenters() {
        let response = await axios.get(
            `${API_BASE}/CostCenter`,
            {
                headers: {
                    Authorization: `Bearer ${savedToken}`,
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${savedToken}`,
                },
            }
        );
        setCostCenterList(response.data);
    }

    async function getServiceType() {
        let response = await axios.get(`${API_BASE}/ServiceType`, {
            headers: {
                Authorization: `Bearer ${savedToken}`,
            },
        });
        setServiceTypeList(response.data);
        setLoading(false);
    }

    const [modal2Open, setModal2Open] = useState(false);
    const [itemID, setItemID] = useState(0);
    const [modalType, setModalType] = useState(0);
    const [modalMessage, setModalMessage] = useState("");
    const [modalBodyContent, setModalBodyContent] = useState("");

    async function setModalMessageAndAction(message, ID) {
        setModal2Open(true);
        setModalType(message);
        setItemID(ID);
        if (message === 1) {
            setModalMessage("Are you sure you want to delete this Location?");
            setModalBodyContent(
                "Deleting this location is not reversible and makes the location inaccessible for all users."
            );
        } else if (message === 2) {
            setModalMessage(
                "Are you sure you want to delete this Cost Center?"
            );
            setModalBodyContent(
                "Deleting this Cost Center is not reversible and makes the center inaccessible for all users."
            );
        } else if (message === 3) {
            setModalMessage(
                "Are you sure you want to delete this Service Type?"
            );
            setModalBodyContent(
                "Deleting this Service Type is not reversible and makes the Service inaccessible for all users."
            );
        }
    }

    async function deleteLocation() {
        await axios.delete(
            `${API_BASE}/Location/${itemID}`,
            {
                headers: {
                    Authorization: `Bearer ${savedToken}`,
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${savedToken}`,
                },
            }
        );
        message.success(`Location Deleted Successfully`);
        getLocations();
        setModal2Open(false);
    }
    async function deleteCostCenter() {
        await axios.delete(
            `${API_BASE}/CostCenter/${itemID}`,
            {
                headers: {
                    Authorization: `Bearer ${savedToken}`,
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${savedToken}`,
                },
            }
        );
        message.success(`Cost Center Deleted Successfully`);
        getCostCenters();
        setModal2Open(false);
    }
    async function deleteServiceType() {
        await axios.delete(
            `${API_BASE}/ServiceType/${itemID}`,
            {
                headers: {
                    Authorization: `Bearer ${savedToken}`,
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${savedToken}`,
                },
            }
        );
        message.success(`Service Deleted Successfully`);
        getServiceType();
        setModal2Open(false);
    }

    const [addModalOpen, setAddModalOpen] = useState(false);
    const [addModalMessage, setAddModalMessage] = useState("");
    const [addModalBodyContent, setAddModalBodyContent] = useState("");

    const [selectedPassStatus, setPassStatus] = useState(1);
    async function openAddLocationModal() {
        setAddModalType(1);
        setAddModalMessage("Add New Location");
        setAddModalBodyContent(
            <div>
                <div className="flex flex-col">
                    <label className="pb-2"> Name </label>
                    <input
                        id="locationName"
                        type="text"
                        placeholder="location name..."
                        className="border rounded-lg px-3 py-1 bg-white"
                    />
                    <div className="h-5"></div>
                    <label className="pb-2">Pass Status</label>
                    <div className="flex gap-2">
                        <Button
                            type={
                                selectedPassStatus === 1
                                    ? "primary"
                                    : "outlined"
                            }
                            icon={<UnlockOutlined />}
                            onClick={(e) => setPassStatus(0)}
                        >
                            No Pass
                        </Button>
                        <Button
                            type={
                                selectedPassStatus === 2
                                    ? "primary"
                                    : "outlined"
                            }
                            icon={<LockOutlined />}
                            onClick={(e) => setPassStatus(1)}
                        >
                            Pass Required
                        </Button>
                    </div>
                    <div className="h-2"></div>
                </div>
            </div>
        );
        setAddModalOpen(true);
    }

    async function openAddCostCenterModal() {
        setAddModalType(2);
        setAddModalMessage("Add New Cost Center");
        setAddModalBodyContent(
            <div>
                <div className="flex flex-col">
                    <label className="pb-2"> Cost Center Number </label>
                    <input
                        id="costCenterNumber"
                        type="text"
                        placeholder="number..."
                        className="border rounded-lg px-3 py-1 bg-white"
                    />
                    <div className="h-5"></div>
                </div>
            </div>
        );
        setAddModalOpen(true);
    }

    async function openAddServiceTypeModal() {
        setAddModalType(3);
        setAddModalMessage("Add New Service Type");
        setAddModalBodyContent(
            <div>
                <div className="flex flex-col">
                    <label className="pb-2"> Title </label>
                    <input
                        id="title"
                        type="text"
                        placeholder="title..."
                        className="border rounded-lg px-3 py-1 bg-white"
                    />
                    <div className="h-5"></div>
                    <label className="pb-2"> Payment Rate </label>
                    <input
                        id="paymentRate"
                        type="text"
                        placeholder="payment rate..."
                        className="border rounded-lg px-3 py-1 bg-white"
                    />
                    <div className="h-5"></div>
                    <label className="pb-2"> Overtime Rate </label>
                    <input
                        id="otRate"
                        type="text"
                        placeholder="overtime rate..."
                        className="border rounded-lg px-3 py-1 bg-white"
                    />
                    <div className="h-5"></div>
                </div>
            </div>
        );
        setAddModalOpen(true);
    }

    const [addModalType, setAddModalType] = useState(0);

    async function addLocation() {
        let locationName = document.getElementById("locationName").value;
        let token = localStorage.getItem("token");
        let decodedUser = jwtDecode(token);
        let response = await axios.post(
            `${API_BASE}/Location`,
            {
                createdBy: decodedUser["email"],
                updatedBy: decodedUser["email"],
                locationName: locationName.toString().trim(),
                passStatus: selectedPassStatus,
            },
            {
                headers: {
                    Authorization: `Bearer ${savedToken}`,
                },
            }
        );
        if (response.status === 200 || response.status === 201) {
            message.success(`Location Added Successfully`);
            getLocations();
            setAddModalOpen(false);
        }
    }

    async function addCostCenter() {
        let costCenterNumber =
            document.getElementById("costCenterNumber").value;
        let token = localStorage.getItem("token");
        let decodedUser = jwtDecode(token);
        let response = await axios.post(
            `${API_BASE}/CostCenter`,
            {
                createdBy: decodedUser["email"],
                updatedBy: decodedUser["email"],
                costCenterNumber: costCenterNumber.toString().trim(),
            },
            {
                headers: {
                    Authorization: `Bearer ${savedToken}`,
                },
            }
        );
        if (response.status === 200 || response.status === 201) {
            message.success(`Cost Center added Successfully`);
            getCostCenters();
            setAddModalOpen(false);
        }
    }

    async function addServiceType() {
        let title = document.getElementById("title").value;
        let paymentRate = document.getElementById("paymentRate").value;
        let otRate = document.getElementById("otRate").value;
        let token = localStorage.getItem("token");
        let decodedUser = jwtDecode(token);
        let response = await axios.post(
            `${API_BASE}/ServiceType`,
            {
                createdBy: decodedUser["email"],
                updatedBy: decodedUser["email"],
                title: title.toString().trim(),
                paymentRate: paymentRate.toString().trim(),
                otRate: otRate.toString().trim(),
            },
            {
                headers: {
                    Authorization: `Bearer ${savedToken}`,
                },
            }
        );
        if (response.status === 200 || response.status === 201) {
            message.success(`Service Type added Successfully`);
            getServiceType();
            setAddModalOpen(false);
        }
    }

    const [editModalType, setEditModalType] = useState(0);

    const [editLocationID, setEditLocationID] = useState(0);
    const [editCostCenterID, setEditCostCenterID] = useState(0);
    const [editServiceTypeID, setEditServiceTypeID] = useState(0);

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editModalMessage, setEditModalMessage] = useState("");
    const [editModalBodyContent, setEditModalBodyContent] = useState("");

    function openEditLocationModal(record) {
        setEditModalType(1);
        setEditLocationID(record.id);
        setEditModalMessage("Edit Location");
        setEditModalBodyContent(
            <div>
                <div className="flex flex-col">
                    <label className="pb-2"> Location Name </label>
                    <input
                        id="editLocationName"
                        type="text"
                        defaultValue={record.locationName}
                        placeholder={record.locationName}
                        className="border rounded-lg px-3 py-1 bg-white"
                    />
                    <div className="h-5"></div>
                    <label className="pb-2"> Pass Status </label>
                    <input
                        id="editPassStatus"
                        type="text"
                        defaultValue={record.passStatus}
                        placeholder={record.passStatus}
                        className="border rounded-lg px-3 py-1 bg-white"
                    />
                    <div className="h-5"></div>
                </div>
            </div>
        );
        setEditModalOpen(true);
    }
    function openEditCostCenterModal(record) {
        setEditModalType(2);
        setEditCostCenterID(record.id);
        setEditModalMessage("Edit Cost Center");
        setEditModalBodyContent(
            <div>
                <div className="flex flex-col">
                    <label className="pb-2">Cost Center Number</label>
                    <input
                        id="editCostCenterNumber"
                        type="text"
                        defaultValue={record.costCenterNumber}
                        placeholder={record.costCenterNumber}
                        className="border rounded-lg px-3 py-1 bg-white"
                    />
                    <div className="h-5"></div>
                </div>
            </div>
        );
        setEditModalOpen(true);
    }
    function openEditServiceTypeModal(record) {
        setEditModalType(3);
        setEditServiceTypeID(record.id);
        setEditModalMessage("Edit Service Type");
        setEditModalBodyContent(
            <div>
                <div className="flex flex-col">
                    <label className="pb-2">Service Name</label>
                    <input
                        id="editServiceTypeTitle"
                        type="text"
                        defaultValue={record.title}
                        placeholder={record.title}
                        className="border rounded-lg px-3 py-1 bg-white"
                    />
                    <div className="h-5"></div>
                    <label className="pb-2">Payment Rate</label>
                    <input
                        id="editPaymentRate"
                        type="text"
                        defaultValue={record.paymentRate}
                        placeholder={record.paymentRate}
                        className="border rounded-lg px-3 py-1 bg-white"
                    />
                    <div className="h-5"></div>
                    <label className="pb-2">Overtime Rate</label>
                    <input
                        id="editOTRate"
                        type="text"
                        defaultValue={record.otRate}
                        placeholder={record.otRate}
                        className="border rounded-lg px-3 py-1 bg-white"
                    />
                    <div className="h-5"></div>
                    <label className="pb-2">Status</label>
                    <input
                        id="editServiceStatus"
                        type="text"
                        defaultValue={record.status}
                        placeholder={record.status}
                        className="border rounded-lg px-3 py-1 bg-white"
                    />
                    <div className="h-5"></div>
                </div>
            </div>
        );
        setEditModalOpen(true);
    }

    async function editLocation() {
        let editLocationName =
            document.getElementById("editLocationName").value;
        let editPassStatus = document.getElementById("editPassStatus").value;
        let token = localStorage.getItem("token");
        let decodedUser = jwtDecode(token);
        let response = await axios.put(
            `${API_BASE}/Location/${editLocationID}`,
            {
                createdBy: decodedUser["email"],
                updatedBy: decodedUser["email"],
                locationName: editLocationName.toString().trim(),
                passStatus: parseInt(editPassStatus.toString().trim()),
                id: parseInt(editLocationID.toString().trim()),
            },
            {
                headers: {
                    Authorization: `Bearer ${savedToken}`,
                },
            }
        );
        if (response.status === 200 || response.status === 201) {
            message.success(`Location Edited Successfully`);
            getLocations();
            setEditModalOpen(false);
        }
    }

    async function editCostCenter() {
        let editCostCenterNumber = document.getElementById(
            "editCostCenterNumber"
        ).value;
        let token = localStorage.getItem("token");
        let decodedUser = jwtDecode(token);
        let response = await axios.put(
            `${API_BASE}/CostCenter/${editCostCenterID}`,
            {
                createdBy: decodedUser["email"],
                updatedBy: decodedUser["email"],
                costCenterNumber: editCostCenterNumber.toString().trim(),
                id: parseInt(editCostCenterID.toString().trim()),
            },
            {
                headers: {
                    Authorization: `Bearer ${savedToken}`,
                },
            }
        );
        if (response.status === 200 || response.status === 201) {
            message.success(`Cost Center Edited Successfully`);
            getCostCenters();
            setEditModalOpen(false);
        }
    }

    async function editServiceType() {
        let editServiceTypeTitle = document.getElementById(
            "editServiceTypeTitle"
        ).value;
        let editPaymentRate = document.getElementById("editPaymentRate").value;
        let editOTRate = document.getElementById("editOTRate").value;
        let editServiceStatus =
            document.getElementById("editServiceStatus").value;
        let token = localStorage.getItem("token");
        let decodedUser = jwtDecode(token);
        let response = await axios.put(
            `${API_BASE}/ServiceType/${editServiceTypeID}`,
            {
                createdBy: decodedUser["email"],
                updatedBy: decodedUser["email"],
                title: editServiceTypeTitle.toString().trim(),
                id: parseInt(editServiceTypeID.toString().trim()),
                paymentRate: parseInt(editPaymentRate.toString().trim()),
                otRate: parseInt(editOTRate.toString().trim()),
                status: parseInt(editServiceStatus.toString().trim()),
            },
            {
                headers: {
                    Authorization: `Bearer ${savedToken}`,
                },
            }
        );
        if (response.status === 200 || response.status === 201) {
            message.success(`Service Type Edited Successfully`);
            getServiceType();
            setEditModalOpen(false);
        }
    }

    async function refreshAllData() {
        setLoading(true);
        await getLocations();
        await getCostCenters();
        await getServiceType();
        setLoading(false);
    }

    useEffect(() => {
        getLocations();
        getCostCenters();
        getServiceType();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="p-10">
            <div className="font-semibold text-lg pb-2"> Add New Data </div>
            <div className="pb-3 w-[50vw] text-base">
                This table is showing you your labor order history. This table
                allows you to filter and sort the information using various
                parameters, making it easy to locate specific orders based on
                criteria such as date, status, man power and more.
            </div>
            <div className="pb-8">
                <Button
                    type="primary"
                    icon={<UndoOutlined />}
                    onClick={(e) => refreshAllData()}
                >
                    Refresh All Data
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
                <div className="overflow-scroll no-scrollbar">
                    {/* LOCATION */}
                    <div className="flex justify-between pb-5">
                        <div className="font-semibold text-lg pb-2">
                            Locations
                        </div>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={(e) => openAddLocationModal()}
                        >
                            New Location
                        </Button>
                    </div>
                    <div className="no-scrollbar">
                        <Table dataSource={locationList}>
                            <Column title="ID" dataIndex="id" key="id" />
                            <Column
                                title="Location Name"
                                dataIndex="locationName"
                                key="locationName"
                            />
                            <Column
                                title="Pass Status"
                                dataIndex="passStatus"
                                key="passStatus"
                                sorter={(a, b) => a.passStatus - b.passStatus}
                                render={(status) =>
                                    status === 0 ? (
                                        <Tag color={"blue"} key={status}>
                                            {status}
                                        </Tag>
                                    ) : (
                                        <Tag color={"purple"} key={status}>
                                            {status}
                                        </Tag>
                                    )
                                }
                            />
                            <Column
                                title="Created By"
                                dataIndex="createdBy"
                                key="createdBy"
                            />
                            <Column
                                title="Updated By"
                                dataIndex="updatedBy"
                                key="updatedBy"
                            />
                            <Column
                                title="Action"
                                key="action"
                                render={(_, record) => (
                                    <Space size="middle">
                                        <Button
                                            type="primary"
                                            onClick={(e) =>
                                                openEditLocationModal(record)
                                            }
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            danger
                                            onClick={(e) =>
                                                setModalMessageAndAction(
                                                    1,
                                                    record.id
                                                )
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </Space>
                                )}
                            />
                        </Table>
                    </div>

                    {/* COST CENTERS */}
                    <div className="flex justify-between pt-14 pb-5">
                        <div className="font-semibold text-lg pb-2">
                            Cost Centers
                        </div>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={(e) => openAddCostCenterModal()}
                        >
                            New Center
                        </Button>
                    </div>
                    <div>
                        <Table dataSource={costCenterList}>
                            <Column title="ID" dataIndex="id" key="id" />
                            <Column
                                title="Cost Center Number"
                                dataIndex="costCenterNumber"
                                key="costCenterNumber"
                            />
                            <Column
                                title="Created By"
                                dataIndex="createdBy"
                                key="createdBy"
                            />
                            <Column
                                title="Updated By"
                                dataIndex="updatedBy"
                                key="updatedBy"
                            />
                            <Column
                                title="Action"
                                key="action"
                                render={(_, record) => (
                                    <Space size="middle">
                                        <Button
                                            type="primary"
                                            onClick={(e) =>
                                                openEditCostCenterModal(record)
                                            }
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            danger
                                            onClick={(e) =>
                                                setModalMessageAndAction(
                                                    2,
                                                    record.id
                                                )
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </Space>
                                )}
                            />
                        </Table>
                    </div>

                    {/* SERVICE TYPES */}
                    <div className="flex justify-between pt-14 pb-5">
                        <div className="font-semibold text-lg pb-2">
                            Service Types
                        </div>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={(e) => openAddServiceTypeModal()}
                        >
                            New Service
                        </Button>
                    </div>
                    <div>
                        <Table dataSource={serviceTypeList}>
                            <Column title="ID" dataIndex="id" key="id" />
                            <Column
                                title="Title"
                                dataIndex="title"
                                key="title"
                            />
                            <Column
                                title="status"
                                dataIndex="status"
                                key="status"
                            />
                            <Column
                                title="Payment Rate"
                                dataIndex="paymentRate"
                                key="paymentRate"
                                sorter={(a, b) => a.paymentRate - b.paymentRate}
                            />
                            <Column
                                title="Overtime Rate"
                                dataIndex="otRate"
                                key="otRate"
                                sorter={(a, b) => a.otRate - b.otRate}
                            />
                            <Column
                                title="Action"
                                key="action"
                                render={(_, record) => (
                                    <Space size="middle">
                                        <Button
                                            type="primary"
                                            onClick={(e) =>
                                                openEditServiceTypeModal(record)
                                            }
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            danger
                                            onClick={(e) =>
                                                setModalMessageAndAction(
                                                    3,
                                                    record.id
                                                )
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </Space>
                                )}
                            />
                        </Table>
                    </div>
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
                                modalType === 1
                                    ? deleteLocation()
                                    : modalType === 2
                                    ? deleteCostCenter()
                                    : deleteServiceType();
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
                onOk={() =>
                    addModalType === 1
                        ? addLocation()
                        : addModalType === 2
                        ? addCostCenter()
                        : addServiceType()
                }
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
                                editModalType === 1
                                    ? editLocation()
                                    : editModalType === 2
                                    ? editCostCenter()
                                    : editServiceType();
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
        </div>
    );
}
