import React, { useState, useCallback } from 'react';
import { SIMULATION_STEPS, INITIAL_CUSTOMER } from './constants';
import type { Customer, Choice } from './types';
import { AppState, StepId } from './types';
import ProgressTracker from './components/ProgressTracker';
import CrmPanel from './components/CrmPanel';

const WelcomeScreen: React.FC<{ onStart: () => void }> = ({ onStart }) => (
  <div className="text-center p-8 bg-white rounded-xl shadow-2xl max-w-2xl mx-auto animate-fade-in">
    <h1 className="text-4xl font-bold text-slate-800 mb-4">教育顧問銷售模擬器</h1>
    <p className="text-slate-600 mb-6">
      歡迎！本模擬器將帶您體驗一套完整的「教育顧問式」銷售流程。
      您的目標不是「推銷」，而是「引導客戶做出最適合他的決定」。
    </p>
    <div className="text-left bg-indigo-50 p-6 rounded-lg mb-8 border border-indigo-200">
        <h3 className="font-bold text-lg text-indigo-800 mb-2">核心心態：從「銷售員」到「引導者」</h3>
        <p className="text-indigo-700">您是一位專業的教育路徑規劃師，為客戶的未來提供解決方案。當您真心幫助客戶，成交會是自然而然的結果。</p>
    </div>
    <button
      onClick={onStart}
      className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 shadow-lg"
    >
      開始模擬
    </button>
  </div>
);

const SummaryScreen: React.FC<{ score: number; total: number; onRestart: () => void }> = ({ score, total, onRestart }) => (
    <div className="text-center p-8 bg-white rounded-xl shadow-2xl max-w-2xl mx-auto animate-fade-in">
        <h1 className="text-4xl font-bold text-slate-800 mb-2">模擬結束</h1>
        <p className="text-slate-600 mb-6">您已完成本次銷售流程模擬。</p>
        
        <div className="bg-slate-100 p-6 rounded-lg mb-8">
            <p className="text-lg text-slate-700">您的成績</p>
            <p className="text-6xl font-bold text-indigo-600 my-2">{score} / {total}</p>
            <p className="text-slate-500">你在 {total} 個關鍵互動中答對了 {score} 題。</p>
        </div>
        
        {score === total ? (
            <p className="text-green-600 font-semibold mb-6">恭喜！您完美地掌握了顧問式銷售的精髓！</p>
        ) : (
            <p className="text-amber-600 font-semibold mb-6">做得不錯！持續練習可以讓您在真實情境中更從容。</p>
        )}

        <button
            onClick={onRestart}
            className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 shadow-lg"
        >
            重新開始
        </button>
  </div>
);


const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.Welcome);
  const [currentStepId, setCurrentStepId] = useState<StepId>(StepId.Rapport);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [customer, setCustomer] = useState<Customer>(INITIAL_CUSTOMER);
  const [feedback, setFeedback] = useState<{ message: string; isCorrect: boolean } | null>(null);
  const [score, setScore] = useState(0);

  const totalQuestions = SIMULATION_STEPS.reduce((acc, step) => acc + step.scenes.length, 0);

  const currentStep = SIMULATION_STEPS[currentStepId];
  const currentScene = currentStep?.scenes[currentSceneIndex];

  const handleChoice = useCallback((choice: Choice) => {
    setFeedback({ message: choice.feedback, isCorrect: choice.isCorrect });
    if(choice.isCorrect){
      setScore(prev => prev + 1);
      if(choice.crmUpdate){
        setCustomer(prev => ({...prev, ...choice.crmUpdate}));
      }
    }

    setTimeout(() => {
      setFeedback(null);
      const nextSceneIndex = currentSceneIndex + 1;
      if (nextSceneIndex < currentStep.scenes.length) {
        setCurrentSceneIndex(nextSceneIndex);
      } else {
        const nextStepId = currentStepId + 1;
        if (nextStepId < SIMULATION_STEPS.length) {
          setCurrentStepId(nextStepId as StepId);
          setCurrentSceneIndex(0);
        } else {
          setAppState(AppState.Summary);
        }
      }
    }, 2500);
  }, [currentStep, currentStepId, currentSceneIndex]);

  const startSimulation = () => {
    setAppState(AppState.Simulation);
  };
  
  const restartSimulation = () => {
    setAppState(AppState.Welcome);
    setCurrentStepId(StepId.Rapport);
    setCurrentSceneIndex(0);
    setCustomer(INITIAL_CUSTOMER);
    setFeedback(null);
    setScore(0);
  };

  const renderSimulation = () => (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <aside className="lg:col-span-1 space-y-8 lg:sticky lg:top-8">
        <CrmPanel customer={customer} />
        <div className="bg-white p-6 rounded-xl shadow-lg">
            <ProgressTracker currentStepId={currentStepId} />
        </div>
      </aside>

      <main className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6 md:p-8 flex flex-col min-h-[570px]">
        {currentScene && (
          <div className="flex-grow flex flex-col animate-fade-in">
              <div className="mb-6 p-4 bg-slate-50 border-l-4 border-slate-300 rounded-r-lg">
                  <p className="font-semibold text-slate-500 text-sm mb-1">客戶 ({customer.name}) 說：</p>
                  <p className="text-slate-800 text-lg">
                      "{typeof currentScene.customerDialogue === 'function' ? currentScene.customerDialogue(customer) : currentScene.customerDialogue}"
                  </p>
              </div>

              <div className="mb-8 p-4 bg-indigo-50 border-l-4 border-indigo-300 rounded-r-lg">
                   <p className="font-semibold text-indigo-800 text-sm mb-1">你的任務：</p>
                  <p className="text-indigo-900">{currentScene.consultantPrompt}</p>
              </div>

              <div className="space-y-3 mt-auto">
                  {currentScene.choices.map((choice, index) => (
                      <button
                          key={index}
                          onClick={() => handleChoice(choice)}
                          disabled={!!feedback}
                          className="w-full text-left p-4 rounded-lg border-2 border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 group"
                      >
                         <p className="font-semibold text-slate-700 group-hover:text-indigo-800">{choice.text}</p>
                      </button>
                  ))}
              </div>
          </div>
        )}
        
        {feedback && (
            <div className={`fixed bottom-8 right-8 max-w-sm p-4 rounded-lg shadow-xl text-white animate-fade-in-up ${feedback.isCorrect ? 'bg-green-600' : 'bg-red-600'}`}>
                <div className="flex items-start">
                    <div className="text-xl mr-3 mt-1">
                        {feedback.isCorrect ? <i className="fa-solid fa-circle-check"></i> : <i className="fa-solid fa-circle-xmark"></i>}
                    </div>
                    <div>
                        <h4 className="font-bold">{feedback.isCorrect ? '做得好！' : '可以更好！'}</h4>
                        <p className="text-sm">{feedback.message}</p>
                    </div>
                </div>
            </div>
        )}
      </main>
    </div>
  );

  return (
    <div className={`min-h-screen bg-slate-100 flex justify-center p-4 ${appState === AppState.Simulation ? 'items-start pt-8 pb-8' : 'items-center'}`}>
      {appState === AppState.Welcome && <WelcomeScreen onStart={startSimulation} />}
      {appState === AppState.Simulation && renderSimulation()}
      {appState === AppState.Summary && <SummaryScreen score={score} total={totalQuestions} onRestart={restartSimulation} />}
    </div>
  );
};

export default App;
