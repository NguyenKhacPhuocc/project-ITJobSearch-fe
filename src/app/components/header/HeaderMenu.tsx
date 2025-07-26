import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { FaAngleDown, FaAngleRight } from "react-icons/fa6";

export const HeaderMenu = ({ showMenu }: { showMenu: boolean }) => {
  interface MenuItem {
    name: string;
    link: string;
    isLogin?: boolean;
    children?: MenuItem[];
  }
  const { isLogin } = useAuth();
  const menuList: MenuItem[] = [
    {
      name: "Việc Làm IT",
      link: "#",
      children: [
        {
          name: "Việc làm IT theo kỹ năng",
          link: "#",
          children: [
            { name: "ReactJS", link: "#" },
            { name: "NodeJS", link: "#" },
          ],
        },
        { name: "Việc làm IT theo công ty", link: "#" },
        { name: "Việc làm IT theo thành phố", link: "#" },
      ],
    },
    {
      name: "Top Công Ty IT",
      link: "#",
      children: [
        { name: "FPT Software", link: "#" },
        { name: "Techcombank", link: "#" },
        { name: "MB Bank", link: "#" },
      ],
    },
    {
      name: "Nhà Tuyển Dụng",
      link: "#",
      isLogin: false,
      children: [
        { name: "Đăng Nhập", link: "/company/login" },
        { name: "Đăng Ký", link: "/company/register" },
      ],
    },
  ];

  return (
    <nav
      className={
        "lg:block " +
        (showMenu
          ? "fixed top-0 left-0 w-[280px] h-[100vh] z-[999] bg-[#0D1B2A] transition-all duration-500"
          : "hidden")
      }
    >
      <ul className="flex gap-x-[30px] flex-wrap">
        {menuList.map((menu, index) => (
          <li
            key={index}
            className={"inline-flex lg:w-auto w-full lg:justify-start justify-between p-[10px] items-center gap-x-[8px] relative group/sub-1 flex-wrap transition-all duration-300 ease-in-out " + (menu.isLogin !== undefined && menu.isLogin !== isLogin ? "hidden" : "")}
          >
            <Link
              href={menu.link}
              className="text-white  text-[16px] transition-all duration-300 ease-in-out"
            >
              {menu.name}
            </Link>
            {menu.children && (
              <FaAngleDown className="text-white text-[16px] transition-transform duration-300 group-hover/sub-1:rotate-180" />
            )}

            {menu.children && (
              <ul className="lg:absolute relative lg:top-full top-0 left-0 lg:w-[280px] w-full bg-[#0D1B2A] hidden group-hover/sub-1:block z-[999] transition-all duration-200 ease-in-out">
                {menu.children.map((menuSub1, indexSub1) => (
                  <li
                    key={indexSub1}
                    className="py-[10px] px-[16px] rounded-[4px] flex items-center justify-between hover:bg-[#18324e] relative group/sub-2 flex-wrap transition-colors duration-200 ease-in-out"
                  >
                    <Link
                      href={menuSub1.link}
                      className="text-white font-medium text-[16px] transition-colors duration-200 ease-in-out"
                    >
                      {menuSub1.name}
                    </Link>
                    {menuSub1.children && (
                      <FaAngleRight className="text-white text-[16px] transition-transform duration-200 group-hover/sub-2:translate-x-1" />
                    )}

                    {menuSub1.children && (
                      <ul className="lg:absolute relative top-0 lg:left-full left-0 lg:w-[280px] w-full bg-[#0D1B2A] hidden group-hover/sub-2:block z-[999] transition-all duration-200 ease-in-out">
                        {menuSub1.children.map((menuSub2, indexSub2) => (
                          <li
                            key={indexSub2}
                            className="py-[10px] px-[16px] rounded-[4px] flex items-center justify-between hover:bg-[#18324e] transition-colors duration-200 ease-in-out"
                          >
                            <a
                              href={menuSub2.link}
                              className="text-white font-medium text-[16px] transition-colors duration-200 ease-in-out"
                            >
                              {menuSub2.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
