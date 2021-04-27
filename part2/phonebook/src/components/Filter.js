import React from 'react'

function Filter({ search, handleSearch }) {
    return (
        <div>
            <form onSubmit={(e) => e.preventDefault()}>
                <div>
                    <input placeholder="Search..." value={search} onChange={handleSearch} />
                </div>
            </form>
        </div>
    )
}

export default Filter
