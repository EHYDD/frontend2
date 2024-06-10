import Column from "antd/es/table/Column";
import { Table } from "lucide-react";
import { useEffect, useState } from "react";
import { API_BASE } from "../../../config/config";
import axios from "axios";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

var appeals = [];
export default function AppealsPage() {
    let savedToken = localStorage.getItem("token");

    // const [appeals, setAppeals] = useState([]);
    const [isLoading, setIsLoading] = useState([]);
    async function getAppeals() {
        setIsLoading(true);
        let response = await axios.get(`${API_BASE}/auth/admin/appeals`, {
            headers: {
                Authorization: `Bearer ${savedToken}`,
            },
        });
        appeals = response.data;
        console.log(response.data);
        // setAppeals(response.data);
        setIsLoading(false);
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
                        />
                        <Column
                            title="Created At"
                            dataIndex="createdAt"
                            key="createdAt"
                        />
                    </Table>
                </div>
            )}
        </div>
    );
}
