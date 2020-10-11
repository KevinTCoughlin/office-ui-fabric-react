const NON_PIXEL_NUMBER_PROPS = [
  'column-count',
  'font-weight',
  'flex',
  'flex-grow',
  'flex-shrink',
  'fill-opacity',
  'opacity',
  'order',
  'z-index',
  'zoom',
];

export function provideUnits(value: number): string {
  // @todo(keco): refactor to be single linear
  const stringifiedValue = value + '';
  const isNonPixelProp = NON_PIXEL_NUMBER_PROPS.indexOf(stringifiedValue) > -1;
  const isVariableOrPrefixed = stringifiedValue.indexOf('--') > -1;
  const unit = isNonPixelProp || isVariableOrPrefixed ? '' : 'px';

  return `${value}${unit}`;
}
