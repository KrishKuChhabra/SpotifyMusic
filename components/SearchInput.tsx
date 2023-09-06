"use client"

import useDedounce from '@/hooks/useDebounce';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import qs from "query-string"
import Input from './Input';


const SearchInput = () => {
    
    const router= useRouter();
    const [value, setValue]= useState<string>("")
    const debounceValue=useDedounce<string>(value, 500);

    useEffect(() => {
        const query = {
          title: debounceValue,
        };
        const queryString = qs.stringify(query);
        const url = `/search?${queryString}`; // Construct the full URL
        router.push(url);
      }, [debounceValue, router]);
  return (
     <Input placeholder='what do you want to listen ?' value={value} onChange={(e)=>setValue(e.target.value)} />
  )
}

export default SearchInput
