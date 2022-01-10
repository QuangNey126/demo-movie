import React from 'react'

const Loading = (props) => {
    return (
        <div className={`loader${props.numb}`}>
            loading...
        </div>
    )
}

export default Loading
