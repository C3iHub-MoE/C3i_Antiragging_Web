// ActionMenu.js
import React from 'react';
import { Button, Dropdown, Menu } from 'antd';

const ActionMenu = ({ complaint, updateStatus, goToComplaintDetails }) => {
  const handleMenuClick = ({ key }) => {
    if (key === 'details') {
      goToComplaintDetails(complaint.ComplaintID);
    } else {
      updateStatus(complaint.ComplaintID, key); // key should be the new status
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="details">View Details</Menu.Item>
      <Menu.Item key="Resolved">Mark as Resolved</Menu.Item>
      <Menu.Item key="Pending">Mark as Pending</Menu.Item>
      <Menu.Item key="Closed">Mark as Closed</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu}>
      <Button>Actions</Button>
    </Dropdown>
  );
};

export default ActionMenu;
