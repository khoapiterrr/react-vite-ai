import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DateTimePicker() {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      showTimeSelect
      dateFormat="Pp"
      className="border p-2 rounded-md"
    />
  );
}

.react-datepicker {
    @apply bg-white border rounded-lg shadow-md;
  }
  .react-datepicker__input-container input {
    @apply border p-2 rounded-md;
  }