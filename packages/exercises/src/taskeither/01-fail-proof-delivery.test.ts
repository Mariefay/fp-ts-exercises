import { left, right } from 'fp-ts/Either';

import { deliverPackage } from './01-fail-proof-delivery.exercise';

describe('deliverPackage', () => {
  it('delivers package successfully', async () => {
    const packageId = 'valid-package';
    const result = await deliverPackage(packageId)();
    
    expect(result).toEqual(right({
      packageId: 'valid-package',
      status: 'delivered',
      timestamp: expect.any(Date),
    }));
  });

  it('handles delivery failure', async () => {
    const packageId = 'invalid-package';
    const result = await deliverPackage(packageId)();
    
    expect(result).toEqual(left('Package not found'));
  });
});
