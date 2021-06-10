import { Card, Input } from "antd";
import { forwardRef, useCallback, useImperativeHandle, useState } from "react"
import ReactCardFlip from "react-card-flip"

/**
 * 
 * @param {import("antd").CardProps} props 
 * @returns 
 */
const CustomCard = (props) => (
  <Card
    {...props}
    className={"custom-card " + props.className || ""}
  />
)

const Flipcard = forwardRef(({
  front,
  back,
  isEdit,
  onChange
}, ref) => {
  const [isFlipped, setIsFlipped] = useState(false);

  useImperativeHandle(ref, () => ({
    flip: (_isFlipped) => setIsFlipped(_isFlipped !== null && _isFlipped !== undefined ? _isFlipped : !isFlipped)
  }))

  const handleFlip = useCallback(() => {
    if (!isEdit) {
      setIsFlipped(!isFlipped)
    }
  }, [isFlipped])
  const handleChange = useCallback((type) => ({ target: { value } }) => {
    if (typeof onChange === "function") {
      onChange(type, value)
    }
  }, [onChange])

  return (
    <ReactCardFlip
      isFlipped={isFlipped}
      flipDirection="vertical"
      cardStyles={{
        height: "100%",
        width: "100%"
      }}
    >
      <CustomCard
        onClick={handleFlip}
        className="front"
      >
        {
          isEdit ? (
            <Input
              value={front}
              placeholder="Mặt trước"
              onChange={handleChange("front")}
            />
          ) : front
        }
      </CustomCard>
      <CustomCard
        onClick={handleFlip}
      >
        {
          isEdit ? (
            <Input
              value={back}
              placeholder="Mặt sau"
              onChange={handleChange("back")}
            />
          ) : back
        }
      </CustomCard>
    </ReactCardFlip>
  )
})

export default Flipcard