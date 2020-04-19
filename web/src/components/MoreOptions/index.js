/* eslint-disable no-unused-expressions */
import React, { useState } from 'react';
import { IoIosMore } from 'react-icons/io';
import $ from 'jquery';
import { Container, MoreButton, MoreList, Options } from './styles';

export default function MoreOptions({ children }) {
  const [visible, setVisible] = useState(false);

  function handleToggleVisible() {
    if (!visible) {
      setVisible(true);
    } else {
      setVisible(false) ||
        $('body').click(function () {
          setVisible(false);
        });
    }
  }
  return (
    <Container>
      <MoreButton onClick={handleToggleVisible}>
        <IoIosMore size={10} color="#000" />
      </MoreButton>
      <MoreList visible={visible}>
        <Options>{children}</Options>
      </MoreList>
    </Container>
  );
}
