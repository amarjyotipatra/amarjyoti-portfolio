import { create } from 'zustand';

export type ThemeSkin = 'cyberwave' | 'solarflare' | 'stealth';

export type UISkinState = {
  skin: ThemeSkin;
  setSkin: (skin: ThemeSkin) => void;
};

export const useUISkinStore = create<UISkinState>((set) => ({
  skin: 'cyberwave',
  setSkin: (skin: ThemeSkin) => set(() => ({ skin }))
}));
