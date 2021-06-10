import { Button, Row } from "antd"
import { GoogleOutlined } from "@ant-design/icons"
import { useCallback } from "react"
import { loginWithProvider } from "services/auth"

const Login = () => {
  const handleLogin = useCallback(() => loginWithProvider("GoogleAuthProvider"), [])

  return (
    <Row
      style={{
        height: "100vh",
        width: "100vw"
      }}
      justify="center"
      align="middle"
    >
      <Button
        onClick={handleLogin}
        icon={<GoogleOutlined />}
      >
        {"Đăng nhập với Google"}
      </Button>
    </Row>
  )
}

export default Login