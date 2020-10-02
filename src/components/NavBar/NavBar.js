import React, { useState, useContext } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink as ReactStrapNavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import {
  NavLink
} from "react-router-dom";
import './NavBar.css';
import CartIcon from '../CartIcon/CartIcon';

import {CartContext} from '../../context/cartContext';

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cart,setCart]=useContext(CartContext)

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Frutinak</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Barritas de Cereales
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Ar&aacute;ndano
                </DropdownItem>
                <DropdownItem>
                  Manzana
                </DropdownItem>
                <DropdownItem>
                  Ciruela
                </DropdownItem>
                <DropdownItem>
                  Durazno
                </DropdownItem>
                <DropdownItem>
                  Coco
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Mix de Frutos Secos
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Tropical
                </DropdownItem>
                <DropdownItem>
                  Picada
                </DropdownItem>
                <DropdownItem>
                  Gym
                </DropdownItem>
                <DropdownItem>
                  Fit
                </DropdownItem>
                <DropdownItem>
                  Energ&iacute;a
                </DropdownItem>
                <DropdownItem>
                  Work
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
              <ReactStrapNavLink><NavLink to="/">Home</NavLink></ReactStrapNavLink>
            </NavItem>
          </Nav>
          <ReactStrapNavLink>
            <NavLink to="/cart">
              <CartIcon/>({cart.length})
            </NavLink>
          </ReactStrapNavLink>
          <NavbarText>Tu pausa saludable</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;
