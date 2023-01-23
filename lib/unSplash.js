import { createApi as createAPI } from 'unsplash-js';

const unSplash = createAPI({accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY});

export default unSplash;