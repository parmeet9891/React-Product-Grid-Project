import React from 'react';
import './ProductCard.css';

const ProductsCard = ({list}) => {
    return (
        <div className = 'col-md-3 mt-10'>
            <div className = 'card card-price h-100'>
                <div className = 'card-body'>  
                    <div className = 'face text-center'>{list.face}</div>
                    <ul className = 'details'>
                        <li>Id : {list.id}</li>
                    </ul>
                    <table className = 'table'>
                        <thead>
                            <tr className = 'text-center'>
                                <th>Size</th>
                                <th>Price</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className = 'text-center'>
                                <td>{list.size}</td>
                                <td className = 'price'>${list.price}</td>
                                <td className = 'mod-date'>{modifiyTime(list.date)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function modifiyTime (newTime) {
    const oneSecond = 1000;
    const oneMinute = 60*oneSecond;
    const oneHour = 60*oneMinute;
    const oneDay = 24*oneHour;
    const oneWeek = 7*oneDay;
    
    const diffTime = new Date() - new Date(newTime);
    if (diffTime < oneMinute) {
        const timeAgo = Math.floor(diffTime/oneSecond);
        return `${timeAgo} ${timeAgo>1? 'seconds': 'second'} ago` ;
    } else if (diffTime < oneHour) {
        const timeAgo = Math.floor(diffTime/oneMinute);
        return `${timeAgo} ${timeAgo>1? 'minutes': 'minute'} ago` ;
    } else if (diffTime < oneDay) {
        const timeAgo = Math.floor(diffTime/oneHour);
        return `${timeAgo} ${timeAgo>1? 'hours': 'hour'} ago`;
    } else if (diffTime <= oneWeek) {
        const timeAgo = Math.floor(diffTime/oneDay);
        return `${timeAgo} ${timeAgo>1? 'days': 'day'} ago`;
    } else {
        return `${new Date(newTime).toLocaleString()}`; 
    }
}

export default ProductsCard;