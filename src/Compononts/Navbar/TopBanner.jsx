import React from "react";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { Link } from "react-router-dom";

const links = [
    { to: "/hizli-gonderim", icon: <LocalShippingOutlinedIcon className="mx-2" />, text: "Hızlı Gönderim" },
    { to: "/guvenli-alisveris", icon: <LockOutlinedIcon className="mx-2" />, text: "Güvenli Alışveriş" },
    { to: "/musteri-memnuniyeti", icon: <InsertEmoticonIcon className="mx-2" />, text: "Müşteri Memnuniyeti" },
    { to: "/degisim-iade", icon: <RestartAltIcon className="mx-2" />, text: "Kolay Değişim & İade" },
];


function Banner() {
    return (
        <div className="banner dark:text-white dark:bg-pink-600">
            <ul className="container grid grid-cols-2 md:grid-cols-4 gap-2">
                {links.map(({ to, icon, text }) => (
                    <li key={to}>
                        <Link className="hover:text-white hover:dark:dark:text-gray-300 cursor-pointer" to={to}>
                            {icon} {text}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Banner;



