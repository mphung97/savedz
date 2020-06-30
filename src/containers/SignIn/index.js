import gql from 'graphql-tag';
import React from 'react';
import { useFela } from 'react-fela';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { useMutation } from 'urql';
import Alert from '../../components/Alert';
import ButtonLang from '../../components/ButtonLang';
import { Container, Row } from '../../components/Grid';
import { authSelector } from '../App/atom';
import { btn, field, input } from './styles';
import { getGraphqlError } from '../../utils';

const SIGNIN_MUTATION = gql`
  mutation($username: String!, $password: String!) {
    login(user: { username: $username, password: $password }) {
      username
    }
  }
`;

const SignIn = () => {
  const intl = useIntl();
  const history = useHistory();
  const { css } = useFela();
  const { register, handleSubmit, errors, setError } = useForm();

  const setAuth = useSetRecoilState(authSelector);
  const [{ fetching }, login] = useMutation(SIGNIN_MUTATION);

  const onSubmit = ({ username, password }) =>
    login({ username, password }).then(({ error }) => {
      if (error) {
        setError('fetch', 'validate', getGraphqlError(error));
        return;
      }
      setAuth(true);
      history.push('/');
    });

  return (
    <Container>
      <Row>
        <ButtonLang />
        <div
          className={css({
            margin: '30vh auto',
            width: '100%',
            maxWidth: '375px',
          })}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={css({
              width: '100%',
            })}
          >
            <div>
              {errors.fetch && <Alert>{errors.fetch.message}</Alert>}
              {errors.username && (
                <Alert>This field is required</Alert>
              )}
              <input
                className={css(input, field)}
                type="text"
                name="username"
                ref={register({ required: true })}
                placeholder={intl.formatMessage({ id: 'username' })}
              />
            </div>
            <div>
              {errors.password && (
                <Alert>This field is required</Alert>
              )}
              <input
                className={css(input, field)}
                type="password"
                name="password"
                ref={register({ required: true })}
                placeholder={intl.formatMessage({ id: 'password' })}
              />
            </div>
            <input
              className={css(input, btn)}
              type="submit"
              disabled={fetching}
              value={intl.formatMessage({ id: 'signin' })}
            />
          </form>
        </div>
      </Row>
    </Container>
  );
};

export default SignIn;
