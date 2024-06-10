import { Spin, Table, Tag } from "antd";
import Column from "antd/es/table/Column";
import axios from "axios";
import { API_BASE } from "../../../config/config";
import { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";

export default function AttendancePage() {
    let savedToken = localStorage.getItem("token");
    const [attendance, setAttendance] = useState([]);
    const [isLoading, setLoading] = useState(true);
    async function getAttendance() {
        // setLoading(true);
        console.log("sending reqs");
        let response = await axios.get(
            `${API_BASE}/temp/requests/get-available-laborers-today`,
            {
                headers: {
                    Authorization: `Bearer ${savedToken}`,
                },
            }
        );
        let reversedAttendance = response.data;
        reversedAttendance.reverse();

        setAttendance(reversedAttendance);
        setLoading(false);
    }

    useEffect(() => {
        setInterval(getAttendance, 15000); // Refreshed every 15 seconds
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className="p-10">
            <div className="font-semibold text-lg pb-2"> Attendance </div>
            <div className="pb-3 w-[50vw] text-base">
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
                    <Table dataSource={attendance}>
                        <Column
                            title="Employee ID"
                            dataIndex="employeeID"
                            key="employeeID"
                            render={(_, record) => {
                                return (
                                    <Tag color="cyan">{record.employeeID}</Tag>
                                );
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
                            title="Status"
                            dataIndex="status"
                            key="status"
                            render={(_, record) => {
                                return (
                                    <Tag color="green">
                                        {record.status === 1
                                            ? "Present"
                                            : "Absent"}
                                    </Tag>
                                );
                            }}
                        />
                        <Column
                            title="QR Code"
                            dataIndex="qrCode"
                            key="qrCode"
                            render={(_, record) => {
                                return (
                                    <Tag color="purple">{record.qrCode}</Tag>
                                );
                            }}
                        />
                    </Table>
                </div>
            )}
        </div>
    );
}
