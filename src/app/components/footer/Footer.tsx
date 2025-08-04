/* eslint-disable @next/next/no-img-element */
import { useTranslations } from "next-intl";
import { FaFacebookF, FaLinkedinIn, FaGithub } from "react-icons/fa";

export const Footer = () => {

  const t = useTranslations('Footer');

  return (
    <footer className="bg-[linear-gradient(to_right,_#000000_0%,_#0D1B2A_60%,_#005E92_120%)] text-white pt-10 pb-6 relative overflow-hidden">
      <div className="absolute inset-0 z-[111]">
        <img
          src="/assets/images/card-bg.svg"
          alt=""
          className="absolute top-0 right-0 h-auto w-[40%] transform scale-x-[-1] pointer-events-none opacity-50"
        />
      </div>
      <div className="container mx-auto px-4 grid md:grid-cols-3 gap-10 text-center md:text-left relative z-[222]">
        {/* Logo + giới thiệu */}
        <div>
          <div className="text-3xl font-extrabold mb-2">ITJobSearch</div>
          <p className="text-[#ccc] text-sm leading-relaxed">
            {t('description')}
          </p>
        </div>

        {/* Liên kết nhanh */}
        <div className="">
          <h3 className="text-lg font-bold mb-3">{t('quick-links-title')}</h3>
          <ul className="space-y-2 text-sm text-[#ccc]">
            <li>
              <a href="#" className="hover:text-white transition">
                {t('quick-links.jobs')}
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                {t('quick-links.companies')}
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                {t('quick-links.about-us')}
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                {t('quick-links.contact')}
              </a>
            </li>
          </ul>
        </div>

        {/* Mạng xã hội */}
        <div className="">
          <h3 className="text-lg font-bold mb-3">{t('social-title')}</h3>
          <div className="flex justify-center md:justify-start gap-4">
            <a href="#" className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition">
              <FaFacebookF size={18} />
            </a>
            <a href="#" className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition">
              <FaLinkedinIn size={18} />
            </a>
            <a href="#" className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition">
              <FaGithub size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Đường line + bản quyền */}
      <div className="border-t border-white/10 mt-8 pt-4 text-center text-sm text-[#A6A6A6]">
        {t('copyright')} © {new Date().getFullYear()} ITJobSearch
      </div>
    </footer>
  );
};
