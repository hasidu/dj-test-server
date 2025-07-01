"use client";

import { useState } from 'react';
import Image from 'next/image';

interface DJToolboxProps {
  isPlaying: boolean;
}

const DJToolbox: React.FC<DJToolboxProps> = ({ isPlaying }) => {
  const [activeEffect, setActiveEffect] = useState<string | null>(null);
  const [crossfadeValue, setCrossfadeValue] = useState(50);
  const [eqValues, setEqValues] = useState({ low: 50, mid: 50, high: 50 });
  const [isBeatSyncEnabled, setIsBeatSyncEnabled] = useState(true);
  const [bpm, setBpm] = useState(128);
  const [activeLoop, setActiveLoop] = useState<string | null>(null);
  
  // Update EQ values
  const updateEQ = (type: 'low' | 'mid' | 'high', value: number) => {
    setEqValues({
      ...eqValues,
      [type]: value
    });
  };
  
  // Toggle effect
  const toggleEffect = (effectName: string) => {
    if (activeEffect === effectName) {
      setActiveEffect(null);
    } else {
      setActiveEffect(effectName);
    }
  };
  
  // Toggle loop
  const toggleLoop = (loopName: string) => {
    if (activeLoop === loopName) {
      setActiveLoop(null);
    } else {
      setActiveLoop(loopName);
    }
  };
  
  return (
    <div className="bg-[#0a0a0a] rounded-lg border border-[#222] p-4 text-white w-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="flex items-center text-xl font-bold">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a3ff12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <circle cx="12" cy="12" r="10"/>
            <circle cx="12" cy="12" r="4"/>
            <line x1="4.93" y1="4.93" x2="9.17" y2="9.17"/>
            <line x1="14.83" y1="14.83" x2="19.07" y2="19.07"/>
            <line x1="14.83" y1="9.17" x2="19.07" y2="4.93"/>
            <line x1="4.93" y1="19.07" x2="9.17" y2="14.83"/>
          </svg>
          <span>DJ Toolbox</span>
        </h3>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center">
            <span className="text-white/70 text-sm mr-2">BPM</span>
            <div className="flex items-center bg-black rounded-md">
              <button 
                onClick={() => setBpm(prev => Math.max(60, prev - 1))}
                className="px-2 py-1 text-white/70 hover:text-white transition-colors"
              >
                -
              </button>
              <span className="w-12 text-center font-mono">{bpm}</span>
              <button 
                onClick={() => setBpm(prev => Math.min(200, prev + 1))}
                className="px-2 py-1 text-white/70 hover:text-white transition-colors"
              >
                +
              </button>
            </div>
          </div>
          
          <button 
            onClick={() => setIsBeatSyncEnabled(!isBeatSyncEnabled)}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${
              isBeatSyncEnabled 
                ? 'bg-[#a3ff12] text-black font-bold' 
                : 'bg-white/10 text-white/70'
            }`}
          >
            SYNC
          </button>
        </div>
      </div>
      
      {/* Main controls grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Side - EQ Controls */}
        <div className="border border-[#333] bg-black/30 rounded-lg p-4">
          <h4 className="text-sm uppercase tracking-wider text-white/70 mb-4">Equalizer</h4>
          
          <div className="space-y-6">
            {/* High EQ */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>HIGH</span>
                <span>{eqValues.high - 50}dB</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={eqValues.high}
                onChange={(e) => updateEQ('high', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            
            {/* Mid EQ */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>MID</span>
                <span>{eqValues.mid - 50}dB</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={eqValues.mid}
                onChange={(e) => updateEQ('mid', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            
            {/* Low EQ */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>LOW</span>
                <span>{eqValues.low - 50}dB</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={eqValues.low}
                onChange={(e) => updateEQ('low', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>
        
        {/* Center - Crossfader and Effects */}
        <div className="border border-[#333] bg-black/30 rounded-lg p-4">
          <h4 className="text-sm uppercase tracking-wider text-white/70 mb-4">Effects</h4>
          
          <div className="grid grid-cols-3 gap-2 mb-6">
            <button 
              onClick={() => toggleEffect('echo')} 
              className={`p-2 rounded ${activeEffect === 'echo' ? 'bg-[#a3ff12] text-black' : 'bg-white/10 text-white/70'}`}
            >
              Echo
            </button>
            <button 
              onClick={() => toggleEffect('reverb')} 
              className={`p-2 rounded ${activeEffect === 'reverb' ? 'bg-[#a3ff12] text-black' : 'bg-white/10 text-white/70'}`}
            >
              Reverb
            </button>
            <button 
              onClick={() => toggleEffect('filter')} 
              className={`p-2 rounded ${activeEffect === 'filter' ? 'bg-[#a3ff12] text-black' : 'bg-white/10 text-white/70'}`}
            >
              Filter
            </button>
            <button 
              onClick={() => toggleEffect('flanger')} 
              className={`p-2 rounded ${activeEffect === 'flanger' ? 'bg-[#a3ff12] text-black' : 'bg-white/10 text-white/70'}`}
            >
              Flanger
            </button>
            <button 
              onClick={() => toggleEffect('phaser')} 
              className={`p-2 rounded ${activeEffect === 'phaser' ? 'bg-[#a3ff12] text-black' : 'bg-white/10 text-white/70'}`}
            >
              Phaser
            </button>
            <button 
              onClick={() => toggleEffect('delay')} 
              className={`p-2 rounded ${activeEffect === 'delay' ? 'bg-[#a3ff12] text-black' : 'bg-white/10 text-white/70'}`}
            >
              Delay
            </button>
          </div>
          
          {/* Crossfader */}
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span>TRACK A</span>
              <span>CROSSFADE</span>
              <span>TRACK B</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={crossfadeValue}
              onChange={(e) => setCrossfadeValue(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
        
        {/* Right Side - Looping and Hotcues */}
        <div className="border border-[#333] bg-black/30 rounded-lg p-4">
          <h4 className="text-sm uppercase tracking-wider text-white/70 mb-4">Loops & Cues</h4>
          
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button 
              onClick={() => toggleLoop('1/4')} 
              className={`p-2 rounded ${activeLoop === '1/4' ? 'bg-[#a3ff12] text-black' : 'bg-white/10 text-white/70'}`}
            >
              1/4 Beat
            </button>
            <button 
              onClick={() => toggleLoop('1/2')} 
              className={`p-2 rounded ${activeLoop === '1/2' ? 'bg-[#a3ff12] text-black' : 'bg-white/10 text-white/70'}`}
            >
              1/2 Beat
            </button>
            <button 
              onClick={() => toggleLoop('1')} 
              className={`p-2 rounded ${activeLoop === '1' ? 'bg-[#a3ff12] text-black' : 'bg-white/10 text-white/70'}`}
            >
              1 Beat
            </button>
            <button 
              onClick={() => toggleLoop('2')} 
              className={`p-2 rounded ${activeLoop === '2' ? 'bg-[#a3ff12] text-black' : 'bg-white/10 text-white/70'}`}
            >
              2 Beats
            </button>
            <button 
              onClick={() => toggleLoop('4')} 
              className={`p-2 rounded ${activeLoop === '4' ? 'bg-[#a3ff12] text-black' : 'bg-white/10 text-white/70'}`}
            >
              4 Beats
            </button>
            <button 
              onClick={() => toggleLoop('8')} 
              className={`p-2 rounded ${activeLoop === '8' ? 'bg-[#a3ff12] text-black' : 'bg-white/10 text-white/70'}`}
            >
              8 Beats
            </button>
          </div>
          
          {/* Hotcues */}
          <div>
            <h5 className="text-sm text-white/70 mb-2">HOT CUES</h5>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((cue) => (
                <button 
                  key={cue}
                  className="py-2 px-1 bg-white/10 hover:bg-[#a3ff12]/20 rounded text-white/70 hover:text-[#a3ff12] transition-colors"
                >
                  CUE {cue}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-center text-white/50 text-xs">
        <p>This DJ toolbox interface is for demonstration purposes only.</p>
        <p>Connect real DJ hardware via MIDI for full functionality.</p>
      </div>
    </div>
  );
};

export default DJToolbox;
