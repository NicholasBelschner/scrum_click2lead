import React from 'react';
import { Button } from '@mui/material';
import axios from 'axios';

function SprintPlanningButton({ setConversation, setLoading }) {
  const startSprint = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/start_sprint_planning');
      const { scrum_master, product_owner, developer_1, developer_2 } = response.data;
      const sprintMessages = [
        { role: 'scrum_master', content: scrum_master },
        { role: 'product_owner', content: product_owner },
        { role: 'developer_1', content: developer_1 },
        { role: 'developer_2', content: developer_2 },
      ];
      setConversation((prev) => [...prev, ...sprintMessages]);
    } catch (error) {
      setConversation((prev) => [...prev, { role: 'error', content: 'Failed to start sprint planning.' }]);
    }
    setLoading(false);
  };

  return (
    <Button variant="outlined" onClick={startSprint} sx={{ mb: 2 }}>
      Start Sprint Planning
    </Button>
  );
}

export default SprintPlanningButton;