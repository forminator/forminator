import { ReactNode } from 'react';

export interface ForminatorTestRenderHookProps {
  children?: ReactNode;
}

export function ForminatorTestRenderHook(props: ForminatorTestRenderHookProps) {
  return <span>forminator-test-render-hook</span>;
}
