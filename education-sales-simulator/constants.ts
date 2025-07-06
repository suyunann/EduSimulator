
import type { Step, Customer } from './types';
import { StepId } from './types';
import { HandshakeIcon, MagnifyingGlassIcon, StarIcon, ShieldIcon, RocketIcon } from './components/icons';
import React from 'react';

export const INITIAL_CUSTOMER: Customer = {
  name: '王先生',
  interest: 'Python 課程',
  background: '未知',
  motivation: '未知',
  painPoint: '未知',
  budget: '未知',
  timeline: '未知',
};

export const SIMULATION_STEPS: Step[] = [
  {
    id: StepId.Rapport,
    title: '破冰與建立關係',
    icon: React.createElement(HandshakeIcon, {className: 'text-xl'}),
    description: '目標：讓對方放下戒心，願意與你交談。',
    scenes: [
      {
        id: 0,
        customerDialogue: (customer) => `您好，我姓王。我在網路上看到你們的 Python 課程，想了解一下。`,
        consultantPrompt: '這是對話的開始。選擇一個專業且友善的開場白。',
        choices: [
          {
            text: '喔，Python 課是嗎？你想知道什麼？',
            isCorrect: false,
            feedback: '這個開場太直接，缺乏溫度，沒有建立起顧問的專業形象。',
          },
          {
            text: '王先生您好，我是XX教育中心的顧問陳老師。收到了您對我們Python課程的諮詢，很高興您對提升自己的程式能力這麼有規劃！',
            isCorrect: true,
            feedback: '非常棒！這個開場白確認了對方身份、表達了讚賞，並迅速建立了專業、正面的第一印象。',
          },
          {
            text: '我們的 Python 課程是業界最好的，很多人報名，你要快點決定喔。',
            isCorrect: false,
            feedback: '這聽起來太像急於推銷的銷售員，會立刻引起客戶的警惕和反感。',
          },
        ],
      },
      {
        id: 1,
        customerDialogue: '嗯，謝謝。是啊，最近覺得需要學點新東西。',
        consultantPrompt: '客戶的回應很正面。現在，設定議程以掌握對話主導權。',
        choices: [
          {
            text: '好，那我來為您介紹一下我們的課程內容，我們有分初級、中級跟高級...',
            isCorrect: false,
            feedback: '太快進入課程介紹了。還不了解客戶需求，現在的介紹會像亂槍打鳥，無法打中痛點。',
          },
          {
            text: '為了給您最精準的建議，接下來我會花大約5-10分鐘，先了解一下您的背景和目標，然後再為您介紹最適合的方案，您看方便嗎？',
            isCorrect: true,
            feedback: '完美的議程設定！這展現了你的專業和對客戶的尊重，讓他知道接下來會發生什麼，並同意讓你主導對話。',
          },
           {
            text: '那您預算是多少？我幫您看看適合哪個。',
            isCorrect: false,
            feedback: '太早問預算了！在尚未建立價值之前就談錢，會讓客戶覺得你只關心他的錢包。',
          },
        ],
      },
    ],
  },
  {
    id: StepId.Discovery,
    title: '深度挖掘與診斷',
    icon: React.createElement(MagnifyingGlassIcon, {className: 'text-xl'}),
    description: '目標：了解客戶的痛點、渴望和現狀。',
    scenes: [
        {
            id: 0,
            customerDialogue: '方便啊，沒問題。',
            consultantPrompt: '客戶同意讓你提問。現在使用開放式問題來了解他的動機 (Why)。',
            choices: [
                {
                    text: '當初是什麼原因讓您想開始學習 Python 呢？學成之後，您最希望達成什麼樣的目標？',
                    isCorrect: true,
                    feedback: '非常好的開放式問題！這能引導客戶思考並分享他深層的動機和期望，這是建立解決方案的基礎。',
                    crmUpdate: { motivation: '想轉職，提升職涯發展' },
                },
                {
                    text: '您是想轉職還是興趣？',
                    isCorrect: false,
                    feedback: '這是個封閉式問題，雖然能得到答案，但限制了客戶的表達，無法挖掘更深層次的故事和情感。',
                },
                {
                    text: '很多人學 Python 是為了找工作，您也是吧？',
                    isCorrect: false,
                    feedback: '這是引導性提問，你在替客戶下結論，可能會讓他感到不被尊重，也無法得知他的真實想法。',
                }
            ]
        },
        {
            id: 1,
            customerDialogue: '主要是想轉職到軟體業，現在的工作有點瓶頸。自己看書學了一些，但常常卡住，感覺很沒效率。',
            consultantPrompt: '客戶提到了他的痛點！現在，深入挖掘這個痛點，讓他更清晰地意識到問題的嚴重性。',
            choices: [
                {
                    text: '自學本來就很難，我們的課程可以幫你解決。',
                    isCorrect: false,
                    feedback: '太快給出方案了。在痛點上多停留一會兒，能加強他改變的決心。',
                },
                {
                    text: '在您自學的過程中，遇到最大的困難是什麼？如果這個問題不解決，對您未來一兩年的職涯發展，可能會帶來什麼影響？',
                    isCorrect: true,
                    feedback: '問得太棒了！第一個問題深化痛點，第二個問題製造了緊迫感，讓他意識到「不改變的代價」。',
                    crmUpdate: { painPoint: '自學效率低、常卡關', timeline: '希望1-2年內轉職成功', background: '有自學經驗' }
                },
                {
                    text: '方便了解一下您在學習上的預算大概是多少嗎？',
                    isCorrect: false,
                    feedback: '時機不對。在客戶還在陳述痛點時轉移到預算，會打斷他的情緒，讓他覺得你不在乎他的困難。',
                }
            ]
        }
    ]
  },
  {
    id: StepId.Value,
    title: '呈現價值與方案',
    icon: React.createElement(StarIcon, {className: 'text-xl'}),
    description: '目標：將課程優點與客戶需求連結。',
    scenes: [
        {
            id: 0,
            customerDialogue: '最大的困難就是遇到問題沒人可以問，卡住就動彈不得。如果不改變，可能兩年後我還在原地踏步吧...',
            consultantPrompt: '你已經成功挖掘了客戶的痛點：「遇到問題沒人問」。現在，使用 FAB 法則來呈現你的解決方案。',
            choices: [
                {
                    text: '我們有 24 小時助教服務 (Feature)。',
                    isCorrect: false,
                    feedback: '這只是在陳述功能 (Feature)，沒有解釋這對客戶意味著什麼，不具說服力。',
                },
                {
                    text: '您剛提到擔心下班後遇到問題沒人問，我們特別提供24小時助教服務 (Feature)，這代表無論您多晚學習，只要卡關了隨時都能得到解答，確保學習不中斷 (Advantage)，最終幫助您在預計時間内完成學習，達成轉職目標 (Benefit)。',
                    isCorrect: true,
                    feedback: '完美的 FAB 展示！你成功地將課程特色與客戶的痛點和渴望緊密連結，這就是價值所在！',
                },
                {
                    text: '我之前有個學員跟您情況很像，他學完後現在薪水很高！',
                    isCorrect: false,
                    feedback: '講故事是個好技巧，但應該在呈現核心價值之後作為輔助，否則聽起來有點空泛。',
                }
            ]
        }
    ]
  },
  {
    id: StepId.Objection,
    title: '處理疑慮與反對',
    icon: React.createElement(ShieldIcon, {className: 'text-xl'}),
    description: '目標：將反對意見視為了解更多的信號。',
    scenes: [
        {
            id: 0,
            customerDialogue: '聽起來很不錯... 但是我看了一下，這個學費好像有點貴...',
            consultantPrompt: '客戶提出了最常見的疑慮：「太貴了」。你該如何應對？',
            choices: [
                {
                    text: '一分錢一分貨，我們的品質是最好的。',
                    isCorrect: false,
                    feedback: '這句話很空洞，沒有解決客戶的疑慮，反而可能聽起來像在辯解。',
                },
                {
                    text: '我理解您對價格的考量。請問除了價格，課程的內容和規劃您都還滿意嗎？',
                    isCorrect: false,
                    feedback: '這是一個好的技巧（反問確認），但不是第一步。第一步應該是先處理價值感知的問題。',
                },
                {
                    text: '如果把總學費分攤到每個月，其實每天只是一杯咖啡的錢，但這項投資卻可能為您帶來未來每月數千甚至上萬的薪資增長，您覺得哪個更划算呢？',
                    isCorrect: true,
                    feedback: '非常好的應對！你沒有直接反駁，而是通過「拆解價值」和「強調投資回報率 (ROI)」的方式，讓他重新看待這個價格。',
                    crmUpdate: { budget: '在意價格，但重視價值' },
                }
            ]
        }
    ]
  },
  {
    id: StepId.Closing,
    title: '促成與行動呼籲',
    icon: React.createElement(RocketIcon, {className: 'text-xl'}),
    description: '目標：自信、清晰地引導客戶完成報名。',
    scenes: [
        {
            id: 0,
            customerDialogue: '嗯... 你這麼說也對，這確實是一項對未來的投資。',
            consultantPrompt: '客戶已經被你說服，疑慮基本解除。現在是臨門一腳的最佳時機！選擇一個有效的促成技巧。',
            choices: [
                {
                    text: '那您要報名嗎？',
                    isCorrect: false,
                    feedback: '這個問題太直接，把決定的壓力完全丟給了客戶，他可能會下意識地回答「我再考慮一下」。',
                },
                {
                    text: '好的，那接下來我來為您說明一下報名的流程...請問您的電子郵件是？',
                    isCorrect: true,
                    feedback: '漂亮的「假設成交法」！你自然地引導客戶進入下一步，讓他感覺報名是一個順理成章的過程，降低了他的決策壓力。',
                },
                {
                    text: '那您再考慮看看，有問題隨時找我。',
                    isCorrect: false,
                    feedback: '這等於是放棄了成交的機會！在客戶意願最高的時候，你應該主動引導，而不是讓他離開。',
                }
            ]
        }
    ]
  }
];
