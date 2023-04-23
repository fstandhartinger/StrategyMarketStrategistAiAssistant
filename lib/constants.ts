export const FADE_IN_ANIMATION_SETTINGS = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.2 },
};

export const FADE_DOWN_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0, transition: { type: "spring" } },
};

export const FADE_UP_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: "spring" } },
};

export const FADE_APPEAR_DELAYED_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: 4000 },
  show: { opacity: 1, y: 0, transition: { type: "spring", duration: 0.2, delay: 3 } },
}

export const WAITLIST_URL =
  "https://z1ediiri2rk.typeform.com/to/rTHd3KX3";
