import { TaskEither } from 'fp-ts/TaskEither';

interface DeliveryResult {
  packageId: string;
  status: string;
  timestamp: Date;
}

export const deliverPackage = (
  packageId: string
): TaskEither<string, DeliveryResult> => {
  throw new Error('Not implemented');
};
