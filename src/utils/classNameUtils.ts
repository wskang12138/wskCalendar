import classNames, { Argument, Mapping, Value } from "classnames"

const valueArray = ["string", "number", "boolean"]

export function isValue(value: any): Value | null {
  return valueArray.includes(typeof value) ? value : null
}

export function isMapping(value: any): Mapping | null {
  return Object.prototype.toString.call(value) === '[object Object]' ? value : null
}

export function isArguments(value: any): Argument[] | null {
  return Array.isArray(value) ? value : null
}

export function paddingPrefix(prefix: string, args: Argument[]): Argument[] {
  if (args.length <= 0) {
    return []
  }

  return args.map(item => {
    if (isValue(item)) {
      return typeof item === "string" && !item.startsWith("lg-") ? `${prefix}-${item}` : item
    }
    if (isMapping(item)) {
      const newItem: Mapping = {}
      Object.keys(item as Mapping).forEach(key => {
        if (Object.prototype.hasOwnProperty.call(item, key)) {
          let newKey = !key.startsWith("wsk-") ? `${prefix}-${key}` : key
          newItem[newKey] = (item as Mapping)[key]
        }
      })
      return newItem
    }
    if (isArguments(item)) {
      return paddingPrefix(prefix, item as Argument[])
    }
    return null
  })
}

export function createClassName(prefix: string) {

  return {
    classNames: (...args: Argument[]) => {
      return classNames(paddingPrefix(prefix, args))
    },
    rootClassNames: (className: string | undefined, ...args: Argument[]) => {
      return classNames(`${prefix}-root`, paddingPrefix(prefix, args), className)
    }
  }
}
