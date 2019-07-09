import React from 'react';
import styled from 'styled-components';
import {confirmAlert} from 'react-confirm-alert'; // Import

const NotificationWrapper = styled.div`
  background-color: red;
`;

export const options = {
  buttons: [
    {
      label: 'Yes',
      onClick: () => alert('Click Yes'),
    },
    {
      label: 'No',
      onClick: () => alert('Click No'),
    },
  ],
  closeOnEscape: true,
  closeOnClickOutside: true,
  willUnmount: () => {
  },
  onClickOutside: () => {
  },
  onKeypressEscape: () => {
  },
};

export const customNotification = ({onClose}) =>
    <NotificationWrapper>
      <h1>Notification</h1>

    </NotificationWrapper>;