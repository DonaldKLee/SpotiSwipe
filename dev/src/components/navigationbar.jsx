import React from "react";
import styled from "styled-components";

const NavContainer = styled.nav`
    position: fixed;
    width: 100vw;
    height: 50px;
    top: 0px;
    background: #1DB954;
    z-index: 99;
`

const NavTitle = styled.p`
    color: white;
    position: relative;
    line-height: 25px;
    font-size: 1em;
    left: 20px;
`

const Navbar = () => {
    return (
        <NavContainer>
            <NavTitle>SpotiSwipe</NavTitle>
        </NavContainer>
    )
}

export default Navbar;