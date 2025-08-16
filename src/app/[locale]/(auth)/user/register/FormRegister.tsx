/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import JustValidate from "just-validate";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";


export const FormRegister = () => {
  const router = useRouter();
  const validatorRef = useRef<InstanceType<typeof JustValidate> | null>(null);
  const t = useTranslations('UserRegisterPage');

  useEffect(() => {
    if (validatorRef.current) return; // Ngăn không cho gắn nhiều lần
    const validator = new JustValidate("#registerForm");

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
      .addField('#password', [
        {
          rule: 'required',
          errorMessage: t('password_required'),
        },
        {
          validator: (value: string) => value.length >= 8,
          errorMessage: t('password_minLength'),
        },
        {
          validator: (value: string) => /[A-Z]/.test(value),
          errorMessage: t('password_uppercase'),
        },
        {
          validator: (value: string) => /[a-z]/.test(value),
          errorMessage: t('password_lowercase'),
        },
        {
          validator: (value: string) => /\d/.test(value),
          errorMessage: t('password_number'),
        },
        {
          validator: (value: string) => /[@$!%*?&]/.test(value),
          errorMessage: t('password_special'),
        },
      ])
      .onSuccess((event: any) => {
        const fullName = event.target.fullName.value;
        const email = event.target.email.value;
        const password = event.target.password.value;

        const dataFinal = {
          fullName: fullName,
          email: email,
          password: password
        };

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/register`, {
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
              router.push("/user/login");
            }
          })
      });
    validatorRef.current = validator; // Lưu lại để không bị tạo lại
  }, [router, t]);

  return (
    <>
      <form id="registerForm" action="" className="grid grid-cols-1 gap-y-[15px]">
        <div className="">
          <label htmlFor="fullName" className="block font-[500] text-[14px] text-black mb-[5px]">
            {t('name')}
            <span className="text-red-500 ml-[5px]">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            id="fullName"
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
            {t('email')}
            <span className="text-red-500 ml-[5px]">*</span>
          </label>
          <input
            type="password"
            name="password"
            id="password"
            // autoComplete="new-password"
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