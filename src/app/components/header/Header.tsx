"use client"

import Link from "next/link"
import { FaBars } from "react-icons/fa6"
import { HeaderMenu } from "./HeaderMenu"
import { useEffect, useRef, useState } from "react"
import { HeaderAccount } from "./HeaderAccount"
import { useParams } from 'next/navigation';
import { Locale } from 'next-intl';
import { ChangeEvent, useTransition } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';


export const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const prevScrollY = useRef(0);
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

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


  function onLocaleChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- ignore TS here because we control routes
        { pathname, params },
        { locale: nextLocale }
      );
    });
  }


  return (
    <>
      <header
        className={`bg-[linear-gradient(to_right,_#000000_0%,_#0D1B2A_60%,_#005E92_120%)] py-[10px] px-[15px] border-b border-[#656565] fixed w-full top-0 z-[999] transition-transform duration-700 ${hideHeader ? "-translate-y-full" : "translate-y-0"}`}
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
            <div className="flex justify-center items-center gap-[20px]">
              <HeaderAccount />

              {/* Locale Switcher */}

              <select
                className="bg-white text-[12px] border border-gray-300 py-[5px] px-[8px] rounded-full shadow-sm transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400"
                defaultValue={params.locale as string}
                disabled={isPending}
                onChange={onLocaleChange}
              >
                <option value="vi">🇻🇳 Tiếng việt</option>
                <option value="en">🇺🇸 English</option>
              </select>

            </div>

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