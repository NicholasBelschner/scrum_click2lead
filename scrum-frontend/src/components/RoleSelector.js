import React from 'react';
import { Button, ButtonGroup } from '@mui/material';
import { IconName, GiWhistle, GiBoxUnpacking, GiComputing } from "react-icons/gi";

const roles = [
  { id: 'scrum_master', label: 'Scrum Master', icon: <GiWhistle /> },
  { id: 'product_owner', label: 'Product Owner', icon: <GiBoxUnpacking /> },
  { id: 'developer_1', label: 'Developer 1', icon: <GiComputing /> },
  { id: 'developer_2', label: 'Developer 2', icon: <GiComputing /> },
];

function RoleSelector({ setSelectedRole, selectedRole }) {
  return (
    <ButtonGroup sx={{ mb: 2 }}>
      {roles.map((role) => (
        <Button
          key={role.id}
          variant={selectedRole === role.id ? 'contained' : 'outlined'}
          startIcon={role.icon}
          onClick={() => setSelectedRole(role.id)}
        >
          {role.label}
        </Button>
      ))}
    </ButtonGroup>
  );
}

export default RoleSelector;