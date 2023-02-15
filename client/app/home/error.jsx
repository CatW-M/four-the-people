"use client"

export default function Error({ error, reset }) {
    return (
        <div>
            This is an error message: {error.msg}
            <button onClick={() => reset()}></button>
        </div>
    )
}