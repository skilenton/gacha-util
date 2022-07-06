import { AppShell, Text, NumberInput, Button } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { useState } from "react";
import Top from "./Top";
import dayjs from "dayjs";

export default function Dashboard() {
  const [resinCount, setResinCount] = useInputState(0);
  const [resinError, setResinError] = useState(null);
  const [completionDate, setCompletionDate] = useState(null);
  const calculateHandler = () => {
    const minutes = (160 - resinCount) * 8;
    const string = dayjs()
      .add(minutes, "minutes")
      .format("MMMM D, YYYY h:mm a");
    setCompletionDate(string);
  };
  return (
    <AppShell padding="md" header={<Top />}>
      <Text>Resin Fully Replenished At: {completionDate}</Text>
      <NumberInput
        value={resinCount}
        style={{ width: "200px" }}
        onChange={(val) => {
          // if (val <= 160 && val >= 0) {
          //   setResinCount(val);
          //   setResinError(null);
          // } else {
          //   setResinCount(val);
          //   setResinError(
          //     "Resin count can't be higher than 160 or lower than 0"
          //   );
          // }
          if (val > 160) {
            setResinError("Resin count can't be higher than 160");
            setResinCount(160);
          } else if (val < 0) {
            setResinError("Resin count can't be lower than 0");
            setResinCount(0);
          } else {
            setResinError(null);
            setResinCount(val);
          }
        }}
        error={resinError ? resinError : ""}
      />
      <Button onClick={calculateHandler}>Calculate</Button>
    </AppShell>
  );
}
