import React from 'react'
import {CitiLogo} from '../Ui/Icons'

const Footer = (props) => {
  return (
    <footer className="bck_blue">
      <div className="footer_logo">
        <CitiLogo
          width="70px"
          height="70px"
          link="true"
          linkTo="/"
        />
      </div>
      <div className="footer_discl">
        Manchester city 2019.All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
