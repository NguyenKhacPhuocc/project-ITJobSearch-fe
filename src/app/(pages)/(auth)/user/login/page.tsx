import { Metadata } from "next"
import { LoginForm } from "./LoginForm"

export const metadata: Metadata = {
  title: "Đăng nhập (Ứng viên)",
  description: "Mô tả trang đăng nhập (Ứng viên)...",
}

export default function UserLoginPage() {
  return (
    <>
      <div className="py-[60px] pt-[120px]">
        <div className="container mx-auto px-[16px]">
          <div className="border border-[#DEDEDE] rounded-[8px] py-[50px] px-[20px] max-w-[602px] mx-auto">
            <h1 className="font-[700] text-[20px] text-black text-center mb-[20px]">
              Đăng nhập (Ứng viên)
            </h1>
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  )
}