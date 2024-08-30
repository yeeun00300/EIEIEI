import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

function DateRangePickerValue() {
  // const [value, setValue] = React.useState([
  //   dayjs("2024-01-01"),
  //   dayjs("2024-01-01"),
  // ]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["SingleInputDateRangeField"]}>
        <DateRangePicker
          slots={{ field: SingleInputDateRangeField }}
          name="allowedRange"
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default DateRangePickerValue;
