/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useAuth } from "@/hooks/useAuth"
import JustValidate from "just-validate";
import { useEffect, useState } from "react";
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { useRouter } from "next/navigation";

// Đăng ký plugins
registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
);

export const ProfileForm = () => {
  const router = useRouter();
  const { infoUser } = useAuth();
  const [avatars, setAvatars] = useState<any[]>([]);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (infoUser) {
      if (infoUser.avatar) {
        setAvatars([
          {
            source: infoUser.avatar
          }
        ]);
      }

      const validator = new JustValidate("#profileForm");

      validator
        .addField('#fullName', [
          {
            rule: 'required',
            errorMessage: 'Vui lòng nhập họ tên!'
          },
          {
            rule: 'minLength',
            value: 5,
            errorMessage: 'Họ tên phải có ít nhất 5 ký tự!',
          },
          {
            rule: 'maxLength',
            value: 50,
            errorMessage: 'Họ tên không được vượt quá 50 ký tự!',
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
        .onFail(() => {
          setIsValid(false);
        })
        .onSuccess(() => {
          setIsValid(true);
        });
    }
  }, [infoUser]);

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const fullName = event.target.fullName.value;
    const email = event.target.email.value;
    const phone = event.target.phone.value;

    if (isValid) {
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("phone", phone);

      // avatars = [] => người dùng đã xoá ảnh
      if (avatars.length === 0) {
        formData.append("avatar", ""); // gửi chuỗi rỗng báo xóa ảnh
      }
      // Chọn ảnh mới
      else if (avatars[0].file instanceof File) {
        formData.append("avatar", avatars[0].file); // gửi file ảnh
      }
      // Giữ nguyên ảnh thì KHÔNG gửi gì cả

      fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, {
        method: "PATCH",
        body: formData,
        credentials: "include", // Gửi kèm cookie
      })
        .then(res => res.json())
        .then(data => {
          if (data.code == "success") {
            router.push("/user-manage/profile");
            console.log("thanh cong");
          }
          if (data.code == "error") {
            console.log("F");
          }
        })
    }
  }


  return (
    <>
      {infoUser && (
        <form id="profileForm" action="" onSubmit={handleSubmit} className="grid sm:grid-cols-2 grid-cols-1 gap-x-[20px] gap-y-[15px]">
          <div className="sm:col-span-2">
            <label htmlFor="fullName" className="block font-[500] text-[14px] text-black mb-[5px]">
              Họ tên
              <span className="text-red-500 ml-[5px]">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              defaultValue={infoUser.fullName}
              className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="avatar" className="block font-[500] text-[14px] text-black mb-[5px]">
              Avatar
            </label>
            <FilePond
              name="avatar"
              allowMultiple={false}   // chỉ chọn 1 ảnh
              allowRemove={true}    // cho phép xóa ảnh
              labelIdle="+"
              acceptedFileTypes={["image/*"]} // Chỉ cho phép ảnh
              files={avatars}
              onupdatefiles={setAvatars}
              className={"cursor-pointer"}
            />
          </div>
          <div className="">
            <label htmlFor="email" className="block font-[500] text-[14px] text-black mb-[5px]">
              Email
              <span className="text-red-500 ml-[5px]">*</span>
            </label>
            <input
              type="email"
              name="email"
              id="email"
              defaultValue={infoUser.email}
              className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
            />
          </div>
          <div className="">
            <label htmlFor="phone" className="block font-[500] text-[14px] text-black mb-[5px]">
              Số điện thoại
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              defaultValue={infoUser.phone}
              className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
            />
          </div>
          <div className="sm:col-span-2 text-center mt-[15px]">
            <button
              className="relative overflow-hidden h-[48px] px-[25px] rounded-[8px] text-[15px] text-white inline-flex items-center justify-center shadow-md hover:shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-[1.03] group"
            >
              <span className="absolute inset-0 z-0 rounded-[8px] bg-gradient-to-r from-[#0F2027] via-[#005E92] to-[#0F2027] bg-[length:200%_100%] bg-left transition-all duration-500 ease-in-out group-hover:bg-right"></span>

              <span className="relative z-10">Cập nhật</span>
            </button>
          </div>
        </form>
      )}
    </>
  )
}