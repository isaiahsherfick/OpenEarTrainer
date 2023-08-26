import { SetStateAction, createContext, useState } from "react";
import SettingsData from "./Settings";
import { SettingsDataT } from "./screens/RootStackPrams";

export const SettingsContext = createContext({
    settings: SettingsData,
    setSettings: (settings: SetStateAction<SettingsDataT>) => { }
})
