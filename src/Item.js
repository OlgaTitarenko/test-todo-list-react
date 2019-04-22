import React from 'react';

const Item = ({  value, children, checked, onChange, onDelete }) => {
    const styleLi = checked ? "Todo__item_done list-group-item" : "list-group-item";
    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <div className="input-group-text">
                    <input
                    type="checkbox"
                    name="todoItem"
                    checked={checked}
                    onChange={() => onChange()}
                    />
                 </div>
            </div>
            <li className={styleLi} key={value}>
                {children}
                <button className="btn btn-secondary" onClick={() => onDelete()}>x</button>
            </li>
        </div>
    );
};


export default Item;
