import { SetStateAction, createContext } from "react";
import SettingsData from "./Settings";
import { SettingsDataT } from "./screens/RootStackPrams";

export const SettingsContext = createContext({
    settings: SettingsData,
    setSettings: (updatedSettings: SetStateAction<SettingsDataT>) => { }
})
