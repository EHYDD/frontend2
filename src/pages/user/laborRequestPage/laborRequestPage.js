/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";

import { LoadingOutlined } from "@ant-design/icons";

import {
    Steps,
    Button,
    Spin,
    Col,
    InputNumber,
    Row,
    Slider,
    DatePicker,
    message,
    Result,
    Popconfirm,
    Modal,
} from "antd";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { API_BASE } from "../../../config/config";
import moment from "moment";

export default function LaborRequestPage({ changePage }) {
    let savedToken = localStorage.getItem("token");
    let decodedUser = jwtDecode(savedToken);

    const [current, setCurrent] = useState(0);
    const [loadings, setLoadings] = useState([]);
    const [available, setAvailability] = useState(false);
    const [modal2Open, setModal2Open] = useState(false);

    const onChangeSteps = (value) => {
        setCurrent(value);
    };

    const [laborersAmount, setLaborersAmount] = useState(1);
    const onChange = (newValue) => {
        setLaborersAmount(newValue);
    };

    const [duration, setDuration] = useState(1);
    const onChangeDuration = (newValue) => {
        setDuration(newValue);
    };

    const [tryAgain, setTryAgain] = useState(false);
    const [selectedDateAndHours, setDateAndHours] = useState({});
    const [checkingAvailability, isCheckingAvailability] = useState(false);
    async function checkAvailability() {
        isCheckingAvailability(true);
        let chosenDate = document.getElementById("dateChosen").value;
        // TODO REMOVE
        chosenDate = moment(chosenDate).add(1, "months").format("YYYY-MM-DD");
        let secondDate = moment(chosenDate).add(1, "days").format("YYYY-MM-DD");

        setDateAndHours({
            firstDate: chosenDate,
            secondDate: secondDate,
        });

        let response = await axios.post(`${API_BASE}/DateChecker`, {
            firstDate: chosenDate,
            secondDate: secondDate,
            totalHours: duration,
        });

        if (response.status === 200 || response.status === 201) {
            if (response.data === "Yes it is available") {
                setAvailability(true);
            } else {
                setAvailability(false);
                setTryAgain(true);
            }
            // getLocations();
            // setAddModalOpen(false);
        }
        isCheckingAvailability(false);
    }

    const [requestInfoList, setRequestInfoList] = useState(0);
    const [isGettingRequestInfoList, setIsGettingRequestInfoList] =
        useState(true);
    async function getRequestInfoList() {
        setIsGettingRequestInfoList(true);
        let response = await axios.get(`${API_BASE}/Requests/RequestInfoList`, {
            headers: {
                Authorization: `Bearer ${savedToken}`,
            },
        });
        console.log(response.data);
        setRequestInfoList(response.data);
        setIsGettingRequestInfoList(false);
    }

    const [selectedLocation, selectLocation] = useState({});
    async function setLocation(event) {
        let selectedLocation = event.target.value;
        let selectedLocationObject = requestInfoList.location.find(
            (location) => location.locationName === selectedLocation
        );
        selectLocation(selectedLocationObject);
    }

    const [selectedService, selectService] = useState({});
    async function setService(event) {
        let selectedService = event.target.value;
        let selectedServiceObject = requestInfoList.serviceType.find(
            (service) => service.title === selectedService
        );
        selectService(selectedServiceObject);
    }

    const [selectedCostCenter, selectCostCenter] = useState({});
    async function setCostCenter(event) {
        let selectedCostCenter = event.target.value;
        let selectedCostCenterObject = requestInfoList.costCenters.find(
            (costCenters) => costCenters.callCenterNumber === selectedCostCenter
        );
        selectCostCenter(selectedCostCenterObject);
    }

    const [sendingRequest, isSendingRequest] = useState(false);
    const [orderSuccessful, isOrderSuccessful] = useState(false);
    async function requestLabor() {
        isSendingRequest(true);
        setModal2Open(false);

        let requestMessage = document.getElementById("message").value;
        let chosenDate = document.getElementById("dateChosen").value;
        console.log({
            costCenterId: selectedCostCenter.id,
            locationId: selectedLocation.id,
            firstDate: chosenDate,
            // secondDate: "",
            manPower: laborersAmount,
            requestedduration: duration,
            serviceTypeId: selectedService.id,
            serviceRequestMessage: requestMessage.toString().trim(),
        });
        try {
            let response = await axios.post(
                `${API_BASE}/temp/requests/create-request`,
                {
                    costCenterId: selectedCostCenter.id,
                    locationId: selectedLocation.id,
                    firstDate: chosenDate,
                    // secondDate: "",
                    manPower: laborersAmount,
                    requestedduration: duration,
                    serviceTypeId: selectedService.id,
                    serviceRequestMessage: requestMessage.toString().trim(),
                },
                {
                    headers: {
                        Authorization: `Bearer ${savedToken}`,
                    },
                }
            );

            if (response.status === 200 || response.status === 201) {
                message.success(`Request Successfully Sent!`);
                isOrderSuccessful(true);
            }
        } catch (e) {
            message.error(`Failed to Send Request!`);
        }
        isSendingRequest(false);
    }

    useEffect(() => {
        getRequestInfoList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="flex gap-4 h-screen w-4/5">
            <div className="p-8">
                <div className="pb-2 text-lg font-semibold">
                    Labor Request Form
                </div>

                <div className="pb-12 text-base">
                    Welcome to the Labor Request module of our airline's labor
                    management platform! This module is designed to facilitate
                    the seamless allocation of manpower for various tasks within
                    our airline operations. Whether you require additional
                    support for cleaning services, ground labor, or other tasks,
                    this module empowers employees to submit requests for
                    manpower to specific locations and tasks.
                    <br /> Through this streamlined process, employees can
                    specify the duration and nature of the assistance needed,
                    ensuring efficient utilization of resources across different
                    departments. Supervisors can then review and approve these
                    requests, ensuring that staffing levels meet operational
                    demands while maintaining flexibility to adapt to changing
                    circumstances. Simply following the steps below:
                </div>
                {isGettingRequestInfoList === true ? (
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
                ) : orderSuccessful === true ? (
                    <Result
                        status="success"
                        title="Successfully Sent a Labor Request."
                        subTitle="Your request has reached the admins, please wait for a few minutes until your request is processed."
                        extra={[
                            <Button
                                type="primary"
                                key="console"
                                onClick={(e) => isOrderSuccessful(false)}
                            >
                                Order Again
                            </Button>,
                            <Button key="buy" onClick={(e) => changePage(1)}>
                                View Order History
                            </Button>,
                        ]}
                    />
                ) : (
                    <Steps
                        current={current}
                        direction="vertical"
                        onChange={onChangeSteps}
                        items={[
                            {
                                title: (
                                    <div className="font-semibold text-base">
                                        Step 1
                                    </div>
                                ),
                                description: (
                                    <div className="py-5">
                                        <div className="pt-2 pb-3 pl-2 text-base font-semibold">
                                            Select Date
                                        </div>
                                        <DatePicker id="dateChosen" />
                                    </div>
                                ),
                            },
                            {
                                title: (
                                    <div className="font-semibold text-base">
                                        Step 2
                                    </div>
                                ),
                                description: (
                                    <div className="py-5">
                                        <div className="pt-2 pb-2 pl-2 text-base font-semibold">
                                            Select Cost Center
                                        </div>
                                        <select
                                            className="select select-bordered w-full max-w-xs bg-white text-base"
                                            onChange={(e) => setCostCenter(e)}
                                        >
                                            <option disabled selected>
                                                Pick Cost Center
                                            </option>
                                            {requestInfoList["costCenters"].map(
                                                (value, index) => {
                                                    return (
                                                        <option>
                                                            {
                                                                value[
                                                                    "callCenterNumber"
                                                                ]
                                                            }
                                                        </option>
                                                    );
                                                }
                                            )}
                                        </select>
                                    </div>
                                ),
                            },
                            {
                                title: (
                                    <div className="font-semibold text-base">
                                        Step 3
                                    </div>
                                ),
                                description: (
                                    <div className="py-5">
                                        <div className="pt-2 pb-2 pl-2 text-base font-semibold">
                                            Select Location
                                        </div>
                                        <select
                                            className="select select-bordered w-full max-w-xs bg-white text-base"
                                            onChange={(e) => setLocation(e)}
                                        >
                                            <option disabled selected>
                                                Pick location
                                            </option>
                                            {requestInfoList["location"].map(
                                                (value, index) => {
                                                    return (
                                                        <option>
                                                            {
                                                                value[
                                                                    "locationName"
                                                                ]
                                                            }
                                                        </option>
                                                    );
                                                }
                                            )}
                                        </select>
                                    </div>
                                ),
                            },
                            {
                                title: (
                                    <div className="font-semibold text-base">
                                        Step 4
                                    </div>
                                ),

                                description: (
                                    <div className="py-5">
                                        <div className="pt-2 pb-2 pl-2 text-base font-semibold">
                                            Select Service Type
                                        </div>
                                        <select
                                            className="select select-bordered w-full max-w-xs bg-white text-base"
                                            onChange={(e) => setService(e)}
                                        >
                                            <option disabled selected>
                                                Service Type
                                            </option>
                                            {requestInfoList["serviceType"].map(
                                                (value, index) => {
                                                    return (
                                                        <option>
                                                            {value["title"]}
                                                        </option>
                                                    );
                                                }
                                            )}
                                        </select>
                                    </div>
                                ),
                            },
                            {
                                title: (
                                    <div className="font-semibold text-base">
                                        Step 5
                                    </div>
                                ),
                                description: (
                                    <div className="py-5">
                                        <div className="pt-2 pb-2 pl-2 text-base font-semibold">
                                            Select Amount Of Man Power
                                        </div>
                                        <Row>
                                            <Col span={10}>
                                                <Slider
                                                    min={1}
                                                    max={4}
                                                    onChange={onChange}
                                                    style={{
                                                        marginLeft: "10px",
                                                    }}
                                                    value={
                                                        typeof laborersAmount ===
                                                        "number"
                                                            ? laborersAmount
                                                            : 0
                                                    }
                                                />
                                            </Col>
                                            <Col span={4}>
                                                <InputNumber
                                                    min={1}
                                                    max={100}
                                                    style={{
                                                        margin: "0 5px",
                                                    }}
                                                    value={laborersAmount}
                                                    onChange={onChange}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                ),
                            },
                            {
                                title: (
                                    <div className="font-semibold text-base">
                                        Step 6
                                    </div>
                                ),
                                description: (
                                    <div className="py-5">
                                        <div className="pt-2 pb-2 pl-2 text-base font-semibold">
                                            Select Duration of Time
                                        </div>
                                        <Row>
                                            <Col span={16}>
                                                <Slider
                                                    min={1}
                                                    max={16}
                                                    onChange={onChangeDuration}
                                                    style={{
                                                        marginLeft: "10px",
                                                    }}
                                                    value={
                                                        typeof duration ===
                                                        "number"
                                                            ? duration
                                                            : 0
                                                    }
                                                />
                                            </Col>
                                            <Col span={4}>
                                                <InputNumber
                                                    min={1}
                                                    max={100}
                                                    style={{
                                                        margin: "0 5px",
                                                    }}
                                                    value={duration}
                                                    onChange={onChangeDuration}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                ),
                            },
                            {
                                title: (
                                    <div className="font-semibold text-base">
                                        Step 7
                                    </div>
                                ),
                                description: (
                                    <div className="py-5">
                                        <div className="pt-2 pb-2 pl-2 text-base font-semibold">
                                            Explain Your Request In Detail
                                        </div>
                                        <div className="pl-2 pt-2">
                                            <textarea
                                                id="message"
                                                className="bg-white text-black border rounded-lg outline-none px-4 py-2"
                                                placeholder="message..."
                                                rows={5}
                                                cols={90}
                                            ></textarea>
                                        </div>
                                    </div>
                                ),
                            },

                            {
                                title: (
                                    <div className="font-semibold text-base">
                                        Done!
                                    </div>
                                ),
                                description: (
                                    <div className="pt-5">
                                        {sendingRequest === true ? (
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
                                                onClick={() =>
                                                    setModal2Open(true)
                                                }
                                            >
                                                Request Labor
                                            </Button>
                                        )}
                                    </div>
                                ),
                            },
                        ]}
                    />
                )}
            </div>

            <Modal
                title={`Agree to Terms of Service`}
                centered
                open={modal2Open}
                onCancel={() => setModal2Open(false)}
                footer={(_, { OkBtn, CancelBtn }) => (
                    <div className="flex gap-3 justify-end">
                        <Button type="primary" onClick={() => requestLabor()}>
                            Request Labor
                        </Button>

                        <CancelBtn />
                        {/* <OkBtn /> */}
                    </div>
                )}
            >
                <p>
                    By requesting labor you're agreeing to the rules of use and
                    terms of services of Ethiopian Airlines. Proceed?
                </p>
            </Modal>
        </div>
    );
}
