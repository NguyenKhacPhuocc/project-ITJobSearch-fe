"use client"

import ReactCountryFlag from "react-country-flag";
import Link from "next/link"
import { FaBars } from "react-icons/fa6"
import { HeaderMenu } from "./HeaderMenu"
import { useEffect, useRef, useState } from "react"
import { HeaderAccount } from "./HeaderAccount"
import { useParams } from 'next/navigation';
// import { Locale } from 'next-intl';
import { useTransition } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';


export const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const prevScrollY = useRef(0);
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();
  const [showLocaleMenu, setShowLocaleMenu] = useState(false);
  const localeDropdownRef = useRef<HTMLDivElement>(null);

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  }
  const currentLocale = params.locale as string;

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


  const handleLocaleChange = (nextLocale: string) => {
    // const nextLocale = event.target.value as Locale;
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- ignore TS here because we control routes
        { pathname, params },
        { locale: nextLocale }
      );
    });
  }

  // Đóng locale dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        localeDropdownRef.current &&
        !localeDropdownRef.current.contains(event.target as Node)
      ) {
        setShowLocaleMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


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
            <div className="flex justify-center items-center gap-[25px]">
              <HeaderAccount />

              {/* Locale Switcher */}
              <div className="relative" ref={localeDropdownRef}>
                <button
                  className="flex justify-center items-center bg-white text-xs py-1.5 px-2 rounded-full shadow-sm transition-all duration-200 ease-in-out w-[100px] hover:bg-gray-50 "
                  onClick={() => setShowLocaleMenu(!showLocaleMenu)}
                  disabled={isPending}
                  aria-label="Language selector"
                  aria-haspopup="true"
                  aria-expanded={showLocaleMenu}
                >
                  <span className="flex gap-1.5 items-center">
                    <ReactCountryFlag
                      countryCode={currentLocale === 'vi' ? 'VN' : 'US'}
                      svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      style={{
                        width: '18px',
                        height: '18px',
                      }}
                    />
                    <span className="truncate">
                      {currentLocale === 'vi' ? 'Tiếng Việt' : 'English'}
                    </span>
                  </span>
                </button>

                {/* Dropdown menu */}
                <div
                  className={`absolute right-0 mt-1 w-[100px] bg-white border border-gray-100 rounded-md shadow-lg z-10 text-xs overflow-hidden transition-all duration-200 ease-out ${showLocaleMenu ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-1 pointer-events-none'}`}
                  role="menu"
                >
                  <button
                    onClick={() => handleLocaleChange('vi')}
                    className="flex gap-1.5 items-center w-full text-left px-2.5 py-2 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                    role="menuitem"
                  >
                    <ReactCountryFlag
                      countryCode="VN"
                      svg
                      className="w-4.5 h-4.5"
                      aria-hidden="true"
                    />
                    <span className="truncate">Tiếng Việt</span>
                  </button>
                  <button
                    onClick={() => handleLocaleChange('en')}
                    className="flex gap-1.5 items-center w-full text-left px-2.5 py-2 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                    role="menuitem"
                  >
                    <ReactCountryFlag
                      countryCode="US"
                      svg
                      className="w-4.5 h-4.5"
                      aria-hidden="true"
                    />
                    <span className="truncate">English</span>
                  </button>
                </div>
                
              </div>
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