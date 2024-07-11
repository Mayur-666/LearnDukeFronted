import React from "react";
import {Link} from "react-router-dom" 

const PaymentFailure = () => {
  return (
    <div
      style={{
        height: "80dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h1 className="text-3xl m-4 font-semibold"> Order Unsuccessful</h1>
      <p className="mb-3">The payment was not successful. </p>
      <div>
      <Link to={"/"}>
      <button className="border-2 mx-1 p-4 rounded-xl border-black">Go to Home</button>
      </Link>
      <Link to="/subscription">
      <button className="border-2 mx-1 p-4 rounded-xl border-black">Retry Payment</button>
      </Link>
      </div>
    </div>
  );
};

export default PaymentFailure;
