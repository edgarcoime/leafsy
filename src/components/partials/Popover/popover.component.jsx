import React from 'react'
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import './popover.css'

export default function Help({title, content}) {
    const popover = (
        <Popover id="popover-basic">
          <Popover.Title as="h3">{title}</Popover.Title>
          <Popover.Content>
            {content}
          </Popover.Content>
        </Popover>
      );    

    return(
        <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
            <button className="helpButton"><HelpOutlineIcon className="helpIcon" fontSize="sm"/></button>
        </OverlayTrigger>
    )
}