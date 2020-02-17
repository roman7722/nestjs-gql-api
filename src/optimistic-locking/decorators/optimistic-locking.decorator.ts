import { OptimisticLockError } from 'sequelize';

export const OptimisticLocking = (checkerKey: any) => (
  target: any,
  key: string,
  descriptor,
) => {
  const originalMethod = descriptor.value;

  descriptor.value = async (val: any) => {
    const { id, version } = val;

    const result = await target[checkerKey](id);

    const actualVersion: number = result?.getDataValue('version');

    if (actualVersion !== version) {
      throw new OptimisticLockError({});
    }

    originalMethod.call(this, val);
  };
  return descriptor;
};
