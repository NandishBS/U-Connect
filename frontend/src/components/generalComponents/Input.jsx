import React, { useId } from "react";

const Input = ({ label, type = "text", className = "", ...props }, ref) => {
    const id = useId();
    return (
        <div className="w-full">
            {label && (
                <label className="inline-block m-0 p-0" htmlFor={id}>
                    {label}
                </label>
            )}
            <input
                type={type}
                className={`w-full ${className}`}
                id={id}
                ref={ref}
                {...props}
            />
        </div>
    );
};

export default React.forwardRef(Input);
