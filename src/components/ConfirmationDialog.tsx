import { useState } from 'react';
import { Modal, Text, Group, Button} from '@mantine/core';

interface ConfirmationDialogProps {
  opened: boolean;
  setOpened: (opened: boolean) => void;
  handleDelete: () => void;
}

const ConfirmationDialog = ({opened, setOpened, handleDelete}: ConfirmationDialogProps) => {
  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Confirmation!"
      >
        <Text> Are you sure that you want to delete selected users?</Text>
        <Group align="flex-end" position="right" sx={{marginTop: '12px'}}>
          <Button color='red' onClick={() => handleDelete()}>Yes, delete</Button>
        </Group>
      </Modal>
    </>
  );
}

export default ConfirmationDialog