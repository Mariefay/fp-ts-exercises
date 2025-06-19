import { TaskEither, left, right, chain } from 'fp-ts/TaskEither';
import { left as eitherLeft, right as eitherRight } from 'fp-ts/Either';
import { pipe } from 'fp-ts/function';

interface DeliveryError {
  type: 'NETWORK_ERROR' | 'INVALID_ADDRESS' | 'PACKAGE_LOST';
  message: string;
}

interface Package {
  id: string;
  destination: string;
  contents: string;
}

interface DeliveryResult {
  packageId: string;
  deliveredAt: Date;
  signature: string;
}

export const validateAddress = (
  address: string
): TaskEither<DeliveryError, string> => {
  return () =>
    Promise.resolve(
      address.length < 5
        ? eitherLeft({
            type: 'INVALID_ADDRESS',
            message: 'Address too short',
          } as DeliveryError)
        : eitherRight(address)
    );
};

export const deliverPackage = (
  pkg: Package
): TaskEither<DeliveryError, DeliveryResult> => {
  return () =>
    Promise.resolve(
      Math.random() < 0.1
        ? eitherLeft({
            type: 'PACKAGE_LOST',
            message: 'Package lost during delivery',
          } as DeliveryError)
        : eitherRight({
            packageId: pkg.id,
            deliveredAt: new Date(),
            signature: 'Customer Signature',
          })
    );
};

export const processDelivery = (
  pkg: Package
): TaskEither<DeliveryError, DeliveryResult> => {
  return pipe(
    validateAddress(pkg.destination),
    chain(() => deliverPackage(pkg))
  );
};
