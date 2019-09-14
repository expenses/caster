import React, {MouseEvent, ReactElement} from 'react';

interface Props {
  icon: ReactElement;
  text: string;
  onClick: (e: MouseEvent) => void;
}

export default function SideNavItem(props: Props): ReactElement {
  const {onClick, icon, text} = props;

  return (
    <div
      onClick={onClick}
      className='sidenav-item'
    >
      <div className='sidenav-icon'>{icon}</div>
      <p>{text}</p>
    </div>
  );
}
