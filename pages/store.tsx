import StoreItems from '../data/items.json'
import { Row } from 'react-bootstrap'
import { Col } from 'react-bootstrap'
import { StoreItem } from '../components/StoreItem'

export function Store(){
    return(
    <>
        <h1>Store</h1>
        <Row md={2} xs={1} lg={3} className='g-3'>
            {StoreItems.map( item => {
              return( 
              <Col key={item.id}>
                  <StoreItem {...item}/>
              </Col>
            )
            })}
        </Row>
    </>)
}