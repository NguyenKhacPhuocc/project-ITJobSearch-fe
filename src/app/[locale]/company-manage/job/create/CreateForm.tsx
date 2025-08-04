/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { TinyMCE } from "@/app/components/editor/TinyMCE";
import JustValidate from "just-validate";
import { Toaster, toast } from 'sonner'
import { levelList, workingFormList } from "@/config/variable";

// Đăng ký plugins
registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
);

type Locale = "vi" | "en";

export const CreateForm = () => {
  const t = useTranslations('CompanyManageJobCreatePage');
  const [images, setImages] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const editorRef = useRef(null);
  const locale = useLocale() as Locale;

  // Initialize form validation
  const initValidation = useCallback(() => {
    const validator = new JustValidate("#createForm");
    validator
      .addField("#title", [
        { rule: "required", errorMessage: t("job-name-required") },
      ])
      .addField("#salaryMin", [
        { rule: "minNumber", value: 0, errorMessage: t("salary-valid") },
      ])
      .addField("#salaryMax", [
        { rule: "minNumber", value: 0, errorMessage: t("salary-valid") },
      ])
      .addField("#level", [
        { rule: "required", errorMessage: t("job-level-required") },
      ])
      .addField("#workingForm", [
        { rule: "required", errorMessage: t("working-form-required") },
      ])
      .onFail(() => setIsValid(false))
      .onSuccess(() => setIsValid(true));
  }, [t]);

  useEffect(() => {
    initValidation();
  }, [initValidation]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const title = event.target.title.value;
    const salaryMin = event.target.salaryMin.value;
    const salaryMax = event.target.salaryMax.value;
    const level = event.target.level.value;
    const workingForm = event.target.workingForm.value;
    const skills = event.target.skills.value;
    const expertise = event.target.expertise.value;
    let description = "";
    if (editorRef.current) {
      description = (editorRef.current as any).getContent();
    }

    if (isValid) {
      // Tạo FormData
      const formData = new FormData();
      formData.append("title", title);
      formData.append("salaryMin", salaryMin);
      formData.append("salaryMax", salaryMax);
      formData.append("level", level);
      formData.append("workingForm", workingForm);
      formData.append("skills", skills);
      formData.append("expertise", expertise);
      formData.append("description", description);
      // images
      if (images.length > 0) {
        for (const image of images) {
          formData.append("images", image.file);
        }
      }
      // End images

      setIsSubmitting(true); // 🔄 Bắt đầu loading

      const promise = fetch(`${process.env.NEXT_PUBLIC_API_URL}/company/job/create`, {
        method: "POST",
        body: formData,
        credentials: "include", // Gửi kèm cookie
      })
        .then(async (res) => {
          const data = await res.json();
          if (data.code === "error") {
            throw new Error(data.message);
          }
          event.target.reset();
          setImages([]);
          return data;
        })
        .finally(() => {
          setIsSubmitting(false); // ✅ Kết thúc loading
        });
      toast.promise(promise, {
        loading: t('pending-create'),
        success: t('create-successfull'),
        error: (err) => err.message || `Đã xảy ra lỗi!`,
      });
    }
  }

  return (
    <>
      <Toaster position="top-right" richColors />
      <form onSubmit={handleSubmit} id="createForm" action="" className="grid sm:grid-cols-2 grid-cols-1 gap-x-[20px] gap-y-[15px]">
        <div className="sm:col-span-2">
          <label htmlFor="title" className="block font-[500] text-[14px] text-black mb-[5px]">
            {t('job-title')}
            <span className="text-red-500 ml-[5px]">*</span>
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="w-[100%]   border border-[#DEDEDE] rounded-[4px] py-[14px]  px-[15px] font-[500] text-[14px] text-black"
          />
        </div>
        <div className="">
          <label htmlFor="salaryMin" className="block font-[500] text-[14px] text-black mb-[5px]">
            {t('salary-min')}
          </label>
          <input
            type="number"
            name="salaryMin"
            id="salaryMin"
            className="w-[100%]   border border-[#DEDEDE] rounded-[4px] py-[14px]  px-[15px] font-[500] text-[14px] text-black"
          />
        </div>
        <div className="">
          <label htmlFor="salaryMax" className="block font-[500] text-[14px] text-black mb-[5px]">
            {t('salary-max')}
          </label>
          <input
            type="number"
            name="salaryMax"
            id="salaryMax"
            className="w-[100%]   border border-[#DEDEDE] rounded-[4px] py-[14px]  px-[15px] font-[500] text-[14px] text-black"
          />
        </div>
        <div className="">
          <label htmlFor="level" className="block font-[500] text-[14px] text-black mb-[5px]">
            {t('level')}
            <span className="text-red-500 ml-[5px]">*</span>
          </label>
          <select
            name="level"
            id="level"
            className="w-[100%] border border-[#DEDEDE] rounded-[4px] py-[14px]  px-[15px] font-[500] text-[14px] text-black"
          >
            {levelList.map((item, index) => (
              <option key={index} value={item.value}>{item.label}</option>
            ))}
          </select>
        </div>
        <div className="">
          <label htmlFor="workingForm" className="block font-[500] text-[14px] text-black mb-[5px]">
            {t('working-form')}
            <span className="text-red-500 ml-[5px]">*</span>
          </label>
          <select
            name="workingForm"
            id="workingForm"
            className="w-[100%]  border border-[#DEDEDE] rounded-[4px] py-[14px]  px-[15px] font-[500] text-[14px] text-black"
          >
            {workingFormList.map((item, index) => (
              <option key={index} value={item.value}>{item.label[locale]}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="skills" className="block font-[500] text-[14px] text-black mb-[5px]">
            {t('skills')}
          </label>
          <input
            type="text"
            name="skills"
            id="skills"
            className="w-[100%]  border border-[#DEDEDE] rounded-[4px] py-[14px]  px-[15px] font-[500] text-[14px] text-black"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="expertise" className="block font-[500] text-[14px] text-black mb-[5px]">
            {t('expertise')}
          </label>
          <input
            type="text"
            name="expertise"
            id="expertise"
            className="w-[100%]  border border-[#DEDEDE] rounded-[4px] py-[14px]  px-[15px] font-[500] text-[14px] text-black"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block font-[500] text-[14px] text-black mb-[5px]">
            {t('images')}
          </label>
          <FilePond
            id="images"
            name="images"
            allowMultiple={true}   // cho phép chọn nhiều ảnh
            allowRemove={true}    // cho phép xóa ảnh
            labelIdle="+"
            acceptedFileTypes={["image/*"]} // Chỉ cho phép ảnh
            files={images}
            onupdatefiles={setImages}
            className={"cursor-pointer"}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="description" className="block font-[500] text-[14px] text-black mb-[5px]">
            {t('detail-description')}
          </label>
          <TinyMCE editorRef={editorRef} id="description" />
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
                  {t('pending-create')}
                </>
              ) : (
                <>
                  {t('create-button')}
                </>
              )}
            </span>
          </button>
        </div>
      </form>
    </>
  )
}