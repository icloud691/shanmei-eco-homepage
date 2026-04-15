import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: '善美生态 | 企业增长进化平台',
  description:
    '善美生态面向中大型企业决策者，围绕增长诊断、AI 赋能、模式优化与生态协同，提供更具平台感的企业增长首页展示。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
