import { Stack } from 'expo-router'
import { useTheme } from 'tamagui'

export default function StackLayout() {
  const theme = useTheme()

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.background.val,
        },
        headerShadowVisible: true,
        headerTintColor: theme.color.val,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
    </Stack>
  )
}
