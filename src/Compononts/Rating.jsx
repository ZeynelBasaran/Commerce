import * as React from 'react';
import Rating from '@mui/material/Rating';


export default function RatingSize({ rating }) {

    return (
        <div  className='flex gap-x-2 items-center justify-center' >
            <span className=''>{rating}</span>
            <Rating name="size-small" size="small" defaultValue={rating} />
        </div>
    );
}