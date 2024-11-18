import axios from 'axios'
import { useQuery } from '@tanstack/vue-query'

const url = "https://fakestoreapi.com/products"

const getProducts = () => {
    return axios.get(url)
}

export const useGetProducts = () => {
    const { data, isPending } = useQuery({
        queryKey: ['allProducts'],
        queryFn: getProducts,
        select: data => data.data
    })

    return { data, isPending }
}