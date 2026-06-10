import { useRef } from "react";

const useBeep = () => {
  const audioContextRef = useRef(null);

  const playBeep = () => {
    // Ensure the AudioContext is only created once, typically after a user interaction
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext ||
        window.webkitAudioContext)();
    }

    const context = audioContextRef.current;

    // Create an oscillator node for the tone
    const oscillator = context.createOscillator();
    // Create a gain node for volume control
    const gainNode = context.createGain();

    // Connect oscillator to gain node, and gain node to the destination (speakers)
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    // Set the type of waveform (sine, square, sawtooth, triangle)
    oscillator.type = "square";
    // Set the frequency (pitch) of the beep, e.g., 440 Hz
    oscillator.frequency.setValueAtTime(440, context.currentTime);

    // Set the duration of the beep to 2 seconds
    const duration = 0.5;

    // Start the sound immediately
    oscillator.start(context.currentTime);
    // Stop the sound after 2 seconds
    oscillator.stop(context.currentTime + duration);
  };

  return playBeep;
};

export default useBeep;
