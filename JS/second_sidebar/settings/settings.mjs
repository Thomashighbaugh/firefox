import { PreferencesWrapper } from "../wrappers/preferences.mjs";

export class Settings {
  /**
   *
   * @param {string} pref
   * @returns {Object | Array<Object> | null}
   */
  static load(pref) {
    try {
      const value = PreferencesWrapper.prefHasUserValue(pref)
        ? JSON.parse(PreferencesWrapper.getStringPref(pref))
        : null;
      console.log(`Loaded pref "${pref}":`, value);
      return value;
    } catch (error) {
      console.error(`Failed to load pref "${pref}":`, error);
      return null;
    }
  }

  /**
   *
   * @param {string} pref
   * @param {Object | Array<Object>} value
   */
  static save(pref, value) {
    try {
      console.log(`Saving pref "${pref}":`, value);
      PreferencesWrapper.setStringPref(pref, JSON.stringify(value));
      console.log(`Successfully saved pref "${pref}"`);
    } catch (error) {
      console.error(`Failed to save pref "${pref}":`, error);
    }
  }
}
