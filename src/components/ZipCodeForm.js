import React from 'react'
const ZipCodeForm = (props) => {
  return (
    <form onSubmit={props.onSubmit} className="ZipCodeForm"><label>ZIP Code: </label>
      <input type="text"  value={props.zip} onChange={props.onChange} placeholder="US zip only"/>
    </form>
  )
}

export default ZipCodeForm
