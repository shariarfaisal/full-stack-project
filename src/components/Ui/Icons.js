import React from 'react';
import {Link} from 'react-router-dom';

import mcitylogo from '../../resources/images/logos/manchester_city_logo.png'

export const CitiLogo = (props) => {
  const templete = <div
    className="img_cover"
    style={{
      width: props.width,
      height: props.height,
      background: `url(${mcitylogo}) no-repeat`
    }}
  ></div>
  if(props.link){
    return (
      <Link to={props.linkTo} className="Link_logo">
        {templete}
      </Link>
    )
  }else{
    return templete
  }
}
