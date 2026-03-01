import { useState } from 'react';
import '../App.css';

const options = document.getElementsByClassName('options');


function Navbar({ setBg, setobg, title, extra }) {
    const [style, setStyle] = useState({
        color: '#ADEFD1FF',
        backgroundColor: '#00203FFF'
    })
    const [text, setText] = useState('Dark')


    const changeTheme = () => {
        if (style.color === "#ADEFD1FF") {
            setStyle({
                color: '#00203FFF',
                backgroundColor: '#ADEFD1FF'
            })
            setBg({
                backgroundColor: '#00203FFF',
                color: '#ADEFD1FF',
                boxShadow: "0 4px 8px 0 rgba(173, 239, 209, 0.629), 0 6px 20px 0 rgba(173, 239, 209, 0.629)"
            })
            setobg({
                backgroundColor: 'rgba(0, 42, 84, 0.904)'
            })
            options.style = {
                boxShadow: '0 4px 8px 0 rgba(0, 31, 63, 0.244), 0 6px 20px 0 rgba(0, 31, 63, 0.581)'
            }
            setText('Light')
        }
        else {
            setStyle({
                color: '#ADEFD1FF',
                backgroundColor: '#00203FFF'
            })
            setBg({
                backgroundColor: '#ADEFD1FF',
                color: '#00203FFF',
                boxShadow: "0 4px 8px 0 rgba(0, 31, 63, 0.244), 0 6px 20px 0 rgba(0, 31, 63, 0.581)"

            })
            setobg({
                backgroundColor: 'rgba(173, 239, 209, 0.629)'
            })
            setText('Dark')
        }
    }
    return (
        <nav className="navbar" style={style}>
            <div className="container-fluid "  >
                <span className="navbar-brand" style={style}
                >
                    {title}
                </span>
                <span>
                    <button type="button" className='btn btn-primary bg-info=subtle theme
                ' onClick={changeTheme}>Enable {text} mode</button>
                    {extra}
                </span>
            </div>
        </nav>
    );
}


export default Navbar;