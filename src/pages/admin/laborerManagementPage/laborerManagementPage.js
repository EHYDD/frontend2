import { useState } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import { API_BASE } from "../../../config/config";

export default function LaborerManagementPage() {
    const [isLoading, setLoading] = useState(true);
    let savedToken = localStorage.getItem("token");

    async function getLaborers() {
        let response = await axios.get(`${API_BASE}/Laborers`, {
            headers: {
                Authorization: `Bearer ${savedToken}`,
            },
        });
        console.log(response);
        setLoading(false);
    }

    getLaborers();
    return (
        <div>
            Laborer Management Sep
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
                <div> Data! </div>
            )}
        </div>
    );
}
