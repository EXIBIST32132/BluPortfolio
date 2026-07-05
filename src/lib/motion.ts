export const easeOutSoft = [0.16, 1, 0.3, 1] as const;
export const easeSnap = [0.34, 1.56, 0.64, 1] as const;

export const baseTransition = {
  duration: 0.26,
  ease: easeOutSoft,
};

export const slowTransition = {
  duration: 0.52,
  ease: easeOutSoft,
};
