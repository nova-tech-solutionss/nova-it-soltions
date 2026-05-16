'use client';
import React, {useEffect, useState, useRef} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSlack, faFacebook, faStripe, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faCalendar, faArrowUp, faPlus, faMinus, faCogs, faFileAlt, faPuzzlePiece,
  faChartLine, faUserShield, faUsers
 } from "@fortawesome/free-solid-svg-icons";


export default function FeatureSection() {
    
    const features = [
    {
      icon: faCogs,
      title: "Workflow Automation",
      description: "Automate repeatable tasks, approvals, and handoffs so teams can focus on higher-value public service and operations."
    },
    {
      icon: faChartLine,
      title: "Operational Dashboards",
      description: "Give leaders clearer visibility into programs, requests, staffing, compliance status, and service performance."
    },
    {
      icon: faUserShield,
      title: "Compliance-Ready Security",
      description: "Support role-based access, secure data handling, documentation, and alignment with regulated operating requirements."
    },
    {
      icon: faUsers,
      title: "Case & Request Tracking",
      description: "Track requests, cases, vendors, clients, and internal work from intake through completion with less manual follow-up."
    },
    {
      icon: faFileAlt,
      title: "Secure Document Handling",
      description: "Organize records, forms, approvals, and supporting documentation for teams with strict security and retention needs."
    },
    {
      icon: faPuzzlePiece,
      title: "Custom Toolkits by Mission",
      description: "Build practical modules for government, healthcare, legal, finance, and field operations without unnecessary clutter."
    },
  ];

  return (
    <>
        {/* Features Section */}
      <div id="features" className="container mx-auto text-center space-y-6 mt-20 ">
        {/** About Us pill */}
        <div className="inline-block px-4 py-1 border border-black rounded-full text-small text-black">
          Features
        </div>
        {/* Section Heading */}
        <h2 className="lg:text-6xl md:text-4xl text-3xl font-regular text-gray-900 max-w-3xl mx-auto">
        Practical Capabilities for Secure Operations
        </h2>
      </div>

      <div className="max-w-7xl mx-auto mt-10">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#4E7BFF]/10 hover:border-[#4E7BFF]/30 transition-all rounded-xl p-6 flex flex-col items-start"
            >
              <div className="bg-gray-100 p-4 rounded-md mb-4 shadow-md">
                <FontAwesomeIcon icon={feature.icon} className="text-blue-600 w-6 h-6 text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 mt-4">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )

}
