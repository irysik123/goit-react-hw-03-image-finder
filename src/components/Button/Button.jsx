import { BtnLoadMore } from "./Button.styled"

export const Button = ({ images, onClick }) => {
    return (
        images.length >= 12 && (
            <BtnLoadMore onClick={onClick}>Load More</BtnLoadMore>
          )
    )
}