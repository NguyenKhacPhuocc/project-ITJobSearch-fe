/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import JustValidate from "just-validate";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";

export const ApplyForm = (props: {
  jobId: string
}) => {
  const t = useTranslations('JobDetailPage');
  const { jobId } = props;
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const validator = new JustValidate("#applyForm");

    validator
      .addField('#fullName', [
        {
          rule: 'required',
          errorMessage: t('fullName_required')
        },
        {
          rule: 'minLength',
          value: 5,
          errorMessage: t('fullName_minLength'),
        },
        {
          rule: 'maxLength',
          value: 50,
          errorMessage: t('fullName_maxLength'),
        },
      ])
      .addField('#email', [
        {
          rule: 'required',
          errorMessage: t('email_required'),
        },
        {
          rule: 'email',
          errorMessage: t('email_invalid'),
        },
      ])
      .addField('#phone', [
        {
          rule: 'required',
          errorMessage: t('phone_required')
        },
        {
          rule: 'customRegexp',
          value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
          errorMessage: t('phone_invalid')
        },
      ])
      .addField('#fileCV', [
        {
          rule: 'required',
          errorMessage: t('cv_required'),
        },
        {
          validator: (value: any, fields: any) => {
            const file = fields['#fileCV']?.elem?.files?.[0];
            if (!file) return false;
            return file.type === 'application/pdf';       // file dang .pdf
          },
          errorMessage: t('cv_pdf_only'),
        },
        {
          validator: (value: any, fields: any) => {
            const file = fields['#fileCV']?.elem?.files?.[0];
            if (!file) return false;
            return file.size <= 5 * 1024 * 1024; // 5MB  không vượt quá 5mb
          },
          errorMessage: t('cv_max_size'),
        },
      ])
      .onSuccess((event: any) => {
        const fullName = event.target.fullName.value;
        const email = event.target.email.value;
        const phone = event.target.phone.value;
        const fileCV = event.target.fileCV.files[0];

        // Tạo FormData
        const formData = new FormData();
        formData.append("jobId", jobId);
        formData.append("fullName", fullName);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("fileCV", fileCV);

        setIsSubmitting(true); // 🔄 Bắt đầu loading

        const promise = fetch(`${process.env.NEXT_PUBLIC_API_URL}/job/apply`, {
          method: "POST",
          body: formData
        })
          .then(async (res) => {
            const data = await res.json();
            if (data.code === "error") {
              throw new Error(data.message);
            }
            return data;
          })
          .finally(() => {
            event.target.reset();
            setIsSubmitting(false); // ✅ Kết thúc loading
          });
        toast.promise(promise, {
          loading: t('form.pending-submit-button'),
          success: t('apply_success'),
          error: (err) => t(`${err.message}`) || `Đã xảy ra lỗi!`,
        });
      })
    return () => {
      validator.destroy(); //  Quan trọng: Hủy validator khi unmount
    };
  }, [jobId, t]);


  return (
    <>
      <Toaster richColors position="top-right" />
      <div id="applyForm" className="border border-[#DEDEDE] rounded-[8px] p-[20px] mt-[20px]">
        <h2 className="font-[700] text-[20px] text-black mb-[20px]">
          {t('apply-now')}
        </h2>
        <form action="" className="">
          <div className="mb-[15px]">
            <label htmlFor="fullName" className="block font-[500] text-[14px] text-black mb-[5px]">
              {t('form.full-name')} *
            </label>
            <input type="text" name="fullName" id="fullName" className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black" />
          </div>
          <div className="mb-[15px]">
            <label htmlFor="email" className="block font-[500] text-[14px] text-black mb-[5px]">
              {t('form.email')} *
            </label>
            <input type="email" name="email" id="email" className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black" />
          </div>
          <div className="mb-[15px]">
            <label htmlFor="phone" className="block font-[500] text-[14px] text-black mb-[5px]">
              {t('form.phone')} *
            </label>
            <input type="text" name="phone" id="phone" className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black" />
          </div>
          <div className="mb-[15px]">
            <label htmlFor="fileCV" className="block font-[500] text-[14px] text-black mb-[5px]">
              {t('form.file-cv')} *
            </label>
            <input type="file" name="fileCV" id="fileCV" accept="application/pdf" className="" />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`relative w-[100%] h-[48px] rounded-[4px] bg-[#0088FF] font-[700] text-[16px] text-white hover:bg-[#0364b8] ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''} `}
          >
            <span className="relative z-10 justify-center flex items-center gap-2">
              {isSubmitting ? (
                <>
                  <div className="loader"></div>
                  {t('form.pending-submit-button')}
                </>
              ) : (
                <>
                  {t('form.submit-button')}
                </>
              )}
            </span>
          </button>
        </form>
      </div>
    </>
  )
}