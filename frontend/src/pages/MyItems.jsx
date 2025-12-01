import Feed from "../components/Feed"

const MyItems = () => {
    return (
        <>
            <Feed title="Мои товары" myOwn={true} />
        </>
    )
}

export default MyItems