import React from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '~/store/modules/auth/actions';
import { Container, Content, Profile } from './styles';
import logo from '~/assets/logo.png';

export default function Header() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);

  function handleNavColor(e) {
    $('a').removeClass('selected-page');
    $(e.target).toggleClass('selected-page');
  }

  function handleSignOut() {
    dispatch(signOut());
  }
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="Fastfeet Logo" />
          <Link className="selected-page" onClick={handleNavColor} to="/orders">
            ENCOMENDAS
          </Link>
          <Link onClick={handleNavColor} to="/transporters">
            ENTREGADORES
          </Link>
          <Link onClick={handleNavColor} to="/recipients">
            DESTINATÁRIOS
          </Link>
          <Link onClick={handleNavColor} to="/problems">
            PROBLEMAS
          </Link>
        </nav>
        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <button type="button" onClick={handleSignOut}>
                sair do sistema
              </button>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
