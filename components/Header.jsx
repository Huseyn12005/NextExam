"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import LogoBlack from "@/public/Logo_black.svg";
import LogoWhite from "@/public/Logo_white.svg";
import DefaultProfile from "@/public/Profile.svg";
import { useSearchStore } from "@/stores/searchStorage";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const dropdownRef = useRef(null);
  const { setSearch } = useSearchStore();

  useEffect(() => {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    };

    const authToken = getCookie("sb-yfskwgozkoqeoqdiivve-auth-token");
    setIsLoggedIn(!!authToken);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => setInputValue(e.target.value);
  const handleSearchSubmit = () => setSearch(inputValue);
  const handleKeyDown = (e) => e.key === "Enter" && handleSearchSubmit();

  const handleLogout = () => {
    document.cookie =
      "sb-yfskwgozkoqeoqdiivve-auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
    window.location.href = "/sign-in";
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/">
            <span className="sr-only">MetaBlog</span>
            <div className="hidden dark:block">
              <Image src={LogoWhite} alt="MetaBlog" width={120} height={40} />
            </div>
            <div className="block dark:hidden">
              <Image src={LogoBlack} alt="MetaBlog" width={120} height={40} />
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {[
            { label: "Home", href: "/" },
            {
              label: "Write a Blog",
              href: isLoggedIn ? "/blogs/add" : "/sign-in",
            },
            {
              label: "My Blogs",
              href: isLoggedIn ? "/profile" : "/sign-in",
            },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="#contact"
            scroll={false}
            onClick={(e) => {
              if (window.location.pathname === "/") {
                e.preventDefault();
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
          >
            Contact
          </Link>
        </nav>

        {/* Right-side Controls */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative w-36 sm:w-48">
            <input
              type="text"
              placeholder="Search..."
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="w-full pl-4 pr-10 py-2 text-sm rounded-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <MagnifyingGlassIcon
              className="absolute right-3 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400 cursor-pointer"
              onClick={handleSearchSubmit}
            />
          </div>

          <ThemeToggle />

          {/* Profile or Sign In */}
          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="focus:outline-none"
              >
                <Image
                  src={DefaultProfile}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="rounded-full object-cover cursor-pointer"
                />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md z-50">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/sign-in"
              className="bg-black dark:bg-gray-700 text-white text-sm px-4 py-2 rounded-md hover:bg-gray-800 dark:hover:bg-gray-900 transition"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
