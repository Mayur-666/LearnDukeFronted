import React, { useEffect } from 'react';

const TermsAndConditionsPage = () => {
    
  useEffect(()=>{
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  },[])
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl text-center font-bold mb-4">Terms and Conditions</h1>
      <p className="text-lg leading-relaxed mb-4">
        Welcome to LearnDuke. These terms and conditions outline the rules and regulations for the use of LearnDuke's Website.
      </p>
      
      <h2 className="text-2xl font-bold mt-8 mb-4">1. Intellectual Property Rights</h2>
      <p className="text-lg leading-relaxed mb-4">
        Other than the content you own, under these Terms, LearnDuke and/or its licensors own all the intellectual property rights and materials contained in this Website.
      </p>
      
      <h2 className="text-2xl font-bold mt-8 mb-4">2. Restrictions</h2>
      <div className="text-lg leading-relaxed mb-4">
        You are specifically restricted from all of the following:
        <ul className="list-disc ml-8">
          <li>publishing any Website material in any other media.</li>
          <li>selling, sublicensing, and/or otherwise commercializing any Website material.</li>
          <li>publicly performing and/or showing any Website material.</li>
          <li>using this Website in any way that is or may be damaging to this Website.</li>
          <li>using this Website in any way that impacts user access to this Website.</li>
          <li>using this Website contrary to applicable laws and regulations, or in any way may cause harm to the Website, or to any person or business entity.</li>
          <li>engaging in any data mining, data harvesting, data extracting, or any other similar activity in relation to this Website.</li>
          <li>using this Website to engage in any advertising or marketing.</li>
        </ul>
      </div>
      
      <h2 className="text-2xl font-bold mt-8 mb-4">3. Your Content</h2>
      <p className="text-lg leading-relaxed mb-4">
        In these Website Standard Terms and Conditions, "Your Content" shall mean any audio, video text, images, or other material you choose to display on this Website. By displaying Your Content, you grant LearnDuke a non-exclusive, worldwide irrevocable, sub licensable license to use, reproduce, adapt, publish, translate, and distribute it in any and all media.
      </p>
      
      <h2 className="text-2xl font-bold mt-8 mb-4">4. No warranties</h2>
      <p className="text-lg leading-relaxed mb-4">
        This Website is provided "as is," with all faults, and LearnDuke makes no express or implied representations or warranties, of any kind related to this Website or the materials contained on this Website. Additionally, nothing contained on this Website shall be construed as providing consult or advice to you.
      </p>
      
      <h2 className="text-2xl font-bold mt-8 mb-4">5. Limitation of liability</h2>
      <p className="text-lg leading-relaxed mb-4">
        In no event shall LearnDuke, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this Website, whether such liability is under contract. LearnDuke, including its officers, directors, and employees, shall not be held liable for any indirect, consequential, or special liability arising out of or in any way related to your use of this Website.
      </p>
      
      <h2 className="text-2xl font-bold mt-8 mb-4">6. Indemnification</h2>
      <p className="text-lg leading-relaxed mb-4">
        You hereby indemnify to the fullest extent LearnDuke from and against any and/or all liabilities, costs, demands, causes of action, damages, and expenses arising in any way related to your breach of any of the provisions of these Terms.
      </p>
      
      <h2 className="text-2xl font-bold mt-8 mb-4">7. Severability</h2>
      <p className="text-lg leading-relaxed mb-4">
        If any provision of these Terms is found to be invalid under any applicable law, such provisions shall be deleted without affecting the remaining provisions herein.
      </p>
      
      <h2 className="text-2xl font-bold mt-8 mb-4">8. Variation of Terms</h2>
      <p className="text-lg leading-relaxed mb-4">
        LearnDuke is permitted to revise these Terms at any time as it sees fit, and by using this Website you are expected to review these Terms on a regular basis.
      </p>
      
      <h2 className="text-2xl font-bold mt-8 mb-4">9. Governing Law & Jurisdiction</h2>
      <p className="text-lg leading-relaxed mb-4">
        These Terms will be governed by and interpreted in accordance with the laws of the State of Orissa, and you submit to the non-exclusive jurisdiction of the state and federal courts located in Orissa for the resolution of any disputes.
      </p>
    </div>
  );
}

export default TermsAndConditionsPage;
