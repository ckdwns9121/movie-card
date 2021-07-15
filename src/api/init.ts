import axios from 'axios';

export const customAxiosInstance=()=>{


    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    
    const axiosInstance = axios.create({
        baseURL: 'https://yts.mx',
        timeout:5000,
    });
    // HTTP status가 2xx일 때 처리하고 싶은 로직이 있으면 onFulfilled에서 처리
    const onFulfilled = (res: any)=> res;
    const retry =(errorConfig : any) =>{
        return new Promise ((resolve:any) =>{
            setTimeout(()=>{
                console.log('retry');
                resolve(axiosInstance.request(errorConfig));
            },5000);
        })
    }

    const onRejected =(error :any)=>{
        if(error.config){
            console.log(error.config);
            return retry(error.config);
        }
        return Promise.reject(error);
    }

    const test =(config : any)=>{
        console.log('요청 전');
        console.log(config);
        return config;
    }

    const requestError = (e : any)=>{
        console.log('오류 요청 전 수행할 일');
        console.log(e);
        return Promise.reject(e);
    }


    

    axiosInstance.interceptors.request.use(test,requestError)
    axiosInstance.interceptors.response.use(onFulfilled,onRejected);
    return axiosInstance;
}
