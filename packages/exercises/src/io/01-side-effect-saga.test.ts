import { logMessage } from './01-side-effect-saga.exercise';

describe('logMessage', () => {
  it('creates IO that logs message', () => {
    const message = 'Hello, World!';
    const ioAction = logMessage(message);
    
    expect(typeof ioAction).toBe('function');
    
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    ioAction();
    
    expect(consoleSpy).toHaveBeenCalledWith('Hello, World!');
    consoleSpy.mockRestore();
  });
});
