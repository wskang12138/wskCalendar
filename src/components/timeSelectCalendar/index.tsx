import { TimeSelectAProps, TimeSelectBProps } from "./types";
import { TimeASelect } from "./timeAselect";
import { TimeBSelect } from "./timeBselect";
import "./index.scss"

interface TimeSelectProp {
  type: "A" | "B"
  timeProps: TimeSelectAProps | TimeSelectBProps,
}

export function TimeSelectCalendar(props: TimeSelectProp) {
  switch (props.type) {
    case "A": {
      const timeSelectAProps: TimeSelectAProps = props.timeProps as TimeSelectAProps
      return <TimeASelect {...timeSelectAProps} />
    }
    case "B":
      const timeSelectBProps: TimeSelectBProps = props.timeProps as TimeSelectBProps
      return <TimeBSelect {...timeSelectBProps} />
    default: {
      const timeSelectAProps: TimeSelectAProps = props.timeProps as TimeSelectAProps
      return <TimeASelect {...timeSelectAProps} />
    }
  }
}




