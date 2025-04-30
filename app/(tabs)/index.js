import { useState } from "react";
import { View, Text, ActivityIndicator, Button } from "react-native";
import * as Progress from "react-native-progress";

export default function Home() {
  const [progress, setProgress] = useState(0);

  const startProgress = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newprogress = prev + 0.1;

        if (newprogress >= 1) {
          clearInterval(interval);
          return 1;
        }
        return newprogress;
      });
    }, 1000);
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home Screen</Text>
      <ActivityIndicator />
      <ActivityIndicator size="large" hidesWhenStopped={true} color="red" />
      <ActivityIndicator size={100} color="orange" style={{ fontSize: 100 }} />
      <Text>{Math.round(progress * 100)}%</Text>
      <Progress.Bar
        progress={progress}
        size={50}
        style={{ marginBottom: 20 }}
      />
      <Button title="Start Task" onPress={startProgress} />
    </View>
  );
}