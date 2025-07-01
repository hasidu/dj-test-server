"use client";

import { useEffect, useRef, useState } from 'react';

interface MusicVisualizerProps {
  audioElement: HTMLAudioElement | null;
  isPlaying: boolean;
  colorScheme?: 'green' | 'rainbow' | 'neon' | 'monochrome';
  sensitivity?: number;
  interactive?: boolean;
  visualizerType?: 'standard' | 'mirrored';
  // New customization props
  barCount?: number;
  barGap?: number;
  barWidth?: number;
  maxBarHeight?: number;
  minBarHeight?: number;
  animationSpeed?: number;
}

const MusicVisualizer: React.FC<MusicVisualizerProps> = ({ 
  audioElement, 
  isPlaying, 
  colorScheme = 'green',
  sensitivity = 1.0,
  interactive = false,
  visualizerType = 'mirrored',
  // Default customization values
  barCount = 80, // Default to 40 bars
  barGap = 0.01, // defult 3px gap between bars
  barWidth = undefined, // Auto-calculated if not provided
  maxBarHeight = 0.95, // 90% of canvas height
  minBarHeight = 0,   // 0% for no minimum
  animationSpeed = 1.0
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const isConnectedRef = useRef(false);

  // Initialize audio context and analyzer
  useEffect(() => {
    if (!audioElement) return;
    
    if (!audioContext) {
      try {
        const context = new (window.AudioContext || (window as any).webkitAudioContext)();
        const analyzerNode = context.createAnalyser();
        
        analyzerNode.fftSize = 1024;
        analyzerNode.smoothingTimeConstant = 0.7;
        
        setAudioContext(context);
        setAnalyser(analyzerNode);
        
        const bufferLength = analyzerNode.frequencyBinCount;
        dataArrayRef.current = new Uint8Array(bufferLength);
      } catch (error) {
        console.error("Error initializing audio context:", error);
      }
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [audioElement, audioContext]);

  // Connect audio element to analyzer
  useEffect(() => {
    if (!audioElement || !audioContext || !analyser) return;
    
    if (!isConnectedRef.current) {
      try {
        const source = audioContext.createMediaElementSource(audioElement);
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        isConnectedRef.current = true;
      } catch (e) {
        console.log('Audio source connection handled:', e);
        isConnectedRef.current = true;
      }
    }
    
    if (audioContext.state === 'suspended') {
      audioContext.resume().catch(err => console.error("Error resuming audio context:", err));
    }
  }, [audioElement, audioContext, analyser]);
  
  // Handle canvas resizing
  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current) {
        const { width, height } = canvasRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  
  // Mouse tracking for interactive mode
  const [mousePosition, setMousePosition] = useState<{x: number, y: number} | null>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };
  
  const handleMouseLeave = () => {
    setMousePosition(null);
  };

  // Create gradient based on color scheme
  const createGradient = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): CanvasGradient => {
    const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
    
    switch (colorScheme) {
      case 'green':
        gradient.addColorStop(0, '#1DB954');
        gradient.addColorStop(0.6, '#18a34a');
        gradient.addColorStop(1, 'rgba(29, 185, 84, 0.3)');
        break;
      case 'monochrome':
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        gradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.5)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.1)');
        break;
      case 'rainbow':
        gradient.addColorStop(0, '#ff0000');
        gradient.addColorStop(0.2, '#ffff00');
        gradient.addColorStop(0.4, '#00ff00');
        gradient.addColorStop(0.6, '#00ffff');
        gradient.addColorStop(0.8, '#0000ff');
        gradient.addColorStop(1, '#ff00ff');
        break;
      case 'neon':
        gradient.addColorStop(0, '#ff00ff');
        gradient.addColorStop(0.5, '#00ffff');
        gradient.addColorStop(1, '#ff00ff');
        break;
      default:
        gradient.addColorStop(0, '#1DB954');
        gradient.addColorStop(1, 'rgba(29, 185, 84, 0.3)');
    }
    
    return gradient;
  };

  // Main drawing function
  const drawBars = (
    ctx: CanvasRenderingContext2D, 
    canvas: HTMLCanvasElement, 
    dataArray: Uint8Array, 
    bufferLength: number
  ) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const timestamp = Date.now() / 1000;
    
    // Calculate bar properties
    const actualBarCount = visualizerType === 'mirrored' ? barCount : barCount;
    const barsPerSide = visualizerType === 'mirrored' ? Math.floor(actualBarCount / 2) : actualBarCount;
    
    // Calculate bar width (auto if not specified)
    const calculatedBarWidth = barWidth || (canvas.width - (barGap * (actualBarCount - 1))) / actualBarCount;
    
    // Create gradient
    const gradient = createGradient(ctx, canvas);
    ctx.fillStyle = gradient;
    
    if (visualizerType === 'mirrored') {
      drawMirroredBars(ctx, canvas, dataArray, bufferLength, barsPerSide, calculatedBarWidth, timestamp);
    } else {
      drawStandardBars(ctx, canvas, dataArray, bufferLength, actualBarCount, calculatedBarWidth, timestamp);
    }
  };

  // Draw mirrored bars (from center outward)
  const drawMirroredBars = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    dataArray: Uint8Array,
    bufferLength: number,
    barsPerSide: number,
    calculatedBarWidth: number,
    timestamp: number
  ) => {
    const centerX = canvas.width / 2;
    
    for (let i = 0; i < barsPerSide; i++) {
      // Get frequency data
      const dataIndex = Math.floor((i / barsPerSide) * bufferLength * 0.5); // Use lower half of spectrum
      const value = dataArray[dataIndex] || 0;
      
      // Calculate bar height
      const height = calculateBarHeight(value, canvas.height, i, timestamp);
      
      // Calculate positions
      const leftX = centerX - (i + 1) * (calculatedBarWidth + barGap);
      const rightX = centerX + (i * (calculatedBarWidth + barGap));
      
      // Handle interactive effect
      let finalHeight = height;
      if (interactive && mousePosition) {
        const leftDistance = Math.abs(leftX + calculatedBarWidth / 2 - mousePosition.x);
        const rightDistance = Math.abs(rightX + calculatedBarWidth / 2 - mousePosition.x);
        const maxDistance = canvas.width / 6;
        
        if (leftDistance < maxDistance) {
          const boost = 1 + (1 - leftDistance / maxDistance) * 0.5;
          finalHeight = Math.min(canvas.height, height * boost);
        }
        if (rightDistance < maxDistance) {
          const boost = 1 + (1 - rightDistance / maxDistance) * 0.5;
          finalHeight = Math.min(canvas.height, height * boost);
        }
      }
      
      // Draw bars
      if (leftX >= 0) {
        ctx.fillRect(leftX, canvas.height - finalHeight, calculatedBarWidth, finalHeight);
      }
      if (rightX + calculatedBarWidth <= canvas.width) {
        ctx.fillRect(rightX, canvas.height - finalHeight, calculatedBarWidth, finalHeight);
      }
    }
    
    // Draw center bar
    const centerValue = dataArray[0] || 0;
    const centerHeight = calculateBarHeight(centerValue, canvas.height, 0, timestamp);
    ctx.fillRect(centerX - calculatedBarWidth / 2, canvas.height - centerHeight, calculatedBarWidth, centerHeight);
  };

  // Draw standard bars (left to right)
  const drawStandardBars = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    dataArray: Uint8Array,
    bufferLength: number,
    totalBars: number,
    calculatedBarWidth: number,
    timestamp: number
  ) => {
    for (let i = 0; i < totalBars; i++) {
      // Get frequency data
      const dataIndex = Math.floor((i / totalBars) * bufferLength * 0.8); // Use most of spectrum
      const value = dataArray[dataIndex] || 0;
      
      // Calculate bar height
      const height = calculateBarHeight(value, canvas.height, i, timestamp);
      
      // Calculate position
      const x = i * (calculatedBarWidth + barGap);
      
      // Handle interactive effect
      let finalHeight = height;
      if (interactive && mousePosition) {
        const distance = Math.abs(x + calculatedBarWidth / 2 - mousePosition.x);
        const maxDistance = canvas.width / 8;
        
        if (distance < maxDistance) {
          const boost = 1 + (1 - distance / maxDistance) * 0.5;
          finalHeight = Math.min(canvas.height, height * boost);
        }
      }
      
      // Draw bar
      if (x + calculatedBarWidth <= canvas.width) {
        ctx.fillRect(x, canvas.height - finalHeight, calculatedBarWidth, finalHeight);
      }
    }
  };

  // Calculate individual bar height with animation
  const calculateBarHeight = (value: number, canvasHeight: number, index: number, timestamp: number): number => {
    // Normalize the value (0-1)
    const normalizedValue = value / 255;
    
    // Add subtle animation
    const animation = Math.sin(timestamp * animationSpeed * 2 + index * 0.1) * 0.05 + 0.05;
    
    // Combine audio data with animation
    const finalValue = normalizedValue + (animation * (1 - normalizedValue)); // More animation when quiet
    
    // Calculate height with min/max constraints
    const heightRange = maxBarHeight - minBarHeight;
    const calculatedHeight = (finalValue * heightRange + minBarHeight) * canvasHeight * sensitivity;
    
    return Math.max(0, Math.min(canvasHeight, calculatedHeight));
  };

  // Animation loop
  const draw = () => {
    if (!analyser || !canvasRef.current || !dataArrayRef.current) {
      animationRef.current = requestAnimationFrame(draw);
      return;
    }
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Update canvas dimensions
    const { width, height } = canvas.getBoundingClientRect();
    if (width !== canvas.width || height !== canvas.height) {
      canvas.width = width;
      canvas.height = height;
      setDimensions({ width, height });
    }
    
    // Get audio data
    analyser.getByteFrequencyData(dataArrayRef.current);
    const bufferLength = analyser.frequencyBinCount;
    
    // Draw visualization
    drawBars(ctx, canvas, dataArrayRef.current, bufferLength);
    
    animationRef.current = requestAnimationFrame(draw);
  };
  
  // Start/stop animation
  useEffect(() => {
    if (isPlaying) {
      if (audioContext?.state === 'suspended') {
        audioContext.resume().catch(err => console.error("Error resuming audio context:", err));
      }
      
      if (!animationRef.current) {
        animationRef.current = requestAnimationFrame(draw);
      }
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [isPlaying, barCount, barGap, barWidth, maxBarHeight, minBarHeight, animationSpeed, colorScheme, sensitivity, interactive, mousePosition]);
  
  return (
    <div className="w-full">
      <canvas 
        ref={canvasRef} 
        className={`w-full h-full ${!isPlaying ? 'opacity-30' : 'opacity-100'} transition-opacity duration-300`}
        width={dimensions.width || 300}  
        height={dimensions.height || 80}
        onMouseMove={interactive ? handleMouseMove : undefined}
        onMouseLeave={interactive ? handleMouseLeave : undefined}
      />
    </div>
  );
};

export default MusicVisualizer;
