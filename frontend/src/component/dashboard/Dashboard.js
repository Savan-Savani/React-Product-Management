import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import ComponentToPrint from "./ComponentToPrint.js"

const Dashboard = () => {
    let componentRef = useRef();

    return (
        <>
            <div>
                {/* button to trigger printing of target component */}
                {/* <ReactToPrint
                    trigger={() => <button>Print this out!</button>}
                    content={() => componentRef}
                />
                <div style={{ display: "none" }}>

                    <ComponentToPrint ref={(el) => (componentRef = el)} />

                </div> */}
                {/* component to be printed */}
            </div>
        </>
    );
}
export default Dashboard