import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { API_BASE } from "../../../config/config";
import { Button, Modal, Space, Spin, Table, Tag } from "antd";
import Column from "antd/es/table/Column";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AddNewDataPage() {
    let savedToken = localStorage.getItem("token");

    const [isLoading, setLoading] = useState(true);
    const [locationList, setLocationList] = useState([]);
    const [costCenterList, setCostCenterList] = useState([]);
    const [serviceTypeList, setServiceTypeList] = useState([]);

    const [modal2Open, setModal2Open] = useState(false);

    async function getLocations() {
        let response = await axios.get(`${API_BASE}/Location`, {
            headers: {
                Authorization: `Bearer ${savedToken}`,
            },
        });
        setLocationList(response.data);
    }

    async function getCostCenters() {
        let response = await axios.get(`${API_BASE}/CostCenter`, {
            headers: {
                Authorization: `Bearer ${savedToken}`,
            },
        });
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
        await axios.delete(`${API_BASE}/Location/${itemID}`, {
            headers: {
                Authorization: `Bearer ${savedToken}`,
            },
        });
        getLocations();
        setModal2Open(false);
    }
    async function deleteCostCenter() {
        await axios.delete(`${API_BASE}/CostCenter/${itemID}`, {
            headers: {
                Authorization: `Bearer ${savedToken}`,
            },
        });
        getCostCenters();
        setModal2Open(false);
    }
    async function deleteServiceType() {
        await axios.delete(`${API_BASE}/ServiceType/${itemID}`, {
            headers: {
                Authorization: `Bearer ${savedToken}`,
            },
        });
        getServiceType();
        setModal2Open(false);
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
                    {/* LOCATION */}
                    <div className="font-semibold text-lg pb-2"> Locations</div>
                    <div>
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
                                sorter={(a, b) =>
                                    a.authorityLevel - b.authorityLevel
                                }
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
                                        <Button type="primary">Edit</Button>
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
                    <div className="font-semibold text-lg pb-2">
                        Cost Centers
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
                                        <Button type="primary">Edit</Button>
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
                    <div className="font-semibold text-lg pb-2">
                        Service Types
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
                                sorter={(a, b) =>
                                    a.authorityLevel - b.authorityLevel
                                }
                            />
                            <Column
                                title="Overtime Rate"
                                dataIndex="otRate"
                                key="otRate"
                                sorter={(a, b) =>
                                    a.authorityLevel - b.authorityLevel
                                }
                            />
                            <Column
                                title="Action"
                                key="action"
                                render={(_, record) => (
                                    <Space size="middle">
                                        <Button type="primary">Edit</Button>
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

            {/* HIDDEN */}
            <div className="w-1/3  gap-2 items-center pb-4 hidden">
                {/* ADD COST CENTER */}
                <div className="shadow-md hover:shadow-lg py-5 px-5 rounded-xl border border-zinc-200">
                    <div className="font-semibold pb-3 text-center text-base">
                        Add a new cost center
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-base font-semibold">
                            Cost Center ID
                        </label>

                        <input
                            id="costCenter"
                            type="text"
                            placeholder="cost center number"
                            className="border rounded-lg px-2 py-1 text-base bg-white"
                        />
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            size={"medium"}
                            className="mt-2"
                        >
                            Add
                        </Button>
                    </div>
                </div>

                <div className="h-10"></div>

                {/* ADD LOCATION */}
                <div className="shadow-md hover:shadow-lg py-5 px-5 rounded-xl border border-zinc-200">
                    <div className="font-semibold text-base pb-3 text-center">
                        Add a New Location
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-base font-semibold pl-2">
                            Location Name
                        </label>
                        <input
                            id="costCenter"
                            type="text"
                            placeholder="cost center number"
                            className="border rounded-lg px-3 py-1 text-base bg-white"
                        />
                        <label className="text-base font-semibold pl-2">
                            Pass Status
                        </label>
                        <input
                            id="costCenter"
                            type="text"
                            placeholder="cost center number"
                            className="border rounded-lg px-3 py-1 text-base bg-white"
                        />
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            size={"medium"}
                            className="mt-3"
                        >
                            Add
                        </Button>
                    </div>
                </div>

                <div className="h-10"></div>

                {/* ADD SERVICE */}
                <div className="shadow-md hover:shadow-lg py-5 px-5 rounded-xl border border-zinc-200">
                    <div className="font-semibold text-base pb-5 text-center">
                        Add a New Service Type
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-base font-semibold pl-2">
                            Service Type
                        </label>
                        <input
                            id="costCenter"
                            type="text"
                            placeholder="cost center number"
                            className="border rounded-lg px-3 py-1 text-base bg-white"
                        />
                        <label className="text-base font-semibold pl-2">
                            Payment Rate
                        </label>
                        <input
                            id="costCenter"
                            type="text"
                            placeholder="cost center number"
                            className="border rounded-lg px-3 py-1 text-base bg-white"
                        />
                        <label className="text-base font-semibold pl-2">
                            Overtime Rate
                        </label>
                        <input
                            id="costCenter"
                            type="text"
                            placeholder="cost center number"
                            className="border rounded-lg px-3 py-1 text-base bg-white"
                        />
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            size={"medium"}
                            className="mt-3"
                        >
                            Add
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
