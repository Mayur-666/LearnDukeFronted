import React, { useEffect } from 'react';

const PrivacyPolicy = () => {

  useEffect(()=>{
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  },[])

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Privacy Policy</h1>
      <p className="text-lg text-justify mb-4">
        Welcome to LearnDuke. Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, including forms, mobile website, or mobile application. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
      </p>
      
      <h2 className="text-2xl font-bold mt-8 mb-4">1. Information We Collect</h2>
      <div className="text-lg text-justify leading-relaxed mb-4">
        We may collect information about you in a variety of ways. The information we may collect on the Site includes:
      </div>
      <div>

        <ul className="list-disc ml-8">
          <li>Personal Data</li>
          <li>Derivative Data</li>
          <li>Third-Party Data</li>
        </ul>
      </div>
      
      <h2 className="text-2xl font-bold mt-8 mb-4">2. Use of Information</h2>
      <div className="text-lg leading-relaxed mb-4">
        Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
        <ul className="list-disc ml-8">
          <li>Administer sweepstakes and promotions.</li>
          <li>Compile anonymous statistical data and analysis for use internally.</li>
          <li>Create and manage your account.</li>
          <li>Detect and prevent fraud.</li>
          <li>Deliver targeted advertising, newsletters, and other information regarding promotions and the site to you.</li>
        </ul>
      </div>
      
      <h2 className="text-2xl font-bold mt-8 mb-4">3. Disclosure of Information</h2>
      <p className="text-lg leading-relaxed mb-4">
        We may disclose your information to our administratives as described in this Privacy Policy.
      </p>
      
      <h2 className="text-2xl font-bold mt-8 mb-4">4. Security of Information</h2>
      <p className="text-lg leading-relaxed mb-4">
        We use administrative, technical, and physical security measures to help protect your personal information.
      </p>
      
      <h2 className="text-2xl font-bold mt-8 mb-4">5. Changes to This Privacy Policy</h2>
      <p className="text-lg leading-relaxed mb-4">
        We may update this Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons.
      </p>
      
      <h2 className="text-2xl font-bold mt-8 mb-4">6. Contact Us</h2>
      <p className="text-lg leading-relaxed mb-4">
        If you have questions or comments about this Privacy Policy, please contact us at
        LearnDuke
        <br />
        Email: <span className='font-semibold'>
             ycyclasscom@gmail.com.
            </span>
      </p>
    </div>
  );
}

export default PrivacyPolicy;
