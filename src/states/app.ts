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
  downloadData: boolean;
  setDownloadData: Function;
}

const initialState: IAppState = {
  // webService: "https://h2955251.stratoserver.net/mobile/",
  webService: "https://h2955251.stratoserver.net",
  setWebService: () => { },
  mendant: "BFN_TESTMANDANT",
  setMendant: () => { },
  deviceId: "352714114357072",
  setDeviceId: () => { },
  downloadData: true,
  setDownloadData: () => { }
};

/**
 * State hook definition
 */
export const useApp = create<IAppState>((set, get) => ({
  ...initialState,

  setWebService: (val: any) => set({ webService: val }),
  setMendant: (val: any) => set({ mendant: val }),
  setDeviceId: (val: any) => set({ deviceId: val }),
  setDownloadData: (val: any) => set({ downloadData: val }),
}));

/**
 * Selectors
 */
export const appStateSelectors = createSelectors(initialState);
