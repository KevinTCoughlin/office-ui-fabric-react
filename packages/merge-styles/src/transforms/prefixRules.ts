import { getVendorSettings } from '../getVendorSettings';

const autoPrefixNames: { [key: string]: number } = {
  'user-select': 1,
};
const vendorSettings = getVendorSettings();

export function prefixRules(key: string): string {
  if (autoPrefixNames[key]) {
    if (vendorSettings.isWebkit) {
      return `-webkit-${key}`;
    }
    if (vendorSettings.isMoz) {
      return `-moz-${key}`;
    }
    if (vendorSettings.isMs) {
      return `-ms-${key}`;
    }
    if (vendorSettings.isOpera) {
      return `-o-${key}`;
    }
  }
  return '';
}
