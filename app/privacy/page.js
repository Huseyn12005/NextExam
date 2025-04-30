"use client";
import React from "react";
import { useEffect, useState } from "react";
import Loading from "@/components/loading";


const PrivacyPolicy = () => {
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
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4 text-sm italic">Effective: April 30, 2025</p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Account Information:</strong> Email and user ID via Supabase authentication.</li>
          <li><strong>Content:</strong> Blog posts, categories, and thumbnails you create.</li>
          <li><strong>Usage Data:</strong> Pages visited, search inputs, and interactions.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">2. How We Use Your Data</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>To authenticate users and personalize your profile dashboard.</li>
          <li>To display and manage your blog content.</li>
          <li>To enhance user experience based on behavior.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">3. Data Sharing</h2>
        <p>
          We do <strong>not share</strong> your data with third parties except:
        </p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>When legally required (e.g., law enforcement).</li>
          <li>To trusted infrastructure services (e.g., Supabase, hosting providers).</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">4. Data Security</h2>
        <p>
          We use modern security practices and rely on Supabase’s secure infrastructure to protect your data.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">5. Your Rights</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>You can access, modify, or delete your account data at any time.</li>
          <li>To delete your account, contact support or use the app’s interface.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">6. Cookies</h2>
        <p>
          This app may use cookies or local storage to maintain session data and preferences.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">7. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy. You’ll be notified via the app or email if major changes occur.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">8. Contact</h2>
        <p>
          For questions about this policy, please contact the app administrator.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
