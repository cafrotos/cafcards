import { PlusOutlined, ReloadOutlined, ArrowLeftOutlined } from "@ant-design/icons"
import { Button, Layout, message, Row, Space, Typography } from "antd"
import Flipcard from "components/Flipcard"
import { useCallback, useRef, useState } from "react"
import { useHistory } from "react-router-dom"
import { addWord } from "services/firestore"

const AddCard = () => {
  const history = useHistory()
  const ref = useRef()
  const [object, setObject] = useState({
    front: null,
    back: null
  })

  const addCard = useCallback(async () => {
    if (!object.front) {
      message.warning("Hãy nhập mặt trước!")
      return ref.current.flip(false)
    }
    if (!object.back) {
      message.warning("Hãy nhập mặt sau!")
      return ref.current.flip(true)
    }
    addWord(object)
    setObject({
      front: null,
      back: null
    })
    ref.current.flip()
  }, [object])

  const changeCard = useCallback((type, value) => {
    setObject({
      ...object,
      [type]: value
    })
  }, [object])

  return (
    <Layout
      style={{
        height: "100vh"
      }}
    >
      <Layout.Header>
        <Row
          justify="center"
          align="middle"
          style={{
            height: "100%"
          }}
        >
          <Typography.Title
            level={3}
            style={{
              color: "white"
            }}
          >
            {"Từ vựng"}
          </Typography.Title>
          <Space
            style={{
              position: "absolute",
              right: 16
            }}
          >
          </Space>
        </Row>
      </Layout.Header>
      <Layout.Content
        style={{
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Row
          style={{
            flex: 6,
            padding: 20
          }}
        >
          <Flipcard
            {...object}
            onChange={changeCard}
            isEdit={true}
            ref={ref}
          />
        </Row>
        <Row
          style={{
            flex: 1
          }}
          justify="center"
          align="middle"
        >
          <Space>
            <Button
              type="primary"
              size="large"
              shape="circle"
              onClick={() => ref.current.flip()}
              icon={<ReloadOutlined />}
            />
            <Button
              type="primary"
              size="large"
              shape="circle"
              onClick={addCard}
              icon={<PlusOutlined />}
            />
            <Button
              type="primary"
              size="large"
              shape="circle"
              onClick={history.goBack}
              icon={<ArrowLeftOutlined />}
            />
          </Space>
        </Row>
      </Layout.Content>
    </Layout>
  )
}

export default AddCard