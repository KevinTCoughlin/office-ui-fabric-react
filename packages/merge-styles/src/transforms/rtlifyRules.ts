import { IStyleOptions } from '../IStyleOptions';

const LEFT = 'left';
const RIGHT = 'right';
const NO_FLIP = '@noflip';
const NAME_REPLACEMENTS: { [key: string]: string } = {
  [LEFT]: RIGHT,
  [RIGHT]: LEFT,
};
const VALUE_REPLACEMENTS: { [key: string]: string } = {
  'w-resize': 'e-resize',
  'sw-resize': 'se-resize',
  'nw-resize': 'ne-resize',
};

/**
 * RTLifies the rulePair in the array at the current index. This mutates the array for performance
 * reasons.
 */
export function rtlifyRules(options: IStyleOptions, key: string /** not realy possible number */, value: string): void {
  if (options.rtl) {
    if (!key) {
      return;
    }

    if (typeof key === 'number') {
      key = key + '';
    }

    if (typeof value === 'number') {
      value = value + '';
    }

    // @todo(keco): don't do multiple linear scans in conditional clauses..
    if (typeof value === 'string' && value.indexOf(NO_FLIP) >= 0) {
      value = value.replace(/\s*(?:\/\*\s*)?\@noflip\b(?:\s*\*\/)?\s*?/g, '');
    } else if (key.indexOf(LEFT) >= 0) {
      key = key.replace(LEFT, RIGHT);
    } else if (key.indexOf(RIGHT) >= 0) {
      key = key.replace(RIGHT, LEFT);
    } else if (value.indexOf(LEFT) >= 0) {
      value = value.replace(LEFT, RIGHT);
    } else if (value.indexOf(RIGHT) >= 0) {
      value = value.replace(RIGHT, LEFT);
    } else if (NAME_REPLACEMENTS[key]) {
      key = NAME_REPLACEMENTS[key];
    } else if (VALUE_REPLACEMENTS[value]) {
      value = VALUE_REPLACEMENTS[value];
    } else {
      switch (key) {
        case 'margin':
        case 'padding':
          value = flipQuad(value);
          break;
        case 'box-shadow':
          value = negateNum(value, 0);
          break;
      }
    }
  }
}

/**
 * Given a string value in a space delimited format (e.g. "1 2 3 4"), negates a particular value.
 */
function negateNum(value: string, partIndex: number): string {
  const parts = value.split(' ');
  const numberVal = parseInt(parts[partIndex], 10);

  parts[0] = parts[0].replace(String(numberVal), String(numberVal * -1));

  return parts.join(' ');
}

/**
 * Given a string quad, flips the left and right values.
 */
function flipQuad(value: string): string {
  if (typeof value === 'string') {
    const parts = value.split(' ');

    if (parts.length === 4) {
      return `${parts[0]} ${parts[3]} ${parts[2]} ${parts[1]}`;
    }
  }

  return value;
}
