// ==== 互動式故事山邏輯 (適用於 task.html) ====
let slotAnswers = [null, null, null, null, null];
const correctOrder = ['開端', '發展', '高潮', '下降', '結局']; // 已修正統一為「發展」
const initialFlags = ['高潮', '開端', '結局', '發展', '下降'];

function initInteractiveMountain() {
    if (!document.getElementById('options-pool')) return; // 確保在對應的頁面才執行
    slotAnswers = [null, null, null, null, null];
    document.getElementById('feedback-msg').innerHTML = '';
    document.getElementById('success-next-btn').classList.add('hidden');
    renderPool();
    renderSlots();
}

function renderPool() {
    const poolEl = document.getElementById('options-pool');
    if (!poolEl) return;
    poolEl.innerHTML = '';
    initialFlags.forEach(word => {
        if(!slotAnswers.includes(word)) {
            const btn = document.createElement('button');
            btn.className = "bg-orange-100 border-2 border-orange-400 text-orange-800 font-bold py-1.5 px-3 rounded shadow-md hover:bg-orange-200 transition-colors flex items-center text-sm transform hover:-translate-y-1 pointer-events-auto";
            btn.innerHTML = `🚩 ${word}`;
            btn.onclick = () => moveToSlot(word);
            poolEl.appendChild(btn);
        }
    });
}

function renderSlots() {
    for(let i=0; i<5; i++) {
        const slotEl = document.getElementById(`slot-${i}`);
        if (!slotEl) continue;
        if(slotAnswers[i]) {
            slotEl.innerHTML = `<span class="bg-white/95 border-2 border-blue-400 text-blue-800 font-extrabold py-1 px-1 rounded shadow-md text-xs md:text-sm w-full h-full flex items-center justify-center tracking-wider text-outline truncate shadow-inner">🚩 ${slotAnswers[i]}</span>`;
            slotEl.classList.remove('border-dashed', 'border-gray-800/60', 'bg-white/30');
            slotEl.classList.add('border-solid', 'border-transparent', 'bg-transparent');
        } else {
            slotEl.innerHTML = `<span class="text-gray-800 text-base md:text-lg font-black opacity-80 drop-shadow-md text-outline">${i+1}</span>`;
            slotEl.classList.add('border-dashed', 'border-gray-800/60', 'bg-white/30');
            slotEl.classList.remove('border-solid', 'border-transparent', 'bg-transparent');
        }
    }
}

function moveToSlot(word) {
    const emptyIdx = slotAnswers.indexOf(null);
    if(emptyIdx !== -1) {
        slotAnswers[emptyIdx] = word;
        renderPool();
        renderSlots();
        checkCompletion();
    }
}

function returnToPool(idx) {
    if(slotAnswers[idx] !== null) {
        slotAnswers[idx] = null;
        document.getElementById('feedback-msg').innerHTML = '';
        document.getElementById('success-next-btn').classList.add('hidden');
        renderPool();
        renderSlots();
    }
}

function checkCompletion() {
    if(!slotAnswers.includes(null)) {
        let isCorrect = true;
        for(let i=0; i<5; i++) {
            if(slotAnswers[i] !== correctOrder[i]) isCorrect = false;
        }
        
        if(isCorrect) {
            document.getElementById('feedback-msg').innerHTML = '<span class="text-green-400 font-extrabold text-base text-outline tracking-wide">🎉 排序完全正確！太厲害了！</span>';
            document.getElementById('success-next-btn').classList.remove('hidden');
        } else {
            document.getElementById('feedback-msg').innerHTML = '<span class="text-red-400 font-extrabold text-sm text-outline">🤔 順序怪怪的，點擊山上的旗子可以退回重排喔！</span>';
            document.getElementById('success-next-btn').classList.add('hidden');
        }
    }
}

// ==== 測驗問答邏輯 (適用於 quiz.html) ====
const stages = [
    {
        name: "開端 (Exposition)",
        desc: "描述已有的故事背景以及人物。",
        question: "「豬媽媽讓三隻小豬各自去蓋自己的房子，準備獨立生活。」這句話在故事山中，最主要的作用是什麼？",
        options: [
            "建立人物（三隻小豬）、背景與故事的初始目標（蓋房子獨立生活）。",
            "為了讓大野狼馬上出現把小豬吃掉，製造恐怖氣氛。"
        ],
        correct: 0,
        feedback: "沒錯！開端就是要設定故事背景與角色的初始目標。透過「各自蓋房子」，讓故事有了明確的出發點與動機。"
    },
    {
        name: "發展 (Rising Action)",
        desc: "豐富已有的任務情節，慢慢引向問題和矛盾。",
        question: "大野狼輕鬆吹垮了大哥的茅草屋和二哥的木屋，兩隻小豬驚慌地逃到小弟的磚瓦房. 這段情節在故事山中起到了什麼作用？",
        options: [
            "這是故事的結束，因為大哥和二哥已經沒有房子可以住了。",
            "逐步增加危機感，透過大野狼的連續破壞，將緊張氣氛不斷推高。"
        ],
        correct: 1,
        feedback: "正確。發展階段會透過一連串的衝突來累積張力，大野狼不斷逼近，最後將三隻小豬逼退到同一陣線，讓讀者越來越緊張。"
    },
    {
        name: "高潮 (Climax)",
        desc: "矛盾顯現，人物們如何處理矛盾或解決問題？",
        question: "大野狼用力吹卻吹不倒磚瓦房，最後決定從煙囪爬進去抓小豬。這段情節為何被視為故事的高潮？",
        options: [
            "這是雙方對決最激烈的時刻，大野狼使出最後手段，主角面臨最大的危機與轉折。",
            "因為大野狼吹累了，需要從煙囪爬下來休息一下。"
        ],
        correct: 0,
        feedback: "答對了！高潮是衝突最激烈、最決定性的瞬間。大野狼從煙囪爬下，是整個故事最驚險的轉折點，決定了最後的勝負。"
    },
    {
        name: "下降 (Falling Action)",
        desc: "事件慢慢得到解決，開始冷靜下來。",
        question: "大野狼從煙囪掉下來，正好落入豬小弟準備好的滾水鍋裡，痛得大叫。這個動作在結構上的意義為何？",
        options: [
            "代表豬小弟打算請大野狼喝熱湯，雙方達成了和解。",
            "這是危機解除的過程，大野狼受到懲罰，故事的緊張感開始消退。"
        ],
        correct: 1,
        feedback: "是的。下降階段通常是高潮過後，衝突開始解決、緊張感得到釋放的過程。「掉進滾水鍋」代表大野狼的威脅正在瓦解。"
    },
    {
        name: "結局 (Resolution)",
        desc: "問題解決了，人物感覺如何？是悲劇還是喜劇？",
        question: "故事最後大野狼落荒而逃，三隻小豬在堅固的磚瓦房裡安心地生活在一起。這對整座故事山而言，是什麼樣的收尾？",
        options: [
            "展現主角們克服困難後的結果，並帶出「腳踏實地」的教育意義，是典型的圓滿收場。",
            "這暗示大野狼很快又會回來，故事其實還沒有真正結束。"
        ],
        correct: 0,
        feedback: "完全正確。結局為故事畫下句點，小豬們的安全生活對比了先前的危機，讓讀者獲得安心感，也點出了故事的核心寓意。"
    }
];

let currentStage = 0;

function initQuiz() {
    if (!document.getElementById('quiz-screen')) return;
    currentStage = 0;
    showStage();
}

function showStage() {
    const stage = stages[currentStage];
    
    for(let i=1; i<=5; i++) {
        const el = document.getElementById(`step-${i}`);
        if(el) {
            el.classList.remove('active', 'completed');
            if(i <= currentStage) el.classList.add('completed');
            if(i === currentStage + 1) el.classList.add('active');
        }
    }

    document.getElementById('stage-badge').innerText = stage.name;
    document.getElementById('stage-desc').innerText = stage.desc;
    document.getElementById('question-text').innerText = stage.question;
    document.getElementById('opt-0').innerText = stage.options[0];
    document.getElementById('opt-1').innerText = stage.options[1];

    const backBtnText = document.getElementById('back-btn-text');
    if(currentStage === 0) {
        backBtnText.innerText = "返回故事山解答";
    } else {
        backBtnText.innerText = "回到上一題";
    }
}

function handleAnswer(choice) {
    const stage = stages[currentStage];
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('feedback-screen').classList.remove('hidden');
    
    if(choice === stage.correct) {
        document.getElementById('feedback-icon').innerText = "✨";
        document.getElementById('feedback-title').innerText = "理解正確！";
        document.getElementById('feedback-title').className = "text-2xl font-bold mb-4 text-green-600";
    } else {
        document.getElementById('feedback-icon').innerText = "🤔";
        document.getElementById('feedback-title').innerText = "換個角度想想";
        document.getElementById('feedback-title').className = "text-2xl font-bold mb-4 text-orange-600";
    }
    document.getElementById('feedback-text').innerText = stage.feedback;
}

function nextStage() {
    currentStage++;
    const feedbackScreen = document.getElementById('feedback-screen');
    
    if(currentStage < stages.length) {
        feedbackScreen.classList.add('hidden');
        document.getElementById('quiz-screen').classList.remove('hidden');
        showStage();
    } else {
        feedbackScreen.classList.add('hidden');
        document.getElementById('quiz-container-content').classList.add('hidden');
        document.getElementById('result-screen').classList.remove('hidden');
        document.getElementById(`step-5`).classList.add('completed');
        document.getElementById(`step-5`).classList.remove('active');
    }
}

function goBack() {
    if (currentStage > 0) {
        currentStage--;
        showStage();
    } else {
        // 第一題按返回，回到解答頁
        window.location.href = 'answer.html';
    }
}

// 頁面載入時自動初始化對應功能
document.addEventListener('DOMContentLoaded', () => {
    initInteractiveMountain();
    initQuiz();
});