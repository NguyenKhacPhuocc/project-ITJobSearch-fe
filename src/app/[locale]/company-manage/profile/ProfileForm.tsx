/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useAuth } from "@/hooks/useAuth"
import JustValidate from "just-validate";
import { useCallback, useEffect, useRef, useState } from "react";
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { Toaster, toast } from 'sonner'
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useCities } from "@/hooks/useCities";
import { FaSpinner } from "react-icons/fa6";
import { TinyMCE } from "@/app/components/editor/TinyMCE";

// Đăng ký plugins
registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
);

export default function ProfileForm() {
  const { infoCompany } = useAuth();
  const [logos, setLogos] = useState<any[]>([]);
  const [isValid, setIsValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useTranslations('CompanyManageProfilePage');
  const params = useParams();
  const { cities, loading, error } = useCities();
  const editorRef = useRef(null);
  // Initialize form validation
  const initValidation = useCallback(() => {
    if (!infoCompany) return;

    const validator = new JustValidate("#ProfileForm");
    validator
      .addField("#companyName", [
        { rule: "required", errorMessage: t("company-name-required") },
        { rule: "maxLength", value: 200, errorMessage: t("company-name-max-length") },
      ])
      .addField("#email", [
        { rule: "required", errorMessage: t("company-email-required") },
        { rule: "email", errorMessage: t("company-email-invalid") },
      ])
      .addField("#city", [
        { rule: "required", errorMessage: t("city-required") },
      ])
      .onFail(() => setIsValid(false))
      .onSuccess(() => setIsValid(true));
  }, [infoCompany, t]);

  useEffect(() => {
    initValidation();
    if (infoCompany?.logo) {
      setLogos([
        {
          source: infoCompany.logo
        }
      ]);
    }
  }, [infoCompany, initValidation]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const companyName = event.target.companyName.value;
    const city = event.target.city.value;
    const address = event.target.address.value;
    const companyModel = event.target.companyModel.value;
    const companyEmployees = event.target.companyEmployees.value;
    const workingTime = event.target.workingTime.value;
    const workOvertime = event.target.workOvertime.value;
    const email = event.target.email.value;
    const phone = event.target.phone.value;
    // const description = event.target.description.value;
    let description = "";
    if (editorRef.current) {
      description = (editorRef.current as any).getContent();
    }
    if (isValid) {
      const formData = new FormData();
      formData.append("companyName", companyName);
      formData.append("city", city);
      formData.append("address", address);
      formData.append("companyModel", companyModel);
      formData.append("companyEmployees", companyEmployees);
      formData.append("workingTime", workingTime);
      formData.append("workOvertime", workOvertime);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("description", description);

      if (logos.length === 0) {
        formData.append("logo", ""); // gửi chuỗi rỗng báo xóa ảnh
      } else if (logos[0].file instanceof File) {
        formData.append("logo", logos[0].file); // gửi file ảnh
      }

      setIsSubmitting(true); // 🔄 Bắt đầu loading

      const promise = fetch(`${process.env.NEXT_PUBLIC_API_URL}/company/profile`, {
        method: "PATCH",
        body: formData,
        credentials: "include", // Gửi kèm cookie
      })
        .then(async (res) => {
          const data = await res.json();
          if (data.code === "error") {
            throw new Error(data.message);
          }
          return data;
        })
        .finally(() => {
          setIsSubmitting(false); // ✅ Kết thúc loading
        });
      toast.promise(promise, {
        loading: t('pending-update'),
        success: () => t('update-successfull'),
        error: (err) => err.message || `Đã xảy ra lỗi!`,
      });
    }
  }

  if (!infoCompany) return null;

  return (
    <>
      <Toaster position="top-right" richColors />
      {infoCompany && (
        <form id="ProfileForm" action="" onSubmit={handleSubmit} className="grid sm:grid-cols-2 grid-cols-1 gap-x-[20px] gap-y-[15px]">
          <div className="sm:col-span-2">
            <label htmlFor="companyName" className="block font-[500] text-[14px] text-black mb-[5px]">
              {t('company-name')} <span className="text-red-500 ml-[5px]">*</span>
            </label>
            <input
              type="text"
              name="companyName"
              id="companyName"
              defaultValue={infoCompany.companyName}
              className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[15px] font-[500] text-[14px] text-black"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block font-[500] text-[14px] text-black mb-[5px]">
              {t('company-logo')}
            </label>
            <FilePond
              id="logo"
              name="logo"
              allowMultiple={false}   // chỉ chọn 1 ảnh
              allowRemove={true}    // cho phép xóa ảnh
              labelIdle="+"
              acceptedFileTypes={["image/*"]} // Chỉ cho phép ảnh
              files={logos}
              onupdatefiles={setLogos}
              className={"cursor-pointer"}
            />
          </div>
          <div className="">
            <label htmlFor="city" className="block font-[500] text-[14px] text-black mb-[5px]">
              {t('company-city')} <span className="text-red-500 ml-[5px]">*</span>
            </label>
            <select
              name="city"
              id="city"
              defaultValue={infoCompany?.city || ""} // Giá trị mặc định từ infoCompany.city
              disabled={loading ? true : error ? true : false}
              aria-busy={loading} // tăng accessibility
              className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px]  px-[15px] font-[500] text-[14px] text-black"
            >
              <option value="">{t('select-city')}</option>
              {!loading && !error && cities.map((city: any) => (
                <option key={city._id} value={city._id}>
                  {params.locale === "vi" ? city.name.vi : city.name.en}
                </option>
              ))}
            </select>

            {loading && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <FaSpinner />
              </div>
            )}

            {error && (
              <p className="mt-1 text-xs text-red-500">{error}</p>
            )}
          </div>
          <div className="">
            <label htmlFor="address" className="block font-[500] text-[14px] text-black mb-[5px]">
              {t('company-address')}
            </label>
            <input
              type="text"
              name="address"
              id="address"
              defaultValue={infoCompany.address}
              className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[15px] font-[500] text-[14px] text-black"
            />
          </div>
          <div className="">
            <label htmlFor="companyModel" className="block font-[500] text-[14px] text-black mb-[5px]">
              {t('company-model')}
            </label>
            <input
              type="text"
              name="companyModel"
              id="companyModel"
              defaultValue={infoCompany.companyModel}
              className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[15px] font-[500] text-[14px] text-black"
            />
          </div>
          <div className="">
            <label htmlFor="companyEmployees" className="block font-[500] text-[14px] text-black mb-[5px]">
              {t('company-size')}
            </label>
            <input
              type="text"
              name="companyEmployees"
              id="companyEmployees"
              defaultValue={infoCompany.companyEmployees}
              className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[15px] font-[500] text-[14px] text-black"
            />
          </div>
          <div className="">
            <label htmlFor="workingTime" className="block font-[500] text-[14px] text-black mb-[5px]">
              {t('company-worktime')}
            </label>
            <input
              type="text"
              name="workingTime"
              id="workingTime"
              defaultValue={infoCompany.workingTime}
              className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[15px] font-[500] text-[14px] text-black"
            />
          </div>
          <div className="">
            <label htmlFor="workOvertime" className="block font-[500] text-[14px] text-black mb-[5px]">
              {t('company-worktime-ot')}
            </label>
            <input
              type="text"
              name="workOvertime"
              id="workOvertime"
              defaultValue={infoCompany.workOvertime}
              className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[15px] font-[500] text-[14px] text-black"
            />
          </div>
          <div className="">
            <label htmlFor="email" className="block font-[500] text-[14px] text-black mb-[5px]">
              {t('company-email')} <span className="text-red-500 ml-[5px]">*</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              defaultValue={infoCompany.email}
              className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[15px] font-[500] text-[14px] text-black"
            />
          </div>
          <div className="">
            <label htmlFor="phone" className="block font-[500] text-[14px] text-black mb-[5px]">
              {t('company-phone')}
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              defaultValue={infoCompany.phone}
              className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[15px] font-[500] text-[14px] text-black"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="description" className="block font-[500] text-[14px] text-black mb-[5px]">
              {t('company-detail-description')}
            </label>
            <TinyMCE editorRef = {editorRef} value={infoCompany.description} /> 
          </div>
          <div className="sm:col-span-2 text-center mt-[15px]">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`relative overflow-hidden h-[48px]  px-[25px] rounded-[8px] text-[15px] text-white inline-flex items-center justify-center shadow-md transition-transform duration-300 ease-in-out transform group ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg hover:scale-[1.03]'} `}
            >
              <span className="absolute inset-0 z-0 rounded-[8px] bg-gradient-to-r from-[#0F2027] via-[#005E92] to-[#0F2027] bg-[length:200%_100%] bg-left transition-all duration-300 ease-in-out group-hover:bg-right"></span>
              <span className="relative z-10 flex items-center gap-2">
                {isSubmitting ? (
                  <>
                    <div className="loader"></div>
                    {t('pending-update')}
                  </>
                ) : (
                  <>
                    {t('update')}
                  </>
                )}
              </span>
            </button>
          </div>
        </form>
      )}
    </>
  )
}