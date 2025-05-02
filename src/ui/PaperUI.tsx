// PaperShowcase.tsx
import * as React from 'react';
import { View, ScrollView } from 'react-native';
import {
  Provider as PaperProvider,
  MD3LightTheme as theme,
  Text,
  Button,
  IconButton,
  TextInput,
  Switch,
  Checkbox,
  RadioButton,
  Appbar,
  Card,
  Avatar,
  Badge,
  List,
  Divider,
  ActivityIndicator,
  Snackbar,
  ProgressBar,
} from 'react-native-paper';

export default function PaperUI() {
  const [checked, setChecked] = React.useState(false);
  const [radio, setRadio] = React.useState('first');
  const [text, setText] = React.useState('');
  const [visible, setVisible] = React.useState(false);

  return (
    <PaperProvider theme={theme}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => {}} />
          <Appbar.Content title="React Native Paper Showcase" />
          <Appbar.Action icon="dots-vertical" onPress={() => {}} />
        </Appbar.Header>

        <Text variant="titleLarge">Buttons</Text>
        <Button mode="contained" onPress={() => {}}>Contained Button</Button>
        <Button mode="outlined" onPress={() => {}}>Outlined Button</Button>
        <Button mode="text" onPress={() => {}}>Text Button</Button>

        <Text variant="titleLarge" style={{ marginTop: 16 }}>Text Input</Text>
        <TextInput
          label="Text Input"
          value={text}
          onChangeText={setText}
          style={{ marginBottom: 8 }}
        />

        <Text variant="titleLarge" style={{ marginTop: 16 }}>Switch / Checkbox / Radio</Text>
        <Switch value={checked} onValueChange={setChecked} />
        <Checkbox status={checked ? 'checked' : 'unchecked'} onPress={() => setChecked(!checked)} />
        <RadioButton.Group onValueChange={setRadio} value={radio}>
          <RadioButton.Item label="First" value="first" />
          <RadioButton.Item label="Second" value="second" />
        </RadioButton.Group>

        <Text variant="titleLarge" style={{ marginTop: 16 }}>Icons / Avatar / Badge</Text>
        <IconButton icon="camera" size={24} onPress={() => {}} />
        <Avatar.Icon size={48} icon="account" />
        <Badge visible>8</Badge>

        <Text variant="titleLarge" style={{ marginTop: 16 }}>Card</Text>
        <Card>
          <Card.Title title="Card Title" subtitle="Card Subtitle" />
          <Card.Content>
            <Text>This is some card content.</Text>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => {}}>Ok</Button>
          </Card.Actions>
        </Card>

        <Text variant="titleLarge" style={{ marginTop: 16 }}>List / Divider</Text>
        <List.Section>
          <List.Item title="First Item" left={() => <List.Icon icon="folder" />} />
          <Divider />
          <List.Item title="Second Item" left={() => <List.Icon icon="star" />} />
        </List.Section>

        <Text variant="titleLarge" style={{ marginTop: 16 }}>Progress & Spinner</Text>
        <ActivityIndicator animating size="large" />
        <ProgressBar progress={0.5} style={{ marginVertical: 8 }} />

        <Button onPress={() => setVisible(true)}>Показать Snackbar</Button>
        <Snackbar visible={visible} onDismiss={() => setVisible(false)} duration={2000}>
          Это Snackbar
        </Snackbar>

        <View style={{ height: 40 }} />
      </ScrollView>
    </PaperProvider>
  );
}
