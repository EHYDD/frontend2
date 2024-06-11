import { Calendar, theme, Button, Table, Popover, Tag } from "antd";
import { useState } from "react";
import { API_BASE } from "../../../config/config";
import axios from "axios";
import Column from "antd/es/table/Column";
import moment from "moment";

export default function MonthlySchedulePage() {
    const { token } = theme.useToken();
    const wrapperStyle = {
        width: 450,
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
    };

    const [currentDate, setCurrentDate] = useState("");
    const onPanelChange = (value, mode) => {
        console.log(value.format("YYYY-MM-DD"), mode);
        setCurrentDate(value.format("YYYY-MM-DD"), mode);
    };

    const [loadings, setLoadings] = useState([]);

    let savedToken = localStorage.getItem("token");

    const [requestInfoList, setRequestInfoList] = useState(0);
    async function getRequestInfoList() {
        let response = await axios.get(`${API_BASE}/Requests/RequestInfoList`, {
            headers: {
                Authorization: `Bearer ${savedToken}`,
            },
        });
        setRequestInfoList(response.data);
    }

    const [schedule, setSchedule] = useState([]);
    async function getSchedule() {
        console.log(currentDate);
        let response = await axios.get(
            `${API_BASE}/temp/requests/get-requests-by-date?date=${currentDate}`,
            {
                headers: {
                    Authorization: `Bearer ${savedToken}`,
                },
            }
        );
        setSchedule(response.data);
        console.log(response.data);
    }

    async function initialCalls() {
        await getRequestInfoList();
    }

    useState(() => {
        initialCalls();
    }, []);

    return (
        <div className="h-screen">
            {/* SCHEDULE */}
            <div className="w-3/5 p-8 border-l-4 border-double">
                <div className="pb-2 text-lg font-semibold">
                    Labor Request Schedule
                </div>
                <div className="pb-12 text-base">
                    This's the Availability Calendar section of our labor
                    management platform! Here, employees can easily visualize
                    the availability of labor for scheduling tasks across
                    different dates and timeframes. The calendar provides a
                    comprehensive overview of occupied dates, where labor
                    resources have already been allocated, as well as available
                    dates, where manpower is ready to be assigned.
                </div>
                <div className="w-fit pl-20">
                    {/* SEARCH DATE */}
                    <div style={wrapperStyle}>
                        <Calendar
                            fullscreen={false}
                            // mode="month"
                            // onPanelChange={onPanelChange}
                            onSelect={onPanelChange}
                        />
                    </div>

                    {/* SEARCH DATE */}
                    <div className="pt-5 flex justify-end">
                        <Button
                            type="primary"
                            loading={loadings[0]}
                            onClick={() => {
                                getSchedule();
                            }}
                        >
                            Check Schedule
                        </Button>
                    </div>
                </div>
            </div>

            <div className="p-8">
                {schedule.length > 0 ? (
                    <Table dataSource={schedule}>
                        <Column
                            title="Center ID"
                            dataIndex="costCenterId"
                            key="costCenterId"
                            render={(_, record) =>
                                requestInfoList["costCenters"].map(
                                    (value, index) => {
                                        return value["id"] ===
                                            record.costCenterId ? (
                                            <Tag color="purple">
                                                {value["callCenterNumber"]}
                                            </Tag>
                                        ) : (
                                            ""
                                        );
                                    }
                                )
                            }
                        />
                        <Column
                            title="Location ID"
                            dataIndex="locationId"
                            key="locationId"
                            render={(_, record) =>
                                requestInfoList["location"].map(
                                    (value, index) => {
                                        return value["id"] ===
                                            record.locationId ? (
                                            <Tag
                                                color="cyan"
                                                className="cursor-pointer"
                                            >
                                                {value["locationName"]}
                                            </Tag>
                                        ) : (
                                            ""
                                        );
                                    }
                                )
                            }
                        />
                        {/* <Column
                 title="Job Status"
                 dataIndex="jobStatus"
                 key="jobStatus"
             /> */}
                        <Column
                            title="Service Type ID"
                            dataIndex="serviceTypeId"
                            key="serviceTypeId"
                            render={(_, record) =>
                                requestInfoList["serviceType"].map(
                                    (value, index) => {
                                        return value["id"] ===
                                            record.serviceTypeId ? (
                                            <div className="flex gap-2">
                                                <Popover
                                                    content={
                                                        <div className="flex text-center">
                                                            <p className="font-semibold pr-2">
                                                                Payment Rate —
                                                            </p>

                                                            {
                                                                value[
                                                                    "paymentRate"
                                                                ]
                                                            }
                                                        </div>
                                                    }
                                                    title=""
                                                    trigger="hover"
                                                >
                                                    <Tag
                                                        color="green"
                                                        className="cursor-pointer"
                                                    >
                                                        {value["title"]}
                                                    </Tag>
                                                </Popover>
                                            </div>
                                        ) : (
                                            ""
                                        );
                                    }
                                )
                            }
                        />
                        <Column
                            title="Man Power"
                            dataIndex="manPower"
                            key="manPower"
                        />
                        <Column
                            title="Duration (hr)"
                            dataIndex="requestedduration"
                            key="requestedduration"
                        />
                        <Column
                            title="Date"
                            dataIndex="firstDate"
                            key="firstDate"
                        />
                        {/* <Column
                     title="Second Date"
                     dataIndex="secondDate"
                     key="secondDate"
                 /> */}
                        <Column
                            title="More Info"
                            key="action"
                            fixed="right"
                            render={(_, record) => (
                                <Popover
                                    content={
                                        <div className="flex flex-col justify-evenly">
                                            <div className="text-center flex">
                                                <p className="font-semibold pb-2 pr-2">
                                                    Request ID —
                                                </p>
                                                <Tag color="purple">
                                                    {record.id}
                                                </Tag>
                                            </div>
                                            <div className="text-center flex">
                                                <p className="font-semibold pb-2 pr-2">
                                                    Requester —
                                                </p>
                                                <p>{record.createdBy}</p>
                                            </div>
                                            {record.serviceRequestMessage
                                                .length > 1 ? (
                                                <div className="text-center flex">
                                                    <p className="font-semibold pb-2 pr-2">
                                                        Message —
                                                    </p>
                                                    <p>
                                                        {
                                                            record.serviceRequestMessage
                                                        }
                                                    </p>
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                            <div className="text-center pb-2 flex">
                                                <p className="font-semibold pb-2 pr-2">
                                                    Start Time —
                                                </p>
                                                <p>
                                                    {moment(
                                                        record.startTime
                                                    ).format(
                                                        "MMMM Do YYYY, h:mm:ss a"
                                                    )}
                                                </p>
                                            </div>
                                            <div className="text-center pb-2 flex">
                                                <p className="font-semibold pb-2 pr-2">
                                                    End Time —
                                                </p>
                                                <p>
                                                    {moment(
                                                        record.endTime
                                                    ).format(
                                                        "MMMM Do YYYY, h:mm:ss a"
                                                    )}
                                                </p>
                                            </div>
                                            <div className="text-center pb-2 flex">
                                                <p className="font-semibold pb-2 pr-2">
                                                    Created At —
                                                </p>
                                                <p>
                                                    {moment(
                                                        record.createdAt
                                                    ).format(
                                                        "MMMM Do YYYY, h:mm:ss a"
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    }
                                    title=""
                                    trigger="hover"
                                >
                                    <Button>More Info </Button>
                                </Popover>
                            )}
                        />
                    </Table>
                ) : (
                    <div className="font-semibold text-lg pb-2 pl-56 pt-28  p-2">
                        <div className="border w-fit px-5 py-2 rounded-xl bg-green-100">
                            <p> There are no requests on that date! </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
