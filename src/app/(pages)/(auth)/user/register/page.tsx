import { Metadata } from "next"
import { FormRegister } from "./FormRegister"

export const metadata: Metadata = {
  title: "Đăng ký (Ứng viên)",
  description: "Trang đăng ký tài khoản cho ứng viên (người tìm kiếm việc làm)",
}

export default function UserRegisterPage() {
  return (
    <>
      <div className="py-[60px] pt-[120px]">
        <div className="container mx-auto px-[16px]">
          <div className="border border-[#DEDEDE] rounded-[8px] py-[50px] px-[20px] max-w-[602px] mx-auto">
            <h1 className="font-[700] text-[20px] text-black text-center mb-[20px]">
              Đăng ký (Ứng viên)
            </h1>
            <FormRegister />
          </div>
        </div>
      </div>
    </>
  )
}