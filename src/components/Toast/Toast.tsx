import React, { useEffect, useRef, useCallback } from 'react';
import { Animated } from 'react-native';

import { useToast, useToastService } from '@services';

import { ToastComponent } from './components/ToastComponent';

const DEFAULT_DURATION = 2000;

export function Toast() {
  const toast = useToast();
  const { hideToast } = useToastService();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const runEnteringAnimation = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const runExitAnimation = useCallback(
    (callback: Animated.EndCallback) => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(callback);
    },
    [fadeAnim],
  );

  useEffect(() => {
    if (toast) {
      runEnteringAnimation();

      const timeoutId = setTimeout(() => {
        runExitAnimation(hideToast);
      }, toast?.duration || DEFAULT_DURATION);

      return () => {
        clearTimeout(timeoutId);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toast]);

  if (!toast) {
    return null;
  }

  return (
    <Animated.View
      style={{ position: 'absolute', alignSelf: 'center', opacity: fadeAnim }}>
      <ToastComponent toast={toast} />
    </Animated.View>
  );
}
