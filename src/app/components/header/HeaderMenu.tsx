import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { FaAngleDown, FaAngleRight } from "react-icons/fa6";


interface MenuItem {
  name: string;
  link: string;
  isLogin?: boolean;
  children?: MenuItem[];
}

export const HeaderMenu = ({ showMenu }: { showMenu: boolean }) => {
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
            { name: "ReactJS", link: "/search?skill=ReactJS" },
            { name: "NodeJS", link: "/search?skill=NodeJS" },
            { name: "Python", link: "/search?skill=Python" },
            { name: "Java", link: "/search?skill=Java" },
            { name: "DevOps", link: "/search?skill=DevOps" },
            { name: "PHP", link: "/search?skill=PHP" },
            { name: "JavaScript", link: "/search?skill=JavaScript" },
            { name: "HTML5", link: "/search?skill=HTML5" },
            { name: "Angular", link: "/search?skill=Angular" },
            { name: "VueJS", link: "/search?skill=VueJS" },
            { name: "C#", link: "/search?skill=CSharp" },
            { name: "C++", link: "/search?skill=Cpp" },
            { name: "Ruby", link: "/search?skill=Ruby" },
            { name: "Go", link: "/search?skill=Go" },
            { name: "Kotlin", link: "/search?skill=Kotlin" },
            { name: "Swift", link: "/search?skill=Swift" },
            { name: "TypeScript", link: "/search?skill=TypeScript" },
            { name: "Rust", link: "/search?skill=Rust" },
          ],
        },
        {
          name: "Việc làm IT theo chuyên môn",
          link: "#",
          children: [
            { name: "Lập trình viên Backend", link: "/search?expertise=Backend" },
            { name: "Lập trình viên Fullstack", link: "/search?expertise=Fullstack" },
            { name: "Lập trình viên Frontend", link: "/search?expertise=Frontend" },
            { name: "Lập trình viên Ứng dụng Di động", link: "/search?expertise=Mobile" },
            { name: "Kiểm thử tự động", link: "/search?expertise=AutoTesting" },
            { name: "Kỹ sư DevOps", link: "/search?expertise=DevOps" },
            { name: "Phân tích nghiệp vụ", link: "/search?expertise=BusinessAnalysis" },
            { name: "Kỹ sư AI / Machine Learning", link: "/search?expertise=AI" },
            { name: "Quản lý", link: "/search?expertise=Management" },
            { name: "Điều phối viên Kiểm thử", link: "/search?expertise=TestCoordinator" },
            { name: "Kỹ sư Hệ thống / Quản trị viên", link: "/search?expertise=SystemAdmin" },
            { name: "Kỹ sư Dữ liệu", link: "/search?expertise=DataEngineer" },
            { name: "Phân tích Dữ liệu", link: "/search?expertise=DataAnalysis" },
            { name: "Kỹ thuật viên Phần mềm / Kỹ thuật", link: "/search?expertise=SoftwareEngineer" },
          ],
        },
        {
          name: "Việc làm IT theo thành phố",
          link: "#",
          children: [
            { name: "Hồ Chí Minh", link: "/search?city=HoChiMinh" },
            { name: "Hà Nội", link: "/search?city=Hanoi" },
            { name: "Đà Nẵng", link: "/search?city=DaNang" },
          ],
        },
      ],
    },
    {
      name: "Top Công Ty IT",
      link: "#",
      children: [
        { name: "FPT Software", link: "/company/detail/fpt-software" },
        { name: "VNG Corporation", link: "/company/detail/vng-corporation" },
        { name: "Techcombank", link: "/company/detail/techcombank" },
        { name: "MB Bank", link: "/company/detail/mb-bank" },
        { name: "TMA Solutions", link: "/company/detail/tma-solutions" },
        { name: "VinAI", link: "/company/detail/vinai" },
        { name: "CNHH", link: "/company/detail/tnhh" },
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
            className={"inline-flex lg:w-auto w-full lg:justify-start justify-between p-[10px] items-center gap-x-[8px] relative group/sub-1 flex-wrap  " + (menu.isLogin !== undefined && menu.isLogin !== isLogin ? "hidden" : "")}
          >
            <Link
              href={menu.link}
              className="text-white  text-[16px] "
            >
              {menu.name}
            </Link>
            {menu.children && (
              <FaAngleDown className="text-white text-[16px] transition-transform duration-300 group-hover/sub-1:rotate-180" />
            )}

            {menu.children && (
              <ul className="lg:absolute relative lg:top-full top-0 left-0 lg:w-[280px] w-full bg-[#0D1B2A] hidden group-hover/sub-1:block z-[999] ">
                {menu.children.map((menuSub1, indexSub1) => (
                  <li
                    key={indexSub1}
                    className=" flex items-center justify-between hover:bg-[#18324e] relative group/sub-2 flex-wrap "
                  >
                    <Link
                      href={menuSub1.link}
                      className="text-white font-medium text-[15px] w-[90%] py-[10px] px-[15px] "
                    >
                      {menuSub1.name}
                    </Link>
                    {menuSub1.children && (
                      <FaAngleRight className="text-white text-[16px] pr-[8px] transition-transform duration-200 group-hover/sub-2:translate-x-1 absolute right-1" />
                    )}

                    {menuSub1.children && (
                      <ul className={`lg:absolute relative top-0 lg:left-full left-0 bg-[#0D1B2A] hidden group-hover/sub-2:block z-[999] transition-all duration-200 ease-in-out ${menuSub1.children.length > 5 ? 'lg:w-[560px]' : 'lg:w-[280px]'}`}>

                        {/* Kiểm tra nếu có nhiều hơn 5 items thì chia cột */}
                        {menuSub1.children.length > 5 ? (
                          <>
                            <div className="flex flex-wrap">
                              {/* Cột 1 - 5 items đầu */}
                              <div className="w-1/2">
                                {menuSub1.children.slice(0, 5).map((menuSub2, indexSub2) => (
                                  <li key={indexSub2} className="hover:bg-[#18324e]">
                                    <a href={menuSub2.link} className="text-white font-medium text-[15px] block py-[10px] px-[15px]">
                                      {menuSub2.name}
                                    </a>
                                  </li>
                                ))}
                              </div>

                              {/* Cột 2 - các items còn lại (tối đa 5 items) */}
                              <div className="w-1/2">
                                {menuSub1.children.slice(5, 10).map((menuSub2, indexSub2) => (
                                  <li key={indexSub2 + 5} className="hover:bg-[#18324e]">
                                    <a href={menuSub2.link} className="text-white font-medium text-[15px] block py-[10px] px-[15px]">
                                      {menuSub2.name}
                                    </a>
                                  </li>
                                ))}
                              </div>
                            </div>
                          </>
                        ) : (
                          // Hiển thị bình thường nếu có 5 items trở xuống
                          <>
                            {menuSub1.children.map((menuSub2, indexSub2) => (
                              <li key={indexSub2} className="hover:bg-[#18324e]">
                                <a href={menuSub2.link} className="text-white font-medium text-[15px] block py-[10px] px-[15px]">
                                  {menuSub2.name}
                                </a>
                              </li>
                            ))}
                          </>
                        )}
                        <div className="w-full border-t border-[#18324e]">
                          <li className="hover:bg-[#18324e]">
                            <a href={menuSub1.link} className="text-blue-400 font-bold text-[15px] block py-[10px] px-[15px]">
                              Xem tất cả ({menuSub1.children.length})
                            </a>
                          </li>
                        </div>
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
