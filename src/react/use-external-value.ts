import { fromOption } from '../utils/option';
import { useExternalValueContext } from './external-value-context';

export function useExternalValue<EValue>(): EValue | undefined;
export function useExternalValue<EValue>(defaultValue: EValue): EValue;
export function useExternalValue<EValue>(
  defaultValue: EValue | undefined,
): EValue | undefined;
export function useExternalValue<EValue>(
  defaultValue?: EValue | undefined,
): EValue | undefined {
  return fromOption(useExternalValueContext<EValue>()) ?? defaultValue;
}
