import actionTypes from '../constants/actionTypes';
import runtimeEnv from '@mars/heroku-js-runtime-env';

function moviesFetched(movie) {
    return {
        type: actionTypes.FETCH_MOVIES,
        movies: movie
    }
}

function movieFetched(movie) {
    return {
        type: actionTypes.FETCH_MOVIE,
        selectedMovie: movie
    }
}

function movieSet(movie) {
    return {
        type: actionTypes.SET_MOVIE,
        selectedMovie: movie
    }
}

export function setMovie(movie) {
    return dispatch => {
        dispatch(movieSet(movie))
    }
}

export function fetchMovies(movieTitle) {
    const env = runtimeEnv();
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/movies/${movieTitle}?reviews=true`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            mode: 'cors'})
            .then( (response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then( (res) => {
                console.log("FETCH_MOVIES", res)
                dispatch(moviesFetched(res.movie[0]));
            })
            .catch( (e) => console.log(e) );
    }
}

export function fetchMovie(){
    const env = runtimeEnv();
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/movies/?reviews=true`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            mode: 'cors'})
            .then( (response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then( (res) => {
                console.log("FETCH_MOVIES", res)
                dispatch(movieFetched(res));
            })
            .catch( (e) => console.log(e) );
    }
}

export function addReview(data) {
    const env = runtimeEnv();
    console.log("data", data);
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/movies/?reviews`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            mode: 'cors',
            body: JSON.stringify(data)
        })
            .then((res) => {
                if (!res.ok) {
                    throw Error(res.statusText);
                }
                console.log("AddReview", res);
                return res.json()
            })
            .then((res) => {
                window.location.reload();
                console.log("RESPONSE", res);
            })
            .catch((e) => console.log(e));
    }
}