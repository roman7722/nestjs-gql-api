import { MessageCodeError } from '../error/MessageCodeError';

/**
 * Декоратор @CheckIsValueUnique
 *
 */
export const CheckIsValueUnique = (
  checkerKey: string,
  fieldName: string,
  notUniqueErrCode: string,
) => (target: any, key: string, descriptor: any) => {
  const originalMethod = descriptor.value;

  descriptor.value = async function (data: any) {
    const { id } = data;
    const fieldValue = data[fieldName];
    const result = await target[checkerKey].call(this, fieldValue);

    const existsId = result?.getDataValue('id');
    const existsValue = result?.getDataValue(fieldName);

    if (existsValue && existsId !== id) {
      throw new MessageCodeError(notUniqueErrCode);
    }

    return originalMethod.call(this, data);
  };

  return descriptor;
};
