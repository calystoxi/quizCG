import { useEffect, useRef } from "react";

export default function useGamepadControls(onNext, onSelectUp, onSelectDown) {
  const lastPressedTime = useRef(0);
  const cooldown = 300; // en ms
  const rafId = useRef(null);

  useEffect(() => {
    const handleGamepad = () => {
      const gamepads = navigator.getGamepads();
      const gp = gamepads[0];
      const now = Date.now();

      if (gp && gp.mapping === "standard") {
        const dpadUp = gp.buttons[12]?.pressed;
        const dpadDown = gp.buttons[13]?.pressed;
        const buttonA = gp.buttons[0]?.pressed;

        if (now - lastPressedTime.current > cooldown) {
          if (dpadDown) {
            onSelectDown();
            lastPressedTime.current = now;
          } else if (dpadUp) {
            onSelectUp();
            lastPressedTime.current = now;
          } else if (buttonA) {
            onNext();
            lastPressedTime.current = now;
          }
        }
      }

      rafId.current = requestAnimationFrame(handleGamepad);
    };

    rafId.current = requestAnimationFrame(handleGamepad);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [onNext, onSelectDown, onSelectUp]);
}
