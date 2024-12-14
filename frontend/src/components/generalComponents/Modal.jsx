import React from "react";
import { FaXmark } from "react-icons/fa6";

function Modal({ children, close ,className}) { 
    return (
        <div className={`fixed inset-0 bg-black backdrop-blur-sm flex justify-center place-items-center ${className} `} onClick={close}>
            <FaXmark
                className="fixed top-6 right-6 z-10 size-10 cursor-pointer"
                onClick={() => {
                    close();
                }}
            />
            <div className="z-10 inline-block" onClick={(e)=> e.stopPropagation()} >
            {children}
            </div>
        </div>
    );
}

export default Modal;
