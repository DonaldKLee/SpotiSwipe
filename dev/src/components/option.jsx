import React from "react";
import styled from "styled-components";

const OptionContainer = styled.div`
    background: #333;
    height: 400px;
    width: 300px;
    display: block;
    border-radius: 20px;
    overflow: hidden;
`
const OptionImageContainer = styled.div`
    height: 300px;
    width: 100%;
    background: white;
`
const OptionImage = styled.img`
    height: 100%;
    width: 100%;
    object-fit: cover;
`

const OptionButton = styled.a`
    background: #1DB954;
    color: white;
    text-decoration: none;
    padding: 10px 15px;
    border-radius: 20px;
    position: relative;
    top: 30px;
    text-align: center;
    margin: 0 auto;
    display: block;
    width: 200px;
    outline: 2px solid #1DB954;
    transition: 0.2s;
    &:hover {
        background: transparent;
        outline: 2px solid #1DB954;
    }
`

const Option = ({button, redirect, image}) => {
    return (
        <OptionContainer>
            <OptionImageContainer>
                <OptionImage src={image}/>
            </OptionImageContainer>
            <OptionButton href={redirect}>{button}</OptionButton>
        </OptionContainer>
    )
}

export default Option;