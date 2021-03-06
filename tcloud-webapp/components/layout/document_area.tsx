import React from 'react'
import { useSelector } from 'react-redux'
import uuid4 from 'uuid4'
import * as _ from 'underscore'


const colors = ['green', 'red', 'orange', 'yellow', 'gray', 'teal', 'blue', 'indigo', 'purple', 'pink']



export default () => {

  const entitiesSelected = useSelector(state => state.documentViewer.entity_detail_list) as Array<LNEntity>
  const rawEntities = useSelector(state => state.documentViewer.document.entities) as Array<LNEntity>
  // const currentPage : number = null

  const hasEntitySelected = (image: LNImage): LNEntity => {
    let hasSelected: LNEntity = null

    hasSelected = _.first(entitiesSelected.filter((e: LNEntity) => e.pos && e.pos.filter((p: LNPos) => image.line === p.line && image.page === p.page).length >= 1))
      || _.first(entitiesSelected.
        filter((e: LNEntity) => !e.pos && e.values.
          filter((ev: LNEntityValue) => ev.entities.
            filter((en: LNEntity) => en.pos && en.pos.
              filter((p: LNPos) => image.line === p.line && image.page === p.page).length >= 1).length >= 1).length >= 1))

    return hasSelected
    // return hasSelected
  }

  const determineStyle = (page: number, line: number) => {
    let color = ''
    const entity = hasEntitySelected({ page, line } as LNImage)

    if (entity)
      color = colors[_.findIndex(rawEntities, (e: LNEntity) => e.id === entity.id)]

    return color
  }

  const images = useSelector(state => state.documentViewer.document.images) as Array<LNImage>

  return <div className='documentArea mt-4 pb-12'>

    {images.map((i: LNImage,index)  => <div className="relative ">
      <div id={`${i.page}${i.line}`} className={hasEntitySelected(i) ? `bg-${determineStyle(i.page, i.line)}-500 absolute h-full w-full opacity-25` : ''} > {true} </div>
      <img src={`data:image/png;base64,${i.b64}`} key={uuid4()} />
      {index!=0 && images[index-1].page != i.page ? 
      <div className="bg-gray-100 w-full  h-16 flex">
          <span className="m-auto "> Página {i.page} de {_.last(images).page}</span> 
      </div> : ''}

    </div>)}

    <style jsx>
      {`
        .documentArea {
          background-color: white;
          overflow-y: auto;
          scroll-behavior: smooth;
          transition-duration: 500ms;
        }

        .marker { 
          cursor: pointer;
          transition: all 400ms ease-in;
        }
      `}
    </style>
  </div>
  /* 

  const entityDetailList = useSelector(state => state.documentViewer.entity_detail_list)
  const entityList = useSelector(state => state.documentViewer.document.data)


  const fileContent = useSelector(state => state.documentViewer.document.transaction_info ? state.documentViewer.document.transaction_info.file.content : null)

  return <div className='documentArea mt-4'>
    {entityDetailList.map(e => (
      (
        e.value.map(pos => {
           return pos.area ? ((<div style={style(pos) as React.CSSProperties} className="marker">
            <div style={{ height: pos.area.height + "px" }} className="bg-white w-18 h-18 text-black" ><span className={`flex justify-center rounded-full bg-${colors[Object.keys(entityList).indexOf(e.key)]}-700   mx-2 text-white`}>{e.key.trim().split("_").map(a => a[0].toUpperCase()).join("")}</span></div>
            <div className={`mark bg-${colors[Object.keys(entityList).indexOf(e.key)]}-700 opacity-25 h-full`}> .</div>
          </div>
          )) : ''
        })
      )
    )
    )}


    {fileContent ? <img src={fileContent} /> : ''}


    
  </div>*/
}