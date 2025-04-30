"use client";
import React from "react";
import { useEffect, useState } from "react";
import Loading from "@/components/loading";

const CookiePolicy = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getCategories = async () => {
            setLoading(false);

        };
    
        getCategories();
      }, []);

      if (loading) return <Loading type="gif" />;
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-6">Cookie Policy</h1>
      <p className="mb-4 text-sm italic">Effective: April 30, 2025</p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">1. What Are Cookies?</h2>
        <p>
          Cookies are small text files stored on your device when you visit a website. They help the site remember your preferences and improve your experience.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">2. How We Use Cookies</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Authentication:</strong> To remember that you're logged in via Supabase.</li>
          <li><strong>Preferences:</strong> To store dark mode settings and UI choices.</li>
          <li><strong>Analytics:</strong> To monitor how users interact with the app and improve it.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">3. Third-Party Cookies</h2>
        <p>
          We may use third-party services (e.g., Supabase, analytics tools) that place their own cookies for authentication or analytics.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">4. Managing Cookies</h2>
        <p>
          You can control or delete cookies through your browser settings. Disabling cookies may affect the app’s functionality.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">5. Changes to This Policy</h2>
        <p>
          We may update this Cookie Policy occasionally. Any changes will be posted here with the updated date.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">6. Contact</h2>
        <p>
          If you have questions about how we use cookies, contact the app administrator.
        </p>
      </section>
    </div>
  );
};

export default CookiePolicy;
