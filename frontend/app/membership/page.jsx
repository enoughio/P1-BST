'use client';

import React, { useState } from "react";
import Testimonials from "@/components/ui/Testimonials";
import FAQ from "@/components/ui/member/FAQ";
import MemberHeader from "@/components/ui/member/MemberHeader";
import MembershipBenefits from "@/components/ui/member/Benifits";

const MembershipApplication = () => {


  return (
    <section className="w-full    bg-gray-50">
     
      <MemberHeader />
      {/* <PathwaysSection /> */}
      <MembershipBenefits />
      <Testimonials />
      <FAQ  />

    </section>
  );
};

export default MembershipApplication;





