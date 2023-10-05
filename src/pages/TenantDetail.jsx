import { Card } from "antd";
import Meta from "antd/lib/card/Meta";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tooltip } from 'antd';

export default function TenantDetail() {
    const [dataTenant, setDataTenant] = useState([])
    const {id} = useParams();

    useEffect(() => {
        axios.get(`https://backend-kantin-umn.fly.dev/tenant/${id}`).then((response) => {
            setDataTenant(response.data?.data)
          })
          .catch((error) => {
            console.log(error)
          })
    }, [])

    //console.log(dataTenant)

    return (
        <div>
            <h3>Full name: {dataTenant.full_name}</h3>
            <h3>Description: {dataTenant.description}</h3>
            <h3>Location: {dataTenant.location}</h3>
            <h3>Is open: {dataTenant.is_open}</h3>
            {
                dataTenant?.tenant_menu?.map((item) => {
                    //console.log(item)
                    return item.menu.map((itemMenu) => {
                        // console.log(itemMenu,"itemMenu")
                        return (
                            <>
                            <Card
                                key={itemMenu._id}
                                hoverable
                                style={{ width: 240 }}
                                cover={<img alt="example" height='200px' src={itemMenu.image} />}
                            >
                                <Meta title={itemMenu.title} description={itemMenu.price} />
                            </Card>
                            </>
                        )
                    })
                })
            }
            {
                dataTenant?.reviews?.map((review) => {
                    //console.log(review)
                    return (
                        <>
                        <Card
                            key={review._id}
                            hoverable
                            style={{ width: 240 }}
                        >
                            
                            <Tooltip title={review.content}>
                            <Meta title={review.content} description={review.rating} />
                            </Tooltip>
                            <p>From: {review.customer.full_name}</p>
                        </Card>
                        </>
                    )
                })
            }
        </div>
    )
}
