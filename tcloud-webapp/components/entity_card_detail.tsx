import React, { useState } from 'react'




interface Props {
  title: string,
  values: []
}




const renderRows = (isExpanded, values: []) => {
 
  if (!isExpanded)
    return

  return (<div >{values.map((e: any) => <ul>
    <li key={e.id} className='text-sm text-gray-600 border-b py-2'> {e.text}</li>
  </ul>)}

  </div>)
}

export default (props: Props) => {

  const [isExpanded, collapase] = useState(true)

  return <div className="mainContainer p-4 mt-4 bg-white rounded-lg ">
    <header className=" flex">
      <label className="subtitle mb-4 w-11/12" >{props.title}</label>
      <div  onClick={() => collapase(!isExpanded)} className='expandIcon bg-gray-200 rounded justify-end w-5 h-5 flex content-center justify-center'>{isExpanded ? <CollapseIcon /> : <ExpandIcon />}</div>
    </header>
    {renderRows(isExpanded, props.values)}

    <style jsx>
      {
        
        `
        .expandIcon {
          box-shadow: 0px 0.625px 1.875px rgba(0, 0, 0, 0.08);
        }
        

        /*
        .mainContainer {
          display: grid;
          grid-template-rows: 30px 1fr; 
          box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.05)
        }

        ul.li {
          list-style-position: inside;
        }

        header {
          // display:grid; 
          // grid-template-columns: 1fr 20px;
          
        }

        

        li::before {
          content: "•"; 
          color: #667EEA;
          display: inline-block; 
          font-size: 1.5em; 
          width: 0.8em;
        }*/
        `
      }
    </style>
  </div>
}

const CollapseIcon = () => (
  <svg style={{margin: 'auto'}} width="10" height="6"  preserveAspectRatio="xMaxYMax meet"  viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.25 5.1875L5.3125 1.125L9.375 5.1875" stroke="#667EEA" strokeWidth="1.25" />
  </svg>
)

const ExpandIcon = () => (
  <svg  style={{margin: 'auto'}}   className=" justify-center"   width="10" height="6"  preserveAspectRatio="xMaxYMax meet" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.75 0.8125L4.6875 4.875L0.625 0.8125" stroke="#667EEA" strokeWidth="1.25" />
  </svg>

)