import { formatCents } from '../formatCents';

describe('formatCents', () => {
  it('formats whole dollar amounts without cents', () => {
    expect(formatCents(1000)).toBe('$10');
    expect(formatCents(10000)).toBe('$100');
    expect(formatCents(100000)).toBe('$1,000');
  });

  it('formats amounts with cents', () => {
    expect(formatCents(1050)).toBe('$10.50');
    expect(formatCents(10050)).toBe('$100.50');
    expect(formatCents(100050)).toBe('$1,000.50');
  });

  it('handles zero cents', () => {
    expect(formatCents(0)).toBe('$0');
  });

  it('handles single digit cents', () => {
    expect(formatCents(1010)).toBe('$10.10');
    expect(formatCents(10010)).toBe('$100.10');
  });

  it('handles large numbers with commas', () => {
    expect(formatCents(1000000)).toBe('$10,000');
    expect(formatCents(1000050)).toBe('$10,000.50');
  });
}); 