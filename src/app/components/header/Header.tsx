"use client"

import Link from "next/link"
import { FaBars } from "react-icons/fa6"
import { HeaderMenu } from "./HeaderMenu"
import { useEffect, useRef, useState } from "react"
import { HeaderAccount } from "./HeaderAccount"

export const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const prevScrollY = useRef(0);

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  }

  // Theo dõi hướng cuộn
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > prevScrollY.current && currentScrollY > 80) {
        // Cuộn xuống → ẩn header
        setHideHeader(true);
      } else {
        // Cuộn lên → hiện header
        setHideHeader(false);
      }

      prevScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`bg-[linear-gradient(to_right,_#000000cc_0%,_#0D1B2Acc_60%,_#005E9280_120%)] backdrop-blur-md py-[10px] px-[15px] border-b border-[#656565] fixed w-full top-0 z-[999] transition-transform duration-700 ${hideHeader ? "-translate-y-full" : "translate-y-0"}`}
      >
        <div className="container mx-auto">
          {/* Wrap */}
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="text-white font-[800] sm:text-[28px] text-[20px] lg:flex-none flex-1">
              ITJobSearch
            </Link>
            {/* Menu */}
            <HeaderMenu showMenu={showMenu} />
            {/* Account */}
            <HeaderAccount />
            {/* Button Menu Mobile */}
            <button
              onClick={handleShowMenu}
              className="text-white text-[20px] lg:hidden inline-block ml-[12px]"
            >
              <FaBars className="" />
            </button>
          </div>
        </div>
      </header>
    </>
  )
}