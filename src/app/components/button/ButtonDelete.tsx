/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTranslations } from "next-intl";
import { Toaster, toast } from 'sonner'
import { useSWRConfig } from "swr";


export const ButtonDelete = (props: {
  api: string,
  item: any,
  listKey: any  // truyền key vào để callback khi xóa
}) => {
  const t = useTranslations("CompanyManageJobListPage");
  const { api, item, listKey } = props;
  const { mutate } = useSWRConfig();

  const handleDelete = () => {
    const confirm = window.confirm("Bạn có chắc chắn muốn xóa bản ghi: " + (item.title !== undefined ? item.title : "") + (item.jobName !== undefined && item.email !== undefined ? item.jobName + ", " + item.email : ""));
    if (confirm) {
      const promise = fetch(api, {
        method: "DELETE",
        credentials: "include", // gửi kèm với cookie
      })
        .then(res => res.json())
        .then(data => {
          if (data.code == "success") {
            mutate(listKey);    // gọi tới useSWR có key = listkey để render lại
          } else {
            toast(data.message)
          }
        })
      toast.promise(promise, {
        loading: t('pending-delete'),
        success: t('delete-successfull'),
        error: (err) => t(`${err.message}`) || `Đã xảy ra lỗi!`,
      });
    }
  }

  return (
    <>
      <Toaster position="top-right" richColors />
      <button
        className="bg-[#FF0000] rounded-[4px] font-[400] text-[14px] text-white inline-block py-[8px] px-[15px]"
        onClick={handleDelete}
      >
        {t('delete-job')}
      </button>
    </>
  )
}