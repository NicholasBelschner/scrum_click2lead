import React, { useState } from 'react';
import { Container, CssBaseline, Box } from '@mui/material';
import RoleSelector from './components/RoleSelector';
import MessageInput from './components/MessageInput';
import ConversationHistory from './components/ConversationHistory';
import SprintPlanningButton from './components/SprintPlanningButton';

function App() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <Container maxWidth="lg">
      <CssBaseline />
      <Box sx={{ p: 2, height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <SprintPlanningButton setConversation={setConversation} setLoading={setLoading} />
        <RoleSelector setSelectedRole={setSelectedRole} selectedRole={selectedRole} />
        <ConversationHistory conversation={conversation} />
        <MessageInput
          selectedRole={selectedRole}
          setConversation={setConversation}
          loading={loading}
          setLoading={setLoading}
        />
      </Box>
    </Container>
  );
}

export default App;