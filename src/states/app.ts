import { create } from 'zustand'
import { createSelectors } from './common';
import { DEVICE_ID, MENDANT, WEB_SERVICE } from '../assets/constants';

/**
 * State Structure
 */
export interface IAppState {
  // State values
  webService: string;
  setWebService: Function;
  mendant: string;
  setMendant: Function;
  deviceId: string;
  setDeviceId: Function;
}

const initialState: IAppState = {
  webService: WEB_SERVICE,
  setWebService: () => { },
  mendant: MENDANT,
  setMendant: () => { },
  deviceId: DEVICE_ID,
  setDeviceId: () => { },
};

/**
 * State hook definition
 */
export const useApp = create<IAppState>((set, get) => ({
  ...initialState,

  setWebService: (val: any) => set({ webService: val }),
  setMendant: (val: any) => set({ mendant: val }),
  setDeviceId: (val: any) => set({ deviceId: val }),
}));

/**
 * Selectors
 */
export const appStateSelectors = createSelectors(initialState);
