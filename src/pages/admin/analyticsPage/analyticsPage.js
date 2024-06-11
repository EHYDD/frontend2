import { BarChart, LineChart, PieChart } from "@mui/x-charts";
import { API_BASE } from "../../../config/config";
import CountUp from "react-countup";
import { Button, message, Statistic } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

let costcenterVsManpower = [];
let requestInfoList = [];
let locationVsRequests = [];
let serviceTypeVsRequests = [];
export default function AnalyticsPage() {
    let savedToken = localStorage.getItem("token");

    const formatter = (value) => <CountUp end={value} separator="," />;
    //   const valueFormatter = (value: number | null) => `${value}mm`;

    const [isLoading, setIsLoading] = useState(true);
    const [analytics, setAnalytics] = useState({});
    async function getAnalytics() {
        let response = await axios.get(`${API_BASE}/Analytics`);
        setAnalytics(response.data);

        let costcenterVsManpowerUnfiltered = [];
        for (var i of response.data["costcenterVsManpower"]) {
            costcenterVsManpowerUnfiltered.push({
                id: i["costCenterId"],
                value: i["totalManPower"],
                label: i["costCenterId"].toString(),
            });
        }

        costcenterVsManpower = [];
        for (var j of costcenterVsManpowerUnfiltered) {
            for (var k of requestInfoList["costCenters"]) {
                if (j["id"] === k["id"]) {
                    costcenterVsManpower.push({
                        id: j["id"],
                        value: j["value"],
                        label: k["callCenterNumber"].toString(),
                    });
                }
            }
        }

        let locationVsRequestsUnfiltered = [];
        for (var l of response.data["requestVsLocation"]) {
            locationVsRequestsUnfiltered.push({
                id: l["locationId"],
                value: l["value"],
                label: l["locationId"].toString(),
            });
        }

        locationVsRequests = [];
        for (var m of locationVsRequestsUnfiltered) {
            for (var n of requestInfoList["location"]) {
                if (m["id"] === n["id"]) {
                    locationVsRequests.push({
                        id: m["id"],
                        value: m["value"],
                        label: n["locationName"].toString(),
                    });
                }
            }
        }

        let serviceTypeVsRequestsUnfiltered = [];
        for (var p of response.data["requestVsServiceType"]) {
            serviceTypeVsRequestsUnfiltered.push({
                id: p["serviceType"],
                value: p["value"],
                label: p["serviceType"].toString(),
            });
        }
        serviceTypeVsRequests = [];
        for (var q of serviceTypeVsRequestsUnfiltered) {
            for (var r of requestInfoList["serviceType"]) {
                if (q["id"] === r["id"]) {
                    serviceTypeVsRequests.push({
                        id: q["id"],
                        value: q["value"],
                        label: r["title"].toString(),
                    });
                }
            }
        }

        if (response.status === 200 || response.status === 201) {
            setIsLoading(false);
        }
    }

    // const [requestInfoList, setRequestInfoList] = useState(0);
    async function getRequestInfoList() {
        setIsLoading(true);
        let response = await axios.get(`${API_BASE}/Requests/RequestInfoList`, {
            headers: {
                Authorization: `Bearer ${savedToken}`,
            },
        });
        // setRequestInfoList(response.data);
        requestInfoList = response.data;
        getAnalytics();
    }

    const FileDownload = require("js-file-download");
    const [downloadingSalary, isDownloadingSalary] = useState(false);
    async function downloadMonthlySalary() {
        isDownloadingSalary(true);
        try {
            let response = await axios.get(
                `${API_BASE}/Laborers/MonthlySalary`,
                {
                    responseType: "blob",
                },
                {
                    headers: {
                        Authorization: `Bearer ${savedToken}`,
                    },
                }
            );
            FileDownload(response.data, "MonthlySalary.csv");
            message.success("Monthly Salary Downloaded Successfully!");
        } catch (e) {
            message.error("Failed to download monthly salary!");
        }
        isDownloadingSalary(true);
    }

    const [downloadingBill, isDownloadingBill] = useState(false);
    async function downloadMonthlyBill() {
        isDownloadingBill(true);
        try {
            let response = await axios.get(
                `${API_BASE}/Requests/MonthlyBill`,
                {
                    responseType: "blob",
                },
                {
                    headers: {
                        Authorization: `Bearer ${savedToken}`,
                    },
                }
            );
            FileDownload(response.data, "MonthlyBill.csv");
            message.success("Monthly Bill Downloaded Successfully!");
        } catch (e) {
            message.error("Failed to download monthly salary!");
        }
        isDownloadingBill(false);
    }

    useEffect(() => {
        getRequestInfoList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className="p-10 text-center">
            <div className="font-semibold text-lg pb-10"> Analytics </div>
            <div className="pb-12 flex gap-4 justify-center">
                {downloadingBill === true ? (
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
                        icon={<DownloadOutlined />}
                        onClick={(e) => {
                            downloadMonthlyBill();
                        }}
                    >
                        Download Monthly Bill
                    </Button>
                )}
                {downloadingSalary === true ? (
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
                        icon={<DownloadOutlined />}
                        onClick={(e) => {
                            downloadMonthlySalary();
                        }}
                    >
                        Download Monthly Salary
                    </Button>
                )}
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
                    {/* CARDS */}
                    <div className="flex justify-evenly pb-14">
                        <Statistic
                            title="Approved Users"
                            value={analytics["approvedUsers"]}
                            formatter={formatter}
                            className="border border-zinc-300 text-center px-14 py-5 shadow-lg hover:shadow-xl rounded-xl"
                        />
                        <Statistic
                            title="Man Power"
                            value={analytics["manPower"]}
                            precision={2}
                            formatter={formatter}
                            className="border border-zinc-300 text-center px-14 py-5 shadow-lg hover:shadow-xl rounded-xl"
                        />
                        <Statistic
                            title="Cost Centers"
                            value={analytics["costCenter"]}
                            precision={2}
                            formatter={formatter}
                            className="border border-zinc-300 text-center px-14 py-5 shadow-lg hover:shadow-xl rounded-xl"
                        />
                        <Statistic
                            title="Locations"
                            value={analytics["locations"]}
                            precision={2}
                            formatter={formatter}
                            className="border border-zinc-300 text-center px-14 py-5 shadow-lg hover:shadow-xl rounded-xl"
                        />
                        <Statistic
                            title="Service Types"
                            value={analytics["serviceType"]}
                            precision={2}
                            formatter={formatter}
                            className="border border-zinc-300 text-center px-14 py-5 shadow-lg hover:shadow-xl rounded-xl"
                        />
                    </div>

                    {/* DATA VIZ */}
                    <div className="grid grid-cols-2 gap-2 justify-left">
                        <div className="flex flex-col justify-center pb-10 w-fit pl-20">
                            <div className="text-center pb-5 text-base">
                                Location vs Requests
                            </div>
                            <LineChart
                                xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                                series={[
                                    {
                                        data: [2, 5.5, 2, 8.5, 1.5, 5],
                                    },
                                ]}
                                width={500}
                                height={300}
                                // colors={["yellow"]}
                            />
                        </div>

                        {/* COST CENTER vs MAN POWER */}
                        <div className="flex flex-col justify-center pb-10 w-fit pl-20">
                            <div className="text-center pb-5 text-base">
                                Cost Center vs Man Power
                            </div>
                            <PieChart
                                series={[
                                    {
                                        data: costcenterVsManpower,
                                        innerRadius: 30,
                                        outerRadius: 100,
                                        paddingAngle: 5,
                                        cornerRadius: 5,
                                        startAngle: 0,
                                        endAngle: 360,
                                    },
                                ]}
                                width={400}
                                height={200}
                            />
                        </div>

                        {/* SERVICE TYPE vs REQUESTS */}
                        <div className="flex flex-col justify-center pb-10 w-fit pl-32">
                            <div className="text-center pb-5 text-base">
                                Service Type vs Requests
                            </div>
                            <PieChart
                                series={[
                                    {
                                        data: serviceTypeVsRequests,
                                        innerRadius: 30,
                                        outerRadius: 100,
                                        paddingAngle: 5,
                                        cornerRadius: 5,
                                        startAngle: 0,
                                        endAngle: 360,
                                    },
                                ]}
                                width={400}
                                height={200}
                            />
                        </div>

                        {/* Location vs Requests */}
                        <div className="flex flex-col justify-center pb-10 w-fit">
                            <div className="text-center pb-5 text-base">
                                Location vs Requests
                            </div>
                            <BarChart
                                dataset={locationVsRequests}
                                margin={{
                                    left: 100,
                                    right: 40,
                                    top: 60,
                                    bottom: 60,
                                }}
                                yAxis={[
                                    { scaleType: "band", dataKey: "label" },
                                ]}
                                series={[
                                    {
                                        dataKey: "value",
                                        label: "Number of Requests",
                                    },
                                ]}
                                layout="horizontal"
                                grid={{ vertical: true }}
                                {...{
                                    width: 480,
                                    height: 400,
                                }}
                                // colors={["navy"]}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
