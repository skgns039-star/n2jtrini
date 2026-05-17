import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from './supabase';
import { 
  CheckCircle2, 
  ArrowRight, 
  Smartphone, 
  CreditCard, 
  MessageSquare, 
  Search, 
  Settings, 
  ShieldCheck, 
  Clock, 
  Zap,
  ChevronRight,
  Menu,
  X,
  Star
} from 'lucide-react';

// --- Components ---

const Logo = ({ className = "w-10 h-10" }: { className?: string }) => (
  <div className={`${className} relative flex items-center justify-center anim-float`}>
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="50%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
      </defs>
      {/* Link 1 (Top) */}
      <rect x="14" y="6" width="12" height="18" rx="2" stroke="url(#gold-gradient)" strokeWidth="3" transform="rotate(0 20 15)" />
      {/* Link 2 (Bottom Left) */}
      <rect x="8" y="16" width="12" height="18" rx="2" stroke="url(#gold-gradient)" strokeWidth="3" transform="rotate(45 14 25)" />
      {/* Link 3 (Bottom Right) */}
      <rect x="20" y="16" width="12" height="18" rx="2" stroke="url(#gold-gradient)" strokeWidth="3" transform="rotate(-45 26 25)" />
    </svg>
  </div>
);

const Section = ({ children, className = "", id = "" }: { children: React.ReactNode, className?: string, id?: string }) => (
  <section id={id} className={`py-20 px-6 ${className}`}>
    <div className="max-w-6xl mx-auto">
      {children}
    </div>
  </section>
);

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-full bg-brand/10 px-3 py-1 text-sm font-medium text-brand mb-4">
    {children}
  </span>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', phone: '', category: '식당/카페' });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    
    setFormStatus('loading');
    
    try {
      // Ensure specific fields are mapped correctly
      const submissionData = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        category: formData.category,
        details: 'Landing page quick apply (Client)'
      };

      const { error } = await supabase
        .from('consultations')
        .insert([submissionData]);
      
      if (!error) {
        setFormStatus('success');
        setFormData({ name: '', phone: '', category: '식당/카페' });
      } else {
        console.error('Supabase Error Detailed:', JSON.stringify(error));
        setFormStatus('error');
      }
    } catch (err) {
      console.error('Form Caught Exception:', err);
      setFormStatus('error');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Logo className="w-10 h-10" />
            <span className="font-display font-bold text-xl tracking-tighter">N2J TRINI <span className="text-amber-600">Web Studio</span></span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('benefits')} className="text-sm font-medium text-slate-600 hover:text-brand transition-colors">혜택내용</button>
            <button onClick={() => scrollToSection('trust')} className="text-sm font-medium text-slate-600 hover:text-brand transition-colors">신뢰요소</button>
            <button onClick={() => scrollToSection('portfolio')} className="text-sm font-medium text-slate-600 hover:text-brand transition-colors">포트폴리오</button>
            <button 
              onClick={() => scrollToSection('apply')}
              className="bg-brand text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-brand-dark transition-all shadow-lg shadow-brand/20 active:scale-95"
            >
              1시간 무료 시안 신청
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-20 left-0 right-0 bg-white border-b border-slate-100 p-6 flex flex-col gap-4 shadow-xl"
            >
              <button onClick={() => scrollToSection('benefits')} className="text-left py-2 font-medium">혜택내용</button>
              <button onClick={() => scrollToSection('trust')} className="text-left py-2 font-medium">신뢰요소</button>
              <button onClick={() => scrollToSection('portfolio')} className="text-left py-2 font-medium">포트폴리오</button>
              <button onClick={() => scrollToSection('apply')} className="bg-brand text-white py-4 rounded-xl font-bold">1시간 무료 시안 신청</button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <Section className="pt-40 pb-32 overflow-hidden relative" id="hero">
        <div className="absolute top-40 right-[-10%] w-[500px] h-[500px] bg-brand/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-20 left-[-10%] w-[300px] h-[300px] bg-accent/5 rounded-full blur-3xl -z-10" />
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge>선착순 마감 임박 (이번 달 남은 슬롯: 3개)</Badge>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
              추가 비용 <span className="text-brand">ZERO</span>,<br />
              단돈 20만원에<br />
              홈페이지 완성
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              거품 가득한 제작 비용에 지치셨나요? <br />
              기획부터 디자인, 시스템 연동까지 싹 다 포함해서 딱 20만원입니다. <br />
              숨겨진 추가금은 단 1원도 없습니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => scrollToSection('apply')}
                className="bg-brand text-white px-8 py-4 rounded-2xl text-lg font-bold hover:bg-brand-dark transition-all flex items-center justify-center gap-2 shadow-xl shadow-brand/20 group"
              >
                20만원으로 내 무인직원 고용하기
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => scrollToSection('apply')}
                className="bg-white border-2 border-slate-100 px-8 py-4 rounded-2xl text-lg font-bold hover:border-brand/30 hover:bg-brand/5 transition-all text-slate-700 active:scale-95 flex items-center justify-center gap-2"
              >
                1시간 무료 시안 먼저 받기
                <Zap className="w-5 h-5 text-accent fill-accent" />
              </button>
            </div>
            <p className="mt-6 text-sm text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-green-500" />
              신청 즉시 1시간 내로 샘플 페이지를 무료로 제작해 드립니다.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/3] bg-slate-100 rounded-3xl overflow-hidden shadow-2xl border-8 border-slate-50">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop" 
                alt="Modern Website Mockup" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-2xl border border-slate-100 max-w-[240px]">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
                <span className="font-bold">반응형 완료</span>
              </div>
              <p className="text-sm text-slate-500">모든 기기(PC, 태블릿, 모바일)에서 최적화된 화면을 제공합니다.</p>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Pain Point Section */}
      <Section className="bg-slate-50" id="pain-points">
        <div className="text-center mb-16">
          <Badge>누구를 위한 서비스인가요?</Badge>
          <h2 className="text-4xl font-bold mb-4">웹 제작 시장의 '인질극'에 지치셨나요?</h2>
          <p className="text-lg text-slate-600">아래 중 하나라도 해당된다면 당신은 N2J TRINI의 고객입니다.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "거품 낀 제작비",
              desc: "기능 조금만 추가해도 200~300만원씩 부르는 견적서에 당황하진 않으셨나요?",
              icon: <CreditCard className="w-8 h-8 text-red-500" />
            },
            {
              title: "유지보수 비용의 늪",
              desc: "글자 하나 바꾸는데 5만원? 매달 나가는 관리비가 부담스러워 방치 중이진 않나요?",
              icon: <Settings className="w-8 h-8 text-orange-500" />
            },
            {
              title: "소유권 없는 내 가게",
              desc: "계약 해지하면 도메인도, 데이터도 못 준다는 업체 때문에 속앓이하고 계신가요?",
              icon: <ShieldCheck className="w-8 h-8 text-slate-400" />
            }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ 
                y: -10, 
                backgroundColor: "rgba(255, 255, 255, 1)",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)"
              }}
              className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm transition-all h-full cursor-default"
            >
              <div className="mb-6 w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Event Details Section */}
      <Section id="benefits">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <Badge>All-In-One Package</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              "딱 20만원만 내세요."<br />
              그 외엔 아무것도 필요 없습니다.
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              다른 업체에서 '유료 옵션'으로 파는 모든 기능을 기본으로 담았습니다. 
              소상공인의 성공적인 디지털 전환을 위해 다 퍼주는 이벤트입니다.
            </p>
            
            <div className="space-y-4">
              {[
                { label: "맞춤형 기획/디자인", icon: <Zap className="text-brand" /> },
                { label: "모바일 반응형 최적화", icon: <Smartphone className="text-brand" /> },
                { label: "검색엔진(Google/Naver) SEO 최적화", icon: <Search className="text-brand" /> },
                { label: "1분 자가 수정 매뉴얼 제공", icon: <Settings className="text-brand" /> }
              ].map((item, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 cursor-default"
                >
                  <div className="w-8 h-8 bg-white rounded-lg shadow-sm flex items-center justify-center text-brand">
                    {item.icon}
                  </div>
                  <span className="font-semibold text-slate-700">{item.label}</span>
                  <span className="ml-auto text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">기본 포함</span>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="bg-brand rounded-[40px] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl shadow-brand/40">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
            <h3 className="text-2xl font-bold mb-8">이 모든 게 정말 20만원인가요?</h3>
            
            <div className="space-y-6 mb-10">
              <div className="flex justify-between border-b border-white/20 pb-4">
                <span>일반 웹에이전시 평균</span>
                <span className="line-through text-white/60">3,500,000원</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">N2J TRINI 이벤트가</span>
                <div className="text-right">
                  <span className="text-4xl font-black">200,000원</span>
                  <span className="block text-sm text-brand-dark bg-white inline-block px-2 py-0.5 rounded font-bold mt-1">95% OFF</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 rounded-3xl p-6 backdrop-blur-sm">
              <p className="text-sm leading-relaxed">
                "이벤트 취지: 제작 비용 거품을 빼고 소상공인의 디지털 자립을 돕기 위해 N2J 그룹의 사회공헌 차원으로 진행되는 한시적 프로모션입니다."
              </p>
              <p className="text-[11px] text-white/50 mt-4 leading-tight border-t border-white/10 pt-4">
                * PG 가입비, 도메인, 호스팅 비용은 외부 실비 항목으로 별도입니다.
              </p>
            </div>
          </div>
        </div>

        {/* Expenses Info - Updated with Detailed Legal/Operational Info */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 max-w-6xl mx-auto relative overflow-hidden rounded-[40px] shadow-2xl border border-slate-100 bg-slate-50 flex flex-col justify-center p-8 md:p-16 hover:shadow-brand/5 hover:border-brand/10 transition-all duration-500 group"
        >
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(43,130,251,0.05)_0%,transparent_60%)]" />
          <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,rgba(245,158,11,0.03)_0%,transparent_60%)]" />

          <div className="relative z-10">
            <div className="text-center mb-12">
              <h4 className="text-2xl md:text-4xl font-black text-slate-800 mb-6 flex flex-col md:flex-row items-center justify-center gap-3">
                <span className="text-4xl group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500">💡</span>
                웹사이트 운영 필수 실비 안내 <span className="text-slate-400 text-sm md:text-lg font-bold">(제작비 외 별도)</span>
              </h4>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-3xl mx-auto font-bold">
                정직하고 안전한 웹사이트 운영을 위해 안내해 드립니다. <br className="hidden md:block" />
                랜딩페이지는 일반 쇼핑몰에 비해 구조가 단순하지만, 고객의 정보를 받는 순간 <span className="text-brand font-black">법적 의무 비용</span>이 발생합니다.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { 
                  tag: "법적 필수 / 유료", 
                  icon: "🔒", 
                  title: "보안 인증서 (SSL)", 
                  desc: "이름, 연락처 등 개인정보를 수집하는 모든 웹사이트는 법적으로 SSL 설치가 의무화되어 있습니다. 보안 미적용 시 최대 3,000만 원의 과태료 등 엄격한 법적 책임이 발생하므로, 안전한 정보 보호를 위해 연간 인증서 비용(유료)이 별도로 청구됩니다." 
                },
                { 
                  tag: "무조건 필수 / 유료", 
                  icon: "🏠", 
                  title: "서버 이용료 (호스팅)", 
                  desc: "인터넷 공간에 내 사이트를 24시간 안정적으로 띄워두기 위한 최소한의 공간 대여료입니다." 
                },
                { 
                  tag: "조건별 선택 / 유료", 
                  icon: "🌐", 
                  title: "전용 도메인 주소", 
                  desc: "www.회사이름.com 같은 나만의 브랜딩 주소를 쓰실 분들만 연간 도메인 구매 비용이 발생합니다." 
                },
                { 
                  tag: "상품 판매 안 하면 0원", 
                  icon: "💳", 
                  title: "카드 결제 시스템 (PG)", 
                  desc: "사이트에서 직접 결제를 받는 '쇼핑몰' 형태가 아니라면, 결제 연동 비용은 단 1원도 발생하지 않습니다. (단순 상담/신청형 랜딩페이지는 해당 없음)" 
                }
              ].map((item, i) => (
                <div key={i} className="flex flex-col p-8 rounded-[32px] bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-3xl p-3 bg-slate-50 rounded-2xl group-hover:bg-brand/5 transition-colors">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] font-black text-brand bg-brand/5 px-2.5 py-1 rounded-full mb-1 inline-block tracking-tighter">{item.tag}</span>
                      <h5 className="font-extrabold text-slate-800 text-lg md:text-xl">{item.title}</h5>
                    </div>
                  </div>
                  <p className="text-xs md:text-sm text-slate-500 font-bold leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-12 pt-8 border-t border-slate-200 text-xs md:text-sm text-slate-400 font-bold leading-relaxed max-w-2xl mx-auto text-center">
              ※ 모든 비용은 외부 전문 기관의 표준 단가에 따르며, 세팅은 N2J TRINI가 무료로 대행해 드립니다.
            </div>
          </div>
        </motion.div>
      </Section>


      {/* Trust & USP Section */}
      <Section className="bg-slate-900 text-white" id="trust">
        <div className="text-center mb-16">
          <Badge>Our Advantage</Badge>
          <h2 className="text-4xl font-bold mb-4">"싼 게 비지떡?"<br className="md:hidden" /> 편견을 박살냅니다</h2>
          <p className="text-slate-400">우리가 가장 저렴하면서도 퀄리티는 가장 높은 이유</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "100% 소유권 이전",
              desc: "도메인, 호스팅 모든 권한을 고객님께 즉시 넘겨드립니다. 인질극이나 약정은 절대 없습니다.",
              icon: <ShieldCheck className="text-green-400" />
            },
            {
              title: "유지보수비 0원",
              desc: "직관적인 관리자 페이지를 제공합니다. 이미지/글자 수정? 이제 직접 1분 만에 끝내세요.",
              icon: <Clock className="text-amber-400" />
            },
            {
              title: "1시간 총알 시안",
              desc: "신청 즉시 1시간 내로 업종에 맞는 '진짜 사이트' 샘플을 제작해서 보내드립니다.",
              icon: <Zap className="text-brand" />
            }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              className="bg-white/5 border border-white/10 p-8 rounded-3xl cursor-default"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ 
                y: -10, 
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                borderColor: "rgba(255, 255, 255, 0.2)"
              }}
            >
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-slate-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Portfolio Section */}
      <Section id="portfolio">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 whitespace-pre-wrap">정말 '20만원 퀄리티'가 맞나요?</h2>
          <p className="text-lg text-slate-600">직접 눈으로 확인하세요. 모든 업종에 최적화되어 있습니다.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { tag: "Cafe", name: "감성 가득한 카페", img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2347&auto=format&fit=crop", link: "https://skgns03941851.imweb.me/" },
            { tag: "Flower", name: "향기를 담은 플라워 샵", img: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=2360&auto=format&fit=crop", link: "https://cornerflower.imweb.me/" },
            { tag: "Premium", name: "다크 무드 기반 하이테크 프리미엄 웹디자인", img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2340&auto=format&fit=crop", link: "https://skgns039-star.github.io/EMBED/" },
            { tag: "Academy", name: "초중고영어학원", img: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=2342&auto=format&fit=crop", link: "https://skgns039-star.github.io/aistudio-test/" }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              className="group bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -15 }}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img 
                  src={item.img} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-brand shadow-sm">
                  {item.tag}
                </div>
              </div>
              <div className="p-6">
                <h4 className="font-bold text-lg mb-1">{item.name}</h4>
                <p className="text-slate-500 text-xs mb-4">20만원 패키지 적용 사례</p>
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:gap-2 transition-all"
                >
                  사이트 방문하기 <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-xl font-bold text-slate-800 mb-6">"이 모든 퀄리티가 정말 <span className="text-brand underline decoration-brand/30 underline-offset-4">단돈 20만원</span>입니다."</p>
        </div>
      </Section>

      {/* SEO Success Section - PERFECT MATCH to user's blue bubble image */}
      <Section className="bg-[#2B82FB] overflow-hidden relative py-24" id="seo-success">
        {/* Decorative Bubbles - Custom styled for soft feel */}
        <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px]" />
        
        <div className="text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white mb-10"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">생생한 리얼후기</h2>
            <p className="text-white/80 text-sm md:text-base font-medium">네이버, 구글, 다음 SEO 최적화 후기</p>
          </motion.div>

          {/* Screenshot with "실제 사례" Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-[800px] mx-auto relative group"
          >
            {/* Real Case Badge - Matching the requested style */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-brand px-5 py-1.5 rounded-full font-black text-xs shadow-xl z-20 border border-slate-100">
              실제 사례
            </div>

            {/* The Mockup Screenshot */}
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-[48px] shadow-[0_30px_70px_rgba(0,0,0,0.4)] border border-white/20 overflow-hidden">
              <div className="bg-slate-50 rounded-[34px] overflow-hidden relative shadow-inner">
                {/* Image representing the pixelated chat result */}
                <img 
                  src="https://cdn.imweb.me/thumbnail/20260518/fa3a9f23a5bff.jpg" 
                  alt="SEO Result Chat" 
                  className="w-full h-auto opacity-90"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </motion.div>

          {/* User Requested Text Below */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white mt-16 max-w-2xl mx-auto px-4"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-6 leading-tight">
              검색창을 장악하는 힘,<br />
              <span className="text-[#FEE500]">'고객님 홈페이지 노출'</span>로 실력을 증명합니다.
            </h3>
            <p className="text-white/80 text-base md:text-lg leading-relaxed">
              아무리 멋진 웹사이트도 검색되지 않으면 유령 도시와 같습니다. <br />
              네이버, 구글, 다음까지 국내 3대 포털 사이트의 알고리즘을 완벽히 분석하여, <br/>
              배포와 동시에 첫 페이지를 선점해 드린 숨고 실제 성공 사례입니다.
            </p>
          </motion.div>
        </div>
      </Section>




      {/* Process Section */}
      <Section className="bg-brand/5 rounded-[60px]" id="process">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">어렵지 않습니다. 딱 4단계면 끝!</h2>
          <p className="text-slate-600">사장님은 비즈니스에만 집중하세요. 나머지는 저희가 합니다.</p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-brand/10 -translate-y-1/2 -z-10" />
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "시안 신청", desc: "1분이면 끝나는 정보 입력", icon: <ArrowRight className="w-5 h-5" /> },
              { step: "02", title: "무료 시안", desc: "1시간 내 작동 샘플 발송", icon: <Zap className="w-5 h-5" /> },
              { step: "03", title: "결제/세팅", desc: "확정 시 계약금 30% 최종컨펌 후 잔금", icon: <CreditCard className="w-5 h-5" /> },
              { step: "04", title: "최종 오픈", desc: "검색 등록 및 인수인계", icon: <ShieldCheck className="w-5 h-5" /> }
            ].map((item, idx) => (
              <motion.div 
                key={idx} 
                className="text-center group"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, type: 'spring', stiffness: 100 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md border border-slate-100 group-hover:bg-brand group-hover:text-white group-hover:rotate-6 transition-all text-brand font-black text-xl">
                  {item.step}
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Final CTA / Apply Section */}
      <Section id="apply">
        <div className="max-w-4xl mx-auto bg-white rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden relative">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12 bg-slate-900 text-white">
              <Badge>Apply Now</Badge>
              <h2 className="text-3xl font-bold mb-6">지금 신청하지 않으면<br /> 수백만 원을 손해 봅니다.</h2>
              <p className="text-slate-400 mb-8 leading-relaxed">
                이번 달 이벤트 슬롯이 거의 마감되었습니다. 고민하는 사이 다른 경쟁업체는 이미 20만원으로 강력한 마케팅 채널을 구축하고 있습니다.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <span className="text-sm">현재 368개의 사업장 이용 중</span>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <span className="text-sm">평점 4.9/5.0 만족도 기록</span>
                </div>
              </div>
            </div>
            
            <div className="p-8 md:p-12">
              <form onSubmit={handleApply} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">성함 / 업체명</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="홍길동 / 트라이식당" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">연락처</label>
                  <input 
                    required
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="010-0000-0000" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">업종 선택</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all appearance-none"
                  >
                    <option>식당/카페</option>
                    <option>뷰티/헤어</option>
                    <option>교육/학원</option>
                    <option>쇼핑몰/커머스</option>
                    <option>기타 서비스</option>
                  </select>
                </div>
                
                <button 
                  disabled={formStatus === 'loading' || formStatus === 'success'}
                  className={`w-full py-4 rounded-2xl font-bold text-lg shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2
                    ${formStatus === 'success' ? 'bg-green-500 text-white' : 
                      formStatus === 'error' ? 'bg-red-500 text-white' : 
                      'bg-brand text-white hover:bg-brand-dark shadow-brand/20'}
                  `}
                >
                  {formStatus === 'idle' && (
                    <>
                      무료 시안 신청하기 (1시간 내 발송)
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                  {formStatus === 'loading' && (
                    <motion.div 
                      animate={{ rotate: 360 }} 
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    >
                      <Zap className="w-6 h-6" />
                    </motion.div>
                  )}
                  {formStatus === 'success' && (
                    <>
                      <CheckCircle2 className="w-6 h-6" />
                      신청 완료! 곧 연락드릴게요.
                    </>
                  )}
                  {formStatus === 'error' && (
                    <>
                      <X className="w-6 h-6" />
                      오류가 발생했습니다. 다시 시도해 주세요.
                    </>
                  )}
                </button>
                <div className="text-center mt-4">
                  <p className="text-[10px] text-slate-400 leading-tight">
                    * 본 이벤트는 홈페이지 '제작 및 세팅'에 대한 파격 특가이며,<br />
                    PG 가입비, 도메인, 호스팅 비용은 원활한 운영을 위한 외부 실비로 별도 발생합니다.
                  </p>
                  <p className="text-[10px] text-slate-300 mt-1">정보는 상담 및 시안 제작용으로만 사용됩니다.</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-slate-50 py-12 border-t border-slate-200 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-6 opacity-60 grayscale hover:grayscale-0 transition-all flex justify-center items-center gap-3">
            <Logo className="w-8 h-8" />
            <span className="font-display font-bold text-lg tracking-tighter text-slate-700">N2J TRINI Web Studio</span>
          </div>
          <p className="text-slate-500 text-sm mb-2">N2J TRINI 웹스튜디오 | 사업자등록번호: 772-46-01252</p>
          <p className="text-slate-400 text-xs">© 2026 N2J TRINI Web Studio. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

