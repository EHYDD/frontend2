import { Table } from "antd";
import Column from "antd/es/table/Column";

export default function AttendancePage() {
    return (
        <div className="p-10">
            <div className="font-semibold text-lg pb-2"> Attendance </div>
            <div className="pb-3 w-[50vw] text-base">
                This table is showing you your labor order history. This table
                allows you to filter and sort the information using various
                parameters, making it easy to locate specific orders based on
                criteria such as date, status, man power and more.
            </div>
            <div>
                {/* <Table dataSource={priorityRequests}>
                    <Column title="ID" dataIndex="id" key="id" />
                    <Column
                        title="Location Name"
                        dataIndex="locationName"
                        key="locationName"
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
                </Table> */}
            </div>
        </div>
    );
}
