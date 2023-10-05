
import { useState } from 'react';
import { Button, Col, Row } from 'antd';
import { useEffect } from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;

const DivWrapper = styled.div`
  ${
    ({isEven}) => isEven 
    ?
    css`background-color: red;`
    :
    css`background-color: blue;`
  }
`

export default function Content() {
  const [count, setCount] = useState(0)
  const [bgcolor, setBgcolor] = useState('FFFFFF')
  const [dataTenant, setDataTenant] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('https://backend-kantin-umn.fly.dev/tenant')
    .then((response) => {
      setDataTenant(response.data?.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }, [])

  //console.log(dataTenant)

  useEffect(() => {
    document.body.style.backgroundColor = bgcolor
  }, [bgcolor])

  const increment = () => { setCount(count + 1) }
  const decrement = () => { 
    if(count <= 0){
      setCount(0)
    } else {
      setCount(count - 1)
    }
  }

  const columns = [
    {id: 1, hexa: '#008000'},
    {id: 2, hexa: '#800080'},
    {id: 3, hexa: '#FF0000'},
    {id: 4, hexa: '#0000FF'}
  ]

  const checkIsEven = (value) => { 
    return value % 2
  }

  return (
    <div>

      {/* <h2>{count}</h2>

      <Button type="primary" onClick={increment}>Add +</Button>
      <br/>

      <Button type="primary" onClick={decrement}>Subtract -</Button>
      <br/>

      <Row>
        {
          columns.map((column) => {
            return (
              <Col span={6} key={column.id}>
                <DivWrapper 
                  style={{height: '100px'}} 
                  onClick={() => setBgcolor(column.hexa)}
                  isEven={checkIsEven(column.id)}
                />
              </Col>
            )
          })
        }
      </Row> */}

      <Row>
        {
          dataTenant.map((tenant) => {
            return (
              <Card
                key={tenant._id}
                hoverable
                style={{ width: 240 }}
                cover={<img alt="example" height='200px' src={tenant.profile_image} />}
                onClick={() => navigate(`/tenant/${tenant._id}`)}
              >
                <Meta title={tenant.full_name} description={tenant.location} />
              </Card>
            )
          })
        }
      </Row>

    </div>
  )
}
