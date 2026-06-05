import React from "react";
import { Section, SectionHeading, ProcessTimeline } from "../common";

const ProcessSection = () => {
  return (
    <Section>
      <SectionHeading
        eyebrow="Our process"
        title="How we craft"
        highlight="great products"
        subtitle="A clear, collaborative workflow that keeps your project on track from first call to long-term support."
        mb={{ base: 10, md: 14 }}
      />
      <ProcessTimeline />
    </Section>
  );
};

export default ProcessSection;
