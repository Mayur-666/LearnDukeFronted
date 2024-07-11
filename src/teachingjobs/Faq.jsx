import React, { useEffect } from "react";

export default function Faq() {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    }, [])
  return (
    <div className="w-full flex justify-center">
        
      <div className="w-full md:w-10/12 lg:w-6/12 flex flex-col justify-center ">
      <div className="text-center font-semibold text-6xl">FAQ</div>
        <div className="m-5">
          <div className="font-semibold  tracking-wider leading-relaxed">
            1. What is this platform about?
          </div>
          <div
            style={{ color: "#404040" }}
            className="tracking-wider leading-relaxed font-light"
          >
            We are a dedicated hub for individuals in India seeking authentic
            remote job opportunities. Our platform hosts a vast array of
            work-from-home roles allowing you to find a job that perfectly
            aligns with your skills and interests.
          </div>
        </div>
        <div className="m-5">
          <div className="font-semibold  tracking-wider leading-relaxed">
            2. How do you ensure the authenticity of the job listings?
          </div>
          <div
            style={{ color: "#404040" }}
            className="tracking-wider leading-relaxed font-light"
          >
            We pride ourselves on the quality and authenticity of the job
            listings on our platform. We have a real-time system that scouts
            multiple sources for job opportunities before they become visible to
            the general public, allowing us to vet each job listing. Moreover,
            we only allow companies to post job vacancies directly, prohibiting
            agencies from posting, to ensure that only genuine and top remote
            jobs are listed.
          </div>
        </div>
        <div className="m-5">
          <div className="font-semibold  tracking-wider leading-relaxed">
            3. How can I apply for a job through this platform?
          </div>
          <div
            style={{ color: "#404040" }}
            className="tracking-wider leading-relaxed font-light"
          >
            To apply for jobs on our platform, you would need to subscribe
            first. After completing the checkout process and subscribing, you
            can browse through our high-quality remote job listings and apply
            directly to employers for the jobs that interest you.
          </div>
        </div>
        <div className="m-5">
          <div className="font-semibold  tracking-wider leading-relaxed">
            4. How frequently are new jobs posted?
          </div>
          <div
            style={{ color: "#404040" }}
            className="tracking-wider leading-relaxed font-light"
          >
            We add over 1000 new job listings every week. Our team constantly
            monitors various sources including social media, news sites, and top
            company career pages to discover and post new remote job
            opportunities.
          </div>
        </div>
        <div className="m-5">
          <div className="font-semibold  tracking-wider leading-relaxed">
            5. Can I get assistance if I face any issues?
          </div>
          <div
            style={{ color: "#404040" }}
            className="tracking-wider leading-relaxed font-light"
          >
            Absolutely! Our dedicated customer support team is always ready to
            help. You can reach out to us via Instagram, Facebook, or Email for
            any assistance you may need.
          </div>
        </div>
        <div className="m-5">
          <div className="font-semibold  tracking-wider leading-relaxed">
            6. What are the steps to access the job listings?
          </div>
          <div
            style={{ color: "#404040" }}
            className="tracking-wider leading-relaxed font-light"
          >
            - Step 1: Complete the checkout process and place your order to
            subscribe. - Step 2: Once your order is placed, you will receive an
            email containing a link to access the remote job vacancies. - Step
            3: Click on the link, browse through the job listings, apply for the
            positions that match your skills and interests, and get started on
            your remote work journey.
          </div>
        </div>
        <div className="m-5">
          <div className="font-semibold  tracking-wider leading-relaxed">
            7. What sets this platform apart from others?
          </div>
          <div
            style={{ color: "#404040" }}
            className="tracking-wider leading-relaxed font-light"
          >
            Our unique real-time job sourcing system, direct
            employer-application process, and a dedicated support team, together
            create a seamless job hunting experience. Our focus is on providing
            genuine, high-quality remote job opportunities, making us the
            ultimate hub for remote job seekers in India.
          </div>
        </div>
        <div className="m-5">
          <div className="font-semibold  tracking-wider leading-relaxed">
            8. How much does a subscription cost?
          </div>
          <div
            style={{ color: "#404040" }}
            className="tracking-wider leading-relaxed font-light"
          >
            A one-year membership to our platform is priced at Rs.999.
          </div>
        </div>
        <div className="m-5">
          <div className="font-semibold  tracking-wider leading-relaxed">
            9. How many job vacancies and companies are currently listed on the
            platform?
          </div>
          <div
            style={{ color: "#404040" }}
            className="tracking-wider leading-relaxed font-light"
          >
            Currently, we have over 5000 remote job vacancies listed with more
            than 2000 companies hiring through our platform.
          </div>
        </div>
        <div className="m-5">
          <div className="font-semibold  tracking-wider leading-relaxed">
            10. Are there a variety of companies hiring on the platform?
          </div>
          <div
            style={{ color: "#404040" }}
            className="tracking-wider leading-relaxed font-light"
          >
            Yes, with over 2000 companies hiring through our platform, there is
            a wide variety of employers from different industries looking for
            remote workers in various roles.
          </div>
        </div>
      </div>
    </div>
  );
}
