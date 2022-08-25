import { useCallback, useEffect, useRef, useState } from "react";
import { Props, Settings } from './';

export const useBreakpoints = (props: Props): Settings => {
  const [propsToUse, setPropsToShow] = useState<Props>(props);

  const animationRef = useRef<number | null>(null);

  const requestAnimation = useCallback((): void => {
    const { breakpoints } = props;

    if (breakpoints) {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      animationRef.current = requestAnimationFrame(
        () => {
          const matchedBreakpoints = Object.keys(breakpoints).map((breakpoint) => {
            const matches = window.matchMedia(breakpoint).matches;
            if (matches) return breakpoint;
            return undefined;
          }).filter(Boolean) as string[];

          if (matchedBreakpoints.length === 0) {
            setPropsToShow(props);
          } else {
            const lastMatch = matchedBreakpoints[matchedBreakpoints.length - 1];
            const breakpointProps = breakpoints[lastMatch];
            setPropsToShow({
              ...props,
              ...breakpointProps
            });
          }
        }
      );
    }
  }, [props]);

  const requestThrottledAnimation = useCallback((): void => {
    setTimeout(() => {
      requestAnimation();
    }, 500);
  }, [requestAnimation]);

  useEffect(() => {
    window.addEventListener('resize', requestAnimation);
    window.addEventListener('orientationchange', requestThrottledAnimation);
    requestAnimation();

    return () => {
      window.removeEventListener('resize', requestAnimation);
      window.removeEventListener('orientationchange', requestThrottledAnimation);
    };
  }, [
    requestAnimation,
    requestThrottledAnimation,
  ]);

  return propsToUse;
}
