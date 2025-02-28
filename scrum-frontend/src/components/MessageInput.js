import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import axios from 'axios';

function MessageInput({ selectedRole, setConversation, loading, setLoading }) {
  const [message, setMessage] = useState('');

  const sendMessage = async () => {
    if (!message || !selectedRole) return;

    setLoading(true);
    const userMessage = { role: 'user', content: message, targetRole: selectedRole };
    setConversation((prev) => [...prev, userMessage]);

    try {
      const response = await axios.post('http://localhost:8000/generate_response', {
        role: selectedRole,
        message,
      });
      const aiMessage = { role: selectedRole, content: response.data.response };
      setConversation((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = { role: 'error', content: 'Failed to get response.' };
      setConversation((prev) => [...prev, errorMessage]);
    }

    setMessage('');
    setLoading(false);
  };

  return (
    <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>
      <TextField
        fullWidth
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        disabled={loading || !selectedRole}
        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
      />
      <Button
        variant="contained"
        onClick={sendMessage}
        disabled={loading || !selectedRole || !message}
      >
        {loading ? 'Sending...' : 'Send'}
      </Button>
    </Box>
  );
}

export default MessageInput;