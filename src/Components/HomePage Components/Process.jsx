import React from "react";
import { Section, SectionHeading, ProcessTimeline } from "../common";

const Process = () => {
  return (
    <Section>
      <SectionHeading
        eyebrow="How we work"
        title="A proven process,"
        highlight="from idea to impact"
        subtitle="A clear, collaborative workflow that keeps your project on track and you in the loop every step of the way."
        mb={{ base: 10, md: 14 }}
      />
      <ProcessTimeline />
    </Section>
  );
};

export default Process;
