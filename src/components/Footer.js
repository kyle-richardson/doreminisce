import React from "react"
import { AiFillGithub, AiFillLinkedin, AiFillMail} from 'react-icons/ai'

const Footer = ({darkMode}) => {
    const tempColor = darkMode ? "white" : "black"
    return (
        <div className="footer">
            <div className="footer-name">
                <span>Made by Kyle </span>
                <div className="icons">
                    <a style={{color: tempColor}} href="https://github.com/kyle-richardson"><AiFillGithub /></a>
                    <a style={{color: tempColor}} href="https://www.linkedin.com/in/kyle-m-richardson/"><AiFillLinkedin/></a>
                    <a style={{color: tempColor}} href="mailto:kylerichardson1@gmail.com"><AiFillMail/></a>
                </div>
            </div> 
        </div>
    )
}

export default Footer