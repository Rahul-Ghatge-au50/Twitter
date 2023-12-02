import './sidebaroptions.css';

function SidebarOption({ active, text, Icon }) {
    return (
        <div className={`sidebaroptions ${active && 'sidebaroptions-active'}`}>
            <Icon className='sidebar-icons' />
            <h2>{text}</h2>
        </div>
    )
}

export default SidebarOption
