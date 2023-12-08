import { GluestackUIProvider, Text, Box } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config'; // Optional if you want to use default theme
import Main from './src/screen/Main';

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <Main/>
    </GluestackUIProvider>
  );
}