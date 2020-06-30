/* eslint-disable react/no-children-prop */
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { useMutation } from 'urql';
import Alert from '../Alert';
import { Col, Row } from '../Grid';
import Input from '../Input';
import useModal from '../Modal/useModal';
import { Add, Logo, More, Search } from '../Icons';
import {
  Button,
  ButtonGroup,
  HeaderComponent,
  LogoWrapper,
} from './styles';
import { getGraphqlError } from '../../utils';

const CREATELINK = gql`
  mutation($url: String!) {
    createLink(url: $url) {
      description
      id
      domain
      title
      image
      url
    }
  }
`;

function Header() {
  const { show, hide, RenderModal } = useModal();
  const [{ fetching }, createLink] = useMutation(CREATELINK);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = ({ url }) => {
    createLink({ url }).then(({ data, error }) => {
      if (data) {
        setErrorMessage('success');
        setTimeout(() => hide(), 1000);
      }
      if (error) {
        setErrorMessage(getGraphqlError(error));
      }
    });
  };

  return (
    <Row>
      <Col full>
        <HeaderComponent>
          <LogoWrapper>
            <Logo />
          </LogoWrapper>
          <ButtonGroup>
            <Button type="button">
              <Search />
            </Button>
            <Button type="button" onClick={() => show()}>
              <Add />
            </Button>
            <Button type="button">
              <More />
            </Button>
          </ButtonGroup>
          <RenderModal>
            <Alert>{errorMessage}</Alert>
            <Input onSubmit={onSubmit} disable={fetching} />
          </RenderModal>
        </HeaderComponent>
      </Col>
    </Row>
  );
}

export default React.memo(Header);
