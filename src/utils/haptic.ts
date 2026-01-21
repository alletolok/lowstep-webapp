export type HapticImpact = "light" | "medium" | "heavy";

export function hapticImpact(type: HapticImpact = "light") {
  // Telegram Mini App haptic
  const tg = (window as any).Telegram?.WebApp;

  if (tg?.HapticFeedback?.impactOccurred) {
    tg.HapticFeedback.impactOccurred(type);
  }
}
