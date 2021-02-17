import React from 'react';
import absa from '../../images/absa.png'
import '../Header/Header.css'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

export default class Header extends React.Component<{}, { collapsed: boolean }> {

    public constructor(props: any) {
        super(props);
        this.state = { collapsed: false };
        this.toggleNavbar = this.toggleNavbar.bind(this);
    }

    public toggleNavbar() {
        this.setState({ collapsed: !this.state.collapsed });
    }

    public render() {

        return (
            <Navbar color="light" light expand="" >

                <NavbarBrand href="/" className="mr-auto">
                    <img className="logoHeight" alt={"logo"} src={absa} />
                </NavbarBrand>

                <NavbarToggler onClick={() => this.toggleNavbar()} className="mr-2" />

                <Collapse navbar isOpen={this.state.collapsed} >
                    <Nav navbar className="mr-auto" style={{ fontSize: 16 }}>

                        <NavItem>
                            <NavLink href="/">Home</NavLink>
                        </NavItem>

                    </Nav>
                </Collapse>
                
            </Navbar>
        )
    }
};