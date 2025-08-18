/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type PopupCVProps = {
  isOpen: boolean;
  onClose: () => void;
  item?: any;
};

export default function PopupCV({
  isOpen,
  onClose,
  item,
}: PopupCVProps) {
  const t = useTranslations('CompanyManageCVDetailPage')

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-[1000]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose} // click overlay sẽ đóng
          />

          {/* Popup */}
          <motion.div
            className="fixed inset-0 z-[1001] flex items-center justify-center"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            onClick={onClose} // click ngoài đóng
          >
            <div
              className="bg-white w-[90%] lg:w-[85%] max-h-[90vh] rounded-2xl shadow-lg overflow-hidden py-[35px] px-[10px] relative"
              onClick={(e) => e.stopPropagation()} // chặn click trong popup
            >
              {/* Nút đóng */}
              <div className="flex justify-end">
                <button
                  onClick={onClose}
                  className="hover:font-[900] text-lg font-[500] absolute top-[5px] rounded-full bg-red-400 h-[30px] w-[30px] text-white"
                >
                  ✕
                </button>
              </div>

              <div className="mx-auto lg:px-[40px] flex flex-col lg:flex-row gap-[20px] ">
                {/* Job Info */}
                {(item) && (
                  <div className="lg:w-[40%] w-full overflow-hidden">
                    <div className="border border-[#DEDEDE] rounded-[8px] p-[20px] mb-[20px]">
                      <div className="flex flex-wrap items-center justify-between mb-[10px]">
                        <h2 className="font-[700] text-[20px] text-black">
                          {t("cv-information")}
                        </h2>
                      </div>

                      <hr className="py-[5px]" />

                      <div className="font-[400] text-[16px] text-black mb-[10px]">
                        {t("full-name")}
                        <span className="font-[700] ml-2 text-wrap">{item.fullName}</span>
                      </div>
                      <div className="font-[400] text-[16px] text-black mb-[10px]">
                        {t("email")}
                        <span className="font-[700] ml-2 text-wrap">{item.email}</span>
                      </div>
                      <div className="font-[400] text-[16px] text-black mb-[10px]">
                        {t("phone-number")}
                        <span className="font-[700] ml-2 text-wrap">{item.phone}</span>
                      </div>
                    </div>
                    <div className="border border-[#DEDEDE] rounded-[8px] p-[20px] ">
                      <h2 className="font-[700] text-[20px] text-black mb-[10px]">
                        {t("job-information")}
                      </h2>
                      <hr className="py-[5px]" />
                      <div className="font-[400] text-[16px] text-black mb-[10px]">
                        {t("job-title")}
                        <span className="font-[700] ml-2 text-wrap">
                          {item.jobName}
                        </span>
                      </div>
                      <div className="font-[400] text-[16px] text-black mb-[10px]">
                        {t("salary")}
                        <span className="font-[700] ml-2 text-wrap">
                          {item.jobSalaryMin.toLocaleString("vi-VN")}$ -{" "}
                          {item.jobSalaryMax.toLocaleString("vi-VN")}$
                        </span>
                      </div>
                      <div className="font-[400] text-[16px] text-black mb-[10px]">
                        {t("level")}
                        <span className="font-[700] ml-2 text-wrap">{item.level}</span>
                      </div>
                      <div className="font-[400] text-[16px] text-black mb-[10px]">
                        {t("work-type")}
                        <span className="font-[700] ml-2 text-wrap">
                          {item.workingForm}
                        </span>
                      </div>
                      <div className="font-[400] text-[16px] text-black mb-[10px]">
                        {t("technology")}
                        <span className="font-[700] text-[16px] text-wrap">
                          {item.jobSkills?.join(", ")}
                        </span>
                      </div>
                      <Link
                        href={`/job/detail/${item.jobSlug}`}
                        className="font-[400] text-[14px] text-[#0088FF] underline"
                      >
                        {t("view-job-details")}
                      </Link>
                    </div>
                  </div>
                )}

                {/* CV Info */}
                {item && (
                  <div className="lg:w-[60%] w-auto">
                    <div className="border border-[#DEDEDE] rounded-[8px] p-[15px] h-[85vh] overflow-y-auto relative pb-[20px]" >
                      <div className="font-[700] text-[16px] text-black  sticky top-0 bg-white">
                        {t("cv-file")}
                      </div>
                      <div className="bg-[#D9D9D9] h-full">
                        <iframe src={item.fileCV} className="h-full w-full " />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence >
  );
}
