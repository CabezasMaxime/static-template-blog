import Error from "next/error"
import { ApiError } from "../types/utils/ApiError"

type CustomErrorProps = {
    error: ApiError   
}

const CustomError = ({error}: CustomErrorProps) => {
    return <Error statusCode={error.status} title={error.message} />
}

export default CustomError