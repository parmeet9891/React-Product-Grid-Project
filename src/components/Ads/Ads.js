import React from 'react';
import './Ads.css';
import AdsUrl from './../../config/config';

const Ads = (props) => {
    const url = `${AdsUrl.ads}${props.rParam}`
          return (
            <div className = ' co-md-offset-6 col-md-6 mt-10'>
                <div className = 'card card-ads'>
                    <div className = 'card-img'>
                        <img src = {url} className = 'img-responsive rounded mx-auto d-block' alt='product-ads'/>
                    </div>
                    <div className = 'card-body'>
                        <div className = 'lead'>Product Ad</div>
                        <ul className = 'details'>
                            <li>One Liner about this product</li>
                        </ul>
                        <div className = 'ads-price'>$100.00</div>
                        <div className = 'discount'>10% Discount</div>
                    </div>
                </div>
            </div>
    )
}

export default Ads;