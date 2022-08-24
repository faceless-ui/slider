import { useCallback, useEffect, useRef, useState } from "react";
import { Props } from './';

type PropsWithoutChildren = Omit<Props, "children" | "breakpoints">;

export const useBreakpoints = (props: Props): PropsWithoutChildren => {
  const [propsToUse, setPropsToShow] = useState<PropsWithoutChildren>(props);

  const {
    breakpoints
  } = props;

  const animationRef = useRef<number | null>(null);

  const requestAnimation = useCallback((): void => {
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
  }, [breakpoints]);

  const requestThrottledAnimation = useCallback((): void => {
    setTimeout(() => {
      requestAnimation();
    }, 500);
  }, [requestAnimation]);

  useEffect(() => {
    if (breakpoints) {
      window.addEventListener('resize', requestAnimation);
      window.addEventListener('orientationchange', requestThrottledAnimation);
      requestAnimation();
    }

    return () => {
      if (breakpoints) {
        window.removeEventListener('resize', requestAnimation);
        window.removeEventListener('orientationchange', requestThrottledAnimation);
      }
    };
  }, [
    requestAnimation,
    requestThrottledAnimation,
    breakpoints
  ]);

  // @ts-ignore
  delete propsToUse.breakpoints;
  // @ts-ignore
  delete propsToUse.children;

  return propsToUse;
}
