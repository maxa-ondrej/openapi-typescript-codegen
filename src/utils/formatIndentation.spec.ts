import { EOL } from 'os';
import { Indent } from '../Indent';
import { formatIndentation } from './formatIndentation';

describe('formatIndentation', () => {
  it('should produce correct result', () => {
    expect(formatIndentation('test', Indent.TAB)).toStrictEqual(`test${EOL}`);
    expect(formatIndentation('test', Indent.SPACE_2)).toStrictEqual(`test${EOL}`);
    expect(formatIndentation('test', Indent.SPACE_4)).toStrictEqual(`test${EOL}`);
    expect(formatIndentation('\ttest', Indent.TAB)).toStrictEqual(`\ttest${EOL}`);
    expect(formatIndentation('\ttest', Indent.SPACE_2)).toStrictEqual(`  test${EOL}`);
    expect(formatIndentation('\ttest', Indent.SPACE_4)).toStrictEqual(`    test${EOL}`);
    expect(formatIndentation('abc\n\ttest', Indent.TAB)).toStrictEqual(`abc${EOL}\ttest${EOL}`);
    expect(formatIndentation('abc\n\ttest', Indent.SPACE_2)).toStrictEqual(`abc${EOL}  test${EOL}`);
    expect(formatIndentation('abc\n\ttest', Indent.SPACE_4)).toStrictEqual(`abc${EOL}    test${EOL}`);
  });
});
