import React from 'react'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Link } from 'react-router-dom';


function Banner() {
    return (
        <div className='banner dark:text-white '>
            <ul className="flex justify-between  container">
                <li>
                    <Link to={"/hizli-gonderim"}>
                        <LocalShippingOutlinedIcon className='mx-2' /> Hızlı Gönderim
                    </Link>
                </li>
                <li>

                    <Link to={"/guvenli-alisveris"}>
                        <LockOutlinedIcon className='mx-2' />
                        Güvenli Alışveriş
                    </Link>
                </li>
                <li>

                    <Link to={"/musteri-memnuniyeti"}>
                        <InsertEmoticonIcon className='mx-2' />

                        Müşteri Memnuniyeti
                    </Link>
                </li>
                <li>

                    <Link to={"/degisim-iade"}>
                        <RestartAltIcon className='mx-2' />
                        Kolay Değişim & İade
                    </Link>
                </li>
            </ul>
        </div>


    )
}

export default Banner