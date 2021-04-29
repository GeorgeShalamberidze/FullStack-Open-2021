import React from 'react'

function MultipleCountries({filteredSearch, setSearchInput}) {
    return (
        <div>
            {filteredSearch.map(country => {
            return (
              <div key={country.numericCode}>
                <p style={{ display: "inline-block", margin: "5px" }}>{country.name}</p>
                <button onClick={() => setSearchInput(country.name)} value={country.numericCode}>Show</button>
              </div>
            )
          })}
        </div>
    )
}

export default MultipleCountries
