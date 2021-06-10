import { PlusOutlined, ReloadOutlined, SoundOutlined } from "@ant-design/icons"
import { Button, Layout, Row, Space, Typography } from "antd"
import Flipcard from "components/Flipcard"
import { ROUTES } from "configs"
import { useCallback, useEffect, useRef, useState } from "react"
import { useHistory } from "react-router-dom"
import { getAllDocs, getRandomWord } from "services/firestore"
import { speech } from "services/tts"

const Home = () => {
  const ref = useRef()
  const history = useHistory()
  const [object, setObject] = useState({
    front: "Hello",
    back: "Xin chao"
  })

  useEffect(() => {
    reload()
  }, [])

  const reload = useCallback(async () => {
    ref.current.flip(false)
    const word = await getRandomWord()
    setObject({
      front: word.front,
      back: word.back
    })

  })

  const speechObject = useCallback(() => {
    speech(object.front)
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
            <Button
              shape="circle"
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => history.push(ROUTES.ADD_WORD)}
            />
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
          <Flipcard {...object} ref={ref} />
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
              onClick={reload}
              icon={<ReloadOutlined />}
            />
            <Button
              type="primary"
              size="large"
              shape="circle"
              onClick={speechObject}
              icon={<SoundOutlined />}
            />
          </Space>
        </Row>
      </Layout.Content>
    </Layout>
  )
}

export default Home