const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: 'f2a04dd3c1a9a93e775a950a38748c91',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;