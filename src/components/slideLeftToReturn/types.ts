import { BaseProps } from "@/types/BaseComponent";

export interface SlideLeftToReturnProps extends BaseProps {
    disable?: boolean
    onReturn?(): void
}
