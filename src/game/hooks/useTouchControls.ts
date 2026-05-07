import { useCallback, useRef } from "react";

type UseTouchControlsOptions = {
  onTapLeft: () => void;
  onTapRight: () => void;
  onDirectionChange: (direction: -1 | 0 | 1) => void;
};

export function useTouchControls({
  onTapLeft,
  onTapRight,
  onDirectionChange,
}: UseTouchControlsOptions) {
  const activeDirectionRef = useRef<-1 | 0 | 1>(0);

  const pressLeftIn = useCallback(() => {
    activeDirectionRef.current = -1;
    onDirectionChange(-1);
    onTapLeft();
  }, [onDirectionChange, onTapLeft]);

  const pressRightIn = useCallback(() => {
    activeDirectionRef.current = 1;
    onDirectionChange(1);
    onTapRight();
  }, [onDirectionChange, onTapRight]);

  const releaseLeft = useCallback(() => {
    if (activeDirectionRef.current === -1) {
      activeDirectionRef.current = 0;
      onDirectionChange(0);
    }
  }, [onDirectionChange]);

  const releaseRight = useCallback(() => {
    if (activeDirectionRef.current === 1) {
      activeDirectionRef.current = 0;
      onDirectionChange(0);
    }
  }, [onDirectionChange]);

  return {
    pressLeftIn,
    pressRightIn,
    releaseLeft,
    releaseRight,
  };
}
