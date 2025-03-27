export function Required(target: any, key: string) {
  let value: any;

  const getter = function () {
    return value;
  }

  const setter = function (newVal: any) {
    if (!newVal)
      throw new Error(`Property ${key} is required`);

    value = newVal;
  }

  Object.defineProperty(target, key, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true,
  });
}
