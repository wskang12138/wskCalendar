
export interface TimeSelectPropCommon {
  isOpen: boolean
  onClose: () => void
}

export interface ItemData {
  isSelected: boolean
  name: string
  CustomData?: any
  disabled?: boolean
}

export interface ConfirmData {
  morning: Array<ItemData>
  afternoon: Array<ItemData>
  night: Array<ItemData>
}

export interface TimeSelectAProps extends TimeSelectPropCommon {
  confirm?: (data: ConfirmData) => void
  morning?: Array<ItemData>
  afternoon?: Array<ItemData>
  night?: Array<ItemData>
  className?: string
}

export interface TimeSelectBState {
  hourY: number
  minuteY: number
  secondY: number
  hourTransition: string
  minteTransition: string
  secondTransition: string
}

export interface TimeSelectBProps extends TimeSelectPropCommon {
  name: string
  value?: string
  onChange?: (value: string) => void
  className?: string
}
