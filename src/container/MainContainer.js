import React, {Fragment} from 'react';
import './main-container.css';
import axios from 'axios';
import ProductsCard from './../components/Cards/ProductsCard';
import Ads from './../components/Ads/Ads';

import Loader from './../components/Loader/Loader';
import AppUrl from './../config/config';

class MainContainer extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            sortBy: '',
            page: 1,
            limit: 52,
            products: [],
            nextProducts: [],
            isEnd: false,
            fetchingNextSet: false,
            adsIDs : []
        }
    }
    
    componentDidMount() {
        this.fetchProducts();
        document.addEventListener('scroll', this.handleScroll);
    }
    
    
    componentWillUnmount() {
        document.removeEventListener('scroll', this.handleScroll);
    }
    
    //seeting up page number, limit per page and sort by options here, so that when user changes sort by, we can call this directly.
    productsUrl = () => {
        let {limit, page,sortBy} = this.state;
        let limitParameter = `_limit=${limit}`;
        let pageParameter = `&_page=${page}`;
        let sortParameter = sortBy ? `&_sort=${sortBy}`: '';
        //Saving the API Name in a different folder, for better code security and keeping in mind to follow DO NOT REPEAT YOURSELF (DRY PRINCIPLE)
        return `${AppUrl.api}${limitParameter}${pageParameter}${sortParameter}`;
    }
    
    //Storing data in all the variables when API CALLED
    getDataFromUrl = () => {
        this.setState({isLoading: true});
       return axios.get(this.productsUrl())
        .then(response => {
           //This method will provide us the numbers upto where we want to fill our Array.
           const IDs = this.getRandomAdsIds(Math.floor([...this.state.products, ...response.data].length/20));
           this.setState({
               products:[...response.data],
               adsIDs:IDs,
               page: response.data.length > 0 ? this.state.page+1: this.state.page,
               isLoading: false,
               isEnd: response.data.length > 0 ? false : true,
           })
       })
    }
    
    fetchProducts = () => {
        this.getDataFromUrl();
    }
    
    //Calling this method pro actively.
    loadMore = () => {
        this.setState({fetchingNextSet: true});
        return axios.get(this.productsUrl())
        .then(response => {
            const IDs = this.getRandomAdsIds(Math.floor([...this.state.products, ...response.data].length/20));
            this.setState({
                isLoading: false,
                nextProducts: [...response.data],
                adsIDs:IDs,
                fetchingNextSet: false,
                isEnd: response.data.length > 0 ? false : true,
                page: response.data.length > 0 ? this.state.page + 1: this.state.page,
            }, () => {
                //scroll down and up window by 10px to trigger handleScroll()
                window.scrollBy(0, 10);
                window.scrollBy(0, -10);
            });
        });
    }
    
    handleScroll = async() => {
        let {isEnd, fetchingNextSet, nextProducts, products, isLoading} = this.state;
        
        //This variable will be true when user reaches to 375px;
        let scrolledToBottom = window.innerHeight + window.scrollY >= (document.body.offsetHeight) - 375;
        
        if(scrolledToBottom) {
            if(nextProducts.length > 0) {
                await this.setState({
                    products : [...products, ...nextProducts],
                });
                
                //Setting NextProducts to null, so that pre fetching would be done.
                await this.setState({
                    nextProducts: []
                })
            } else if(!isEnd) {
                this.setState({isLoading: true});
            }
        }
        
        //fetch next products when loading is false, products are not ended yet, nextProducts are null
        if(!isEnd && !isLoading && !fetchingNextSet && nextProducts.length === 0) {
            this.loadMore();
        } 
        
    }
    
    //When Sort option changed.
    handleSortChange = (e) => {
        const value = e.target.value;
        this.setState({
            page: 1,
            isEnd: false,
            sortBy: value
        }, () => {
            //fetch products when sort changes.
            this.fetchProducts()
        })
    }
    
    getRandomAdsIds = (prodLength) => {
        const min = 1;
        const max = 999999; //random limit.
        let adsArr = this.state.adsIDs;
        for(let i = this.state.adsIDs.length; i < prodLength; i++) {
            //Creating randomNumbers between 1 to 999999.
            const randomInt = Math.floor(Math.random()*(max-min)) + min;
            adsArr.push(randomInt);
        }
        return adsArr;
    }
    
    render() {
        let {isLoading, products} = this.state;
        return (
            <Fragment>
                <div className = 'container-fluid'>
                
                { isLoading && <Loader></Loader> }

            
                    <div className = 'container'>
                        <div className = 'box-sort-by pull-right'>
                            <div className = 'label-sort-by'>
                                Sort By:
                            </div>
                            <div className = 'select-sort-by'>
                                <select className = 'form-control' value = {this.state.sortBy} onChange = {this.handleSortChange}>
                                    <option value = ''>Default</option>
                                    <option value = 'size'>Size</option>
                                    <option value = 'price'>Price</option>
                                    <option value = 'id'>Id</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            
                
                <div className = 'container product-section'>
                        <div className = 'row mt-10'>
                            {  
                            products.map((value, index) => 
                                <Fragment key = {value.id}>
                                         <ProductsCard 
                                        key = {index}
                                        list = {value}
                                        />
                                    {(index+1)%20 === 0 &&
                                             <Ads rParam = {this.state.adsIDs[((index+1)/20)-1]}></Ads>
                                    }
                                </Fragment>
                            )}
                        </div>
                    </div>
        
                {this.state.isEnd &&
                  <div className="well-lg text-center">
                    <h2>~ end of catalogue ~</h2>
                  </div>
                }
        
            </Fragment>
        )
    }
    
}

export default MainContainer;