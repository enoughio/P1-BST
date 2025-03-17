'use client';

import React, { useState } from "react";
import Testimonials from "@/components/ui/Testimonials";
import FAQ from "@/components/ui/member/FAQ";
import MemberHeader from "@/components/ui/member/MemberHeader";
import MembershipBenefits from "@/components/ui/member/Benifits";
import EnquiryForm from "@/components/ui/About/InquryForm";

const MembershipApplication = () => {


  return (
    <section className="w-full">
     
      <MemberHeader />
      {/* <PathwaysSection /> */}
      <MembershipBenefits />
      <Testimonials />
      <EnquiryForm />
      <FAQ  />

    </section>
  );
};

export default MembershipApplication;





