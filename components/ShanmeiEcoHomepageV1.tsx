'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import Image from 'next/image';
import {
  ArrowRight,
  Briefcase,
  Building2,
  ChevronRight,
  CircleDot,
  Cpu,
  Handshake,
  Layers3,
  LineChart,
  Network,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Target,
  Users2,
  Volume2,
  Waves,
} from 'lucide-react';

const painPoints = [
  {
    key: 'method',
    title: '方法不清',
    desc: '增长方式长期依赖个人经验，缺少可复制的经营打法与协同机制。',
    tip: '先定义盈利结构与增长路径，再进入组织与渠道调优。',
    icon: Target,
  },
  {
    key: 'resource',
    title: '资源分散',
    desc: '产业、人脉、渠道与服务资源各自为战，无法形成系统合力。',
    tip: '先建立关键资源地图，再按协同效率重组连接关系。',
    icon: Network,
  },
  {
    key: 'channel',
    title: '渠道不足',
    desc: '获客慢、转化链路弱、招商复制难，增长效率被长期锁死。',
    tip: '先建立标准化获客与转化路径，再放大组织执行。',
    icon: LineChart,
  },
  {
    key: 'brand',
    title: '品牌不强',
    desc: '企业价值表达与外部认知不足，缺少对客户与合作方的权威信号。',
    tip: '先搭建企业信任层，再做认知升级与内容放大。',
    icon: ShieldCheck,
  },
  {
    key: 'capital',
    title: '资金受限',
    desc: '融资路径模糊、资本结构薄弱，经营与资本能力没有联动起来。',
    tip: '先梳理商业结构，再匹配融资逻辑与资本化路径。',
    icon: Briefcase,
  },
  {
    key: 'growth',
    title: '增长停滞',
    desc: '经营规模难突破，组织能力难复制，增长仍停留在人治阶段。',
    tip: '把关键经营动作沉淀为系统，再推动规模化复制。',
    icon: Sparkles,
  },
];

const loops = [
  {
    title: '商学闭环',
    desc: '从认知升级、方法校准到经营实操，建立持续迭代的决策框架。',
    icon: Layers3,
  },
  {
    title: '产业闭环',
    desc: '围绕供应链、交付链、协同链整合资源，提升生态效率。',
    icon: Building2,
  },
  {
    title: 'AI 与数字化',
    desc: '以 AI 顾问、自动化流程与经营数据化，重塑组织效率。',
    icon: Cpu,
  },
  {
    title: '文化与组织',
    desc: '通过机制、价值观与干部梯队，提升组织稳定性与裂变能力。',
    icon: Users2,
  },
  {
    title: '资本赋能',
    desc: '从结构设计、融资对接到资本路径规划，服务企业长期增长。',
    icon: Handshake,
  },
];

const serviceCards = [
  {
    title: '黑马营',
    audience: '适合行业头部与准头部企业',
    tag: '战略升级',
    bullets: ['产业链布局', '品牌权威升级', '资本化登顶'],
  },
  {
    title: '共创营',
    audience: '适合转型中的成长型企业',
    tag: '模式重构',
    bullets: ['盈利模型重构', 'AI 经营协同', '组织裂变系统'],
  },
  {
    title: '陪跑营',
    audience: '适合需要加速突破的企业',
    tag: '执行陪跑',
    bullets: ['招商爆破', '融资赋能', '规模化增长'],
  },
];

const tracks = [
  '大健康',
  '大智能',
  '大能源',
  '大文化',
  '大环保',
  '大旅游',
  '大金融',
  '大教育',
  '大餐饮',
  '大农业',
];

const navItems = [
  { href: '#pain', label: '六大痛点' },
  { href: '#loops', label: '五大闭环' },
  { href: '#model', label: '三共创模型' },
  { href: '#services', label: '三大服务' },
  { href: '#cooperate', label: '合作入口' },
] as const;

const modelNodes = [
  {
    id: 'S',
    title: '供应链',
    desc: '资本共创，完成资源组织与产业背书。',
    tag: '资源共创',
    className: 'sm-model-node sm-model-node--top',
    style: {
      left: '50%',
      top: 34,
      transform: 'translateX(-50%)',
    } as React.CSSProperties,
  },
  {
    id: 'B',
    title: '运营链',
    desc: '运营共创，推动交付、管理与组织落地。',
    tag: '运营共创',
    className: 'sm-model-node sm-model-node--left',
    style: {
      left: 34,
      bottom: 42,
    } as React.CSSProperties,
  },
  {
    id: 'C',
    title: '消费链',
    desc: '流量共创，强化获客、转化与招商效率。',
    tag: '流量共创',
    className: 'sm-model-node sm-model-node--right',
    style: {
      right: 34,
      bottom: 42,
    } as React.CSSProperties,
  },
] as const;

const contactInfo = {
  consultant: '关老师',
  phone: '18636937717',
  telHref: 'tel:18636937717',
} as const;

const consultNote = '可先电话沟通企业现状、增长诉求与合作方向。';

const heroBridgeText = '围绕经营诊断、协同增长与生态连接，快速完成首轮判断。';
const advisorWelcomeText = '你好，我是善美生态的 AI 共创顾问知予。';
const footerPositioning = '面向企业决策者的增长诊断、协同推进与生态合作平台。';
const staticBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const withStaticBasePath = (path: string) => `${staticBasePath}${path}`;

const heroSignals = [
  { value: '6', label: '经营痛点', note: '快速识别问题所在' },
  { value: '5', label: '闭环能力', note: '覆盖战略到执行协同' },
  { value: '10', label: '产业赛道', note: '连接项目与生态资源' },
];

const trustProofItems = [
  {
    title: '先诊断',
    desc: '先识别增长卡点与经营关键问题，而不是直接给出泛化建议。',
  },
  {
    title: '再协同',
    desc: '围绕组织、经营与协同路径持续推进，不停留在单点咨询。',
  },
  {
    title: '后链接',
    desc: '在判断之外，帮助企业链接合作、资源与生态机会。',
  },
] as const;

const pageStyles = `
  .sm-homepage {
    --sm-bg: #050d18;
    --sm-bg-strong: #071321;
    --sm-surface: rgba(10, 24, 40, 0.72);
    --sm-surface-2: rgba(255, 255, 255, 0.04);
    --sm-surface-3: rgba(255, 255, 255, 0.06);
    --sm-border: rgba(158, 198, 255, 0.12);
    --sm-border-strong: rgba(146, 194, 255, 0.22);
    --sm-text: rgba(244, 248, 255, 0.96);
    --sm-text-soft: rgba(231, 239, 251, 0.72);
    --sm-text-faint: rgba(214, 227, 245, 0.48);
    --sm-blue: #8ec7ff;
    --sm-blue-strong: #b7dbff;
    --sm-gold: #d6bb87;
    --sm-shadow: 0 32px 90px rgba(0, 0, 0, 0.38);
    --sm-ease-out: cubic-bezier(0.22, 1, 0.36, 1);
    --sm-ease-soft: cubic-bezier(0.25, 0.85, 0.28, 1);
    --sm-duration-fast: 180ms;
    --sm-duration-mid: 260ms;
    position: relative;
    min-height: 100vh;
    overflow-x: hidden;
    background:
      radial-gradient(circle at 12% 12%, rgba(61, 122, 226, 0.26), transparent 26%),
      radial-gradient(circle at 82% 18%, rgba(44, 144, 255, 0.12), transparent 20%),
      radial-gradient(circle at 50% 100%, rgba(25, 78, 148, 0.18), transparent 26%),
      linear-gradient(180deg, #040b15 0%, #071321 38%, #050d18 100%);
    color: var(--sm-text);
    font-family: "Avenir Next", "SF Pro Display", "PingFang SC", "Microsoft YaHei", sans-serif;
  }

  .sm-homepage * {
    box-sizing: border-box;
  }

  .sm-homepage a {
    color: inherit;
    text-decoration: none;
  }

  .sm-shell {
    position: relative;
    z-index: 1;
    max-width: 1320px;
    margin: 0 auto;
    padding: 0 28px;
  }

  .sm-grid-overlay,
  .sm-grid-overlay::before {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .sm-grid-overlay {
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
    background-size: 120px 120px;
    mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.55), transparent 92%);
    opacity: 0.45;
  }

  .sm-grid-overlay::before {
    content: "";
    background:
      linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.12), transparent);
    width: 42%;
    left: 29%;
    opacity: 0.08;
  }

  .sm-header {
    position: sticky;
    top: 0;
    z-index: 30;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    background: rgba(5, 15, 28, 0.72);
    backdrop-filter: blur(28px);
  }

  .sm-header__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    min-height: 84px;
  }

  .sm-brand {
    display: flex;
    align-items: center;
    gap: 14px;
    min-width: 0;
  }

  .sm-brand__mark {
    position: relative;
    width: 44px;
    height: 44px;
    border-radius: 16px;
    border: 1px solid rgba(214, 187, 135, 0.22);
    background:
      linear-gradient(180deg, rgba(214, 187, 135, 0.16), rgba(214, 187, 135, 0.06));
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--sm-gold);
    overflow: hidden;
  }

  .sm-brand__meta {
    display: grid;
    gap: 4px;
  }

  .sm-brand__meta small {
    font-size: 11px;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: var(--sm-text-faint);
  }

  .sm-brand__meta strong {
    font-size: 17px;
    font-weight: 600;
  }

  .sm-brand__image {
    object-fit: contain;
    transform: scale(1.06);
    filter: drop-shadow(0 6px 16px rgba(214, 187, 135, 0.12));
  }

  .sm-nav {
    display: flex;
    align-items: center;
    gap: 26px;
    color: rgba(233, 240, 252, 0.7);
    font-size: 14px;
  }

  .sm-nav a {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 38px;
    padding: 6px 10px;
    border-radius: 999px;
    transition:
      background var(--sm-duration-fast) var(--sm-ease-out),
      color var(--sm-duration-fast) var(--sm-ease-out),
      transform var(--sm-duration-fast) var(--sm-ease-out),
      box-shadow var(--sm-duration-mid) var(--sm-ease-out);
  }

  .sm-nav a::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: rgba(255, 255, 255, 0.04);
    opacity: 0;
    transition: opacity var(--sm-duration-fast) var(--sm-ease-out);
  }

  .sm-nav a::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -10px;
    width: 100%;
    height: 1px;
    transform: scaleX(0);
    transform-origin: left;
    transition:
      transform var(--sm-duration-fast) var(--sm-ease-out),
      opacity var(--sm-duration-fast) var(--sm-ease-out);
    background: linear-gradient(90deg, transparent, rgba(183, 219, 255, 0.9), transparent);
    opacity: 0.55;
  }

  .sm-nav a:hover {
    color: var(--sm-text);
    transform: translateY(-1px);
    background: rgba(255, 255, 255, 0.02);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
  }

  .sm-nav a:hover::before {
    opacity: 1;
  }

  .sm-nav a:hover::after {
    transform: scaleX(1);
  }

  .sm-nav a.is-active {
    color: rgba(244, 248, 255, 0.98);
    background: rgba(255, 255, 255, 0.03);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.04),
      0 10px 24px rgba(6, 17, 31, 0.18);
  }

  .sm-nav a.is-active::after {
    transform: scaleX(1);
    opacity: 1;
  }

  .sm-button,
  .sm-chip-button,
  .sm-icon-button {
    appearance: none;
    border: none;
    cursor: pointer;
    font: inherit;
    outline: none;
  }

  .sm-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-height: 50px;
    padding: 0 22px;
    border-radius: 999px;
    transition:
      transform var(--sm-duration-fast) var(--sm-ease-out),
      border-color var(--sm-duration-fast) var(--sm-ease-out),
      background var(--sm-duration-fast) var(--sm-ease-out),
      color var(--sm-duration-fast) var(--sm-ease-out),
      box-shadow var(--sm-duration-mid) var(--sm-ease-out),
      filter var(--sm-duration-fast) var(--sm-ease-out);
    will-change: transform;
  }

  .sm-button:hover {
    transform: translateY(-1px);
  }

  .sm-button:active {
    transform: translateY(1px) scale(0.985);
    box-shadow: 0 8px 18px rgba(5, 13, 24, 0.18);
  }

  .sm-button--primary {
    border: 1px solid rgba(157, 207, 255, 0.28);
    background: linear-gradient(180deg, #9fd3ff, #7ab8f8);
    color: #071321;
    box-shadow: 0 14px 34px rgba(69, 129, 190, 0.28);
    font-weight: 600;
  }

  .sm-button--primary:hover {
    border-color: rgba(190, 226, 255, 0.5);
    box-shadow: 0 18px 42px rgba(69, 129, 190, 0.34);
    filter: brightness(1.035);
  }

  .sm-button--secondary {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.04);
    color: var(--sm-text);
  }

  .sm-button--secondary:hover {
    border-color: rgba(163, 209, 255, 0.18);
    background: rgba(255, 255, 255, 0.06);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.05),
      0 14px 30px rgba(5, 13, 24, 0.16);
  }

  .sm-button--gold {
    border: 1px solid rgba(214, 187, 135, 0.18);
    background: linear-gradient(180deg, #dcc391, #cba86c);
    color: #0a1320;
    font-weight: 600;
  }

  .sm-button--gold:hover {
    border-color: rgba(232, 208, 159, 0.34);
    box-shadow: 0 16px 36px rgba(113, 85, 34, 0.22);
    filter: brightness(1.035);
  }

  .sm-button:focus-visible,
  .sm-chip-button:focus-visible,
  .sm-icon-button:focus-visible,
  .sm-nav a:focus-visible,
  .sm-model-list__item:focus-visible {
    box-shadow:
      0 0 0 1px rgba(6, 17, 31, 0.9),
      0 0 0 4px rgba(142, 199, 255, 0.28);
  }

  .sm-button:disabled,
  .sm-chip-button:disabled,
  .sm-icon-button:disabled {
    cursor: not-allowed;
    opacity: 0.45;
    transform: none !important;
    box-shadow: none !important;
  }

  .sm-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 14px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.03);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
    color: rgba(229, 238, 252, 0.72);
    font-size: 12px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
  }

  .sm-surface {
    position: relative;
    overflow: hidden;
    border-radius: 28px;
    border: 1px solid var(--sm-border);
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.025)),
      rgba(7, 19, 33, 0.74);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.06),
      var(--sm-shadow);
    backdrop-filter: blur(24px);
    transition:
      border-color var(--sm-duration-fast) var(--sm-ease-out),
      background var(--sm-duration-mid) var(--sm-ease-out),
      box-shadow var(--sm-duration-mid) var(--sm-ease-out),
      transform var(--sm-duration-fast) var(--sm-ease-out);
  }

  .sm-surface::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      radial-gradient(circle at top, rgba(255, 255, 255, 0.08), transparent 26%),
      linear-gradient(180deg, rgba(255, 255, 255, 0.04), transparent 28%);
    opacity: 0.9;
  }

  .sm-surface > * {
    position: relative;
    z-index: 1;
  }

  .sm-main section {
    position: relative;
    padding-bottom: 108px;
  }

  .sm-main section[id] {
    scroll-margin-top: 116px;
  }

  .sm-hero {
    min-height: 94vh;
    display: grid;
    grid-template-columns: minmax(0, 1.08fr) minmax(440px, 0.92fr);
    align-items: center;
    gap: 44px;
    padding-top: 62px;
    padding-bottom: 92px;
  }

  .sm-hero__content {
    max-width: 760px;
  }

  .sm-hero__visual {
    display: flex;
    justify-content: flex-end;
  }

  .sm-hero__visual > .sm-surface {
    width: min(100%, 560px);
  }

  .sm-hero__trustline {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 18px;
    color: var(--sm-text-faint);
    font-size: 13px;
  }

  .sm-hero__trustline span {
    padding: 9px 14px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.035);
    letter-spacing: 0.04em;
  }

  .sm-hero__title {
    margin: 24px 0 0;
    max-width: 760px;
    font-size: clamp(58px, 6.3vw, 84px);
    line-height: 0.98;
    letter-spacing: -0.055em;
    font-weight: 600;
    text-wrap: balance;
  }

  .sm-hero__subtitle {
    margin: 24px 0 0;
    max-width: 540px;
    color: var(--sm-text-soft);
    font-size: 15px;
    line-height: 1.84;
  }

  .sm-hero__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    margin-top: 38px;
  }

  .sm-hero__signals {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 15px;
    margin-top: 22px;
  }

  .sm-hero__bridge {
    margin-top: 28px;
    color: rgba(231, 239, 251, 0.78);
    font-size: 14px;
    line-height: 1.75;
    letter-spacing: 0.01em;
  }

  .sm-signal-card {
    padding: 20px 20px 18px;
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.045), rgba(255, 255, 255, 0.02)),
      rgba(7, 19, 33, 0.66);
    border-color: rgba(158, 198, 255, 0.14);
    transition:
      transform var(--sm-duration-fast) var(--sm-ease-out),
      border-color var(--sm-duration-fast) var(--sm-ease-out),
      background var(--sm-duration-mid) var(--sm-ease-out),
      box-shadow var(--sm-duration-mid) var(--sm-ease-out);
  }

  .sm-signal-card:hover {
    transform: translateY(-4px);
    border-color: rgba(163, 209, 255, 0.22);
    background:
      linear-gradient(180deg, rgba(147, 201, 255, 0.09), rgba(255, 255, 255, 0.03)),
      rgba(7, 19, 33, 0.72);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.06),
      0 22px 48px rgba(10, 28, 48, 0.26);
  }

  .sm-signal-card strong {
    display: inline-block;
    font-size: 30px;
    line-height: 1;
    color: var(--sm-blue-strong);
    letter-spacing: -0.04em;
  }

  .sm-signal-card h3 {
    margin: 13px 0 0;
    font-size: 16px;
    font-weight: 600;
  }

  .sm-signal-card p {
    margin: 9px 0 0;
    color: rgba(214, 227, 245, 0.6);
    font-size: 12px;
    line-height: 1.75;
  }

  .sm-hero__meta {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 28px;
    color: var(--sm-text-faint);
    font-size: 13px;
  }

  .sm-hero__meta span {
    display: inline-flex;
    align-items: center;
    gap: 10px;
  }

  .sm-hero__meta span::before {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgba(142, 199, 255, 0.7);
    box-shadow: 0 0 14px rgba(142, 199, 255, 0.45);
  }

  .sm-trust-band {
    padding-bottom: 96px !important;
  }

  .sm-trust-band__card {
    padding: 22px 24px;
    border-radius: 28px;
    background:
      radial-gradient(circle at left top, rgba(143, 198, 255, 0.08), transparent 18%),
      linear-gradient(180deg, rgba(14, 30, 52, 0.92), rgba(7, 18, 31, 0.98)),
      rgba(7, 19, 33, 0.78);
  }

  .sm-trust-band__lead {
    display: grid;
    grid-template-columns: minmax(0, 0.82fr) minmax(0, 1.18fr);
    align-items: center;
    gap: 18px;
  }

  .sm-trust-band__lead strong {
    display: block;
    max-width: 320px;
    font-size: 18px;
    line-height: 1.55;
    font-weight: 600;
    letter-spacing: -0.01em;
  }

  .sm-trust-band__lead p {
    margin: 0;
    color: rgba(231, 239, 251, 0.64);
    font-size: 13px;
    line-height: 1.75;
  }

  .sm-trust-band__items {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 14px;
    margin-top: 22px;
  }

  .sm-trust-band__item {
    padding: 15px 16px;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.07);
    background: rgba(255, 255, 255, 0.03);
    transition:
      transform var(--sm-duration-fast) var(--sm-ease-out),
      border-color var(--sm-duration-fast) var(--sm-ease-out),
      background var(--sm-duration-fast) var(--sm-ease-out),
      box-shadow var(--sm-duration-mid) var(--sm-ease-out);
  }

  .sm-trust-band__item:hover {
    transform: translateY(-3px);
    border-color: rgba(163, 209, 255, 0.16);
    background: rgba(255, 255, 255, 0.038);
    box-shadow: 0 18px 38px rgba(8, 22, 37, 0.22);
  }

  .sm-trust-band__item strong {
    display: block;
    font-size: 15px;
    font-weight: 600;
  }

  .sm-trust-band__item p {
    margin: 7px 0 0;
    color: rgba(214, 227, 245, 0.6);
    font-size: 12px;
    line-height: 1.72;
  }

  .sm-advisor-shell {
    min-height: 724px;
    padding: 18px;
  }

  .sm-advisor-body {
    position: relative;
    min-height: 686px;
    border-radius: 30px;
    border: 1px solid rgba(255, 255, 255, 0.07);
    background:
      radial-gradient(circle at 50% 20%, rgba(116, 179, 255, 0.16), transparent 18%),
      radial-gradient(circle at 70% 34%, rgba(54, 110, 180, 0.18), transparent 24%),
      linear-gradient(180deg, rgba(8, 20, 35, 0.92), rgba(5, 13, 24, 0.98));
    overflow: hidden;
  }

  .sm-advisor-body::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
    background-size: 104px 104px;
    mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.72), transparent 94%);
    opacity: 0.35;
  }

  .sm-advisor-topbar {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    padding: 18px 20px 0;
  }

  .sm-advisor-topbar small {
    color: rgba(214, 227, 245, 0.48);
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }

  .sm-advisor-topbar span {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.03);
    color: rgba(232, 241, 254, 0.72);
    font-size: 12px;
  }

  .sm-advisor-stage {
    position: relative;
    margin: 18px;
    min-height: 572px;
    border-radius: 28px;
    border: 1px solid rgba(255, 255, 255, 0.07);
    background:
      radial-gradient(circle at 50% 16%, rgba(171, 214, 255, 0.12), transparent 15%),
      linear-gradient(180deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.012)),
      rgba(7, 18, 31, 0.9);
    overflow: hidden;
    transform-style: preserve-3d;
    cursor: pointer;
    transition:
      border-color var(--sm-duration-fast) var(--sm-ease-out),
      box-shadow var(--sm-duration-mid) var(--sm-ease-out),
      background var(--sm-duration-mid) var(--sm-ease-out),
      transform var(--sm-duration-fast) var(--sm-ease-out);
  }

  .sm-advisor-stage:hover {
    border-color: rgba(163, 209, 255, 0.16);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.05),
      0 24px 60px rgba(7, 18, 31, 0.3);
    transform: translateY(-1px);
  }

  .sm-advisor-stage:active {
    transform: translateY(1px) scale(0.996);
  }

  .sm-advisor-stage::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 50% 74%, rgba(79, 143, 225, 0.16), transparent 24%),
      linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.04) 100%);
  }

  .sm-advisor-grid {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
    background-size: 86px 86px;
    opacity: 0.32;
  }

  .sm-advisor-grid::after {
    content: "";
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 50% 34%, rgba(130, 189, 255, 0.16), transparent 22%),
      radial-gradient(circle at 50% 74%, rgba(84, 138, 214, 0.16), transparent 30%);
    opacity: 0.7;
    transition: opacity 320ms var(--sm-ease-out);
  }

  .sm-advisor-chip {
    position: absolute;
    z-index: 2;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(8, 21, 36, 0.74);
    color: rgba(234, 241, 252, 0.76);
    font-size: 12px;
    letter-spacing: 0.08em;
    transition:
      transform var(--sm-duration-fast) var(--sm-ease-out),
      border-color var(--sm-duration-fast) var(--sm-ease-out),
      background var(--sm-duration-fast) var(--sm-ease-out);
    pointer-events: none;
  }

  .sm-advisor-chip::before {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgba(142, 199, 255, 0.78);
  }

  .sm-advisor-chip--top {
    left: 22px;
    top: 22px;
  }

  .sm-advisor-chip--right {
    right: 22px;
    top: 22px;
  }

  .sm-advisor-figure {
    position: absolute;
    inset: 86px 36px 122px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    perspective: 1600px;
  }

  .sm-advisor-aura {
    position: absolute;
    left: 50%;
    bottom: 48px;
    width: 356px;
    height: 356px;
    transform: translateX(-50%);
    border-radius: 50%;
    background: radial-gradient(circle, rgba(125, 185, 255, 0.18), rgba(125, 185, 255, 0.02) 62%, transparent 72%);
    filter: blur(22px);
  }

  .sm-advisor-face-light {
    position: absolute;
    left: 50%;
    top: 82px;
    width: 170px;
    height: 182px;
    transform: translateX(-50%);
    border-radius: 50%;
    background:
      radial-gradient(circle at 50% 42%, rgba(248, 238, 228, 0.18), transparent 38%),
      radial-gradient(circle at 50% 52%, rgba(177, 208, 240, 0.16), transparent 58%);
    mix-blend-mode: screen;
    opacity: 0.6;
    filter: blur(12px);
    pointer-events: none;
  }

  .sm-advisor-edge-light {
    position: absolute;
    inset: 28px 36px 34px;
    border-radius: 220px 220px 32px 32px;
    background:
      radial-gradient(circle at 50% 14%, rgba(255, 255, 255, 0.12), transparent 28%),
      linear-gradient(180deg, rgba(183, 219, 255, 0.08), transparent 24%);
    opacity: 0.54;
    mix-blend-mode: screen;
    pointer-events: none;
  }

  .sm-advisor-outline {
    position: absolute;
    left: 50%;
    bottom: 18px;
    width: 408px;
    height: 408px;
    transform: translateX(-50%);
    border-radius: 50%;
    border: 1px solid rgba(141, 198, 255, 0.1);
    opacity: 0.42;
    transition:
      transform 520ms var(--sm-ease-soft),
      opacity var(--sm-duration-mid) var(--sm-ease-out),
      border-color var(--sm-duration-mid) var(--sm-ease-out);
  }

  .sm-advisor-portrait {
    position: relative;
    width: 366px;
    height: 458px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    filter: saturate(0.82) contrast(1.03) brightness(0.95);
    transform-style: preserve-3d;
  }

  .sm-advisor-portrait::before {
    position: absolute;
    content: "";
    inset: 22px 28px 10px;
    border-radius: 220px 220px 32px 32px;
    background:
      radial-gradient(circle at 50% 18%, rgba(198, 218, 244, 0.1), transparent 28%),
      linear-gradient(180deg, rgba(193, 214, 239, 0.08), rgba(162, 191, 226, 0.018)),
      rgba(10, 25, 42, 0.58);
    border: 1px solid rgba(199, 217, 240, 0.08);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.08),
      0 24px 64px rgba(0, 0, 0, 0.28);
  }

  .sm-advisor-image-wrap {
    position: absolute;
    inset: 0 12px 0;
    border-radius: 220px 220px 32px 32px;
    overflow: hidden;
    background:
      radial-gradient(circle at 50% 16%, rgba(163, 194, 230, 0.14), transparent 24%),
      linear-gradient(180deg, rgba(6, 17, 31, 0.22), rgba(6, 17, 31, 0.64));
    mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.98) 0%, rgba(0, 0, 0, 0.98) 82%, transparent 100%);
    box-shadow:
      inset 0 -88px 132px rgba(4, 11, 21, 0.62),
      inset 0 0 0 1px rgba(255, 255, 255, 0.05);
  }

  .sm-advisor-image {
    position: absolute;
    inset: -2% -2% 0 -2%;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 16%;
    mix-blend-mode: normal;
    opacity: 0.97;
    transform: scale(1.015);
    filter: saturate(0.98) contrast(1.03);
  }

  .sm-advisor-image-overlay {
    position: absolute;
    inset: 0;
    border-radius: 220px 220px 32px 32px;
    background:
      radial-gradient(circle at 50% 22%, rgba(143, 198, 255, 0.06), transparent 24%),
      linear-gradient(180deg, rgba(5, 13, 24, 0.06) 0%, rgba(5, 13, 24, 0.18) 42%, rgba(5, 13, 24, 0.8) 100%);
  }

  .sm-advisor-frame-glow {
    position: absolute;
    inset: 18px 22px -2px;
    border-radius: 220px 220px 42px 42px;
    border: 1px solid rgba(143, 198, 255, 0.1);
    opacity: 0.5;
  }

  .sm-advisor-coreline {
    position: absolute;
    left: 50%;
    top: 86px;
    width: 1px;
    height: 274px;
    transform: translateX(-50%);
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.18), rgba(116, 179, 255, 0.04));
  }

  .sm-advisor-welcome {
    position: absolute;
    left: 24px;
    top: 124px;
    width: 228px;
    min-height: 46px;
    padding: 8px 10px 8px 13px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.045), rgba(255, 255, 255, 0.018)),
      rgba(8, 21, 36, 0.76);
    backdrop-filter: blur(18px);
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.2);
    transform: translateZ(20px);
    pointer-events: auto;
  }

  .sm-advisor-welcome__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }

  .sm-advisor-voice {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.04);
    color: rgba(231, 239, 251, 0.74);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition:
      transform var(--sm-duration-fast) var(--sm-ease-out),
      border-color var(--sm-duration-fast) var(--sm-ease-out),
      background var(--sm-duration-fast) var(--sm-ease-out),
      color var(--sm-duration-fast) var(--sm-ease-out);
  }

  .sm-advisor-voice:hover {
    border-color: rgba(163, 209, 255, 0.18);
    background: rgba(255, 255, 255, 0.06);
    color: rgba(244, 248, 255, 0.92);
    transform: translateY(-1px);
  }

  .sm-advisor-voice:active {
    transform: translateY(1px) scale(0.97);
  }

  .sm-advisor-voice.is-speaking {
    color: var(--sm-blue-strong);
    border-color: rgba(163, 209, 255, 0.24);
    box-shadow: 0 0 0 8px rgba(61, 122, 226, 0.06);
  }

  .sm-advisor-welcome strong {
    display: block;
    color: rgba(244, 248, 255, 0.92);
    font-size: 12px;
    font-weight: 500;
    line-height: 1.5;
    letter-spacing: 0.01em;
  }

  .sm-advisor-copy {
    position: absolute;
    right: 24px;
    left: auto;
    bottom: 18px;
    width: min(286px, calc(100% - 56px));
  }

  .sm-advisor-card {
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.045), rgba(255, 255, 255, 0.018)),
      rgba(7, 19, 33, 0.78);
    padding: 16px 16px 14px;
    transition:
      transform var(--sm-duration-fast) var(--sm-ease-out),
      border-color var(--sm-duration-fast) var(--sm-ease-out),
      background var(--sm-duration-fast) var(--sm-ease-out),
      box-shadow var(--sm-duration-mid) var(--sm-ease-out);
  }

  .sm-advisor-card h3 {
    margin: 0;
    font-size: 15px;
    font-weight: 600;
    color: rgba(234, 241, 252, 0.84);
  }

  .sm-advisor-card p {
    margin: 8px 0 0;
    color: var(--sm-text-faint);
    font-size: 12px;
    line-height: 1.68;
  }

  .sm-advisor-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 14px;
  }

  .sm-advisor-actions .sm-button {
    min-height: 40px;
    padding: 0 16px;
    font-size: 13px;
  }

  .sm-advisor-bullets {
    display: grid;
    gap: 9px;
    margin-top: 14px;
  }

  .sm-advisor-bullet {
    padding: 12px 14px;
    border-radius: 16px;
    font-size: 13px;
    line-height: 1.75;
    color: rgba(233, 240, 252, 0.78);
    background: rgba(255, 255, 255, 0.05);
  }

  .sm-advisor-bullet strong {
    display: block;
    font-size: 14px;
    color: rgba(242, 247, 255, 0.94);
  }

  .sm-advisor-bullet span {
    display: block;
    margin-top: 6px;
    color: var(--sm-text-faint);
  }

  .sm-advisor-cta {
    margin-top: 14px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: var(--sm-blue);
    font-size: 13px;
    transition:
      transform var(--sm-duration-fast) var(--sm-ease-out),
      color var(--sm-duration-fast) var(--sm-ease-out);
  }

  .sm-advisor-card:hover {
    transform: translateY(-2px);
    border-color: rgba(163, 209, 255, 0.14);
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.025)),
      rgba(7, 19, 33, 0.86);
  }

  .sm-advisor-card:hover .sm-advisor-cta {
    transform: translateX(2px);
    color: var(--sm-blue-strong);
  }

  .sm-section-head {
    max-width: 720px;
    margin-bottom: 28px;
  }

  .sm-section-head h2 {
    margin: 18px 0 0;
    font-size: clamp(34px, 3vw, 46px);
    line-height: 1.14;
    letter-spacing: -0.03em;
  }

  .sm-section-head p {
    margin: 18px 0 0;
    color: var(--sm-text-soft);
    font-size: 16px;
    line-height: 1.9;
  }

  .sm-pain-grid,
  .sm-loop-grid,
  .sm-model-grid,
  .sm-cooperate-grid {
    display: grid;
    gap: 32px;
  }

  .sm-pain-grid {
    grid-template-columns: minmax(320px, 0.9fr) minmax(0, 1.1fr);
  }

  .sm-loop-grid {
    grid-template-columns: minmax(320px, 0.92fr) minmax(0, 1.08fr);
    align-items: start;
  }

  .sm-model-grid {
    grid-template-columns: minmax(320px, 0.95fr) minmax(0, 1.05fr);
    align-items: center;
  }

  .sm-cooperate-grid {
    grid-template-columns: minmax(320px, 0.82fr) minmax(0, 1.18fr);
    align-items: start;
  }

  .sm-panel-note {
    padding: 22px 22px 24px;
  }

  .sm-panel-note small {
    display: block;
    color: var(--sm-text-faint);
    font-size: 12px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  .sm-panel-note strong {
    display: block;
    margin-top: 12px;
    font-size: 28px;
    font-weight: 600;
  }

  .sm-panel-note p {
    margin: 14px 0 0;
    color: var(--sm-text-soft);
    font-size: 14px;
    line-height: 1.9;
  }

  .sm-link-inline {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-top: 18px;
    color: var(--sm-blue);
    font-size: 14px;
    transition:
      transform var(--sm-duration-fast) var(--sm-ease-out),
      color var(--sm-duration-fast) var(--sm-ease-out);
  }

  .sm-pain-cards,
  .sm-loop-cards {
    display: grid;
    gap: 16px;
  }

  .sm-pain-cards {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .sm-loop-cards {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .sm-pain-card,
  .sm-loop-card {
    width: 100%;
    text-align: left;
    color: var(--sm-text);
    transition:
      transform var(--sm-duration-fast) var(--sm-ease-out),
      border-color var(--sm-duration-fast) var(--sm-ease-out),
      background var(--sm-duration-fast) var(--sm-ease-out),
      box-shadow var(--sm-duration-mid) var(--sm-ease-out);
    will-change: transform;
  }

  .sm-pain-card {
    padding: 20px;
    border-radius: 24px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.025)),
      rgba(7, 19, 33, 0.78);
  }

  .sm-loop-card {
    min-height: 200px;
    padding: 22px;
    border-radius: 26px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02)),
      rgba(7, 19, 33, 0.78);
  }

  .sm-pain-card.is-active,
  .sm-loop-card.is-active,
  .sm-track-chip.is-active {
    border-color: rgba(142, 199, 255, 0.34);
    background:
      linear-gradient(180deg, rgba(143, 198, 255, 0.12), rgba(255, 255, 255, 0.03)),
      rgba(7, 19, 33, 0.82);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.06),
      0 20px 44px rgba(29, 67, 112, 0.18);
  }

  .sm-pain-card:hover,
  .sm-loop-card:hover {
    transform: translateY(-4px);
  }

  .sm-pain-card:active,
  .sm-loop-card:active {
    transform: translateY(0) scale(0.992);
  }

  .sm-card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  .sm-card-icon {
    width: 42px;
    height: 42px;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.05);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--sm-blue);
  }

  .sm-card-index {
    color: var(--sm-text-faint);
    font-size: 12px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }

  .sm-pain-card h3,
  .sm-loop-card h3 {
    margin: 18px 0 0;
    font-size: 20px;
    font-weight: 600;
  }

  .sm-pain-card p,
  .sm-loop-card p {
    margin: 12px 0 0;
    color: var(--sm-text-soft);
    font-size: 14px;
    line-height: 1.9;
  }

  .sm-loop-summary {
    display: grid;
    gap: 16px;
    margin-top: 26px;
  }

  .sm-loop-summary__item {
    padding: 14px 16px;
    border-radius: 18px;
    border: 1px solid rgba(255, 255, 255, 0.07);
    background: rgba(255, 255, 255, 0.03);
    color: rgba(235, 242, 252, 0.72);
    font-size: 14px;
  }

  .sm-model-board {
    position: relative;
    min-height: 560px;
    border-radius: 36px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background:
      radial-gradient(circle at 50% 48%, rgba(89, 151, 235, 0.14), transparent 28%),
      linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.018)),
      rgba(6, 17, 31, 0.82);
    overflow: hidden;
  }

  .sm-model-board::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
    background-size: 96px 96px;
    opacity: 0.35;
  }

  .sm-model-orbit {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 314px;
    height: 314px;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    border: 1px solid rgba(146, 194, 255, 0.12);
    box-shadow: inset 0 0 60px rgba(67, 120, 194, 0.08);
    transition:
      transform var(--sm-duration-mid) var(--sm-ease-soft),
      border-color var(--sm-duration-mid) var(--sm-ease-out),
      box-shadow var(--sm-duration-mid) var(--sm-ease-out);
  }

  .sm-model-svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  .sm-model-line {
    transition:
      opacity var(--sm-duration-fast) var(--sm-ease-out),
      filter var(--sm-duration-fast) var(--sm-ease-out);
  }

  .sm-model-core {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 196px;
    height: 196px;
    transform: translate(-50%, -50%);
    border-radius: 36px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background:
      linear-gradient(180deg, rgba(148, 203, 255, 0.2), rgba(255, 255, 255, 0.04)),
      rgba(9, 24, 40, 0.84);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 18px;
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.08),
      0 22px 52px rgba(16, 37, 61, 0.32);
    transition:
      transform var(--sm-duration-mid) var(--sm-ease-soft),
      border-color var(--sm-duration-mid) var(--sm-ease-out),
      box-shadow var(--sm-duration-mid) var(--sm-ease-out),
      background var(--sm-duration-mid) var(--sm-ease-out);
  }

  .sm-model-core strong {
    display: block;
    font-size: 26px;
    font-weight: 600;
  }

  .sm-model-core span {
    display: block;
    margin-top: 8px;
    color: var(--sm-text-faint);
    font-size: 13px;
    line-height: 1.7;
  }

  .sm-model-node {
    position: absolute;
    width: 210px;
    padding: 22px;
    border-radius: 28px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02)),
      rgba(8, 21, 36, 0.84);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.06),
      0 18px 44px rgba(0, 0, 0, 0.2);
    transition:
      transform var(--sm-duration-fast) var(--sm-ease-out),
      border-color var(--sm-duration-fast) var(--sm-ease-out),
      background var(--sm-duration-fast) var(--sm-ease-out),
      box-shadow var(--sm-duration-mid) var(--sm-ease-out);
  }

  .sm-model-node__label {
    width: 54px;
    height: 54px;
    border-radius: 18px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.06);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--sm-blue);
    font-size: 24px;
    font-weight: 600;
  }

  .sm-model-node h3 {
    margin: 14px 0 0;
    font-size: 24px;
    font-weight: 600;
  }

  .sm-model-node p {
    margin: 10px 0 0;
    color: var(--sm-text-faint);
    font-size: 14px;
    line-height: 1.85;
  }

  .sm-model-node__tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-top: 12px;
    color: rgba(206, 225, 248, 0.68);
    font-size: 12px;
    letter-spacing: 0.08em;
  }

  .sm-model-node.is-active,
  .sm-model-list__item.is-active {
    border-color: rgba(163, 209, 255, 0.22);
    background:
      linear-gradient(180deg, rgba(143, 198, 255, 0.12), rgba(255, 255, 255, 0.03)),
      rgba(8, 21, 36, 0.9);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.08),
      0 20px 48px rgba(24, 58, 99, 0.18);
  }

  .sm-model-node.is-active {
    transform: translateY(-4px);
  }

  .sm-model-board[data-active-node="S"] .sm-model-core,
  .sm-model-board[data-active-node="B"] .sm-model-core,
  .sm-model-board[data-active-node="C"] .sm-model-core {
    border-color: rgba(174, 216, 255, 0.18);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.1),
      0 26px 56px rgba(24, 58, 99, 0.24);
  }

  .sm-model-board[data-active-node="S"] .sm-model-orbit,
  .sm-model-board[data-active-node="B"] .sm-model-orbit,
  .sm-model-board[data-active-node="C"] .sm-model-orbit {
    border-color: rgba(174, 216, 255, 0.16);
    box-shadow: inset 0 0 80px rgba(67, 120, 194, 0.14);
    transform: translate(-50%, -50%) scale(1.02);
  }

  .sm-model-list {
    display: grid;
    gap: 14px;
    margin-top: 22px;
  }

  .sm-model-list__item {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 18px 20px;
    border-radius: 22px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.02)),
      rgba(8, 21, 36, 0.8);
    transition:
      transform var(--sm-duration-fast) var(--sm-ease-out),
      border-color var(--sm-duration-fast) var(--sm-ease-out),
      background var(--sm-duration-fast) var(--sm-ease-out),
      box-shadow var(--sm-duration-mid) var(--sm-ease-out);
  }

  .sm-model-list__item:hover {
    transform: translateY(-2px);
    border-color: rgba(163, 209, 255, 0.14);
  }

  .sm-model-list__item:active {
    transform: scale(0.992);
  }

  .sm-model-list__item strong {
    display: block;
    font-size: 20px;
    font-weight: 600;
  }

  .sm-model-list__item span {
    display: block;
    margin-top: 8px;
    color: var(--sm-text-faint);
    font-size: 14px;
  }

  .sm-services {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 18px;
    margin-top: 34px;
  }

  .sm-service-card {
    min-height: 100%;
    padding: 24px;
    border-radius: 30px;
    border-top: 1px solid rgba(167, 211, 255, 0.22);
    background:
      linear-gradient(180deg, rgba(16, 34, 58, 0.96), rgba(7, 18, 31, 0.98)),
      rgba(7, 19, 33, 0.72);
    transition:
      transform var(--sm-duration-fast) var(--sm-ease-out),
      border-color var(--sm-duration-fast) var(--sm-ease-out),
      background var(--sm-duration-fast) var(--sm-ease-out),
      box-shadow var(--sm-duration-mid) var(--sm-ease-out);
  }

  .sm-service-item:hover .sm-service-card {
    transform: translateY(-5px);
    border-top-color: rgba(193, 225, 255, 0.34);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.06),
      0 22px 48px rgba(14, 33, 57, 0.34);
  }

  .sm-service-item:active .sm-service-card {
    transform: translateY(-1px) scale(0.992);
  }

  .sm-service-item:hover .sm-link-inline {
    transform: translateX(3px);
    color: var(--sm-blue-strong);
  }

  .sm-service-card__tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 7px 12px;
    border-radius: 999px;
    border: 1px solid rgba(214, 187, 135, 0.18);
    background: rgba(214, 187, 135, 0.08);
    color: #ecd2a0;
    font-size: 11px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .sm-service-card h3 {
    margin: 18px 0 0;
    font-size: 34px;
    font-weight: 600;
    letter-spacing: -0.03em;
  }

  .sm-service-card p {
    margin: 10px 0 0;
    color: var(--sm-text-soft);
    font-size: 14px;
    line-height: 1.9;
  }

  .sm-service-list {
    display: grid;
    gap: 12px;
    margin-top: 22px;
  }

  .sm-service-list__item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 14px 16px;
    border-radius: 18px;
    border: 1px solid rgba(255, 255, 255, 0.07);
    background: rgba(255, 255, 255, 0.025);
    color: rgba(236, 242, 252, 0.8);
    font-size: 14px;
  }

  .sm-service-dot {
    width: 8px;
    height: 8px;
    margin-top: 6px;
    border-radius: 50%;
    background: var(--sm-blue);
    box-shadow: 0 0 14px rgba(142, 199, 255, 0.5);
  }

  .sm-track-row {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  .sm-track-chip {
    padding: 11px 16px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.03);
    color: rgba(231, 239, 251, 0.68);
    transition:
      transform var(--sm-duration-fast) var(--sm-ease-out),
      border-color var(--sm-duration-fast) var(--sm-ease-out),
      background var(--sm-duration-fast) var(--sm-ease-out),
      color var(--sm-duration-fast) var(--sm-ease-out),
      box-shadow var(--sm-duration-mid) var(--sm-ease-out);
  }

  .sm-track-chip:hover {
    color: var(--sm-text);
    transform: translateY(-1px);
    border-color: rgba(163, 209, 255, 0.14);
  }

  .sm-track-chip:active {
    transform: translateY(1px) scale(0.985);
  }

  .sm-track-panel {
    margin-top: 18px;
    padding: 24px;
    background:
      linear-gradient(180deg, rgba(15, 32, 55, 0.94), rgba(7, 18, 31, 0.96)),
      rgba(7, 19, 33, 0.74);
  }

  .sm-track-panel h3 {
    margin: 10px 0 0;
    font-size: 30px;
    font-weight: 600;
  }

  .sm-track-panel p {
    margin: 14px 0 0;
    color: var(--sm-text-soft);
    font-size: 14px;
    line-height: 1.9;
  }

  .sm-track-actions {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 14px;
    margin-top: 24px;
  }

  .sm-track-actions div {
    padding: 14px 16px;
    border-radius: 18px;
    border: 1px solid rgba(255, 255, 255, 0.07);
    background: rgba(255, 255, 255, 0.03);
    color: rgba(236, 242, 252, 0.78);
    font-size: 14px;
  }

  .sm-path-list {
    display: grid;
    gap: 14px;
    margin-top: 28px;
  }

  .sm-path-item {
    padding: 16px 18px;
    border-radius: 18px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.025);
    transition:
      transform var(--sm-duration-fast) var(--sm-ease-out),
      border-color var(--sm-duration-fast) var(--sm-ease-out),
      background var(--sm-duration-fast) var(--sm-ease-out);
  }

  .sm-path-item:hover {
    transform: translateY(-2px);
    border-color: rgba(163, 209, 255, 0.14);
    background: rgba(255, 255, 255, 0.032);
  }

  .sm-path-item strong {
    display: block;
    font-size: 16px;
    font-weight: 600;
  }

  .sm-path-item p {
    margin: 8px 0 0;
    color: var(--sm-text-faint);
    font-size: 14px;
    line-height: 1.85;
  }

  .sm-footer {
    padding-bottom: 68px;
  }

  .sm-footer__card {
    display: grid;
    grid-template-columns: minmax(0, 0.9fr) minmax(240px, 0.82fr) minmax(260px, 0.7fr);
    gap: 18px;
    padding: 24px 26px;
    border-radius: 32px;
    background:
      radial-gradient(circle at right top, rgba(143, 198, 255, 0.08), transparent 24%),
      linear-gradient(180deg, rgba(15, 31, 53, 0.94), rgba(7, 18, 31, 0.98)),
      rgba(7, 19, 33, 0.72);
  }

  .sm-footer__brand {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .sm-footer__logo {
    position: relative;
    width: 54px;
    height: 54px;
    flex: 0 0 auto;
    border-radius: 18px;
    border: 1px solid rgba(214, 187, 135, 0.2);
    background:
      linear-gradient(180deg, rgba(214, 187, 135, 0.16), rgba(214, 187, 135, 0.05));
    overflow: hidden;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
  }

  .sm-footer__logo img {
    object-fit: contain;
    padding: 6px;
    filter: drop-shadow(0 8px 20px rgba(214, 187, 135, 0.12));
  }

  .sm-footer__meta small {
    display: block;
    color: var(--sm-text-faint);
    font-size: 12px;
    letter-spacing: 0.24em;
    text-transform: uppercase;
  }

  .sm-footer__meta strong {
    display: block;
    margin-top: 6px;
    font-size: 22px;
    font-weight: 600;
  }

  .sm-footer__meta p {
    margin: 8px 0 0;
    color: var(--sm-text-soft);
    font-size: 13px;
    line-height: 1.8;
  }

  .sm-footer__desc {
    display: grid;
    gap: 12px;
    align-content: center;
    justify-items: center;
    text-align: center;
  }

  .sm-footer__center {
    max-width: 320px;
    justify-self: center;
    align-self: center;
    padding: 0 8px;
  }

  .sm-footer__center small {
    display: block;
    color: var(--sm-text-faint);
    font-size: 12px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .sm-footer__center strong {
    display: block;
    margin-top: 8px;
    color: rgba(244, 248, 255, 0.94);
    font-size: 17px;
    line-height: 1.45;
    font-weight: 600;
    letter-spacing: -0.01em;
  }

  .sm-footer__center p {
    margin: 7px 0 0;
    color: rgba(231, 239, 251, 0.78);
    font-size: 13px;
    line-height: 1.75;
  }

  .sm-footer__quicklinks {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    margin-top: 12px;
  }

  .sm-footer__quicklinks button,
  .sm-footer__quicklinks a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 34px;
    padding: 0 12px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.03);
    color: rgba(231, 239, 251, 0.76);
    font-size: 12px;
    transition:
      transform var(--sm-duration-fast) var(--sm-ease-out),
      border-color var(--sm-duration-fast) var(--sm-ease-out),
      background var(--sm-duration-fast) var(--sm-ease-out),
      color var(--sm-duration-fast) var(--sm-ease-out);
  }

  .sm-footer__quicklinks button:hover,
  .sm-footer__quicklinks a:hover {
    transform: translateY(-1px);
    border-color: rgba(163, 209, 255, 0.16);
    background: rgba(255, 255, 255, 0.045);
    color: rgba(244, 248, 255, 0.92);
  }

  .sm-footer__quicklinks button:active,
  .sm-footer__quicklinks a:active {
    transform: translateY(1px) scale(0.985);
  }

  .sm-footer__contact {
    display: block;
    width: min(100%, 296px);
    justify-self: end;
    padding: 14px 16px;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.03);
  }

  .sm-footer__contact-item {
    padding: 0;
    border-radius: 0;
    border: none;
    background: transparent;
  }

  .sm-footer__contact-item + .sm-footer__contact-item {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }

  .sm-footer__contact-item small {
    display: block;
    color: var(--sm-text-faint);
    font-size: 12px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .sm-footer__contact-item strong,
  .sm-footer__contact-item a {
    display: block;
    margin-top: 5px;
    color: rgba(244, 248, 255, 0.92);
    font-size: 15px;
    font-weight: 600;
  }

  .sm-footer__contact-item a {
    transition:
      color var(--sm-duration-fast) var(--sm-ease-out),
      transform var(--sm-duration-fast) var(--sm-ease-out);
  }

  .sm-footer__contact-item a:hover {
    color: var(--sm-blue-strong);
    transform: translateX(2px);
  }

  .sm-footer__contact-item a:active {
    transform: translateX(0);
  }

  .sm-chat-dock {
    position: fixed;
    right: 22px;
    bottom: 22px;
    z-index: 40;
  }

  .sm-chat-panel {
    width: 282px;
    margin-bottom: 10px;
    border-radius: 22px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02)),
      rgba(7, 19, 33, 0.9);
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.32);
    backdrop-filter: blur(28px);
    padding: 14px 14px 13px;
    transform-origin: bottom right;
  }

  .sm-chat-panel__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 12px;
  }

  .sm-chat-panel__head div {
    display: grid;
    grid-template-columns: 28px 1fr;
    align-items: center;
    column-gap: 8px;
    color: rgba(234, 240, 252, 0.82);
    font-size: 14px;
  }

  .sm-chat-avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.18);
    flex: 0 0 auto;
  }

  .sm-chat-avatar__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .sm-chat-panel__close {
    color: var(--sm-text-faint);
    background: transparent;
  }

  .sm-chat-panel__close:hover {
    color: var(--sm-text);
  }

  .sm-chat-panel__close:active {
    transform: translateY(1px) scale(0.98);
  }

  .sm-chat-list {
    display: none;
  }

  .sm-chat-summary {
    margin-top: 2px;
    padding: 11px 12px;
    border-radius: 14px;
    border: 1px solid rgba(255, 255, 255, 0.06);
    background: rgba(255, 255, 255, 0.03);
    color: rgba(233, 240, 252, 0.76);
    font-size: 12px;
    line-height: 1.7;
  }

  .sm-chat-input {
    margin-top: 9px;
    color: var(--sm-text-faint);
    font-size: 12px;
    line-height: 1.7;
  }

  .sm-chat-contact {
    margin-top: 12px;
    padding: 12px 14px;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.03);
  }

  .sm-chat-contact small {
    display: block;
    color: var(--sm-text-faint);
    font-size: 12px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .sm-chat-contact strong {
    display: block;
    margin-top: 5px;
    font-size: 16px;
    font-weight: 600;
    color: rgba(244, 248, 255, 0.92);
  }

  .sm-chat-contact a {
    display: inline-flex;
    margin-top: 6px;
    color: var(--sm-blue);
    font-size: 14px;
    font-weight: 500;
  }

  .sm-chat-actions {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
    margin-top: 12px;
  }

  .sm-chat-actions .sm-button {
    min-height: 42px;
    width: 100%;
    padding: 0 14px;
    font-size: 13px;
  }

  .sm-chat-trigger {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    border: 1px solid rgba(142, 199, 255, 0.24);
    background:
      linear-gradient(180deg, rgba(143, 198, 255, 0.22), rgba(143, 198, 255, 0.08)),
      rgba(7, 19, 33, 0.72);
    color: var(--sm-blue);
    box-shadow: 0 16px 34px rgba(38, 83, 132, 0.32);
    backdrop-filter: blur(24px);
    transition:
      transform var(--sm-duration-fast) var(--sm-ease-out),
      border-color var(--sm-duration-fast) var(--sm-ease-out),
      box-shadow var(--sm-duration-mid) var(--sm-ease-out),
      filter var(--sm-duration-fast) var(--sm-ease-out);
  }

  .sm-chat-trigger__avatar {
    position: absolute;
    inset: 4px;
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.14);
  }

  .sm-chat-trigger__avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .sm-chat-trigger__dot {
    position: absolute;
    right: 4px;
    bottom: 4px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #8ec7ff;
    box-shadow:
      0 0 0 2px rgba(7, 19, 33, 0.9),
      0 0 14px rgba(142, 199, 255, 0.52);
  }

  .sm-chat-trigger:hover {
    transform: translateY(-2px) scale(1.02);
    border-color: rgba(174, 216, 255, 0.34);
    box-shadow:
      0 18px 38px rgba(38, 83, 132, 0.36),
      0 0 0 8px rgba(61, 122, 226, 0.08);
    filter: brightness(1.06);
  }

  .sm-chat-trigger:active {
    transform: translateY(1px) scale(0.97);
  }

  .sm-modal-backdrop {
    position: fixed;
    inset: 0;
    z-index: 50;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: rgba(4, 11, 21, 0.62);
    backdrop-filter: blur(14px);
  }

  .sm-modal-card {
    width: min(100%, 460px);
    padding: 24px;
    border-radius: 28px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background:
      radial-gradient(circle at right top, rgba(143, 198, 255, 0.08), transparent 22%),
      linear-gradient(180deg, rgba(16, 34, 58, 0.96), rgba(7, 18, 31, 0.98)),
      rgba(7, 19, 33, 0.9);
    box-shadow: 0 28px 80px rgba(0, 0, 0, 0.38);
  }

  .sm-modal-card small {
    display: block;
    color: var(--sm-text-faint);
    font-size: 12px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .sm-modal-card h3 {
    margin: 12px 0 0;
    font-size: 32px;
    line-height: 1.15;
    letter-spacing: -0.03em;
  }

  .sm-modal-card p {
    margin: 14px 0 0;
    color: var(--sm-text-soft);
    font-size: 15px;
    line-height: 1.85;
  }

  .sm-modal-contact {
    display: grid;
    gap: 12px;
    margin-top: 22px;
  }

  .sm-modal-contact div {
    padding: 14px 16px;
    border-radius: 18px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.03);
  }

  .sm-modal-contact span {
    display: block;
    color: var(--sm-text-faint);
    font-size: 12px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .sm-modal-contact strong,
  .sm-modal-contact a {
    display: block;
    margin-top: 6px;
    color: rgba(244, 248, 255, 0.92);
    font-size: 16px;
    font-weight: 600;
  }

  .sm-modal-contact a:hover {
    color: var(--sm-blue-strong);
  }

  .sm-modal-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 22px;
  }

  .sm-modal-actions .sm-button {
    min-height: 46px;
    padding: 0 20px;
  }

  @media (max-width: 1180px) {
    .sm-nav {
      display: none;
    }

    .sm-hero {
      grid-template-columns: 1fr;
      min-height: auto;
      padding-top: 44px;
    }

    .sm-hero__content {
      max-width: none;
    }

    .sm-hero__visual {
      justify-content: center;
    }

    .sm-pain-grid,
    .sm-loop-grid,
    .sm-model-grid,
    .sm-cooperate-grid {
      grid-template-columns: 1fr;
    }

    .sm-hero__signals,
    .sm-trust-band__lead,
    .sm-trust-band__items,
    .sm-pain-cards,
    .sm-services {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .sm-advisor-shell {
      min-height: 680px;
    }

    .sm-footer__card {
      grid-template-columns: 1fr;
    }

    .sm-footer__desc {
      justify-items: start;
      text-align: left;
    }

    .sm-footer__center {
      justify-self: start;
      padding: 0;
    }

    .sm-footer__quicklinks {
      justify-content: flex-start;
    }

    .sm-footer__contact {
      justify-self: start;
      width: 100%;
    }
  }

  @media (max-width: 860px) {
    .sm-shell {
      padding: 0 18px;
    }

    .sm-header__inner {
      min-height: 74px;
    }

    .sm-button {
      min-height: 46px;
      padding: 0 18px;
    }

    .sm-hero__title {
      font-size: 44px;
    }

    .sm-hero__subtitle {
      font-size: 16px;
    }

    .sm-hero__signals,
    .sm-trust-band__lead,
    .sm-trust-band__items,
    .sm-pain-cards,
    .sm-loop-cards,
    .sm-services,
    .sm-track-actions {
      grid-template-columns: 1fr;
    }

    .sm-advisor-shell {
      min-height: 692px;
      padding: 14px;
    }

    .sm-advisor-body {
      min-height: 650px;
    }

    .sm-advisor-stage {
      min-height: 546px;
    }

    .sm-advisor-figure {
      inset: 80px 20px 132px;
    }

    .sm-advisor-portrait {
      width: 324px;
      height: 404px;
    }

    .sm-advisor-chip--right {
      top: 22px;
      right: 22px;
    }

    .sm-advisor-welcome {
      left: 18px;
      top: 104px;
      width: min(214px, calc(100% - 132px));
    }

    .sm-advisor-copy {
      width: calc(100% - 36px);
    }

    .sm-model-board {
      min-height: 760px;
    }

    .sm-model-node {
      width: calc(100% - 36px);
      left: 18px !important;
      right: 18px !important;
      transform: none !important;
    }

    .sm-model-node--top {
      top: 26px !important;
    }

    .sm-model-node--left {
      top: 278px !important;
      bottom: auto !important;
    }

    .sm-model-node--right {
      top: auto !important;
      bottom: 26px !important;
    }

    .sm-model-orbit,
    .sm-model-svg {
      display: none;
    }

    .sm-footer__card {
      padding: 24px;
    }

    .sm-footer__desc {
      text-align: left;
    }
  }

  @media (max-width: 640px) {
    .sm-header__inner {
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 16px;
      padding: 14px 0;
    }

    .sm-header__inner > .sm-button {
      width: 100%;
    }

    .sm-hero {
      padding-top: 24px;
      padding-bottom: 74px;
      gap: 28px;
    }

    .sm-hero__title {
      font-size: 38px;
    }

    .sm-main section {
      padding-bottom: 82px;
    }

    .sm-chat-panel {
      width: min(292px, calc(100vw - 28px));
    }

    .sm-modal-backdrop {
      padding: 16px;
      align-items: end;
    }

    .sm-modal-card {
      width: 100%;
      max-width: none;
    }

    .sm-chat-dock {
      right: 14px;
      bottom: 14px;
    }
  }
`;

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="sm-eyebrow">
      <CircleDot size={12} />
      {children}
    </div>
  );
}

function SurfaceCard({
  children,
  className = '',
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={`sm-surface ${className}`.trim()} style={style}>
      {children}
    </div>
  );
}

export default function ShanmeiEcoHomepageV1() {
  const [activePain, setActivePain] = useState(painPoints[0]);
  const [activeLoop, setActiveLoop] = useState(loops[2]);
  const [activeTrack, setActiveTrack] = useState(tracks[1]);
  const [activeModelNode, setActiveModelNode] = useState<(typeof modelNodes)[number]['id']>('B');
  const [activeSection, setActiveSection] = useState<(typeof navItems)[number]['href'] | ''>('');
  const [openChat, setOpenChat] = useState(false);
  const [consultDialog, setConsultDialog] = useState<'diagnosis' | 'cooperate' | null>(null);
  const [advisorHovered, setAdvisorHovered] = useState(false);
  const [isWelcomeSpeaking, setIsWelcomeSpeaking] = useState(false);
  const [advisorVoice, setAdvisorVoice] = useState<SpeechSynthesisVoice | null>(null);

  const advisorPointerX = useMotionValue(0.5);
  const advisorPointerY = useMotionValue(0.5);
  const advisorPointerXSmooth = useSpring(advisorPointerX, {
    stiffness: 160,
    damping: 20,
    mass: 0.45,
  });
  const advisorPointerYSmooth = useSpring(advisorPointerY, {
    stiffness: 160,
    damping: 20,
    mass: 0.45,
  });
  const advisorRotateY = useTransform(advisorPointerXSmooth, [0, 1], [-5, 5]);
  const advisorRotateX = useTransform(advisorPointerYSmooth, [0, 1], [4, -5]);
  const advisorTranslateX = useTransform(advisorPointerXSmooth, [0, 1], [-10, 10]);
  const advisorTranslateY = useTransform(advisorPointerYSmooth, [0, 1], [-8, 8]);
  const advisorHaloX = useTransform(advisorPointerXSmooth, [0, 1], ['40%', '60%']);
  const advisorHaloY = useTransform(advisorPointerYSmooth, [0, 1], ['24%', '38%']);
  const advisorHalo = useMotionTemplate`radial-gradient(circle at ${advisorHaloX} ${advisorHaloY}, rgba(145, 203, 255, 0.18), transparent 24%)`;

  const activePainIndex = painPoints.findIndex((item) => item.key === activePain.key) + 1;
  const consultDialogTitle = consultDialog === 'cooperate' ? '申请合作咨询' : '预约企业诊断';

  const activeTrackDesc = useMemo(() => {
    return `${activeTrack} 赛道聚焦产业协同、合作对接与资源链接，帮助企业在平台内建立更稳定的项目连接与增长协同关系。`;
  }, [activeTrack]);

  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    setActiveSection(href as (typeof navItems)[number]['href']);
    scrollToSection(href);
  };

  const handleAdvisorMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const nextX = (event.clientX - bounds.left) / bounds.width;
    const nextY = (event.clientY - bounds.top) / bounds.height;

    advisorPointerX.set(Math.min(1, Math.max(0, nextX)));
    advisorPointerY.set(Math.min(1, Math.max(0, nextY)));
  };

  const resetAdvisorMotion = () => {
    setAdvisorHovered(false);
    advisorPointerX.set(0.5);
    advisorPointerY.set(0.5);
  };

  const openAdvisorPanel = () => {
    setOpenChat(true);
  };

  const handleAdvisorKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openAdvisorPanel();
    }
  };

  const handleWelcomeVoice = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const synth = window.speechSynthesis;

    if (synth.speaking) {
      synth.cancel();
      setIsWelcomeSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(advisorWelcomeText);
    utterance.lang = 'zh-CN';
    utterance.rate = 0.92;
    utterance.pitch = 0.94;
    utterance.volume = 1;
    if (advisorVoice) {
      utterance.voice = advisorVoice;
    }
    utterance.onstart = () => setIsWelcomeSpeaking(true);
    utterance.onend = () => setIsWelcomeSpeaking(false);
    utterance.onerror = () => setIsWelcomeSpeaking(false);

    synth.cancel();
    synth.speak(utterance);
  };

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return;

    const visibility = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibility.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        const next = [...visibility.entries()]
          .sort((a, b) => b[1] - a[1])
          .find(([, ratio]) => ratio > 0.18);

        if (next) {
          setActiveSection(`#${next[0]}` as (typeof navItems)[number]['href']);
        }
      },
      {
        rootMargin: '-26% 0px -46% 0px',
        threshold: [0.12, 0.24, 0.4, 0.56, 0.72],
      },
    );

    sections.forEach((section) => {
      visibility.set(section.id, 0);
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return undefined;

    const synth = window.speechSynthesis;

    const resolveVoice = () => {
      const voices = synth.getVoices();
      if (!voices.length) return;

      const preferredMatchers = [
        /xiaoxiao/i,
        /xiaoyi/i,
        /tingting/i,
        /huihui/i,
        /meijia/i,
        /female/i,
        /woman/i,
      ];

      const zhVoices = voices.filter((voice) => /zh|cmn/i.test(`${voice.lang} ${voice.name}`));
      const preferred =
        zhVoices.find((voice) => preferredMatchers.some((matcher) => matcher.test(voice.name))) ??
        zhVoices.find((voice) => /zh-CN|cmn-CN/i.test(voice.lang)) ??
        zhVoices[0] ??
        null;

      setAdvisorVoice(preferred);
    };

    resolveVoice();
    synth.addEventListener?.('voiceschanged', resolveVoice);

    return () => {
      synth.cancel();
      synth.removeEventListener?.('voiceschanged', resolveVoice);
    };
  }, []);

  return (
    <div className="sm-homepage">
      <style suppressHydrationWarning dangerouslySetInnerHTML={{ __html: pageStyles }} />
      <div className="sm-grid-overlay" />

      <header className="sm-header">
        <div className="sm-shell sm-header__inner">
          <div className="sm-brand">
            <div className="sm-brand__mark">
              <Image
                src={withStaticBasePath('/assets/logo/shanmei-logo-gold.png')}
                alt="善美生态 Logo"
                fill
                sizes="44px"
                className="sm-brand__image"
              />
            </div>
            <div className="sm-brand__meta">
              <small>Shanmei Eco</small>
              <strong>善美生态</strong>
            </div>
          </div>

          <nav className="sm-nav">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={activeSection === item.href ? 'is-active' : ''}
                onClick={(event) => handleNavClick(event, item.href)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            className="sm-button sm-button--secondary"
            type="button"
            onClick={() => setConsultDialog('diagnosis')}
          >
            预约企业诊断
          </button>
        </div>
      </header>

      <main className="sm-main">
        <section className="sm-shell sm-hero">
          <div className="sm-hero__content">
            <SectionEyebrow>企业增长进化平台</SectionEyebrow>

            <div className="sm-hero__trustline">
              <span>面向董事长 / CEO / 创始人</span>
              <span>增长、招商与 AI 经营协同</span>
            </div>

            <h1 className="sm-hero__title">
              让企业增长，
              <br />
              从资源驱动走向系统驱动
            </h1>

            <p className="sm-hero__subtitle">
              善美生态围绕增长诊断、招商协同、AI 经营提效与生态链接，为中大型企业提供更稳定、更可复制的系统化增长支持。
            </p>

            <div className="sm-hero__actions">
              <motion.button
                className="sm-button sm-button--primary"
                type="button"
                onClick={() => setConsultDialog('diagnosis')}
                whileHover={{ y: -2 }}
                whileTap={{ y: 1, scale: 0.985 }}
              >
                预约企业诊断 <ArrowRight size={16} />
              </motion.button>
              <motion.button
                className="sm-button sm-button--secondary"
                type="button"
                onClick={() => scrollToSection('#cooperate')}
                whileHover={{ y: -1 }}
                whileTap={{ y: 1, scale: 0.987 }}
              >
                了解合作机制
              </motion.button>
            </div>

            <div className="sm-hero__bridge">{heroBridgeText}</div>

            <div className="sm-hero__signals">
              {heroSignals.map((signal) => (
                <SurfaceCard key={signal.label} className="sm-signal-card">
                  <strong>{signal.value}</strong>
                  <h3>{signal.label}</h3>
                  <p>{signal.note}</p>
                </SurfaceCard>
              ))}
            </div>

            <div className="sm-hero__meta">
              <span>经营诊断</span>
              <span>招商协同</span>
              <span>AI 提效</span>
            </div>
          </div>

          <div className="sm-hero__visual">
            <SurfaceCard className="sm-advisor-shell">
              <div className="sm-advisor-body">
                <div className="sm-advisor-topbar">
                  <small>Zhiyu Executive Advisory</small>
                  <span>
                    <Waves size={14} />
                    顾问在线
                  </span>
                </div>

                <motion.div
                  className="sm-advisor-stage"
                  onMouseEnter={() => setAdvisorHovered(true)}
                  onMouseMove={handleAdvisorMove}
                  onMouseLeave={resetAdvisorMotion}
                  onClick={openAdvisorPanel}
                  onKeyDown={handleAdvisorKeyDown}
                  role="button"
                  tabIndex={0}
                  aria-label="打开知予顾问入口"
                  whileTap={{ scale: 0.997, y: 1 }}
                >
                  <div className="sm-advisor-grid" />
                  <motion.div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      pointerEvents: 'none',
                      background: advisorHalo,
                      opacity: advisorHovered ? 1 : 0.62,
                      transition: 'opacity 260ms cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                  />
                  <div className="sm-advisor-chip sm-advisor-chip--top">顾问式企业诊断入口</div>
                  <div className="sm-advisor-chip sm-advisor-chip--right">战略 / 招商 / AI 提效</div>

                  <div className="sm-advisor-figure">
                    <motion.div
                      className="sm-advisor-aura"
                      animate={advisorHovered ? { opacity: 0.96, scale: 1.05 } : { opacity: [0.74, 0.98, 0.74], scale: [1, 1.03, 1] }}
                      transition={
                        advisorHovered
                          ? { duration: 0.42, ease: [0.22, 1, 0.36, 1] }
                          : { repeat: Infinity, duration: 5.2, ease: 'easeInOut' }
                      }
                    />
                    <motion.div
                      className="sm-advisor-outline"
                      style={{
                        x: advisorTranslateX,
                        y: advisorTranslateY,
                        rotateX: advisorRotateX,
                        rotateY: advisorRotateY,
                      }}
                    />

                    <motion.div
                      className="sm-advisor-portrait"
                      animate={advisorHovered ? { y: -3 } : { y: [0, -5, 0] }}
                      transition={
                        advisorHovered
                          ? { duration: 0.32, ease: [0.22, 1, 0.36, 1] }
                          : { repeat: Infinity, duration: 5.8, ease: 'easeInOut' }
                      }
                      style={{
                        x: advisorTranslateX,
                        y: advisorTranslateY,
                        rotateX: advisorRotateX,
                        rotateY: advisorRotateY,
                      }}
                    >
                      <div className="sm-advisor-image-wrap">
                        <Image
                          src={withStaticBasePath('/assets/digital-human/zhiyu-hero.png')}
                          alt="知予数字顾问主视觉"
                          fill
                          priority
                          sizes="(max-width: 860px) 320px, 390px"
                          className="sm-advisor-image"
                        />
                        <div className="sm-advisor-face-light" />
                        <div className="sm-advisor-edge-light" />
                        <div className="sm-advisor-image-overlay" />
                      </div>
                      <div className="sm-advisor-frame-glow" />
                      <div className="sm-advisor-coreline" />
                    </motion.div>

                    <AnimatePresence>
                      {advisorHovered && (
                        <motion.div
                          className="sm-advisor-welcome"
                          initial={{ opacity: 0, y: 10, x: -10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, x: -8, scale: 0.98 }}
                          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                          onClick={openAdvisorPanel}
                        >
                          <div className="sm-advisor-welcome__head">
                            <strong>{advisorWelcomeText}</strong>
                            <button
                              className={`sm-icon-button sm-advisor-voice ${isWelcomeSpeaking ? 'is-speaking' : ''}`.trim()}
                              type="button"
                              aria-label="播放欢迎语"
                              onClick={handleWelcomeVoice}
                            >
                              <Volume2 size={14} />
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="sm-advisor-copy">
                    <div className="sm-advisor-card">
                      <h3>知予 · AI 共创顾问</h3>
                      <p>以顾问式问答协助企业先完成首轮判断，再进入更准确的诊断与协同沟通。</p>
                      <div className="sm-advisor-actions">
                        <button
                          className="sm-button sm-button--primary"
                          type="button"
                          onClick={openAdvisorPanel}
                        >
                          进入顾问入口
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </SurfaceCard>
          </div>
        </section>

        <section className="sm-shell sm-trust-band">
          <SurfaceCard className="sm-trust-band__card">
            <div className="sm-trust-band__lead">
              <strong>不是单点咨询，而是面向企业增长的协同进化平台。</strong>
              <p>以顾问判断、协同推进与平台链接三层能力，为企业提供更稳定的增长承接与合作入口。</p>
            </div>

            <div className="sm-trust-band__items">
              {trustProofItems.map((item) => (
                <div key={item.title} className="sm-trust-band__item">
                  <strong>{item.title}</strong>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          </SurfaceCard>
        </section>

        <section id="pain" className="sm-shell">
          <div className="sm-section-head">
            <SectionEyebrow>核心痛点</SectionEyebrow>
            <h2>企业增长，通常卡在六个关键节点</h2>
            <p>善美生态将企业经营中最常见的六类阻滞问题拆解为可识别、可沟通、可行动的结构，帮助管理者快速判断增长卡点。</p>
          </div>

          <div className="sm-pain-grid">
            <div>
              <SurfaceCard className="sm-panel-note">
                <small>当前关注 / 0{activePainIndex}</small>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePain.key}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                  >
                    <strong>{activePain.title}</strong>
                    <p>{activePain.desc}</p>
                    <p style={{ marginTop: 12 }}>{activePain.tip}</p>
                  </motion.div>
                </AnimatePresence>

                <div className="sm-link-inline">
                  查看适配方案 <ChevronRight size={16} />
                </div>
              </SurfaceCard>

              <div className="sm-loop-summary">
                {[
                  '先识别主问题，再确定资源、组织与渠道的动作优先级。',
                  '用经营结构看问题，而不是用单点现象看问题。',
                  '把复杂经营问题转化为更清晰的判断与行动路径。',
                ].map((item) => (
                  <div key={item} className="sm-loop-summary__item">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="sm-pain-cards">
              {painPoints.map((item, index) => {
                const Icon = item.icon;
                const active = item.key === activePain.key;

                return (
                  <motion.button
                    key={item.key}
                    className={`sm-chip-button sm-pain-card ${active ? 'is-active' : ''}`.trim()}
                    type="button"
                    onMouseEnter={() => setActivePain(item)}
                    onFocus={() => setActivePain(item)}
                    onClick={() => setActivePain(item)}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.995 }}
                  >
                    <div className="sm-card-top">
                      <div className="sm-card-icon">
                        <Icon size={18} />
                      </div>
                      <span className="sm-card-index">0{index + 1}</span>
                    </div>

                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </section>

        <section id="loops" className="sm-shell">
          <SurfaceCard style={{ padding: 32 }}>
            <div className="sm-loop-grid">
              <div>
                <SectionEyebrow>平台底层能力</SectionEyebrow>
                <h2 style={{ margin: '18px 0 0', fontSize: 'clamp(34px, 3vw, 46px)', lineHeight: 1.14 }}>
                  不只解决问题，更重构增长底座
                </h2>
                <p style={{ margin: '18px 0 0', color: 'rgba(231, 239, 251, 0.72)', fontSize: 16, lineHeight: 1.9 }}>
                  五大闭环覆盖认知、产业、AI、组织与资本能力，帮助企业在增长之外形成更完整的经营底座。
                </p>

                <SurfaceCard className="sm-panel-note" style={{ marginTop: 28 }}>
                  <small>当前聚焦</small>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeLoop.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.22, ease: 'easeOut' }}
                    >
                      <strong>{activeLoop.title}</strong>
                      <p>{activeLoop.desc}</p>
                    </motion.div>
                  </AnimatePresence>
                </SurfaceCard>

                <div className="sm-loop-summary">
                  {[
                    '以商学作为认知与方法底座。',
                    '以产业协同承接项目与资源网络。',
                    '以数字化、组织和资本能力完成放大。',
                  ].map((item) => (
                    <div key={item} className="sm-loop-summary__item">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="sm-loop-cards">
                {loops.map((item, index) => {
                  const Icon = item.icon;
                  const active = item.title === activeLoop.title;

                  return (
                    <motion.button
                      key={item.title}
                      className={`sm-chip-button sm-loop-card ${active ? 'is-active' : ''}`.trim()}
                      type="button"
                      onMouseEnter={() => setActiveLoop(item)}
                      onFocus={() => setActiveLoop(item)}
                      onClick={() => setActiveLoop(item)}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ delay: index * 0.06 }}
                    >
                      <div className="sm-card-top">
                        <div className="sm-card-icon">
                          <Icon size={18} />
                        </div>
                        <span className="sm-card-index">0{index + 1}</span>
                      </div>

                      <h3>{item.title}</h3>
                      <p>{item.desc}</p>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </SurfaceCard>
        </section>

        <section id="model" className="sm-shell">
          <div className="sm-model-grid">
            <div>
              <div className="sm-section-head" style={{ marginBottom: 0 }}>
                <SectionEyebrow>S-B-C 三共创模型</SectionEyebrow>
                <h2>以供应链、运营链、消费链，形成协同增长结构</h2>
                <p>三共创模型以资源组织、运营落地与流量转化三链协同，构成平台服务企业增长的核心结构。</p>
              </div>

              <div className="sm-model-list">
                {[
                  ['S', 'S｜供应链', '资本共创，资源背书'],
                  ['B', 'B｜运营链', '运营共创，落地执行'],
                  ['C', 'C｜消费链', '流量共创，获客转化'],
                ].map(([id, title, desc]) => (
                  <motion.button
                    key={title}
                    className={`sm-chip-button sm-model-list__item ${activeModelNode === id ? 'is-active' : ''}`.trim()}
                    type="button"
                    onMouseEnter={() => setActiveModelNode(id as (typeof modelNodes)[number]['id'])}
                    onFocus={() => setActiveModelNode(id as (typeof modelNodes)[number]['id'])}
                    onClick={() => setActiveModelNode(id as (typeof modelNodes)[number]['id'])}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.992 }}
                  >
                    <div>
                      <strong>{title}</strong>
                      <span>{desc}</span>
                    </div>
                    <ChevronRight size={18} color="rgba(255,255,255,0.26)" />
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="sm-model-board" data-active-node={activeModelNode}>
              <div className="sm-model-orbit" />
              <motion.svg
                className="sm-model-svg"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <motion.line
                  className="sm-model-line"
                  x1="50"
                  y1="23"
                  x2="50"
                  y2="40"
                  stroke="#a9d8ff"
                  strokeWidth="0.22"
                  animate={{ opacity: activeModelNode === 'S' ? 1 : 0.38 }}
                />
                <motion.line
                  className="sm-model-line"
                  x1="32"
                  y1="72"
                  x2="43.5"
                  y2="58"
                  stroke="#a9d8ff"
                  strokeWidth="0.22"
                  animate={{ opacity: activeModelNode === 'B' ? 1 : 0.38 }}
                />
                <motion.line
                  className="sm-model-line"
                  x1="68"
                  y1="72"
                  x2="56.5"
                  y2="58"
                  stroke="#a9d8ff"
                  strokeWidth="0.22"
                  animate={{ opacity: activeModelNode === 'C' ? 1 : 0.38 }}
                />
              </motion.svg>

              <div className="sm-model-core">
                <div>
                  <strong>善美生态平台</strong>
                  <span>链接资源、方法、组织与资本的协同中台</span>
                </div>
              </div>

              {modelNodes.map((node) => (
                <motion.div
                  key={node.id}
                  className={`${node.className} ${activeModelNode === node.id ? 'is-active' : ''}`.trim()}
                  style={node.style}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.992 }}
                  onMouseEnter={() => setActiveModelNode(node.id)}
                >
                  <div className="sm-model-node__label">{node.id}</div>
                  <h3>{node.title}</h3>
                  <p>{node.desc}</p>
                  <div className="sm-model-node__tag">{node.tag}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="sm-shell">
          <div className="sm-section-head">
            <SectionEyebrow>三大服务体系</SectionEyebrow>
            <h2>三大服务体系，匹配不同阶段企业的经营诉求</h2>
            <p>围绕不同阶段企业的战略升级、模式重构与执行突破，形成清晰的服务分层与协同路径。</p>
          </div>

          <div className="sm-services">
            {serviceCards.map((card, index) => (
              <motion.div
                className="sm-service-item"
                key={card.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.07 }}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.994 }}
              >
                <SurfaceCard className="sm-service-card">
                  <div className="sm-service-card__tag">{card.tag}</div>
                  <h3>{card.title}</h3>
                  <p>{card.audience}</p>

                  <div className="sm-service-list">
                    {card.bullets.map((bullet) => (
                      <div key={bullet} className="sm-service-list__item">
                        <div className="sm-service-dot" />
                        {bullet}
                      </div>
                    ))}
                  </div>

                  <div className="sm-link-inline" style={{ marginTop: 24 }}>
                    查看适配方案 <ChevronRight size={16} />
                  </div>
                </SurfaceCard>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="cooperate" className="sm-shell" style={{ paddingBottom: 60 }}>
          <SurfaceCard style={{ padding: 32 }}>
            <div className="sm-cooperate-grid">
              <div>
                <SectionEyebrow>项目协同与合作入口</SectionEyebrow>
                <h2 style={{ margin: '18px 0 0', fontSize: 'clamp(34px, 3vw, 46px)', lineHeight: 1.14 }}>
                  构建更高效的合作连接与项目协同入口
                </h2>
                <p style={{ margin: '18px 0 0', color: 'rgba(231, 239, 251, 0.72)', fontSize: 16, lineHeight: 1.9 }}>
                  以合作咨询、赛道入口与资源链接为核心，让企业更高效地进入平台协同关系，拓展项目、合作与生态连接的机会。
                </p>

                <div className="sm-hero__actions" style={{ marginTop: 30 }}>
                  <motion.button
                    className="sm-button sm-button--gold"
                    type="button"
                    onClick={() => setConsultDialog('cooperate')}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 1, scale: 0.985 }}
                  >
                    申请合作咨询
                  </motion.button>
                  <motion.button
                    className="sm-button sm-button--secondary"
                    type="button"
                    onClick={() => setConsultDialog('diagnosis')}
                    whileHover={{ y: -1 }}
                    whileTap={{ y: 1, scale: 0.987 }}
                  >
                    预约企业诊断
                  </motion.button>
                </div>

                <div className="sm-path-list">
                  {[
                    ['合作咨询', '明确企业阶段、合作目标与核心协同诉求。'],
                    ['项目匹配', '结合赛道与资源结构进入对接、评估与研判。'],
                    ['生态协同', '围绕长期合作关系形成更稳定的生态连接。'],
                  ].map(([title, desc]) => (
                    <div key={title} className="sm-path-item">
                      <strong>{title}</strong>
                      <p>{desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="sm-track-row">
                  {tracks.map((track) => {
                    const active = track === activeTrack;

                    return (
                      <button
                        key={track}
                        className={`sm-chip-button sm-track-chip ${active ? 'is-active' : ''}`.trim()}
                        type="button"
                        onClick={() => setActiveTrack(track)}
                      >
                        {track}
                      </button>
                    );
                  })}
                </div>

                <SurfaceCard className="sm-track-panel">
                  <small style={{ display: 'block', color: 'rgba(214,227,245,0.48)', fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                    当前赛道
                  </small>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTrack}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.22, ease: 'easeOut' }}
                    >
                      <h3>{activeTrack}</h3>
                      <p>{activeTrackDesc}</p>
                    </motion.div>
                  </AnimatePresence>

                  <div className="sm-track-actions">
                    {['项目入驻', '合作咨询', '生态链接'].map((item) => (
                      <div key={item}>{item}</div>
                    ))}
                  </div>
                </SurfaceCard>
              </div>
            </div>
          </SurfaceCard>
        </section>
      </main>

      <footer className="sm-shell sm-footer">
        <SurfaceCard className="sm-footer__card">
          <div className="sm-footer__brand">
            <div className="sm-footer__logo">
              <Image
                src={withStaticBasePath('/assets/logo/shanmei-logo-gold.png')}
                alt="善美生态 Logo"
                fill
                sizes="58px"
              />
            </div>
            <div className="sm-footer__meta">
              <small>Shanmei Eco</small>
              <strong>善美生态</strong>
              <p>万企共生，共创增长</p>
            </div>
          </div>

          <div className="sm-footer__center">
            <small>Platform</small>
            <strong>企业增长进化平台</strong>
            <p>{footerPositioning}</p>
            <div className="sm-footer__quicklinks">
              <button
                className="sm-chip-button"
                type="button"
                onClick={() => setConsultDialog('diagnosis')}
              >
                企业诊断
              </button>
              <a href="#cooperate" onClick={(event) => handleNavClick(event, '#cooperate')}>
                合作咨询
              </a>
            </div>
          </div>

          <div className="sm-footer__desc">
            <div className="sm-footer__contact">
              <div className="sm-footer__contact-item">
                <small>顾问咨询</small>
                <strong>{contactInfo.consultant}</strong>
              </div>
              <div className="sm-footer__contact-item">
                <small>联系电话</small>
                <a href={contactInfo.telHref}>{contactInfo.phone}</a>
              </div>
            </div>
          </div>
        </SurfaceCard>
      </footer>

      <div className="sm-chat-dock">
        <AnimatePresence>
          {openChat && (
            <motion.div
              className="sm-chat-panel"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="sm-chat-panel__head">
                <div>
                  <span className="sm-chat-avatar">
                    <Image
                      src={withStaticBasePath('/assets/digital-human/zhiyu-avatar.png')}
                      alt="知予头像"
                      width={28}
                      height={28}
                      className="sm-chat-avatar__image"
                    />
                  </span>
                  <span>
                    知予 · AI 共创顾问
                    <small style={{ display: 'block', color: 'rgba(214, 227, 245, 0.48)', fontSize: 11, marginTop: 2 }}>
                      顾问咨询：{contactInfo.consultant}
                    </small>
                  </span>
                </div>

                <button
                  className="sm-icon-button sm-chat-panel__close"
                  type="button"
                  onClick={() => setOpenChat(false)}
                >
                  收起
                </button>
              </div>

              <div className="sm-chat-summary">
                我可以先帮你做一轮轻量经营诊断。
                <br />
                可先电话沟通企业现状、增长诉求与合作方向。
              </div>

              <div className="sm-chat-contact">
                <small>顾问咨询</small>
                <strong>{contactInfo.consultant}</strong>
                <a href={contactInfo.telHref}>联系电话：{contactInfo.phone}</a>
              </div>

              <div className="sm-chat-actions">
                <a className="sm-button sm-button--primary" href={contactInfo.telHref}>
                  <PhoneCall size={14} />
                  立即拨打
                </a>
                <button
                  className="sm-button sm-button--secondary"
                  type="button"
                  onClick={() => {
                    setOpenChat(false);
                    setConsultDialog('diagnosis');
                  }}
                >
                  预约企业诊断
                </button>
              </div>

              <div className="sm-chat-input">优先建议先电话沟通企业现状与合作方向。</div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          className="sm-icon-button sm-chat-trigger"
          type="button"
          onClick={() => setOpenChat((value) => !value)}
          animate={
            openChat
              ? { scale: 1, boxShadow: '0 16px 34px rgba(38, 83, 132, 0.32)' }
              : {
                  scale: [1, 1.03, 1],
                  boxShadow: [
                    '0 16px 34px rgba(38, 83, 132, 0.28)',
                    '0 18px 38px rgba(61, 122, 226, 0.34)',
                    '0 16px 34px rgba(38, 83, 132, 0.28)',
                  ],
                }
          }
          transition={
            openChat
              ? { duration: 0.2, ease: [0.22, 1, 0.36, 1] }
              : { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }
          }
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ y: 1, scale: 0.97 }}
        >
          <span className="sm-chat-trigger__avatar">
            <Image
              src={withStaticBasePath('/assets/digital-human/zhiyu-avatar.png')}
              alt="知予顾问头像"
              fill
              sizes="44px"
            />
          </span>
          <span className="sm-chat-trigger__dot" />
        </motion.button>
      </div>

      <AnimatePresence>
        {consultDialog && (
          <motion.div
            className="sm-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setConsultDialog(null)}
          >
            <motion.div
              className="sm-modal-card"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <small>Consulting Access</small>
              <h3>{consultDialogTitle}</h3>
              <p>{consultNote}</p>

              <div className="sm-modal-contact">
                <div>
                  <span>顾问咨询</span>
                  <strong>{contactInfo.consultant}</strong>
                </div>
                <div>
                  <span>联系电话</span>
                  <a href={contactInfo.telHref}>{contactInfo.phone}</a>
                </div>
              </div>

              <div className="sm-modal-actions">
                <a className="sm-button sm-button--primary" href={contactInfo.telHref}>
                  <PhoneCall size={15} />
                  立即拨打
                </a>
                <button
                  className="sm-button sm-button--secondary"
                  type="button"
                  onClick={() => setConsultDialog(null)}
                >
                  稍后联系
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
