import React, { useEffect } from 'react';

const CancellationAndRefundPolicyPage = () => {
  
  useEffect(()=>{
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  },[])
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl text-center font-bold mb-4">Cancellation and Refund Policy</h1>
      <p className="text-lg leading-relaxed mb-4">
        At LearnDuke, we strive to provide our customers with high-quality services and a seamless experience. However, we understand that there may be circumstances where you may need to cancel your subscription or request a refund. This policy outlines the conditions under which cancellations and refunds will be considered.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">1. Subscription Cancellations</h2>
      <p className="text-lg leading-relaxed mb-4">
        You may cancel your subscription at any time by contacting our customer support team. Please note that subscription cancellations will take effect at the end of your current billing cycle, and you will continue to have access to the service until that time. No partial refunds will be provided for the remaining days of the billing cycle.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">2. Refund Eligibility</h2>
      <div className="text-lg leading-relaxed mb-4">
        Refunds are granted under the following conditions:
        <ul className="list-disc ml-8">
          <li>If you experience technical issues that we are unable to resolve within a reasonable time frame.</li>
          <li>If you accidentally purchased a subscription and request a refund within 24 hours of the purchase.</li>
          <li>If the service provided does not match the description or fails to meet the expectations as outlined in the terms of service.</li>
        </ul>
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">3. Non-refundable Situations</h2>
      <div className="text-lg leading-relaxed mb-4">
        Refunds will not be issued in the following situations:
        <ul className="list-disc ml-8">
          <li>Failure to use the service.</li>
          <li>Dissatisfaction with the service after the initial 24-hour period.</li>
          <li>Violation of our terms of service.</li>
          <li>Requests made outside of the specified refund eligibility conditions.</li>
        </ul>
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">4. Refund Process</h2>
      <p className="text-lg leading-relaxed mb-4">
        To request a refund, please contact our customer support team at <span className='font-semibold'>
             ycyclasscom@gmail.com.
            </span> with your account details and the reason for your refund request. Our team will review your request and notify you of the approval or rejection of your refund within 7 business days.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">5. Chargebacks</h2>
      <p className="text-lg leading-relaxed mb-4">
        Initiating a chargeback without contacting our support team first is considered a violation of this policy. If you initiate a chargeback, we reserve the right to suspend your account and take legal action if necessary.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">6. Contact Us</h2>
      <p className="text-lg leading-relaxed mb-4">
        If you have any questions or concerns about our cancellation and refund policy, please contact us at
        LearnDuke
        <br />
        Email: <span className='font-semibold'>
             ycyclasscom@gmail.com.
            </span>
      </p>
    </div>
  );
}

export default CancellationAndRefundPolicyPage;
