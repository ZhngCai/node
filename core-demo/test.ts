interface Customer {
    custname: string
    buymoney: number
}

type custFuncType = (cust: Customer) => string

type inferType<T> = T extends (parmas: infer P) => any ? P : T

type inferReusltType = inferType<custFuncType>  
