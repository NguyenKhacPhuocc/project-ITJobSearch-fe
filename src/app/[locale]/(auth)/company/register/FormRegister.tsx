"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import JustValidate from "just-validate";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export const FormRegister = () => {
  const router = useRouter();
  const validatorRef = useRef<InstanceType<typeof JustValidate> | null>(null);
  useEffect(() => {
    if (validatorRef.current) return; // Ngăn không cho gắn nhiều lần
    const validator = new JustValidate("#registerForm");

    validator
      .addField('#companyName', [
        {
          rule: 'required',
          errorMessage: 'Vui lòng nhập tên công ty!'
        },
        {
          rule: 'maxLength',
          value: 200,
          errorMessage: 'Tên công ty không được vượt quá 200 ký tự!',
        },
      ])
      .addField('#email', [
        {
          rule: 'required',
          errorMessage: 'Vui lòng nhập email của bạn!',
        },
        {
          rule: 'email',
          errorMessage: 'Email không đúng định dạng!',
        },
      ])
      .addField('#password', [
        {
          rule: 'required',
          errorMessage: 'Vui lòng nhập mật khẩu!',
        },
        {
          validator: (value: string) => value.length >= 8,
          errorMessage: 'Mật khẩu phải chứa ít nhất 8 ký tự!',
        },
        {
          validator: (value: string) => /[A-Z]/.test(value),
          errorMessage: 'Mật khẩu phải chứa ít nhất một chữ cái in hoa!',
        },
        {
          validator: (value: string) => /[a-z]/.test(value),
          errorMessage: 'Mật khẩu phải chứa ít nhất một chữ cái thường!',
        },
        {
          validator: (value: string) => /\d/.test(value),
          errorMessage: 'Mật khẩu phải chứa ít nhất một chữ số!',
        },
        {
          validator: (value: string) => /[@$!%*?&]/.test(value),
          errorMessage: 'Mật khẩu phải chứa ít nhất một ký tự đặc biệt!',
        },
      ])
      .onSuccess((event: any) => {
        const companyName = event.target.companyName.value;
        const email = event.target.email.value;
        const password = event.target.password.value;

        const dataFinal = {
          companyName: companyName,
          email: email,
          password: password
        };

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/company/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataFinal),
        })
          .then(res => res.json())
          .then(data => {
            if (data.code == "error") {
              alert(data.message);
            }

            if (data.code == "success") {
              router.push("/company/login");
            }
          })
      });
    validatorRef.current = validator; // Lưu lại để không bị tạo lại
  }, [router]);

  const t = useTranslations('CompanyFormRegister');

  return (
    <>
      <form id="registerForm" action="" className="grid grid-cols-1 gap-y-[15px]">
        <div className="">
          <label htmlFor="companyName" className="block font-[500] text-[14px] text-black mb-[5px]">
            {t('company-name')}
            <span className="text-red-500 ml-[5px]">*</span>
          </label>
          <input
            type="text"
            name="companyName"
            id="companyName"
            className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
          />
        </div>
        <div className="">
          <label htmlFor="email" className="block font-[500] text-[14px] text-black mb-[5px]">
            {t('email')}
            <span className="text-red-500 ml-[5px]">*</span>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
          />
        </div>
        <div className="">
          <label htmlFor="password" className="block font-[500] text-[14px] text-black mb-[5px]">
            {t('password')}
            <span className="text-red-500 ml-[5px]">*</span>
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
          />
        </div>
        <div className="">
          <button className="bg-[#0088FF] rounded-[4px] w-[100%] h-[48px] px-[20px] font-[700] text-[16px] text-white">
            {t('register-button')}
          </button>
        </div>
      </form>
    </>
  )
}