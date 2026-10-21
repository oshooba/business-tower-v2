import React, { useState, useEffect, useRef } from 'react';
import { 
  Building2, 
  MessageCircle, 
  X, 
  Send, 
  BatteryCharging, 
  Star, 
  ChevronLeft, 
  ChevronRight,
  BookOpen,
  Lightbulb,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Target,
  Briefcase
} from 'lucide-react';

// --- Types & Interfaces ---
interface Message {
  id: number;
  sender: 'ai' | 'user';
  text: string;
}

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  socraticHint: string;
}

// --- Data: Floor 1 Curriculum (Mariam's Bakery) ---
const floor1Quiz: QuizQuestion[] = [
  {
    id: 1,
    question: "عندما تطلب جارة مريم كعكة مخصصة لحفلة عيد ميلاد، هل هذا يلبي حاجة أم رغبة؟",
    options: ["حاجة أساسية للبقاء", "رغبة استهلاكية لتحسين جودة الحياة"],
    correctAnswerIndex: 1,
    explanation: "الرغبات هي سلع أو خدمات تساهم في تحسين جودة الحياة والرفاهية، ولكنها ليست حتمية للبقاء على قيد الحياة مثل الطعام الأساسي والماء.",
    socraticHint: "فكر يا أحمد: هل يمكن للإنسان أن يعيش بدون كعكة عيد الميلاد؟ ما هو الدافع الحقيقي لشرائها؟"
  },
  {
    id: 2,
    question: "متى يتحول نشاط مريم في خبز الكعك من مجرد 'هواية' إلى 'منظمة أعمال'؟",
    options: ["عندما تخبز لأصدقائها مجاناً في أوقات الفراغ", "عندما تمارس النشاط بانتظام لتقديم قيمة للآخرين مقابل عائد مع تحمل المسؤولية"],
    correctAnswerIndex: 1,
    explanation: "منظمة الأعمال هي نشاط منظم يقدم قيمة (سلع أو خدمات) بشكل مستمر ومخطط له، ويتحمل مسؤوليات ومخاطر مقابل تحقيق عائد.",
    socraticHint: "تأمل في الفرق بين ما تفعله للمتعة الشخصية، وما تفعله بالتزام مستمر تجاه عملاء ينتظرون منك جودة معينة."
  },
  {
    id: 3,
    question: "كيف تخلق مريم 'قيمة' لعملائها حسب معادلة القيمة؟",
    options: ["القيمة = المنافع (طعم، جودة، توصيل) - التكاليف (السعر، وقت الانتظار)", "القيمة = السعر المرتفع + التغليف العادي"],
    correctAnswerIndex: 0,
    explanation: "تنشأ القيمة عندما يدرك العميل أن المنافع التي يحصل عليها من السلعة أو الخدمة تفوق التكاليف التي يتكبدها للحصول عليها.",
    socraticHint: "إذا دفعت مبلغاً كبيراً في منتج سيء، هل تشعر بقيمته؟ القيمة دائماً هي ميزان بين ما تأخذه وما تدفعه."
  }
];

// --- Main Application Component ---
export default function BusinessTowerApp() {
  // Gamification State
  const [xp, setXp] = useState<number>(0);
  const [fuel, setFuel] = useState<number>(10); // Starts at 10%
  
  // Navigation State
  const [currentFloor, setCurrentFloor] = useState<number>(1);
  
  // Socratic Chat State
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [chatInput, setChatInput] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<Message[]>([
    { id: 1, sender: 'ai', text: 'أهلاً بك يا أحمد في برج إدارة الأعمال! أنا مرشدك السقراطي. نحن الآن في الطابق الأول (مخبز مريم). كيف يمكنني مساعدتك في فهم الفرق بين الاحتياجات والرغبات؟' }
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isChatOpen]);

  // Handle Chat Submission (Socratic Logic)
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newUserMsg: Message = { id: Date.now(), sender: 'user', text: chatInput };
    setChatMessages(prev => [...prev, newUserMsg]);
    setChatInput('');

    // Socratic AI Response Logic
    setTimeout(() => {
      let aiResponse = "هذا سؤال مثير للاهتمام يا أحمد. دعنا نفكر معاً: كيف يرتبط هذا بمفهوم القيمة التي تقدمها مريم لعملائها؟";
      const lowerInput = newUserMsg.text.toLowerCase();
      
      if (lowerInput.includes('حاج') || lowerInput.includes('رغب')) {
        aiResponse = "سؤال ممتاز. تذكر أن الحاجة ضرورية للبقاء، بينما الرغبة تحسن جودة الحياة. إذا اشترى شخص سيارة فارهة، هل يشتري وسيلة نقل (حاجة) أم مكانة اجتماعية (رغبة)؟";
      } else if (lowerInput.includes('قيم')) {
        aiResponse = "القيمة هي جوهر الأعمال. إذا زادت مريم السعر دون تحسين الجودة، ماذا سيحدث لمعادلة القيمة (المنافع - التكاليف) في ذهن العميل؟";
      } else if (lowerInput.includes('هواي') || lowerInput.includes('أعمال')) {
        aiResponse = "الهواية تمارس للمتعة، والأعمال تمارس بالتزام. ما هو الخطر الأكبر الذي تتحمله مريم عند تحويل هوايتها إلى عمل تجاري؟";
      }

      setChatMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: aiResponse }]);
    }, 1000);
  };

  // --- Components ---

  const ElevatorSidebar = () => {
    const floors = Array.from({ length: 13 }, (_, i) => i).reverse(); // 12 down to 0

    return (
      <div className="w-24 bg-slate-900 border-l border-slate-800 flex flex-col items-center py-6 overflow-y-auto hide-scrollbar z-10 shadow-2xl">
        <div className="mb-6 text-indigo-400 flex flex-col items-center">
          <Building2 size={32} />
          <span className="text-xs mt-2 font-bold tracking-widest">المصعد</span>
        </div>
        <div className="flex flex-col gap-2 w-full px-2">
          {floors.map(floor => (
            <button
              key={floor}
              onClick={() => setCurrentFloor(floor)}
              className={`relative w-full py-3 rounded-lg font-bold transition-all duration-300 flex items-center justify-center group
                ${currentFloor === floor 
                  ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.5)]' 
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'}`}
            >
              {floor === 0 ? 'L' : floor}
              
              {/* Tooltip */}
              <div className="absolute right-full mr-4 px-3 py-1 bg-slate-800 text-slate-200 text-sm rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity border border-slate-700 z-50">
                {floor === 0 && "الطابق الأرضي: الاستقبال"}
                {floor === 1 && "الطابق 1: مدخل الأعمال (مخبز مريم)"}
                {floor === 12 && "الطابق 12: قاعة مجلس الإدارة"}
                {floor !== 0 && floor !== 1 && floor !== 12 && `الطابق ${floor}: قيد الإنشاء`}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const TopBar = () => (
    <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-8 shadow-md z-10">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-l from-indigo-400 to-cyan-400">
          برج إدارة الأعمال
        </h1>
        <span className="text-slate-500 text-sm hidden md:inline">| البكالوريا المصرية</span>
      </div>
      
      <div className="flex items-center gap-6">
        {/* XP Counter */}
        <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-full border border-slate-700">
          <Star className="text-yellow-400 fill-yellow-400" size={20} />
          <span className="text-slate-100 font-bold font-mono">{xp} XP</span>
        </div>
        
        {/* Fuel Gauge */}
        <div className="flex items-center gap-3 bg-slate-800 px-4 py-2 rounded-full border border-slate-700">
          <BatteryCharging className={`${fuel > 50 ? 'text-green-400' : fuel > 20 ? 'text-yellow-400' : 'text-red-400'}`} size={20} />
          <div className="w-32 h-2.5 bg-slate-900 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ease-out ${fuel > 50 ? 'bg-green-500' : fuel > 20 ? 'bg-yellow-500' : 'bg-red-500'}`}
              style={{ width: `${fuel}%` }}
            />
          </div>
          <span className="text-slate-300 text-xs font-mono w-8">{fuel}%</span>
        </div>
      </div>
    </div>
  );

  const InteractiveQuizCard = ({ question }: { question: QuizQuestion }) => {
    const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
    const [showHint, setShowHint] = useState<boolean>(false);

    const handleAnswer = (idx: number) => {
      if (status !== 'idle') return;
      
      setSelectedIdx(idx);
      if (idx === question.correctAnswerIndex) {
        setStatus('correct');
        setXp(prev => prev + 50);
        setFuel(prev => Math.min(100, prev + 15));
      } else {
        setStatus('incorrect');
        setFuel(prev => Math.max(0, prev - 5));
      }
    };

    return (
      <div className={`relative w-full rounded-2xl p-6 transition-all duration-500 border-2 
        ${status === 'idle' ? 'bg-slate-800 border-slate-700 hover:border-indigo-500/50' : 
          status === 'correct' ? 'bg-emerald-900/20 border-emerald-500/50' : 
          'bg-rose-900/20 border-rose-500/50'}`}
      >
        {/* Front of Card (Question) */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-slate-100 leading-relaxed">{question.question}</h3>
            {status === 'idle' && (
              <button 
                onClick={() => setShowHint(!showHint)}
                className="text-indigo-400 hover:text-indigo-300 transition-colors p-2 bg-indigo-500/10 rounded-full"
                title="تلميح سقراطي"
              >
                <Lightbulb size={20} />
              </button>
            )}
          </div>

          {showHint && status === 'idle' && (
            <div className="bg-indigo-900/40 border border-indigo-500/30 p-4 rounded-lg text-indigo-200 text-sm italic flex gap-3 items-start">
              <MessageCircle size={18} className="mt-0.5 shrink-0" />
              <p>{question.socraticHint}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            {question.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={status !== 'idle'}
                className={`p-4 rounded-xl text-right transition-all duration-300 border
                  ${status === 'idle' 
                    ? 'bg-slate-700/50 border-slate-600 hover:bg-indigo-600 hover:border-indigo-500 text-slate-200' 
                    : idx === question.correctAnswerIndex
                      ? 'bg-emerald-600 border-emerald-500 text-white'
                      : selectedIdx === idx
                        ? 'bg-rose-600 border-rose-500 text-white'
                        : 'bg-slate-800 border-slate-700 text-slate-500 opacity-50'
                  }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Back of Card (Explanation - reveals after answer) */}
        {status !== 'idle' && (
          <div className="mt-6 pt-6 border-t border-slate-700/50 animate-fade-in">
            <div className="flex items-center gap-3 mb-2">
              {status === 'correct' ? (
                <><CheckCircle2 className="text-emerald-400" /><span className="text-emerald-400 font-bold">إجابة صحيحة! (+50 XP)</span></>
              ) : (
                <><XCircle className="text-rose-400" /><span className="text-rose-400 font-bold">إجابة غير دقيقة. حاول التفكير بعمق أكثر.</span></>
              )}
            </div>
            <p className="text-slate-300 leading-relaxed">{question.explanation}</p>
          </div>
        )}
      </div>
    );
  };

  const Floor1Content = () => (
    <div className="max-w-5xl mx-auto pb-24 animate-fade-in">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-900/50 to-slate-800 rounded-3xl p-8 mb-8 border border-indigo-500/20 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-cyan-400"></div>
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-indigo-500/20 rounded-xl text-indigo-400">
            <Briefcase size={28} />
          </div>
          <h2 className="text-3xl font-bold text-white">الطابق 1: مدخل إلى الأعمال وغايتها</h2>
        </div>
        <p className="text-slate-300 text-lg leading-relaxed max-w-3xl">
          مرحباً بك في الطابق الأول. هنا نتعرف على قصة <span className="text-indigo-300 font-bold">"مخبز مريم"</span>. 
          كيف يتحول الشغف والهواية إلى منظمة أعمال حقيقية؟ وما هو الفرق الجوهري بين تلبية الاحتياجات الأساسية وإشباع الرغبات الاستهلاكية؟
        </p>
      </div>

      {/* Concepts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg">
          <div className="flex items-center gap-3 mb-4 text-cyan-400">
            <Target size={24} />
            <h3 className="text-xl font-bold">الاحتياجات مقابل الرغبات</h3>
          </div>
          <ul className="space-y-3 text-slate-300">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 shrink-0"></div>
              <p><strong className="text-slate-100">الاحتياجات (Needs):</strong> متطلبات أساسية لا يمكن للإنسان البقاء بدونها (طعام، ماء، مأوى).</p>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-2 shrink-0"></div>
              <p><strong className="text-slate-100">الرغبات (Wants):</strong> سلع وخدمات تساهم في تحسين جودة الحياة والرفاهية، ولكنها ليست حتمية للبقاء (كعكة مخصصة، هاتف ذكي).</p>
            </li>
          </ul>
        </div>

        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg">
          <div className="flex items-center gap-3 mb-4 text-emerald-400">
            <TrendingUp size={24} />
            <h3 className="text-xl font-bold">معادلة خلق القيمة</h3>
          </div>
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 text-center mb-4">
            <span className="text-2xl font-mono font-bold text-emerald-400">القيمة = المنافع - التكاليف</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            تنشأ القيمة عندما يفضل العميل العرض على البدائل المتاحة. لا تقتصر التكاليف على السعر المالي فقط، بل تشمل وقت الانتظار والجهد المبذول.
          </p>
        </div>
      </div>

      {/* Interactive Assessment */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <BookOpen className="text-indigo-400" />
          تحدي الطابق الأول (تقييم الأداء)
        </h3>
        <div className="flex flex-col gap-6">
          {floor1Quiz.map(q => (
            <InteractiveQuizCard key={q.id} question={q} />
          ))}
        </div>
      </div>
    </div>
  );

  const PlaceholderFloor = ({ floorNum }: { floorNum: number }) => (
    <div className="flex flex-col items-center justify-center h-full text-slate-400 animate-fade-in">
      <Building2 size={64} className="mb-6 opacity-20" />
      <h2 className="text-3xl font-bold text-slate-500 mb-4">الطابق {floorNum}</h2>
      <p className="text-lg">هذا الطابق قيد الإنشاء. يرجى التوجه إلى الطابق الأول.</p>
      <button 
        onClick={() => setCurrentFloor(1)}
        className="mt-8 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors"
      >
        العودة للطابق الأول
      </button>
    </div>
  );

  return (
    <div dir="rtl" className="flex h-screen bg-slate-950 text-slate-200 font-sans overflow-hidden selection:bg-indigo-500/30">
      {/* Global Styles for Font and Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap');
        body { font-family: 'Cairo', sans-serif; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}} />

      {/* Elevator Sidebar (Right side in RTL) */}
      <ElevatorSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full relative">
        <TopBar />
        
        <main className="flex-1 overflow-y-auto p-6 md:p-10 hide-scrollbar scroll-smooth">
          {currentFloor === 1 ? <Floor1Content /> : <PlaceholderFloor floorNum={currentFloor} />}
        </main>

        {/* Socratic FAB & Chat Drawer */}
        <div className="absolute bottom-6 left-6 z-50 flex flex-col items-start">
          {/* Chat Drawer */}
          {isChatOpen && (
            <div className="mb-4 w-80 sm:w-96 bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[500px] animate-fade-in">
              {/* Chat Header */}
              <div className="bg-indigo-600 p-4 flex justify-between items-center shadow-md z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Lightbulb className="text-white" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">المُوجّه السقراطي</h3>
                    <p className="text-indigo-200 text-xs">متصل الآن</p>
                  </div>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="text-indigo-200 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-slate-900/50">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm
                      ${msg.sender === 'user' 
                        ? 'bg-indigo-600 text-white rounded-br-none' 
                        : 'bg-slate-700 text-slate-100 rounded-bl-none border border-slate-600'}`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="p-3 bg-slate-800 border-t border-slate-700 flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="اسأل عن مخبز مريم، القيمة، الاحتياجات..."
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
                />
                <button 
                  type="submit"
                  disabled={!chatInput.trim()}
                  className="bg-indigo-600 text-white p-2.5 rounded-xl hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                  <Send size={18} className="rotate-180" /> {/* Rotate for RTL */}
                </button>
              </form>
            </div>
          )}

          {/* FAB Button */}
          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all duration-300 hover:scale-110
              ${isChatOpen ? 'bg-slate-700 text-slate-300' : 'bg-indigo-600 text-white hover:bg-indigo-500'}`}
          >
            {isChatOpen ? <X size={24} /> : <MessageCircle size={28} />}
          </button>
        </div>
      </div>
    </div>
  );
}
