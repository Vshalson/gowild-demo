import React, { useState, useEffect, useRef } from 'react';
// Note: Chart.js is assumed to be available globally from the environment or can be imported 
// if using a standard React build system. For this single-file environment, we will 
// assume the surrounding environment provides necessary dependencies like React/ReactDOM.

// --- Icon Components (Lucide-React equivalents via Inline SVG) ---

const TrendingDown = ({ className = "", size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
    <polyline points="17 18 23 18 23 12"></polyline>
  </svg>
);

const TrendingUp = ({ className = "", size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
);

const AlertCircle = ({ className = "", size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12.01" y2="16"></line>
  </svg>
);

const Eye = ({ className = "", size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const Lock = ({ className = "", size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

const Activity = ({ className = "", size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
  </svg>
);

const Brain = ({ className = "", size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"></path>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"></path>
  </svg>
);

const Sparkles = ({ className = "", size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
    <path d="M5 3v4"></path>
    <path d="M19 17v4"></path>
    <path d="M3 5h4"></path>
    <path d="M17 19h4"></path>
  </svg>
);

const Clock = ({ className = "", size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const Play = ({ className = "", size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 3 19 12 5 21 5 3"></polygon>
  </svg>
);

const Pause = ({ className = "", size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="4" width="4" height="16"></rect>
    <rect x="14" y="4" width="4" height="16"></rect>
  </svg>
);

const Target = ({ className = "", size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="12" r="6"></circle>
    <circle cx="12" cy="12" r="2"></circle>
  </svg>
);

const CheckCircle = ({ className = "", size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const X = ({ className = "", size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const Layers = ({ className = "", size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
    <polyline points="2 17 12 22 22 17"></polyline>
    <polyline points="2 12 12 17 22 12"></polyline>
  </svg>
);

const Unlock = ({ className = "", size = 24 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
  </svg>
);

// --- Data Definitions ---

const fakeUsers = [
  {
    id: "DY_847392",
    segment: "探险爱好者",
    timeline: [
      { time: "18:34:22", action: "watch_video", content: "极限皮划艇挑战赛 - 南通滨江", duration: 154, watchPercent: 87, signal: "water_sports", score: 0.82 },
      { time: "18:36:45", action: "like", content: "极限皮划艇挑战赛 - 南通滨江", signal: "high_engagement", score: 0.91 },
      { time: "18:37:12", action: "share", content: "极限皮划艇挑战赛 - 南通滨江", signal: "social_influence", score: 0.34 },
      { time: "18:39:28", action: "click_shop", content: "Go Wild 水上运动套餐", signal: "purchase_intent", score: 0.91 },
      { time: "18:40:15", action: "view_product", content: "专业皮划艇体验 ¥428", signal: "price_consideration", score: 0.78 },
      { time: "18:41:33", action: "add_cart", content: "专业皮划艇体验 ¥428", signal: "strong_intent", score: 0.94 },
      { time: "18:42:08", action: "cart_abandon", content: "专业皮划艇体验 ¥428", signal: "trust_barrier", score: -0.45 }
    ],
    prediction: { willConvert: true, confidence: 0.87, timeframe: "24 小时内", recommendation: "部署“客户见证”重定向营销" },
    dna: { purchaseIntent: 91, engagement: 78, trustLevel: 45, priceResistance: 28 }
  },
  {
    id: "DY_923847",
    segment: "冲动购买者",
    timeline: [
      { time: "14:22:11", action: "watch_video", content: "南通周末去哪玩？", duration: 45, watchPercent: 34, signal: "casual_browse", score: 0.23 },
      { time: "14:23:40", action: "watch_video", content: "限时优惠！水上项目买一送一", duration: 89, watchPercent: 98, signal: "promotion_trigger", score: 0.89 },
      { time: "14:24:15", action: "click_shop", content: "Go Wild 限时优惠", signal: "impulse_trigger", score: 0.92 },
      { time: "14:24:58", action: "purchase", content: "家庭套餐 ¥688 (原价¥988)", signal: "conversion", score: 1.0 },
      { time: "14:25:12", action: "close_app", content: "", signal: "quick_exit", score: 0.15 }
    ],
    prediction: { willConvert: true, confidence: 0.94, timeframe: "立即", recommendation: "限时优惠有效" },
    dna: { purchaseIntent: 92, engagement: 35, trustLevel: 88, priceResistance: 82 }
  },
  {
    id: "DY_734821",
    segment: "内容消费者",
    timeline: [
      { time: "20:15:33", action: "watch_video", content: "南通最美滨江夜景", duration: 178, watchPercent: 95, signal: "high_watch_time", score: 0.71 },
      { time: "20:18:45", action: "like", content: "南通最美滨江夜景", signal: "engagement", score: 0.42 },
      { time: "20:19:22", action: "comment", content: "太美了！", signal: "social_engagement", score: 0.38 },
      { time: "20:20:10", action: "watch_video", content: "水上运动装备推荐", duration: 201, watchPercent: 88, signal: "continued_interest", score: 0.55 },
      { time: "20:23:45", action: "follow", content: "Go Wild Official", signal: "brand_awareness", score: 0.48 },
      { time: "20:24:10", action: "close_app", content: "", signal: "no_purchase_intent", score: 0.08 }
    ],
    prediction: { willConvert: false, confidence: 0.91, timeframe: "不太可能", recommendation: "培养品牌认知，而非强求转化" },
    dna: { purchaseIntent: 12, engagement: 88, trustLevel: 52, priceResistance: 15 }
  }
];

const traditionalCampaignData = {
  influencers: [
    { name: "南通美食探店王", followers: 128000, cost: 3200, views: 45000, likes: 1200, conversion: 0.8, sales: 2 },
    { name: "江苏旅行日记", followers: 89000, cost: 2400, views: 32000, likes: 890, conversion: 1.2, sales: 3 },
    { name: "户外运动达人", followers: 156000, cost: 4800, views: 58000, likes: 2100, conversion: 2.1, sales: 8 },
    { name: "南通生活指南", followers: 71000, cost: 1800, views: 28000, likes: 650, conversion: 0.4, sales: 1 },
    { name: "探索江苏", followers: 94000, cost: 2600, views: 38000, likes: 1100, conversion: 1.5, sales: 4 }
  ],
  totalSpend: 14800,
  totalViews: 201000,
  totalConversions: 18,
  avgConversionRate: 1.2,
  redemptionRate: 28,
  costPerAcquisition: 822,
  roi: 0.73
};

const actionTranslations = { 
  "watch_video": "观看视频", 
  "like": "点赞", 
  "share": "分享", 
  "click_shop": "点击购物", 
  "view_product": "查看商品", 
  "add_cart": "加入购物车", 
  "cart_abandon": "放弃购物车", 
  "purchase": "购买", 
  "close_app": "关闭应用", 
  "comment": "评论", 
  "follow": "关注" 
};

const signalTranslations = { 
  "water_sports": "水上运动", 
  "high_engagement": "高参与度", 
  "social_influence": "社交影响", 
  "purchase_intent": "购买意图", 
  "price_consideration": "价格考量", 
  "strong_intent": "强烈意图", 
  "trust_barrier": "信任障碍", 
  "casual_browse": "随意浏览", 
  "promotion_trigger": "促销触发", 
  "impulse_trigger": "冲动触发", 
  "conversion": "转化", 
  "quick_exit": "快速退出", 
  "high_watch_time": "高观看时长", 
  "engagement": "参与", 
  "social_engagement": "社交参与", 
  "continued_interest": "持续兴趣", 
  "brand_awareness": "品牌认知", 
  "no_purchase_intent": "无购买意图" 
};


// --- Main Component ---

const App = () => {
  const [currentAct, setCurrentAct] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [playingTimeline, setPlayingTimeline] = useState(false);
  const [timelineIndex, setTimelineIndex] = useState(0);
  const [showAIVision, setShowAIVision] = useState(false);
  const [moneyBurning, setMoneyBurning] = useState(0);
  const [calculatedLoss, setCalculatedLoss] = useState(0);

  // Money burning effect for Act 1
  useEffect(() => {
    if (currentAct === 1) {
      const interval = setInterval(() => {
        setMoneyBurning(prev => prev + 1);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [currentAct]);

  // Timeline playback for Act 2
  useEffect(() => {
    if (playingTimeline && selectedUser && timelineIndex < selectedUser.timeline.length) {
      const timer = setTimeout(() => {
        setTimelineIndex(prev => prev + 1);
      }, 1200);
      return () => clearTimeout(timer);
    } else if (timelineIndex >= (selectedUser?.timeline.length || 0)) {
      setPlayingTimeline(false);
    }
  }, [playingTimeline, timelineIndex, selectedUser]);

  const startDemo = () => {
    setCurrentAct(2);
    // Automatically select the first user (Adventurer) for the demo start
    setSelectedUser(fakeUsers[0]); 
    setTimeout(() => {
      setPlayingTimeline(true);
    }, 1000);
  };

  const resetTimeline = () => {
    setTimelineIndex(0);
    setPlayingTimeline(false);
  };

  const selectUserForAnalysis = (user) => {
    setSelectedUser(user);
    setTimelineIndex(0);
    setPlayingTimeline(false);
  };

  // Function to handle the loss calculation based on inputs in Act 3
  const handleLossCalculation = () => {
    const monthlyBudgetInput = document.getElementById('monthlyBudgetInput');
    const timePeriodSelect = document.getElementById('timePeriodSelect');
    
    if (monthlyBudgetInput && timePeriodSelect) {
      const budget = parseInt(monthlyBudgetInput.value) || 0;
      const months = parseInt(timePeriodSelect.value) || 0;
      // Using 27% loss factor as calculated in the original logic (1 - 0.73 ROI)
      const loss = budget * 0.27 * months; 
      setCalculatedLoss(loss);
    }
  };


  const renderAct1 = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden font-inter">
      {/* Custom Styles/Keyframes for effects */}
      <style>{`
        .gradient-text {
            background-image: linear-gradient(45deg, #3b82f6, #8b5cf6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 0 5px #f87171, 0 0 10px #f87171; }
            50% { box-shadow: 0 0 15px #ef4444, 0 0 25px #ef4444; }
        }
        .pulse-glow { animation: pulse-glow 2s infinite alternate; }

        @keyframes slide-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .slide-up { animation: slide-up 0.8s ease-out forwards; }

        .glow-border { box-shadow: 0 0 10px rgba(239, 68, 68, 0.5); }

        /* Ensure font-inter is used globally */
        .font-inter { font-family: 'Inter', sans-serif; }
      `}</style>
      
      {/* Background animated grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16 slide-up">
          <div className="inline-block bg-red-600 text-white px-6 py-2 rounded-full font-bold text-xl mb-6 pulse-glow">
            ⚠️ 严重警报
          </div>
          <h1 className="text-5xl sm:text-6xl font-black mb-6">
            <span className="gradient-text">南通难题</span>
          </h1>
          <p className="text-xl sm:text-2xl text-slate-300 max-w-3xl mx-auto">
            当您熟睡时, 您的营销预算正在 <span className="text-red-400 font-bold">燃烧</span>
          </p>
        </div>

        {/* Money Burning Visual */}
        <div className="bg-slate-800 rounded-2xl p-6 sm:p-8 border border-red-500 glow-border mb-12 slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
            <div className="text-center sm:text-left mb-4 sm:mb-0">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2 flex items-center justify-center sm:justify-start">
                <TrendingDown className="mr-3 text-red-500" size={32} />
                您的上一次营销活动：事后分析
              </h2>
              <p className="text-slate-400">三线城市的传统网红营销</p>
            </div>
            <div className="text-center sm:text-right">
              <div className="text-4xl sm:text-5xl font-black text-red-500">¥{moneyBurning * 148}</div>
              <div className="text-sm text-slate-400">已烧掉的钱 (还在增加...)</div>
            </div>
          </div>

          {/* Influencer Campaign Results */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {traditionalCampaignData.influencers.map((influencer, idx) => (
              <div key={idx} className="bg-slate-900 rounded-lg p-4 border border-slate-700 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full flex items-center justify-center opacity-20">
                  <TrendingDown size={72} className="text-red-500" />
                </div>
                <div className="relative z-10">
                  <div className="text-xs text-slate-500 mb-2 truncate">{influencer.name}</div>
                  <div className="text-lg font-bold text-white mb-1">¥{influencer.cost}</div>
                  <div className="text-xs text-slate-400 mb-3">{influencer.followers.toLocaleString()} 粉丝</div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">浏览量:</span>
                      <span className="text-slate-300">{influencer.views.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">销量:</span>
                      <span className="text-red-400 font-bold">{influencer.sales}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">转化率:</span>
                      <span className="text-red-400 font-bold">{influencer.conversion}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Damning Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-red-950 border border-red-800 rounded-lg p-4 sm:p-6 text-center">
              <div className="text-xs sm:text-sm text-red-400 mb-1 sm:mb-2">总浪费</div>
              <div className="text-2xl sm:text-4xl font-black text-red-500">¥14,800</div>
              <div className="text-xs text-red-400 mt-1 sm:mt-2">在重复内容上</div>
            </div>
            <div className="bg-red-950 border border-red-800 rounded-lg p-4 sm:p-6 text-center">
              <div className="text-xs sm:text-sm text-red-400 mb-1 sm:mb-2">转化率</div>
              <div className="text-2xl sm:text-4xl font-black text-red-500">1.2%</div>
              <div className="text-xs text-red-400 mt-1 sm:mt-2">98.8% 的无效触达</div>
            </div>
            <div className="bg-red-950 border border-red-800 rounded-lg p-4 sm:p-6 text-center">
              <div className="text-xs sm:text-sm text-red-400 mb-1 sm:mb-2">核销率</div>
              <div className="text-2xl sm:text-4xl font-black text-red-500">28%</div>
              <div className="text-xs text-red-400 mt-1 sm:mt-2">72% 的人从未到场</div>
            </div>
            <div className="bg-red-950 border border-red-800 rounded-lg p-4 sm:p-6 text-center">
              <div className="text-xs sm:text-sm text-red-400 mb-1 sm:mb-2">投资回报率</div>
              <div className="text-2xl sm:text-4xl font-black text-red-500">0.73x</div>
              <div className="text-xs text-red-400 mt-1 sm:mt-2">损失 ¥4,000</div>
            </div>
          </div>
        </div>

        {/* The Problem Statement */}
        <div className="bg-slate-800 rounded-2xl p-6 sm:p-8 border border-slate-700 mb-12 slide-up" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-xl sm:text-2xl font-bold mb-6 flex items-center">
            <AlertCircle className="mr-3 text-amber-500" size={24} />
            为什么会这样？
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="text-amber-500 font-bold">问题 #1：盲目定位</div>
              <div className="text-slate-400 text-sm">
                您在向只想看视频的人展示水上运动内容。没有行为洞察 = 没有精准度。
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-amber-500 font-bold">问题 #2：内容同质化</div>
              <div className="text-slate-400 text-sm">
                每个网红都用同一个模板。“这个太好玩了！” 客户已经审美疲劳了。
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-amber-500 font-bold">问题 #3：零智能</div>
              <div className="text-slate-400 text-sm">
                您无法判断谁会真正转化、谁会核销、谁是高价值用户。纯粹在赌博。
              </div>
            </div>
          </div>
        </div>

        {/* The Hook */}
        <div className="text-center slide-up" style={{ animationDelay: '0.6s' }}>
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 sm:p-12 mb-8">
            <h2 className="text-3xl sm:text-4xl font-black mb-4">如果您能看透他们的想法呢？</h2>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              如果每个用户的购买意图、信任水平和核销概率都能 <span className="font-bold text-white">实时可见</span> 呢？
            </p>
            <button
              onClick={startDemo}
              className="bg-white text-blue-600 px-8 sm:px-12 py-4 sm:py-6 rounded-xl font-bold text-lg sm:text-xl hover:bg-blue-50 transition-all transform hover:scale-105 shadow-2xl inline-flex items-center"
            >
              <Eye className="mr-3" size={24} />
              向我展示智能分析
            </button>
          </div>
          <div className="text-slate-500 text-sm flex items-center justify-center">
            <Lock className="mr-2" size={16} />
            现场演示 • 无需承诺 • 实时查看算法运作
          </div>
        </div>
      </div>
    </div>
  );
  
  const renderAct2 = () => (
    <div className="min-h-screen bg-slate-900 text-white font-inter">
      {/* Custom Styles/Keyframes */}
      <style>{`
        @keyframes signal-pulse {
            0% { box-shadow: 0 0 0 0 rgba(52, 211, 163, 0.7); }
            70% { box-shadow: 0 0 0 10px rgba(52, 211, 163, 0); }
            100% { box-shadow: 0 0 0 0 rgba(52, 211, 163, 0); }
        }
        .signal-pulse { animation: signal-pulse 2s infinite; }

        @keyframes slide-up-fast {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .slide-up { animation: slide-up-fast 0.3s ease-out forwards; }

        /* Scrollbar styling for dark mode */
        .overflow-y-auto::-webkit-scrollbar {
            width: 8px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
            background-color: #475569; /* slate-600 */
            border-radius: 4px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
            background-color: #1e293b; /* slate-800 */
        }
      `}</style>

      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full font-bold text-xl">
                GoWild
              </div>
              <div className="hidden sm:block h-6 w-px bg-slate-600"></div>
              <div className="hidden sm:flex items-center space-x-2">
                <Activity className="text-green-500 signal-pulse" size={20} />
                <span className="text-slate-300 font-medium">AI 洞察：启动</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button
                onClick={() => setShowAIVision(!showAIVision)}
                className={`px-3 py-1 sm:px-4 sm:py-2 rounded-lg font-semibold transition-all flex items-center text-sm ${
                  showAIVision 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                <Brain className="mr-2" size={16} />
                {showAIVision ? 'AI 洞察：开启' : 'AI 洞察：关闭'}
              </button>
              <button
                onClick={() => setCurrentAct(3)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 sm:px-6 sm:py-2 rounded-lg font-semibold transition-all text-sm sm:text-base"
              >
                查看营销结果 →
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {/* Title Section */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black mb-3 flex items-center">
            <Sparkles className="mr-3 sm:mr-4 text-amber-500" size={32} sm:size={40} />
            实时行为智能剧场
          </h1>
          <p className="text-lg sm:text-xl text-slate-400">
            实时观看“偏好捕获算法”解码真实的抖音用户行为
          </p>
        </div>

        {/* User Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {fakeUsers.map((user, idx) => (
            <button
              key={user.id}
              onClick={() => selectUserForAnalysis(user)}
              className={`p-4 sm:p-6 rounded-xl border-2 transition-all text-left ${
                selectedUser?.id === user.id
                  ? 'bg-blue-900 border-blue-500 shadow-xl'
                  : 'bg-slate-800 border-slate-700 hover:border-slate-600'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-sm text-slate-500 mb-1">{user.id}</div>
                  <div className="text-lg font-bold text-white">{user.segment}</div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold flex-shrink-0 ${
                  user.prediction.willConvert 
                    ? 'bg-green-900 text-green-300' 
                    : 'bg-red-900 text-red-300'
                }`}>
                  {user.prediction.willConvert ? '✓ 将会转化' : '✗ 不会转化'}
                </div>
              </div>
              <div className="text-sm text-slate-400">
                置信度: <span className="text-white font-bold">{(user.prediction.confidence * 100).toFixed(0)}%</span>
              </div>
            </button>
          ))}
        </div>

        {selectedUser && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Timeline Player */}
            <div className="lg:col-span-7 space-y-4">
              {/* Timeline Controls */}
              <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setPlayingTimeline(!playingTimeline)}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-all"
                  >
                    {playingTimeline ? <Pause size={20} /> : <Play size={20} />}
                  </button>
                  <button
                    onClick={resetTimeline}
                    className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-all text-sm"
                  >
                    重置
                  </button>
                  <div className="text-sm text-slate-400">
                    事件 {timelineIndex} / {selectedUser.timeline.length}
                  </div>
                </div>
                <div className="text-sm text-slate-400 flex items-center">
                  <Clock className="mr-2" size={16} />
                  72 小时行为窗口
                </div>
              </div>

              {/* Timeline Events */}
              <div className="bg-slate-800 rounded-xl border border-slate-700 p-4 sm:p-6 space-y-3 max-h-[600px] overflow-y-auto">
                {selectedUser.timeline.slice(0, timelineIndex + 1).map((event, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-900 rounded-lg p-4 border border-slate-700 slide-up"
                    style={{animationDelay: `${idx * 0.1}s`}}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                          event.score > 0.7 ? 'bg-green-500' :
                          event.score > 0.4 ? 'bg-amber-500' :
                          event.score > 0 ? 'bg-blue-500' : 'bg-red-500'
                        } signal-pulse`}></div>
                        <div>
                          <div className="text-xs text-slate-500 font-mono">{event.time}</div>
                          <div className="font-semibold text-white capitalize">
                            {actionTranslations[event.action] || event.action.replace(/_/g, ' ')}
                          </div>
                        </div>
                      </div>
                      {showAIVision && (
                        <div className="text-right flex-shrink-0">
                          <div className="text-xs text-slate-500">信号强度</div>
                          <div className={`text-lg font-bold ${
                            event.score > 0.7 ? 'text-green-400' :
                            event.score > 0.4 ? 'text-amber-400' :
                            event.score > 0 ? 'text-blue-400' : 'text-red-400'
                          }`}>
                            {event.score > 0 ? '+' : ''}{(event.score * 100).toFixed(0)}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="text-sm text-slate-400 mb-2">{event.content}</div>
                    {showAIVision && (
                      <div className="mt-3 pt-3 border-t border-slate-700">
                        <div className="flex flex-wrap items-center justify-between text-xs">
                          <span className="text-blue-400 font-mono mb-1 sm:mb-0">
                            🧠 AI 信号: {signalTranslations[event.signal] || event.signal.replace(/_/g, ' ').toUpperCase()}
                          </span>
                          {event.duration && (
                            <span className="text-slate-500">
                              观看时长: {event.duration}s ({event.watchPercent}%)
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: AI Analysis Panel */}
            <div className="lg:col-span-5 space-y-4">
              {/* DNA Profile */}
              <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-xl p-6 border border-blue-700">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <Brain className="mr-2 text-blue-400" size={20} />
                  数字行为 DNA
                </h3>
                <div className="space-y-4">
                  {Object.entries(selectedUser.dna).map(([key, value]) => {
                    let label = "";
                    let colorClass = "";
                    switch (key) {
                      case 'purchaseIntent': label = '购买意图'; colorClass = 'from-blue-500 to-green-500'; break;
                      case 'engagement': label = '参与水平'; colorClass = 'from-purple-500 to-pink-500'; break;
                      case 'trustLevel': label = '信任水平'; colorClass = 'from-amber-500 to-orange-500'; break;
                      case 'priceResistance': label = '价格敏感度'; colorClass = 'from-red-500 to-red-700'; break;
                      default: label = key; colorClass = 'from-slate-500 to-slate-500';
                    }
                    return (
                      <div key={key}>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-slate-300">{label}</span>
                          <span className="text-white font-bold">{value}%</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${colorClass} transition-all duration-1000`}
                            style={{ width: `${value}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* AI Prediction */}
              <div className={`rounded-xl p-6 border-2 ${
                selectedUser.prediction.willConvert
                  ? 'bg-green-950 border-green-600'
                  : 'bg-red-950 border-red-600'
              }`}>
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <Target className="mr-2" size={20} />
                  AI 预测
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-slate-400 mb-1">转化概率</div>
                    <div className="text-3xl font-black text-white">
                      {(selectedUser.prediction.confidence * 100).toFixed(1)}%
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-400 mb-1">预计时间范围</div>
                    <div className="text-lg font-bold text-white">{selectedUser.prediction.timeframe}</div>
                  </div>
                  <div className="pt-3 border-t border-slate-700">
                    <div className="text-sm text-slate-400 mb-2">推荐行动</div>
                    <div className="text-white font-semibold">{selectedUser.prediction.recommendation}</div>
                  </div>
                </div>
              </div>

              {/* UEBA Analysis */}
              {showAIVision && (
                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                  <h3 className="text-sm font-bold mb-3 text-blue-400 font-mono">
                    [UEBA 引擎输出]
                  </h3>
                  <div className="data-stream text-green-400 space-y-1">
                    <div>→ 聚类算法：K-Means (n=4)</div>
                    <div>→ 嵌入空间：128 维</div>
                    <div>→ 时间模式：高方差</div>
                    <div>→ 马尔可夫链：检测到状态转移</div>
                    <div>→ 倾向得分：{(selectedUser.prediction.confidence * 100).toFixed(2)}</div>
                    <div>→ 多臂老虎机：分群 {selectedUser.segment}</div>
                    <div className="text-amber-400">→ 置信区间：94.3% ±3.2%</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
  
  const renderAct3 = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 font-inter">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full font-bold text-xl">
                GoWild
              </div>
              <div className="h-6 w-px bg-slate-300"></div>
              <span className="text-slate-700 font-semibold">营销活动绩效对比</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">
            差异是 <span className="gradient-text">惊人的</span>
          </h1>
          <p className="text-xl sm:text-2xl text-slate-600">
            相同的预算。相同的市场。截然不同的智能。
          </p>
        </div>

        {/* Side-by-Side Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Traditional Campaign */}
          <div className="bg-white rounded-2xl border-2 border-red-300 p-6 sm:p-8 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">传统网红营销方法</h2>
              <div className="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-bold text-sm">
                旧方法
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-red-50 rounded-lg p-4">
                <div className="text-sm text-red-600 mb-1">总花费</div>
                <div className="text-2xl sm:text-3xl font-black text-red-700">¥14,800</div>
              </div>
              <div className="bg-red-50 rounded-lg p-4">
                <div className="text-sm text-red-600 mb-1">总浏览量</div>
                <div className="text-2xl sm:text-3xl font-black text-red-700">20.1万</div>
              </div>
              <div className="bg-red-50 rounded-lg p-4">
                <div className="text-sm text-red-600 mb-1">转化数</div>
                <div className="text-2xl sm:text-3xl font-black text-red-700">18</div>
                <div className="text-xs text-red-600 mt-1">1.2% 转化率</div>
              </div>
              <div className="bg-red-50 rounded-lg p-4">
                <div className="text-sm text-red-600 mb-1">核销率</div>
                <div className="text-2xl sm:text-3xl font-black text-red-700">28%</div>
                <div className="text-xs text-red-600 mt-1">5 人到场</div>
              </div>
            </div>

            <div className="bg-red-100 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-red-800 font-bold">单次获客成本</span>
                <span className="text-3xl font-black text-red-900">¥822</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-red-800 font-bold">投资回报率</span>
                <span className="text-3xl font-black text-red-900">0.73x</span>
              </div>
            </div>

            <div className="border-t border-red-200 pt-4">
              <div className="text-sm text-red-700 font-semibold mb-2">问题:</div>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start">
                  <X className="mr-2 mt-0.5 flex-shrink-0 text-red-500" size={16} />
                  无行为定位 —— “广撒网”模式
                </li>
                <li className="flex items-start">
                  <X className="mr-2 mt-0.5 flex-shrink-0 text-red-500" size={16} />
                  网红内容千篇一律 —— 客户审美疲劳
                </li>
                <li className="flex items-start">
                  <X className="mr-2 mt-0.5 flex-shrink-0 text-red-500" size={16} />
                  零预测能力 —— 无法识别高价值用户
                </li>
                <li className="flex items-start">
                  <X className="mr-2 mt-0.5 flex-shrink-0 text-red-500" size={16} />
                  核销率低 —— 没有建立信任机制
                </li>
              </ul>
            </div>
          </div>

          {/* GoWild AI Campaign */}
          <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl border-2 border-green-400 p-6 sm:p-8 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">GoWild AI 驱动的方法</h2>
              <div className="px-4 py-2 bg-green-600 text-white rounded-lg font-bold text-sm pulse-glow">
                新方法
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <div className="text-sm text-green-600 mb-1">总花费</div>
                <div className="text-2xl sm:text-3xl font-black text-green-700">¥5,200</div>
                <div className="text-xs text-green-600 mt-1">↓ 减少 65%</div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <div className="text-sm text-green-600 mb-1">精准触达</div>
                <div className="text-2xl sm:text-3xl font-black text-green-700">5.7K</div>
                <div className="text-xs text-green-600 mt-1">仅限高价值用户</div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <div className="text-sm text-green-600 mb-1">转化数</div>
                <div className="text-2xl sm:text-3xl font-black text-green-700">2,175</div>
                <div className="text-xs text-green-600 mt-1">38.2% 转化率</div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <div className="text-sm text-green-600 mb-1">核销率</div>
                <div className="text-2xl sm:text-3xl font-black text-green-700">64.5%</div>
                <div className="text-xs text-green-600 mt-1">1,403 人到场</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-6 mb-6 text-white">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold">单次获客成本</span>
                <span className="text-3xl font-black">¥239</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold">投资回报率</span>
                <span className="text-3xl font-black">3.4x</span>
              </div>
            </div>

            <div className="border-t border-green-200 pt-4">
              <div className="text-sm text-green-700 font-semibold mb-2">优势:</div>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start">
                  <CheckCircle className="mr-2 mt-0.5 flex-shrink-0 text-green-500" size={16} />
                  行为 DNA 分析 —— 外科手术式精准定位
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 mt-0.5 flex-shrink-0 text-green-500" size={16} />
                  AI 优化内容策略 —— 个性化信息传递
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 mt-0.5 flex-shrink-0 text-green-500" size={16} />
                  预测性评分 —— 在花费前识别转化者
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 mt-0.5 flex-shrink-0 text-green-500" size={16} />
                  建立信任的干预措施 —— 最大化核销率
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Dramatic Impact Stats */}
        <div className="bg-gradient-to-r from-purple-900 to-blue-900 rounded-2xl p-8 sm:p-12 mb-12 text-white text-center shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-black mb-8">最终的业务影响</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            <div>
              <div className="text-4xl sm:text-6xl font-black mb-2 stat-gradient">121x</div>
              <div className="text-base sm:text-lg">更多转化</div>
              <div className="text-sm text-blue-300 mt-1">(18 → 2,175)</div>
            </div>
            <div>
              <div className="text-4xl sm:text-6xl font-black mb-2 stat-gradient">65%</div>
              <div className="text-base sm:text-lg">更低花费</div>
              <div className="text-sm text-blue-300 mt-1">(¥1.48万 → ¥5.2K)</div>
            </div>
            <div>
              <div className="text-4xl sm:text-6xl font-black mb-2 stat-gradient">31.8x</div>
              <div className="text-base sm:text-lg">更高转化率</div>
              <div className="text-sm text-blue-300 mt-1">(1.2% → 38.2%)</div>
            </div>
            <div>
              <div className="text-4xl sm:text-6xl font-black mb-2 stat-gradient">4.7x</div>
              <div className="text-base sm:text-lg">ROI 提升</div>
              <div className="text-sm text-blue-300 mt-1">(0.73x → 3.4x)</div>
            </div>
          </div>
          <style>{`
            .stat-gradient {
                background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            .pulse-glow { animation: pulse-glow 2s infinite alternate; }
          `}</style>
        </div>

        {/* The Secret Weapon: Data Monetization */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 border-2 border-purple-300 mb-12 shadow-lg">
          <div className="flex flex-col sm:flex-row items-start justify-between mb-8">
            <div className="mb-4 sm:mb-0">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
                等等... 还有更多
              </h2>
              <p className="text-lg sm:text-xl text-slate-600">
                您收集的数据将成为 <span className="font-bold text-purple-600">创收资产</span>
              </p>
            </div>
            <Layers className="text-purple-600" size={48} sm:size={64} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
              <div className="text-purple-600 font-bold mb-2">客户档案</div>
              <div className="text-3xl font-black text-purple-900 mb-2">9,470</div>
              <div className="text-sm text-slate-600">已收集的行为 DNA 档案</div>
            </div>
            <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
              <div className="text-purple-600 font-bold mb-2">市场价值</div>
              <div className="text-3xl font-black text-purple-900 mb-2">¥28-56</div>
              <div className="text-sm text-slate-600">每份档案 (B2B 转售)</div>
            </div>
            <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
              <div className="text-purple-600 font-bold mb-2">潜在收入</div>
              <div className="text-3xl font-black text-purple-900 mb-2">¥26.5万+</div>
              <div className="text-sm text-slate-600">年度数据许可收入</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-6">
            <div className="font-bold text-slate-900 mb-3">谁会购买这些数据？</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-start">
                <CheckCircle className="mr-2 mt-0.5 flex-shrink-0 text-green-600" size={16} />
                <span className="text-slate-700">旅游机构 (家庭游客档案)</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="mr-2 mt-0.5 flex-shrink-0 text-green-600" size={16} />
                <span className="text-slate-700">体育器材品牌 (探险爱好者)</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="mr-2 mt-0.5 flex-shrink-0 text-green-600" size={16} />
                <span className="text-slate-700">零售连锁 (冲动购买者客群)</span>
              </div>
            </div>
          </div>
        </div>

      {/* Revenue Recovery Calculator */}
        <div className="bg-gradient-to-br from-red-900 to-red-800 rounded-2xl p-6 sm:p-10 text-white mb-12 shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-black mb-6 text-center">
            您已经损失了多少？
          </h2>
          <p className="text-lg sm:text-xl text-red-200 mb-8 text-center">
            计算您在传统营销中浪费的广告支出
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div>
              <label htmlFor="monthlyBudgetInput" className="block text-sm font-semibold mb-2">每月营销预算 (¥)</label>
              <input
                id="monthlyBudgetInput"
                type="number"
                placeholder="例如：15000"
                className="w-full px-4 py-3 rounded-lg text-slate-900 font-bold text-lg focus:ring-red-400 focus:border-red-400"
                onChange={handleLossCalculation}
              />
            </div>
            <div>
              <label htmlFor="timePeriodSelect" className="block text-sm font-semibold mb-2">时间周期</label>
              <select 
                id="timePeriodSelect" 
                className="w-full px-4 py-3 rounded-lg text-slate-900 font-bold text-lg focus:ring-red-400 focus:border-red-400"
                onChange={handleLossCalculation}
                defaultValue="6"
              >
                <option value="6">过去 6 个月</option>
                <option value="12">过去 12 个月</option>
                <option value="24">过去 24 个月</option>
              </select>
            </div>
          </div>

          {calculatedLoss > 0 && (
            <div className="mt-8 bg-white rounded-xl p-6 sm:p-8 text-center shadow-lg">
              <div className="text-sm text-red-600 font-bold mb-2">预计浪费支出</div>
              <div className="text-5xl sm:text-6xl font-black text-red-600 mb-4">
                ¥{calculatedLoss.toLocaleString()}
              </div>
              <div className="text-slate-700 text-base sm:text-lg">
                这笔钱白白烧掉了，<span className="font-bold">没有获得任何客户洞察</span>
              </div>
            </div>
          )}
        </div>
        {/* Final CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 sm:p-12 text-white shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-black mb-4">停止流血。启动智能。</h2>
            <p className="text-lg sm:text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              没有 GoWild 的每一天，都是在浪费广告支出和丢失客户洞察。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button className="bg-white text-blue-600 px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-bold text-lg sm:text-xl hover:bg-blue-50 transition-all transform hover:scale-105 shadow-2xl w-full sm:w-auto">
                预约策略会议
              </button>
              <button 
                onClick={() => {
                  setCurrentAct(1);
                  setSelectedUser(null);
                  setTimelineIndex(0);
                  setPlayingTimeline(false);
                  setMoneyBurning(0);
                  setCalculatedLoss(0);
                }}
                className="bg-transparent border-2 border-white text-white px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-bold text-lg sm:text-xl hover:bg-white hover:text-blue-600 transition-all w-full sm:w-auto"
              >
                <span className='inline-flex items-center'>↻ 重新播放演示</span>
              </button>
            </div>
            <div className="mt-8 text-blue-200 text-sm flex items-center justify-center">
              <Unlock className="mr-2" size={16} />
              南通市场试点名额有限 • 抢占先机
            </div>
          </div>
        </div>
      </div>
    </div>
  );


  return (
    <div className="min-h-screen">
      {currentAct === 1 && renderAct1()}
      {currentAct === 2 && renderAct2()}
      {currentAct === 3 && renderAct3()}
    </div>
  );
};

export default App;