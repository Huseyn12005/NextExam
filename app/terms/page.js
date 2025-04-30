"use client";
import React from "react";
import { useEffect, useState } from "react";
import Loading from "@/components/loading";


const TermPage = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
            setLoading(false);

      }, []);

      if (loading) return <Loading type="gif" />;
    return (
        <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800 dark:text-gray-200">
          <h1 className="text-3xl font-bold mb-6">Terms of Use</h1>
          <p className="mb-4 text-sm italic">Effective: April 30, 2025</p>
    
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">1. License Grant</h2>
            <p className="mb-2">
              You are granted a <strong>limited, non-exclusive, non-transferable</strong> license to use, view,
              and modify this code for <strong>personal or internal business use only</strong>.
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>❌ You may not redistribute or resell this code or derivative works.</li>
              <li>❌ You may not claim authorship of the original structure or design.</li>
              <li>❌ You may not reuse major parts without proper attribution.</li>
            </ul>
          </section>
    
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">2. Ownership & Attribution</h2>
            <p>
              The original author retains all rights. You must retain attribution such as:
            </p>
            <blockquote className="border-l-4 border-blue-500 pl-4 my-3 italic">
              "Original layout and logic inspired by [Original Creator], with modifications."
            </blockquote>
          </section>
    
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">3. Prohibited Uses</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>No illegal or unethical use of the code.</li>
              <li>Do not impersonate or plagiarize the author.</li>
              <li>Do not use in competing products or platforms.</li>
            </ul>
          </section>
    
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">4. Disclaimer</h2>
            <p>
              This software is provided <strong>"as is"</strong> without any warranties. The author is not liable
              for any damages or issues arising from use.
            </p>
          </section>
    
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">5. Termination</h2>
            <p>
              Violating these terms may result in <strong>termination of rights</strong> to use this software.
            </p>
          </section>
    
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">6. Contact</h2>
            <p>
              For questions or permissions, please contact the original author.
            </p>
          </section>
        </div>
      );
  };
  
 export default TermPage;