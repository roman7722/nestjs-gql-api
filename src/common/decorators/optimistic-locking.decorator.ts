import { MessageCodeError } from '../error/MessageCodeError';

/**
 * Декоратор @OptimisticLocking
 *
 * Вызывает функцию checkVersion(id: number) из сервиса в котором вызван декоратор.
 * Если запись существует - проверяет версию записи, если не существует
 * возвращает кастомную ошибку MessageCodeError.
 * Параметр versionUp: boolean - указывает повышать версию или нет.
 * Если версия в параметрах (функции переданной в target) совпадает с актуальной (из ответа checkVersion) - повышаем
 * версию на 1 и вызываем метод к которому применён декоратор.
 */
export const OptimisticLocking = (versionUp: boolean) => (
  target: any,
  key: string,
  descriptor: any,
) => {
  const originalMethod = descriptor.value;

  descriptor.value = async function(data: any) {
    const { id, version } = data;
    const result = await target.checkVersion.call(this, id);

    if (!result) {
      return new MessageCodeError('common:checkId:notFound');
    }

    const actualVersion: number = result?.getDataValue('version');

    if (actualVersion !== version) {
      return new MessageCodeError(
        'common:optimisticLockError:preconditionFailed',
      );
    }

    let newData = { ...data };

    if (versionUp) {
      newData = { ...data, version: version + 1 };
    }

    return originalMethod.call(this, newData);
  };

  return descriptor;
};
