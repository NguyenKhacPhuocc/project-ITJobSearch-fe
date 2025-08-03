import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // Các ngôn ngữ được hỗ trợ
  locales: ['vi', 'en'],
  localeDetection: false,
  // Ngôn ngữ mặc định
  defaultLocale: 'vi',

  pathnames: {
    '/': '/',
    '/company': {
      vi: '/cong-ty',
      en: '/company'
    },
    '/company/login': {
      vi: '/cong-ty/dang-nhap',
      en: '/company/login'
    },
    '/company/register': {
      vi: '/cong-ty/dang-ky',
      en: '/company/register'
    },
    '/company/list': {
      vi: '/cong-ty/danh-sach',
      en: '/company/list'
    },
    '/company/detail/[slug]': {
      vi: '/cong-ty/chi-tiet/[slug]',
      en: '/company/detail/[slug]'
    },

    '/company-manage': {
      vi: '/quan-ly-cong-ty',
      en: '/company-manage'
    },
    '/company-manage/cv': {
      vi: '/quan-ly-cong-ty/cv',
      en: '/company-manage/cv'
    },
    '/company-manage/cv/list': {
      vi: '/quan-ly-cong-ty/cv/danh-sach-cv',
      en: '/company-manage/cv/list'
    },
    '/company-manage/cv/detail/[slug]': {
      vi: '/quan-ly-cong-ty/cv/chi-tiet/[slug]',
      en: '/company-manage/cv/detail/[slug]'
    },

    '/company-manage/job': {
      vi: '/quan-ly-cong-ty/viec-lam',
      en: '/company-manage/job'
    },
    '/company-manage/job/create': {
      vi: '/quan-ly-cong-ty/viec-lam/tao-viec-lam',
      en: '/company-manage/job/create'
    },
    '/company-manage/job/list': {
      vi: '/quan-ly-cong-ty/viec-lam/danh-sach-viec-lam',
      en: '/company-manage/job/list'
    },
    '/company-manage/profile': {
      vi: '/quan-ly-cong-ty/thong-tin-cong-ty',
      en: '/company-manage/profile'
    },

    '/job': {
      vi: '/viec-lam',
      en: '/job'
    },
    '/job/detail/[slug]': {
      vi: '/viec-lam/chi-tiet/[slug]',
      en: '/job/detail/[slug]'
    },

    '/search': {
      vi: '/tim-kiem',
      en: '/search'
    },

    '/user': {
      vi: '/nguoi-dung',
      en: '/user'
    },
    '/user/login': {
      vi: '/nguoi-dung/dang-nhap',
      en: '/user/login'
    },
    '/user/register': {
      vi: '/nguoi-dung/dang-ky',
      en: '/user/register'
    },

    '/user-manage': {
      vi: '/quan-ly-nguoi-dung',
      en: '/user-manage'
    },
    '/user-manage/cv/list': {
      vi: '/quan-ly-nguoi-dung/cv/danh-sach-cv',
      en: '/user-manage/cv/list'
    },
    '/user-manage/profile': {
      vi: '/quan-ly-nguoi-dung/thong-tin-nguoi-dung',
      en: '/user-manage/profile'
    }
  }
});
