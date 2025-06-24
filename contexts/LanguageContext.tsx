'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ur' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Translation data
const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.dashboard': 'Dashboard',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'nav.portfolio': 'Portfolio',
    'nav.consultation': 'Consultation',

    // Development Portal
    'dev.hero.title': 'EHB Development Portal',
    'dev.hero.subtitle': 'Your gateway to world-class software development services',
    'dev.hero.cta.start': 'Start Your Project',
    'dev.hero.cta.portfolio': 'View Portfolio',

    // Stats
    'stats.projects': 'Projects Completed',
    'stats.clients': 'Happy Clients',
    'stats.success': 'Success Rate',
    'stats.team': 'Team Members',

    // Services
    'services.title': 'Our Services',
    'services.subtitle': 'Comprehensive development solutions tailored to your business needs',
    'services.web': 'Web Development',
    'services.mobile': 'Mobile Development',
    'services.ai': 'AI & ML Integration',
    'services.cloud': 'Cloud Services',
    'services.security': 'Security & Testing',
    'services.database': 'Database Design',

    // Features
    'features.title': 'Why Choose EHB Development?',
    'features.subtitle': 'We deliver excellence through innovation, expertise, and dedication',
    'features.tech': 'Modern Tech Stack',
    'features.scalable': 'Scalable Architecture',
    'features.support': '24/7 Support',
    'features.docs': 'Documentation',

    // Contact
    'contact.title': 'Get In Touch',
    'contact.subtitle': 'Ready to start your next project?',
    'contact.form.name': 'Full Name',
    'contact.form.email': 'Email Address',
    'contact.form.company': 'Company',
    'contact.form.project': 'Project Type',
    'contact.form.budget': 'Budget Range',
    'contact.form.timeline': 'Timeline',
    'contact.form.description': 'Project Description',
    'contact.form.submit': 'Send Message',

    // Portfolio
    'portfolio.title': 'Our Portfolio',
    'portfolio.subtitle': 'Explore our successful projects',
    'portfolio.filter.all': 'All Projects',
    'portfolio.filter.web': 'Web Development',
    'portfolio.filter.mobile': 'Mobile Apps',
    'portfolio.filter.ai': 'AI Integration',
    'portfolio.filter.security': 'Security',

    // Consultation
    'consultation.title': 'Free Consultation',
    'consultation.subtitle': 'Get expert advice from our development team',
    'consultation.tech': 'Technology Consultation',
    'consultation.planning': 'Project Planning',
    'consultation.review': 'Code Review',
    'consultation.ai': 'AI Integration',
    'consultation.book': 'Book Free Consultation',

    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.success': 'Success!',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.view': 'View',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.submit': 'Submit',
  },
  ur: {
    // Navigation
    'nav.home': 'ہوم',
    'nav.dashboard': 'ڈیش بورڈ',
    'nav.projects': 'پروجیکٹس',
    'nav.contact': 'رابطہ',
    'nav.portfolio': 'پورٹ فولیو',
    'nav.consultation': 'مشاورت',

    // Development Portal
    'dev.hero.title': 'ایچ بی ڈویلپمنٹ پورٹل',
    'dev.hero.subtitle': 'عالمی معیار کی سافٹ ویئر ڈویلپمنٹ خدمات تک آپ کا گیٹ وے',
    'dev.hero.cta.start': 'اپنا پروجیکٹ شروع کریں',
    'dev.hero.cta.portfolio': 'پورٹ فولیو دیکھیں',

    // Stats
    'stats.projects': 'مکمل شدہ پروجیکٹس',
    'stats.clients': 'خوش گاہک',
    'stats.success': 'کامیابی کی شرح',
    'stats.team': 'ٹیم ممبران',

    // Services
    'services.title': 'ہماری خدمات',
    'services.subtitle': 'آپ کی کاروباری ضروریات کے مطابق جامع ڈویلپمنٹ حل',
    'services.web': 'ویب ڈویلپمنٹ',
    'services.mobile': 'موبائل ڈویلپمنٹ',
    'services.ai': 'اے آئی اور ایم ایل انٹیگریشن',
    'services.cloud': 'کلاؤڈ خدمات',
    'services.security': 'سیکیورٹی اور ٹیسٹنگ',
    'services.database': 'ڈیٹا بیس ڈیزائن',

    // Features
    'features.title': 'ایچ بی ڈویلپمنٹ کیوں منتخب کریں؟',
    'features.subtitle': 'ہم جدت، مہارت اور لگن کے ذریعے عمدگی فراہم کرتے ہیں',
    'features.tech': 'جدید ٹیک اسٹیک',
    'features.scalable': 'قابل توسیع آرکیٹیکچر',
    'features.support': '24/7 سپورٹ',
    'features.docs': 'دستاویزات',

    // Contact
    'contact.title': 'رابطہ کریں',
    'contact.subtitle': 'اپنا اگلا پروجیکٹ شروع کرنے کے لیے تیار ہیں؟',
    'contact.form.name': 'پورا نام',
    'contact.form.email': 'ای میل ایڈریس',
    'contact.form.company': 'کمپنی',
    'contact.form.project': 'پروجیکٹ کی قسم',
    'contact.form.budget': 'بجٹ کی حد',
    'contact.form.timeline': 'وقت کی حد',
    'contact.form.description': 'پروجیکٹ کی تفصیل',
    'contact.form.submit': 'پیغام بھیجیں',

    // Portfolio
    'portfolio.title': 'ہمارا پورٹ فولیو',
    'portfolio.subtitle': 'ہمارے کامیاب پروجیکٹس دیکھیں',
    'portfolio.filter.all': 'تمام پروجیکٹس',
    'portfolio.filter.web': 'ویب ڈویلپمنٹ',
    'portfolio.filter.mobile': 'موبائل ایپس',
    'portfolio.filter.ai': 'اے آئی انٹیگریشن',
    'portfolio.filter.security': 'سیکیورٹی',

    // Consultation
    'consultation.title': 'مفت مشاورت',
    'consultation.subtitle': 'ہماری ڈویلپمنٹ ٹیم سے ماہرانہ مشورہ حاصل کریں',
    'consultation.tech': 'ٹیکنالوجی مشاورت',
    'consultation.planning': 'پروجیکٹ پلاننگ',
    'consultation.review': 'کوڈ ریویو',
    'consultation.ai': 'اے آئی انٹیگریشن',
    'consultation.book': 'مفت مشاورت بک کریں',

    // Common
    'common.loading': 'لوڈ ہو رہا ہے...',
    'common.error': 'ایک خرابی پیش آئی',
    'common.success': 'کامیاب!',
    'common.cancel': 'منسوخ کریں',
    'common.save': 'محفوظ کریں',
    'common.edit': 'ترمیم کریں',
    'common.delete': 'حذف کریں',
    'common.view': 'دیکھیں',
    'common.back': 'واپس',
    'common.next': 'اگلا',
    'common.submit': 'جمع کریں',
  },
  zh: {
    // Navigation
    'nav.home': '首页',
    'nav.dashboard': '仪表板',
    'nav.projects': '项目',
    'nav.contact': '联系',
    'nav.portfolio': '作品集',
    'nav.consultation': '咨询',

    // Development Portal
    'dev.hero.title': 'EHB 开发门户',
    'dev.hero.subtitle': '通往世界级软件开发服务的门户',
    'dev.hero.cta.start': '开始您的项目',
    'dev.hero.cta.portfolio': '查看作品集',

    // Stats
    'stats.projects': '已完成项目',
    'stats.clients': '满意客户',
    'stats.success': '成功率',
    'stats.team': '团队成员',

    // Services
    'services.title': '我们的服务',
    'services.subtitle': '为您的业务需求量身定制的综合开发解决方案',
    'services.web': 'Web 开发',
    'services.mobile': '移动开发',
    'services.ai': 'AI 和 ML 集成',
    'services.cloud': '云服务',
    'services.security': '安全和测试',
    'services.database': '数据库设计',

    // Features
    'features.title': '为什么选择 EHB 开发？',
    'features.subtitle': '我们通过创新、专业知识和奉献精神提供卓越服务',
    'features.tech': '现代技术栈',
    'features.scalable': '可扩展架构',
    'features.support': '24/7 支持',
    'features.docs': '文档',

    // Contact
    'contact.title': '联系我们',
    'contact.subtitle': '准备开始您的下一个项目？',
    'contact.form.name': '全名',
    'contact.form.email': '电子邮件地址',
    'contact.form.company': '公司',
    'contact.form.project': '项目类型',
    'contact.form.budget': '预算范围',
    'contact.form.timeline': '时间线',
    'contact.form.description': '项目描述',
    'contact.form.submit': '发送消息',

    // Portfolio
    'portfolio.title': '我们的作品集',
    'portfolio.subtitle': '探索我们成功的项目',
    'portfolio.filter.all': '所有项目',
    'portfolio.filter.web': 'Web 开发',
    'portfolio.filter.mobile': '移动应用',
    'portfolio.filter.ai': 'AI 集成',
    'portfolio.filter.security': '安全',

    // Consultation
    'consultation.title': '免费咨询',
    'consultation.subtitle': '从我们的开发团队获得专家建议',
    'consultation.tech': '技术咨询',
    'consultation.planning': '项目规划',
    'consultation.review': '代码审查',
    'consultation.ai': 'AI 集成',
    'consultation.book': '预订免费咨询',

    // Common
    'common.loading': '加载中...',
    'common.error': '发生错误',
    'common.success': '成功！',
    'common.cancel': '取消',
    'common.save': '保存',
    'common.edit': '编辑',
    'common.delete': '删除',
    'common.view': '查看',
    'common.back': '返回',
    'common.next': '下一步',
    'common.submit': '提交',
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['en', 'ur', 'zh'].includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    }
    setIsLoading(false);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    const currentTranslations = translations[language];
    return currentTranslations[key as keyof typeof currentTranslations] || key;
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
    isLoading,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

// AI Guidance: This context allows you to switch between English and Urdu across the app.
// Wrap your app with <LanguageProvider> in _app.tsx or layout.tsx.
