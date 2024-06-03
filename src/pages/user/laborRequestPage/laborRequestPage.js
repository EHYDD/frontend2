/* eslint-disable no-unused-vars */
import { useState } from "react";

import { Steps, Button } from "antd";
import { Col, InputNumber, Row, Slider } from "antd";

import { DatePicker } from "antd";
const { RangePicker } = DatePicker;

export default function LaborRequestPage() {
    const [current, setCurrent] = useState(0);
    const [current2, setCurrent2] = useState(0);
    const [loadings, setLoadings] = useState([]);
    const [available, setAvailability] = useState(false);

    const enterLoading = (index) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });
        setTimeout(() => {
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[index] = false;
                setAvailability(!available);
                return newLoadings;
            });
        }, 2000);
    };

    const onChangeSteps = (value) => {
        console.log("onChange:", value);
        setCurrent(value);
    };
    const onChangeSteps2 = (value) => {
        console.log("onChange:", value);
        setCurrent2(value);
    };

    const [inputValue, setInputValue] = useState(1);
    const onChange = (newValue) => {
        setInputValue(newValue);
    };

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

                <Steps
                    current={current}
                    onChange={onChangeSteps}
                    direction="vertical"
                    items={[
                        {
                            title: (
                                <div className="font-semibold text-base">
                                    Step 1
                                </div>
                            ),
                            description: (
                                <div className="py-5">
                                    <div className="pt-2 pb-2 pl-2 text-base font-semibold">
                                        Select Man Power
                                    </div>
                                    <Row>
                                        <Col span={20}>
                                            <Slider
                                                min={1}
                                                max={100}
                                                onChange={onChange}
                                                style={{
                                                    marginLeft: "10px",
                                                }}
                                                value={
                                                    typeof inputValue ===
                                                    "number"
                                                        ? inputValue
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
                                                value={inputValue}
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
                                    Step 2
                                </div>
                            ),
                            description: (
                                <div className="py-5">
                                    <div className="pt-2 pb-2 pl-2 text-base font-semibold">
                                        Select Date Range
                                    </div>
                                    <RangePicker showTime />
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
                                    {/* <div className="pt-2 pb-2 pl-2 text-base font-semibold"> Check Availability </div> */}
                                    {available === true ? (
                                        <div>
                                            Labor and Schedule is Available!
                                        </div>
                                    ) : (
                                        <Button
                                            type="primary"
                                            loading={loadings[0]}
                                            onClick={() => enterLoading(0)}
                                        >
                                            Check Availability
                                        </Button>
                                    )}
                                </div>
                            ),
                        },
                    ]}
                />

                {available === true ? (
                    <Steps
                        current={current2}
                        onChange={onChangeSteps2}
                        direction="vertical"
                        items={[
                            {
                                title: (
                                    <div className="font-semibold text-base">
                                        Step 4
                                    </div>
                                ),
                                description: (
                                    <div className="py-5">
                                        <div className="pt-2 pb-2 pl-2 text-base font-semibold">
                                            Select Location
                                        </div>
                                        <select className="select select-bordered w-full max-w-xs bg-white text-base">
                                            <option disabled selected>
                                                Pick location
                                            </option>
                                            <option> Location 1 </option>
                                            <option> Location 2 </option>
                                            <option> Location 3 </option>
                                            <option> Location 4 </option>
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
                                            Select Service Type
                                        </div>
                                        <select className="select select-bordered w-full max-w-xs bg-white text-base">
                                            <option disabled selected>
                                                Service Type
                                            </option>
                                            <option> Labor </option>
                                            <option> Cleaning </option>
                                            <option> More Service </option>
                                            <option> More Slavery </option>
                                        </select>
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
                                        <Button
                                            type="primary"
                                            loading={loadings[0]}
                                            onClick={() => enterLoading(0)}
                                        >
                                            Request Labor
                                        </Button>
                                    </div>
                                ),
                            },
                        ]}
                    />
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    );
}
